'use client';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from '@/lib/axios';

export default function ReservePage(){
    const {studyRoomId} = useParams();
    const [seats, setSeats] = useState([]);
    const [selectedSeatId, setSelectedSeatId] = useState(null);

    useEffect(() => {
        const fetchSeats = async() =>{
            try{
            const accessToken = localStorage.getItem('accessToken');
            const res = await axios.get(`/api/studyrooms/${studyRoomId}/seats`,{
                headers: {
                    Authorization : `Bearer ${accessToken}`,
                },
            } );
            setSeats(res.data);
        } catch(err){
            console.error("좌석 정보를 불러오는데 실패했습니다.",err);
          }
        };
        if(studyRoomId){
         fetchSeats();
        }
    }, [studyRoomId]);

    const handleSeatClick = (seat) => {
        if(!seat.isAvailable) return ; //예약된 좌석은 클릭 불가
        if(selectedSeatId === seat.id){
            setSelectedSeatId(null); //같은 좌석 다시 누르면 선택 해제
        } else {
            selectedSeatId(seat.id) //선택
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">좌석 선택</h2>
            <div className="grid grid-cols-4 gap-4">
                {seats.map((seat) => (
                    <div
                        key={seat.id}
                        className={`w-16 h-16 flex items-center justify-center border rounded
            ${
                seat.isAvailable
                  ? selectedSeatId === seat.id
                    ? 'bg-green-500 text-white cursor-pointer'
                    : 'bg-white hover:bg-green-100 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed'
              }
            `}
            >
                {seat.seatNumber}
                </div>
                ))}
            </div>
        </div>
    );
}