'use client';

import { Folder, PlusCircle, XCircle } from "lucide-react";

export default function FileManager() {

  return (
    <div className="flex h-screen  text-white">
      {/* Sidebar */}
      <aside className="w-1/5 p-5 border-r border-gray-700 ">
        <h2 className="text-lg font-semibold mb-4 text-gray-400">Folders</h2>
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-600 rounded-lg text-gray-500">
          No folders available
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-1 flex flex-col justify-center  items-center -mt-36">
        <div className="p-6 rounded-lg  w-4/5 text-center">
          <h2 className="text-5xl font-extralight text-gray-300 mb-4"><span className="font-bold text-fuchsia-500">Oh no!</span> Your folder collection is empty</h2>
          <p className="text-gray-400 mb-4">Create a new folder before the emptiness consumes us!</p>
          <div className="flex items-center justify-center space-x-4">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center">
              <PlusCircle size={16} className="mr-2" /> Add Folder
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center">
              <Folder size={16} className="mr-2" /> Create Folder
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center">
              <XCircle size={16} className="mr-2" /> Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}