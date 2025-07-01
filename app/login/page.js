'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import Header from '@/components/Header';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/auth/login', form);
    console.log("✅ 응답 도착:", res.data);
    const token = res.data.accessToken;
    if (!token) {
      throw new Error('토큰 없음');
    }

    localStorage.setItem('accessToken', token);
    console.log("➡️ 토큰 저장 완료, 홈으로 이동 시도");
    router.push('/'); // ← 여기서 안 가면 라우터 문제
    // window.location.href = '/'; // 이걸로 대체 가능
  } catch (err) {
    console.error("❌ 로그인 실패:", err);
    alert('로그인 실패: ' + (err.response?.data?.message || err.message || '오류 발생'));
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">로그인</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="이메일 주소 입력"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black text-gray-800"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="비밀번호 입력"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black text-gray-800"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              로그인
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
