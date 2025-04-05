import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import Navbar from '@/components/ui/Navbar';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Text Blaze Free alternative',
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex-col h-screen w-screen overflow-hidden bg-white dark:bg-black text-black dark:text-white`}
            >
                {/* <Navbar /> */}
                {children}
            </body>
        </html>
    );
}

export default RootLayout;
