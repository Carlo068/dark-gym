import React from 'react';
import Icon from '@mdi/react';
import {
    mdiHomeOutline,
    mdiCompassOutline,
    mdiLayersOutline,
    mdiBasketPlusOutline,
    mdiAccountCircleOutline
} from '@mdi/js';

export default function BottomNavBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-around items-center rounded-t-lg">
            <div className="flex flex-col items-center">
                <a href="#" className="p-3 text-gray-400 hover:text-yellow-500">
                    <span className="flex flex-col items-center">
                        <Icon path={mdiHomeOutline} size={1} className="text-gray-500 group-hover:text-gray-700 transition-color duration-200" />
                        <span className="text-xs mb-2 transition-all duration-200">Home</span>
                        <span className="h-2 w-2 rounded-full group-hover:bg-yellow-500 transition-all duration-150 delay-100"></span>
                    </span>
                </a>
            </div>
            <div className="flex flex-col items-center">
                <a href="#" className="p-3 text-gray-400 hover:text-yellow-500">
                    <span className="flex flex-col items-center">
                        <Icon path={mdiCompassOutline} size={1} className="text-gray-500 group-hover:text-gray-700 transition-color duration-200" />
                        <span className="text-xs mb-2 transition-all duration-200">Explore</span>
                        <span className="h-2 w-2 rounded-full group-hover:bg-yellow-500 transition-all duration-150 delay-100"></span>
                    </span>
                </a>
            </div>
            <div className="flex flex-col items-center">
                <a href="#" className="p-3 text-yellow-500 hover:text-yellow-500">
                    <span className="flex flex-col items-center">
                        <Icon path={mdiLayersOutline} size={1} className="text-gray-700 group-hover:text-gray-700 transition-color duration-200" />
                        <span className="text-xs mb-2 transition-all duration-200">Feeds</span>
                        <span className="h-1 w-5 rounded-full bg-yellow-500 group-hover:bg-yellow-500 hover:h-3 hover:w-3 transition-all duration-150 delay-100"></span>
                    </span>
                </a>
            </div>
            <div className="flex flex-col items-center">
                <a href="#" className="p-3 text-gray-400 hover:text-yellow-500">
                    <span className="flex flex-col items-center">
                        <Icon path={mdiBasketPlusOutline} size={1} className="text-gray-500 group-hover:text-gray-700 transition-color duration-200" />
                        <span className="text-xs mb-2 transition-all duration-200">Cart</span>
                        <span className="h-2 w-2 rounded-full group-hover:bg-yellow-500 transition-all duration-150 delay-100"></span>
                    </span>
                </a>
            </div>
            <div className="flex flex-col items-center">
                <a href="#" className="p-3 text-gray-400 hover:text-yellow-500">
                    <span className="flex flex-col items-center">
                        <Icon path={mdiAccountCircleOutline} size={1} className="text-gray-500 group-hover:text-gray-700 transition-color duration-200" />
                        <span className="text-xs mb-2 transition-all duration-200">Account</span>
                        <span className="h-2 w-2 rounded-full group-hover:bg-yellow-500 transition-all duration-150 delay-100"></span>
                    </span>
                </a>
            </div>
        </div>
    );
}

