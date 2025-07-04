'use client';
import Link from "next/link";
import { ROUTES } from '@/lib/routes';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const now = Date.now() / 1000; // 초단위
                if (decoded.exp < now) {
                    // 토큰 만료
                    localStorage.removeItem('accessToken');
                    setIsLoggedIn(false);
                    setIsAdmin(false);
                } else {
                    setIsLoggedIn(true);
                    setIsAdmin(decoded.role === 'ADMIN'); // ✅ 역할이 ADMIN이면 true
                }
            } catch (e) {
                localStorage.removeItem('accessToken');
                setIsLoggedIn(false);
                setIsAdmin(false);
            }
        } else {
            setIsLoggedIn(false);
            setIsAdmin(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
        setIsAdmin(false);
        router.push('/');
    };

    return (
        <header className="bg-[#331715] text-white px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold">
                <Link href={ROUTES.HOME}>STOQ</Link>
            </div>
            <nav className="space-x-6">
                {isLoggedIn ? (
                    <>
                        {isAdmin && (
                            <Link href={ROUTES.ADMIN} className="hover:underline">스터디룸 관리</Link>
                        )}
                        <Link href={ROUTES.MYPAGE}>마이페이지</Link>
                        <Link href={ROUTES.CHARGE}>이용권 구매</Link>
                        <button onClick={handleLogout} className="hover:underline">로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link href={ROUTES.LOGIN}>로그인</Link>
                        <Link href={ROUTES.SIGNUP}>회원가입</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
