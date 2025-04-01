'use client';
import { useState } from "react";

import { Ban, Clock, Download, File, FileText, Folder, HardDrive, Share, Star, Trash, Trash2, Upload, UserCircle, Users } from "lucide-react";
const FileManager = () => {
  const [selectedFolder] = useState("My Documents");
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showDisablePopup, setShowDisablePopup] = useState(false);

  const files = [
    "Report.pdf", "Notes.txt", "Code.js", "Invoice.docx", "Sketch.svg", "Readme.md"
  ];
  const stats = [
    { icon: <File size={16} />, label: "Total Files", value: "10" },
    { icon: <Clock size={16} />, label: "Last Edited", value: "2 days ago" },
    { icon: <HardDrive size={16} />, label: "Folder Size", value: "2.5GB" },
    { icon: <Users size={16} />, label: "Shared With", value: "3 users" },
    { icon: <Folder size={16} />, label: "Total Folders", value: "1" },
    { icon: <Upload size={16} />, label: "Last Upload", value: "1 hour ago" },
    { icon: <Download size={16} />, label: "Total Downloads", value: "25" },
    { icon: <Trash size={16} />, label: "Deleted Items", value: "3" },
    { icon: <Star size={16} />, label: "Favorite Files", value: "4" }
];

  return (
    <div className="flex h-screen  text-white">
      {/* Sidebar */}
      <aside className="w-1/5 p-5 border-r border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <UserCircle size={40} />
          <UserCircle size={40} />
        </div>
        <h2 className="text-lg font-semibold mb-4">Folders</h2>
        <div className="relative">
          <button 
            className="flex items-center gap-2 w-full py-2 px-4 mb-2 rounded-lg transition bg-gray-600 hover:bg-gray-700 cursor-pointer"
          >
            <Folder size={18} /> {selectedFolder}
          </button>
          <div className="ml-6 border-l-2 border-gray-500 pl-4 mt-2 relative">
            <div className="absolute top-0 left-0 w-2 h-full ml-5" />
            {/* <h3 className="text-md font-semibold mb-2">Files</h3> */}
            <ul className="relative">
              {files.map((file, index) => (
                <li key={index} className="flex items-center gap-2 py-2 px-4 hover:bg-gray-700 cursor-pointer rounded-lg relative">
                  <div className="absolute left-0 top-1/2 w-6 h-0.5 -ml-4 bg-gray-500" />
                  <FileText size={16} /> {file}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="">
           <FileText/>
        <h1 className="text-2xl font-medium mb-4 bg-transparent text-center py-3 rounded-lg">
          {selectedFolder}
        </h1> 
        </div>
        
        <div className="bg-gray-900 p-6 mb-4 rounded-lg">
          <p className="text-lg font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget velit nec nunc viverra venenatis. Integer sed risus vel mauris vehicula congue non at ligula.lorem50 Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti rem quibusdam ipsam iusto harum eius, odit natus quaerat, rerum illo at consequuntur <br/><br/> asperiores perspiciatis necessitatibus perferendis totam optio! Maxime laudantium illo porro sapiente, quo, maiores molestias ipsam voluptatum, fuga exercitationem laborum nam ipsa libero reprehenderit eaque explicabo facilis repellat fugit! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis consequatur ut, qui omnis accusamus cupiditate voluptatum architecto<br/><br/> pariatur facilis, perspiciatis ratione quae consectetur enim. Distinctio natus ex, odit blanditiis aperiam dicta aliquid repellat fugiat error corporis libero aliquam iure ipsum harum nobis. Natus possimus officia obcaecati cumque repellat, repudiandae sint eveniet nihil numquam iure eos magni odit voluptas temporibus aliquam sequi asperiores libero et impedit saepe autem. Magnam laboriosam<br/> officia aliquid blanditiis hic ea esse doloremque nulla excepturi amet, quaerat ex maiores dolore harum ad fuga, eius ipsa. Natus, quo!
          </p>
        </div>
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button className="bg-green-600 hover:bg-green-700 text-white hover:cursor-pointer px-4 py-2 rounded-lg flex items-center" onClick={() => setShowSharePopup(true)}>
            <Share size={16} className="mr-2" /> Share
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white hover:cursor-pointer px-4 py-2 rounded-lg flex items-center" onClick={() => setShowDeletePopup(true)}>
            <Trash2 size={16} className="mr-2" /> Delete
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white hover:cursor-pointer px-4 py-2 rounded-lg flex items-center" onClick={() => setShowDisablePopup(true)}>
            <Ban size={16} className="mr-2" /> Disable
          </button>
        </div>
      </main>

      {/* Stats Panel */}
      <aside className="w-1/5 p-5 border-l border-gray-700 rounded-lg">
        <h2 className="text-lg font-mono mb-4">Folder Stats</h2>
        <ul>
          {stats.map((stat, index) => (
            <li key={index} className="flex items-center font-mono gap-3 mb-3 p-3 border-gray-500" style={{borderBottomWidth :"0.5px"}}>
              {stat.icon}
              <span className="text-gray-300">{stat.label}:</span>
              <span className="text-white font-semibold">{stat.value}</span>
            </li>
          ))}
        </ul>
      </aside>
      {showSharePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent  bg-opacity-50">
          <div className="bg-transparent border shadow w-4/12 p-6 backdrop-blur-lg  rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Share File</h2>
            <input className="w-full p-2 mb-2 bg-gray-200 text-gray-900 rounded" placeholder="Email" type="email" />
            <input className="w-full p-2 mb-2 bg-gray-200 text-gray-900 rounded" placeholder="Access Type" type="text" />
            <div className="mt-2 mb-2 flex flex-row items-center">
                <input className="bg-gray-200 p-2 w-9/12 text-gray-900 placeholder:text-gray-900 rounded" readOnly placeholder="https://hi.com/hesvevbdbhvjk" type="text"/>
              <button className="bg-gray-200 px-4 py-2 text-gray-900 rounded-lg ml-1">Copy Link</button>   
            </div>
              
            <textarea className="w-full p-2 mb-2 bg-gray-200 text-gray-900 rounded" placeholder="Message"></textarea>
            <div className="flex justify-between mt-4">
              <button className="bg-green-600 px-4 py-2 rounded-lg hover:cursor-pointer">Share</button>
              <button className="bg-red-600 px-4 py-2 rounded-lg hover:cursor-pointer"  onClick={() => setShowSharePopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center shadow-[0px_0px_10px_10px_white]  bg-transparent backdrop-blur-sm bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Delete Folder</h2>
            <p>Are you sure you want to delete this folder?</p>
            <input className="w-full p-2 my-2 bg-gray-200 text-gray-900 rounded" placeholder="Enter folder name" type="text" />
            <div className="flex justify-between mt-4">
              <button className="bg-red-600 px-4 py-2 rounded-lg hover:cursor-pointer">Delete</button>
              <button className="bg-gray-600 px-4 py-2 rounded-lg hover:cursor-pointer" onClick={() => setShowDeletePopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showDisablePopup && (
        <div className="fixed inset-0 flex items-center justify-center  bg-transparent backdrop-blur-sm bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Disable File</h2>
            <p>This file will be disabled. Are you sure?</p>
            <button className="bg-gray-600 px-4 py-2 rounded-lg mt-4 hover:cursor-pointer" onClick={() => setShowDisablePopup(false)}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileManager;