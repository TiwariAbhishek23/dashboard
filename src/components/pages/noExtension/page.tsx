'use client';

import { Book, Download, HelpCircle, Mail } from 'lucide-react';

const NoExtension = () => {
    return (
        <div className="flex flex-col h-screen backdrop-blur-md">
            <main className="flex-1 flex flex-col justify-center items-center p-4">
                <div
                    className="bg-white/5 backdrop-blur-xl shadow-xl border border-white/10 rounded-3xl p-8 md:p-12 w-full max-w-2xl text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text">
                        Extension Required
                    </h2>
                    <p className="text-lg md:text-xl mb-8 leading-relaxed">
                        The required extension is not installed. Download it below to unlock the full experience.
                    </p>

                    <button
                        className="px-8 py-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center mx-auto"
                    >
                        <Download className="mr-2" size={24} />
                        <span className="font-semibold">Download Extension</span>
                    </button>

                    <div
                        className="mt-10 flex justify-center items-center"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
                            {[
                                { Icon: Mail, label: 'Contact Support' },
                                { Icon: HelpCircle, label: 'FAQ' },
                                { Icon: Book, label: 'Documentation' },
                            ].map(({ Icon, label }, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-3 px-2 py-4 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10 transition-all duration-300 cursor-pointer"
                                >
                                    <Icon className="" size={22} />
                                    <span className="font-medium">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NoExtension;