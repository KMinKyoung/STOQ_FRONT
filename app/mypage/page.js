'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import Header from '@/components/Header';

export default function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [reservations, setReservations] = useState([]);

  // 내 정보 불러오기
  const fetchUserInfo = async () => {
    try {
      const res = await axios.get('/api/users/me');
      setUserInfo(res.data);
    } catch (err) {
      console.error("유저 정보를 불러오는데 실패했습니다.", err);
    }
  };

  // 예약 목록 불러오기
  const fetchReservations = async () => {
    try {
      const res = await axios.get('/api/users/reservations/my');
      setReservations(res.data);
    } catch (err) {
      console.error("예약 목록을 불러오는데 실패했습니다.", err);
    }
  };

  // 예약 취소하기
  const handleCancel = async (reservationId) => {
    const confirmCancel = window.confirm("정말 예약을 취소하시겠습니까?");
    if (!confirmCancel) return;

    try {
      await axios.post('/api/reservations/cancel', {
        reservationId: reservationId
      });
      alert("예약이 취소되었습니다.");
      fetchReservations(); // 다시 목록 불러오기
    } catch (err) {
      console.error("예약 취소에 실패했습니다.", err);
      alert("예약 취소에 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchReservations();
  }, []);

  return (
    <div>
         <Header />
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">마이페이지</h1>

      {/* 내 정보 섹션 */}
      {userInfo && (
        <div className="mb-12 p-6 border-2 border-blue-600 rounded-xl bg-blue-50 shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-blue-800 text-center">✨ 내 정보 ✨</h2>
          <p className="text-lg text-gray-800"><strong>이름:</strong> {userInfo.name}</p>
          <p className="text-lg text-gray-800"><strong>이메일:</strong> {userInfo.email}</p>
          <p className="text-lg text-gray-800"><strong>전화번호:</strong> {userInfo.phone}</p>
        </div>
      )}

{/* 예약 목록 섹션 */}
<div className="max-w-2xl mx-auto">
  <h2 className="text-xl font-bold mb-4 text-gray-900">내 예약 목록</h2>
  {reservations.length === 0 ? (
    <p className="text-gray-700 font-medium">현재 예약된 좌석이 없습니다.</p>
  ) : (
    <ul className="space-y-4">
      {reservations.map((res) => (
        <li
          key={res.reservationId}
          className="p-4 border rounded shadow-sm bg-white flex justify-between items-center"
        >
          <div className="text-gray-900 font-medium">
            <p><strong>스터디룸:</strong> {res.studyRoomName}</p>
            <p><strong>좌석 번호:</strong> {res.seatNumber}</p>
            <p><strong>시작:</strong> {new Date(res.startTime).toLocaleString()}</p>
            <p><strong>종료:</strong> {new Date(res.endTime).toLocaleString()}</p>
          </div>
          <button
            onClick={() => handleCancel(res.reservationId)}
            className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-bold"
          >
            예약 취소
          </button>
        </li>
      ))}
    </ul>
  )}
</div>

    </div>
    </div>
  );
}
