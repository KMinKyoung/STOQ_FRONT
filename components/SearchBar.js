'use client';

export default function SearchBar(){
    return (

        <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center bg-white rounded-md px-4 py-2 shadow-md">
            <input
            type="text"
            placeholder="지역, 지역명, 키워드로 검색"
            className="flex-1 outline-none text-gray-700"/>
            <button className="ml-2 text-gray-500 text-xl">🔍</button>
        </div>
        </div>
    );
}