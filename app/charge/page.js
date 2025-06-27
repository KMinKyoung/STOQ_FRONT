'use client'
import { useEffect, useState } from "react";
import axios from '@/lib/axios';
import Header from "@/components/Header";

export default function chargePage(){
    const [product, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() =>{
        const fetchProducts = async () => {
            try {
                const res =await axios.get('/api/times/products');
                setProducts(res.data);
            }catch(err){
                console.error("이용권 목록을 불러오는데 실패했습니다.", err);
            }
        };
        fetchProducts();
    },[]);

    const handleCharge = async () => {
        if(!selectedProductId){
            setMessage('이용권을 선택해주세요.');
            return;
        }
        try{
            const token =localStorage.getItem('accessToken');
            await axios.post('/api/times/charge',{
               productId: selectedProductId,
            },{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
            setMessage('충전이 완료되었습니다.');
        } catch(err){
            console.error('충전에 실패했습니다.',err);
            setMessage('충전에 실패했습니다.');
        }
    };

    return(
        <div className="min-h-screen bg-white">
            <Header/>
            <div className="flex flex-col items-center justify-start pt-16">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">이용권 충전</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 w-full max-w-md">
                {product.map((product)=>(
                    <div
                        key={product.id}
                        onClick={()=> setSelectedProductId(product.id)}
                        className={`p-4 border rounded cursor-pointer shadow-sm transition${
                            selectedProductId === product.id ? 'bg-blue-100 border-blue-500':'bg-white hover:bg-gray-50'}`}>
                                <p className="text-xl font-semibold text-gray-800">{product.minutes}분</p>
                                <p className="text-gray-700 mt-2">{product.price.toLocaleString()}원</p>
                                </div>
                ))}
            </div>
            <button onClick={handleCharge}  className="px-6 py-2 bg-[#331715] text-white rounded hover:bg-blue-600 transition">충전하기</button>
            {message && <p className="mt-4 text-red-500 font-medium">{message}</p>}
        </div>
        </div>
    );
}
