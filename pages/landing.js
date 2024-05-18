import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function Landing() {
    return (
        <body>
            <Navbar></Navbar>
            <section class="bg-blue-800 dark:bg-gray-900" id="#home">
                <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div class="mr-auto place-self-center lg:col-span-7">
                        <h1 class="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">DARK</h1>
                        <p class="max-w-2xl mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-200">Your new favorite gym pal tracker.</p>
                        <a href="#" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                            Get started
                            <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                    </div>
                    <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img src="/IMG_20240517_235044_574.png" alt="logo"></img>
                    </div>                
                </div>
            </section>
            <section class="bg-blue-600 dark:bg-gray-800" id="#features">
                <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div class="mr-auto place-self-center lg:col-span-7">
                        <h2 class="mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">Features</h2>
                        <div class="grid gap-6 md:grid-cols-2">
                            <div class="flex items-center gap-4">
                                <div class="flex items center justify-center w-12 h-12 text-gray-200 bg-blue-700 rounded-lg">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                </div>
                                <div>
                                    <h3 class="text-xl font-semibold text-gray-200">Chat with others</h3>
                                    <p class="text-gray-500">Connect and chat with other gym bros.</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="flex items center justify-center w-12 h-12 text-gray-400 bg-blue-700 rounded-lg">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                </div>
                                <div>
                                    <h3 class="text-xl font-semibold text-gray-200">Create a new gym workout</h3>
                                    <p class="text-gray-500">Design and create your own personalized gym workouts.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"></link>
            <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"></link>
            <Footer></Footer>
        </body>
    );
}