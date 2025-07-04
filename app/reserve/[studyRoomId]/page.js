'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

export default function ReservePage() {
  const { studyRoomId } = useParams();
  const router = useRouter();

  const [seats, setSeats] = useState([]);
  const [selectedSeatId, setSelectedSeatId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          alert("로그인이 필요합니다.");
          router.push('/login');
          return;
        }

        const res = await axios.get(`/api/studyrooms/${studyRoomId}/seats`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setSeats(res.data);
      } catch (err) {
        console.error("좌석 정보를 불러오는데 실패했습니다.", err);
        alert("좌석 정보 조회 중 오류가 발생했습니다.");
      }
    };

    if (studyRoomId) {
      fetchSeats();
    }
  }, [studyRoomId, router]);

  const handleSeatClick = async (seat) => {
    if (!seat.available || loading) return;

    const confirmResult = window.confirm(`좌석 ${seat.seatNumber}번을 예약하시겠습니까?`);
    if (!confirmResult) return;

    try {
      setLoading(true);
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        alert("로그인이 필요합니다.");
        router.push('/login');
        return;
      }

      const requestBody = {
        seatId: seat.id,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2시간 후
      };

      await axios.post('/api/reservations', requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      alert("예약이 완료되었습니다.");
      router.push('/');
    } catch (err) {
      console.error("예약 중 오류:", err);
      if (err.response?.status === 403) {
        alert("예약 권한이 없습니다. 로그인 상태를 확인해주세요.");
        router.push('/login');
      } else {
        alert("예약에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">좌석 선택</h2>
      <div className="grid grid-cols-4 gap-4">
        {seats.map((seat) => {
          const isSelected = selectedSeatId === seat.id;
          const isAvailable = seat.available;

          return (
            <button
              key={seat.id}
              onClick={() => handleSeatClick(seat)}
              disabled={!isAvailable}
              className={`w-16 h-16 border rounded font-semibold flex items-center justify-center transition
                ${
                  isAvailable
                    ? isSelected
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-white text-black hover:bg-blue-100'
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }
              `}
            >
              {seat.seatNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
}
