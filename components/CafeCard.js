'use client';
import Link from "next/link";
import {ROUTES} from '../lib/routes';
import { useRouter } from "next/navigation";

export default function CafeCard({cafe}) {
    const router = useRouter();

    const goToDetail = () => {
        router.push(`/studyrooms/${cafe.id}`); 
    }



    return (
        <div 
        onClick={goToDetail}
        className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-between h-full">
            <div>
                <h2 className="text-lg font-bold">{cafe.name}</h2>
                <p className="text-sm text-gray-600">{cafe.address}</p>
                <p className="text-sm mt-1">⭐{cafe.rating}후기 {cafe.reviews}개</p>
            </div>
        </div>
    );
}