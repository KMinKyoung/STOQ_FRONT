'use client';

import { useEffect, useState } from 'react';
import instance from "@/lib/axios";
import Header from '@/components/Header';

export default function AdminPage() {
  const [studyRooms, setStudyRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [editData, setEditData] = useState({ name: '', location: '', total_seats: 0 });
  const [newRoom, setNewRoom] = useState({ name: '', location: '', total_seats: 0 });

  // 스터디룸 전체 조회
  const fetchRooms = async () => {
    try {
      const res = await instance.get('/admin/study-rooms');
      setStudyRooms(res.data);
    } catch (err) {
      console.error("❌ 조회 실패:", err.response?.data || err.message);
      alert('스터디룸 목록 조회 실패');
    }
  };

  // 생성
  const handleCreate = async () => {
    try {
      console.log("🛠️ 생성 요청:", newRoom);
      const res = await instance.post('/admin/study-rooms', newRoom);
      console.log("✅ 생성 성공:", res.data);
      alert('생성 완료');
      setNewRoom({ name: '', location: '', total_seats: 0 });
      fetchRooms();
    } catch (err) {
      console.error("❌ 생성 실패:", err.response?.data || err.message);
      alert('스터디룸 생성 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  // 수정 버튼 클릭 시
  const handleEditClick = (room) => {
    setSelectedRoom(room);
    setEditData({ ...room });
  };

  // 수정 실행
  const handleUpdate = async () => {
    try {
      await instance.put(`/admin/study-rooms/${selectedRoom.id}`, editData);
      alert('수정 완료');
      setSelectedRoom(null);
      fetchRooms();
    } catch (err) {
      console.error("❌ 수정 실패:", err.response?.data || err.message);
      alert('수정 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  // 삭제
  const handleDelete = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      await instance.delete(`/admin/study-rooms/${id}`);
      alert('삭제 완료');
      fetchRooms();
    } catch (err) {
      console.error("❌ 삭제 실패:", err.response?.data || err.message);
      alert('삭제 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div>
      <Header />
      <div style={{ padding: '2rem' }}>
        <h1>📋 스터디룸 관리</h1>

        {/* 생성 */}
        <div style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
          <h2>스터디룸 추가</h2>
          <input
            placeholder="이름"
            value={newRoom.name}
            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
          />
          <input
            placeholder="주소"
            value={newRoom.location}
            onChange={(e) => setNewRoom({ ...newRoom, location: e.target.value })}
          />
          <input
            placeholder="총 좌석 수"
            type="number"
            value={newRoom.total_seats}
            onChange={(e) => setNewRoom({ ...newRoom, total_seats: Number(e.target.value) })}
          />
          <button onClick={handleCreate}>추가</button>
        </div>

        {/* 조회 및 수정/삭제 */}
        <ul>
          {studyRooms.map((room) => (
            <li key={room.id} style={{ marginBottom: '1rem' }}>
              <strong>{room.name}</strong> ({room.location}) - 좌석 {room.total_seats}
              <button onClick={() => handleEditClick(room)} style={{ marginLeft: '1rem' }}>수정</button>
              <button onClick={() => handleDelete(room.id)} style={{ marginLeft: '0.5rem' }}>삭제</button>
            </li>
          ))}
        </ul>

        {/* 수정폼 */}
        {selectedRoom && (
          <div style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
            <h2>스터디룸 수정</h2>
            <input
              placeholder="이름"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            />
            <input
              placeholder="주소"
              value={editData.location}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
            />
            <input
              placeholder="총 좌석 수"
              type="number"
              value={editData.total_seats}
              onChange={(e) => setEditData({ ...editData, total_seats: Number(e.target.value) })}
            />
            <button onClick={handleUpdate}>수정 완료</button>
          </div>
        )}
      </div>
    </div>
  );
}
