'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { BellIcon, BellRing, ExternalLink, FlameIcon, Headset, LogOut, Settings, User, Volleyball } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = useCallback(() => {
        setDropdownOpen((prev) => !prev);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="container sticky top-0 w-full py-1.5 ">
            <div className="h-14 shadow-sm rounded-tl-pilled rounded-tr-pilled lg:rounded-pilled px-[1.125rem] py-3 flex items-center border-2 border-gray-200 bg-white/30 dark:bg-gray-900/30 dark:border-gray-800/50 backdrop-blur-md transition-all duration-200 rounded-2xl mx-2">

                {/* Left Side - Logo and Navigation */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="px-2.5 flex items-center gap-1 py-1.5 rounded-[0.625rem] transition-colors duration-100 bg-transparent text-gray-900 hover:bg-grayAlpha-200">
                        <Volleyball />
                        <span className="font-bold text-lg">Dashboard</span>
                    </Link>
                    <span className='hidden lg:block select-none text-black/15'>/</span>
                    <nav className='hidden lg:flex items-center gap-[0.5px]'>
                        <Link className="px-2.5 flex items-center gap-1 py-1.5 rounded-[0.625rem] transition-colors duration-100 bg-transparent text-gray-900 hover:bg-grayAlpha-200" href="/docs">
                            Docs
                            <ExternalLink className='size-2 text-grayAlpha-400' />
                        </Link>
                        <Link className="px-2.5 flex items-center gap-1 py-1.5 rounded-[0.625rem] transition-colors duration-100 bg-transparent text-gray-900 hover:bg-grayAlpha-200" href="/templates">
                            Templates
                            <ExternalLink className='size-2 text-grayAlpha-400' />
                        </Link>
                    </nav>
                </div>

                {/* Right Side - Icons */}
                <div className="ml-auto mr-2 flex items-center space-x-5 relative">

                    {/* Notification Icon */}
                    <Link className="relative group" href="#">
                        <BellIcon className="w-4 h-4 block group-hover:hidden" />
                        <BellRing className="w-4 h-4 hidden group-hover:block" />
                    </Link>

                    {/* Support Icon */}
                    <Link className="relative group" href="#">
                        <Headset className="w-4 h-4" />
                    </Link>

                    {/* Stats Icon */}
                    <Link className="relative group" href="#">
                        <div className='flex flex-row items-center'>
                            <FlameIcon className="w-4 h-4" />
                            <span className="ml-1">30s</span>
                        </div>
                    </Link>
                </div>
                {/* User Dropdown */}
                <div className="relative ml-4">
                <button
                        className="relative flex items-center transition-transform "
                        onClick={toggleDropdown}
                    >
                        <span className='w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow-lg hover:cursor-pointer transition-all'></span>
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div
                            ref={dropdownRef}
                            className="absolute right-0 top-14 w-56 py-2 bg-gray-800/80 backdrop-blur-md rounded-lg shadow-xl z-50 transition-all duration-300 animate-fade-in"
                        >
                            <Link
                                className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/60 transition-all duration-300 hover:pl-6"
                                href="/profile"
                            >
                                <User className="w-4 h-4 mr-3" />
                                Profile
                            </Link>
                            <Link
                                className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/60 transition-all duration-300 hover:pl-6"
                                href="/settings"
                            >
                                <Settings className="w-4 h-4 mr-3" />
                                Settings
                            </Link>
                            <button
                                className="flex items-center px-4 py-3 text-sm text-red-400 hover:bg-red-600/60 w-full text-left transition-all duration-300 hover:pl-6"
                            >
                                <LogOut className="w-4 h-4 mr-3" />
                                Logout
                            </button>
                        </div>
                    )}
                    </div>
            </div>
        </header>
    );
};

export default Navbar;
