'use client'
import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function SignupPage(){
    const router = useRouter();
    
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await axios.post('/auth/signup',{
                email,
                password,
                name,
                phone
            });

            alert('회원가입 성공! 로그인 페이지로 이동합니다.');
            router.push('/login');
        } catch (err) {
            console.error('회원가입 실패:',err);
            alert('회원가입에 실패했습니다. 다시 확인해주세요.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header/>
            <main className="flex justify-center items-center min-h-screen bg-gray100">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">회원가입</h2>
                    <input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-4 p-2 border rounded text-gray-800"
                        required/>
                    <input
                        type="text"
                        placeholder="이름"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mb-4 p-2 border rounded text-gray-800"
                        required/>
                    <input
                        type="tel"
                        placeholder="전화번호(ex. 01012345678)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full mb-4 p-2 border rounded text-gray-800"
                        required/>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-4 p-2 border rounded text-gray-800"
                        required/>
                    <button
                        type = "submit"
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                        >
                            회원가입
                        </button>
                </form>
            </main>
        </div>
    );
}