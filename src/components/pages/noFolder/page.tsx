'use client';

import { Folder } from "lucide-react";

const NoFolder = () => {

    return (
        <div className="flex h-screen  text-white">
            {/* Main Content */}
            <main className="flex-1 p-1 flex flex-col justify-center  items-center -mt-36">
                <div className="p-6 rounded-lg  w-4/5 text-center">
                    <h2 className="text-5xl font-extralight text-gray-300 mb-4"><span className="font-bold text-black">Oh no!</span> Your folder collection is empty</h2>
                    <p className="text-gray-400 mb-4">Create a new folder before the emptiness consumes us!</p>
                    <div className="flex items-center justify-center space-x-4">
                        <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center">
                            <Folder size={16} className="mr-2" /> Create Folder
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default NoFolder;