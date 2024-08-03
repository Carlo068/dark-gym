import React from 'react';
import Link from 'next/link';

export function Navbar() {
    return (
        <nav className="bg-white shadow-md">
            <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize">
                <Link href="/" passHref>
                    <button className="border-b-2 border-transparent hover:text-gray-800 hover:border-blue-500 mx-1.5 sm:mx-6">Home</button>
                </Link>
                
                <Link href="/feed" passHref>
                    <button className="border-b-2 border-transparent hover:text-gray-800 hover:border-blue-500 mx-1.5 sm:mx-6">Feed</button>
                </Link>
                
                <Link href="/workout_generator" passHref>
                    <button className="border-b-2 border-transparent hover:text-gray-800 hover:border-blue-500 mx-1.5 sm:mx-6">Create</button>
                </Link>
                
                <Link href="/myroutines" passHref>
                    <button className="border-b-2 border-transparent hover:text-gray-800 hover:border-blue-500 mx-1.5 sm:mx-6">Routines</button>
                </Link>
            </div>
        </nav>
    );
}
