'use client';
import Link from "next/link";
import {ROUTES} from '@/lib/routes';
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function Header(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if(token){
            try{
                const decoded = jwtDecode(token);
                const now = Date.now()/1000; //초단위
                if(decoded.exp < now){
                    //만료
                    localStorage.removeItem('accessToken');
                    setIsLoggedIn(false);
                } else {
                    setIsLoggedIn(true);
                }
            }catch(e){
                    localStorage.removeItem('accessToken');
                    setIsLoggedIn(false);
                }
            } else{
                setIsLoggedIn(false)
            }
        setIsLoggedIn(token);
    },[]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
        router.push('/');
    };

    return(   
        <header className ="bg-[#331715] text-white px-6 py-4 flex justify-between items-conter">
        <div className="text-2xl font-bold">
         <Link href={ROUTES.HOME}>STOQ</Link>
         </div>
        <nav className="space-x-6">
            {isLoggedIn ? (
                <>
                 <Link href={ROUTES.MYPAGE}>마이페이지</Link>
                 <Link href={ROUTES.CHARGE}>이용권 구매</Link>
                 <button onClick={handleLogout} className="hover:underline">로그아웃</button>
                </>
            ) :(
                <>
                
            <Link href={ROUTES.LOGIN}>로그인</Link>
            <Link href={ROUTES.SIGNUP}>회원가입</Link>
                </>
            )  }
        </nav>
    </header>
    )
}