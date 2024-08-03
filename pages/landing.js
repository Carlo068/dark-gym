import Link from 'next/link';
import LoginButton from '../components/login_button';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import Header from '@/components/header';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex flex-col items-center justify-center flex-grow mt-20 p-4">
                {/* Logo Placeholder */}
                <img src="/IMG_20240517_235044_574.png" alt="Logo" className="w-32 h-32 mb-6" />
                
                {/* Page Title */}
                <h1 className="text-5xl font-bold mb-8">DARK</h1>
                
                {/* Redirect Button */}
                <LoginButton />
            </main>

            {/* Footer */}
            <Navbar/>
        </div>
    );
}


