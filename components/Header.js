'use client';
import Link from "next/link";
import {ROUTES} from '../lib/routes';

export default function Header(){
    return(   
        <header className ="bg-black text-white px-6 py-4 flex justify-between items-conter">
        <div className="text-2xl font-bold">
         <Link href={ROUTES.HOME}>STOQ</Link>
         </div>
        <nav className="space-x-6">
            <Link href={ROUTES.LOGIN}>로그인</Link>
            <Link href={ROUTES.SIGNUP}>회원가입</Link>
        </nav>
    </header>
    )
}