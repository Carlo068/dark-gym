import Link from 'next/link';
import LoginButton from '../components/login_button';
import { Footer } from '@/components/footer';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            {/* Header */}
            <header className="w-full flex justify-between items-center p-4 bg-gray-800 shadow-md fixed top-0 z-10">
                <div className="flex items-center space-x-4">
                    {/* Logo placeholder */}
                    <img src="/IMG_20240517_235044_574.png" alt="Logo" className="w-12 h-12" />
                    {/* Page Title */}
                    <h1 className="text-2xl font-bold">DARK</h1>
                </div>
                
                {/* Sign In Button */}
                <div className="text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
                    <LoginButton />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col items-center justify-center flex-grow mt-20 p-4">
                {/* Logo Placeholder */}
                <img src="/IMG_20240517_235044_574.png" alt="Logo" className="w-32 h-32 mb-6" />
                
                {/* Page Title */}
                <h1 className="text-5xl font-bold mb-8">DARK</h1>
                
                {/* Redirect Button */}
                <Link href="/gym_data">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300">
                        Go to Workout Generator
                    </button>
                </Link>
            </main>
                
                {/* Footer */}  
                <Footer />
        </div>
    );
}

