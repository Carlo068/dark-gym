import LoginButton from '@/components/login_button';
import { useSession } from 'next-auth/react';

export default function Header() {
    const { data: session } = useSession()
    if (!session || !session.user) {
        console.error("User is not logged in.");
        return;
    }
    return(
        <header className="w-full flex justify-between items-center p-4 bg-white shadow-md fixed top-0 z-10">
            <div className="flex items-center space-x-4">
                <img src="/IMG_20240517_235044_574.png" alt="Logo" className="w-12 h-12" />
                <h1 className="text-2xl font-bold">DARK</h1>
            </div>
            <div className="text-sm text-Black font-semibold py-2 px-4">
                {session.user.name}
            </div>
        </header>
    )
}