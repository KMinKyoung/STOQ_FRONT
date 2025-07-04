'use client'
import { useEffect, useState } from "react";
import axios from '@/lib/axios';
import Header from "@/components/Header";

export default function ChargePage() {
  const [product, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [message, setMessage] = useState('');

  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');

  // 아임포트 스크립트 삽입
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 상품 목록 불러오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/times/products');
        setProducts(res.data);
      } catch (err) {
        console.error("이용권 목록을 불러오는데 실패했습니다.", err);
      }
    };
    fetchProducts();
  }, []);

  // 결제 및 충전 처리
  const handleCharge = async () => {
    if (!selectedProductId) {
      setMessage('이용권을 선택해주세요.');
      return;
    }
    if (!buyerName || !buyerEmail || !buyerPhone) {
      setMessage('결제자 정보를 모두 입력해주세요.');
      return;
    }

    const selectedProduct = product.find(p => p.id === selectedProductId);
    if (!selectedProduct) return;

    const IMP = window.IMP;
    IMP.init("imp05875077"); // 실제 식별코드로 교체하세요

    IMP.request_pay({
      pg: "tosspay",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      name: `${selectedProduct.minutes}분 이용권`,
      amount: selectedProduct.price,
      buyer_email: buyerEmail,
      buyer_name: buyerName,
      buyer_tel: buyerPhone,
    }, async (rsp) => {
      if (rsp.success) {
        try {
          const token = localStorage.getItem('accessToken');
          await axios.post('/api/times/charge', {
            impUid: rsp.imp_uid,
            productId: selectedProductId
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          setMessage('충전이 완료되었습니다.');
        } catch (err) {
          console.error('결제는 성공했지만 충전 처리에 실패했습니다.', err);
          setMessage('결제 성공 후 충전 처리에 실패했습니다.');
        }
      } else {
        setMessage(`결제 실패: ${rsp.error_msg}`);
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex flex-col items-center justify-start pt-16">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">이용권 충전</h1>

        {/* 이용권 목록 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 w-full max-w-md">
          {product.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProductId(product.id)}
              className={`p-4 border rounded cursor-pointer shadow-sm transition ${
                selectedProductId === product.id
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-white hover:bg-gray-50'
              }`}>
              <p className="text-xl font-semibold text-gray-800">{product.minutes}분</p>
              <p className="text-gray-700 mt-2">{product.price.toLocaleString()}원</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleCharge}
          className="px-6 py-2 bg-[#331715] text-white rounded hover:bg-blue-600 transition"
        >
          충전하기
        </button>
        {message && <p className="mt-4 text-red-500 font-medium">{message}</p>}
      </div>
    </div>
  );
}
