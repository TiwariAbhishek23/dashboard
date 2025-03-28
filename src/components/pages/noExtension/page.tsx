'use client';

import { Book, Download, HelpCircle, Mail } from "lucide-react";
export default function ExtensionPrompt() {
  return (
    <div className="flex h-screen  text-white">
      {/* Left Sidebar */}
      <aside className="w-1/5 p-5 border-r border-gray-700  flex flex-col items-center">
        <div className="flex space-x-2 mb-4">
          <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
          <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center -ml-14 -mt-16">
        <div className=" p-6 rounded-lg  w-3/5 text-center">
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
          The required extension is not installed. Please download it below to proceed
          </h2>
          <button className="bg-gray-700 hover:bg-gray-800 hover:cursor-pointer text-white px-4 py-2 rounded-lg mt-4">
            Download Extension
          </button>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-1/5 p-5 border-l border-gray-700  flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-300 mb-3">View Important Info</h3>
        <ul className="text-gray-400 mb-4 space-y-5">
          <li className="flex items-center space-x-2">
            <Book className="w-5 h-5" />
            <a className="hover:text-white cursor-pointer" href="#">Docs</a>
          </li>
          <li className="flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <a className="hover:text-white cursor-pointer" href="#">How to Install</a>
          </li>
          <li className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <a className="hover:text-white cursor-pointer" href="#">Support</a>
          </li>
          <li className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5" />
            <a className="hover:text-white cursor-pointer" href="#">FAQ</a>
          </li>
        </ul>
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
          Download Extension
        </button>
      </aside>

      {/* Bottom Message */}
      <div className="absolute bottom-4 w-full text-center text-gray-400">
        Extension Not Downloaded
      </div>
    </div>
  );
}
