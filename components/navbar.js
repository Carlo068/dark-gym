import React from 'react';

export function Navbar() {
    return (
        <nav className="bg-white shadow-md ">
            <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize ">
                <a href="/" className="border-b-2 border-transparent hover:text-gray-800  hover:border-blue-500 mx-1.5 sm:mx-6"> Home</a>

                <a href="/feed" className="border-b-2 border-transparent hover:text-gray-800  hover:border-blue-500 mx-1.5 sm:mx-6">Feed</a>

                <a href="/workout_generator" className="border-b-2 border-transparent hover:text-gray-800 hover:border-blue-500 mx-1.5 sm:mx-6">Create</a>

                <a href="/myroutines" className="border-b-2 border-transparent hover:text-gray-800 hover:border-blue-500 mx-1.5 sm:mx-6">Routines</a>
            </div>
        </nav>
    );
}
