import  LoginButton  from '../components/login_button';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-4">
            {/* Header */}
            <div className="w-full flex justify-between items-center p-4">
                {/* Placeholder for potential logo or other elements */}
                <div className="flex items-center space-x-4">
                    {/* Logo placeholder */}
                    <img src="IMG_20240517_235044_574.png" alt="Logo" className="w-12 h-12" />
                    {/* Page Title */}
                    <h1 className="text-2xl font-bold">DARK</h1>
                </div>
                
                {/* Sign In Button */}

                    <div className="text-sm bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
                        <LoginButton/>
                    </div>

            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center">
                {/* Logo placeholder */}
                <img src="IMG_20240517_235044_574.png" alt="Logo" className="w-32 h-32 mb-6" />
                
                {/* Page Title */}
                <h1 className="text-5xl font-bold mb-8">DARK</h1>
                
                {/* Redirect Button */}
                <Link href="/gym_data">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300">
                        Go to Workout Generator
                    </button>
                </Link>
            </div>
        </div>
    );
}
