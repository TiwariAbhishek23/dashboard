"use client";

import { useState } from "react";

import {
    FilePlus2Icon,
    FileText,
    Filter,
    FolderClosed,
    FolderOpen,
    FolderPlus,
    Search,
    X,
} from "lucide-react";

export default function LeftSidebar() {
    const [fileStructure, setFileStructure] = useState([
        { foldername: "src", snippets: ["sample1", "sample2"] },
        { foldername: "components", snippets: ["sample1", "sample2", "sample3"] },
    ]);
    const [openFolders, setOpenFolders] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [fileForm, setFileForm] = useState(false);
    const [folderForm, setFolderForm] = useState(false);
    const [sortopen, setSortOpen] = useState(false);

    const toggleFileForm = () => setFileForm((prev) => !prev);
    const toggleFolderForm = () => setFolderForm((prev) => !prev);

    const toggleFolder = (folderName: string) => {
        setOpenFolders((prev) =>
            prev.includes(folderName)
                ? prev.filter((name) => name !== folderName)
                : [...prev, folderName]
        );
    };

    const toggleSort = () => {
        setSortOpen((prev) => !prev)
    }

    const addFolder = (folderName: string) => {
        setFileStructure([...fileStructure, { foldername: folderName, snippets: [] }]);
    };

    const addSnippet = (folderName: string, snippetName: string) => {
        setFileStructure((prev) =>
            prev.map((folder) =>
                folder.foldername === folderName
                    ? { ...folder, snippets: [...folder.snippets, snippetName] }
                    : folder
            )
        );
    };

    return (
        <div>
            <div className="w-full h-[95vh] bg-transparent border-r border-gray-500 rounded-xl text-white p-4 flex flex-col ml-2">
                <div className="flex justify-between items-center border-b border-gray-700 mt-2 pb-3 mb-4 relative">
                    {isSearching ? (
                        <div className="flex flex-row items-center w-full space-x-2 bg-gray-90 p-2 border border-gray-500 rounded">
                            <Search size={20} className="text-gray-400" />
                            <input
                                className="w-full bg-transparent text-white focus:outline-none"
                                value={searchQuery}
                                onBlur={() => setIsSearching(false)}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                type="text"
                                autoFocus
                            />
                            <X size={20} className="text-gray-400 hover:cursor-pointer" onClick={() => setIsSearching(false)} />
                        </div>
                    ) : (
                        <>
                            <Filter size={20} className="text-gray-100 cursor-pointer relative" onClick={toggleSort} />
                            <div className="absolute top-5">
                                {/* {sortopen && <SortDropdown />} */}
                            </div>
                            <div className="flex space-x-3">
                                <FilePlus2Icon size={20} className="text-gray-100 cursor-pointer" onClick={toggleFileForm} />
                                <FolderPlus size={20} className="text-gray-100 cursor-pointer" onClick={toggleFolderForm} />
                                <Search size={20} className="text-gray-100 cursor-pointer" onClick={() => setIsSearching(true)} />
                            </div>
                        </>
                    )}
                </div>

                <div className="flex flex-col space-y-2">
                    {fileStructure.map((folder, index) => (
                        <div key={index}>
                            <div
                                className="flex items-center gap-2 shadow-[-1px_0px_1px_gray] mt-1 cursor-pointer hover:bg-gray-800 p-2 rounded"
                                onClick={() => toggleFolder(folder.foldername)}
                            >
                                {openFolders.includes(folder.foldername) ? <FolderOpen size={18} /> : <FolderClosed size={18} />}
                                <span className="font-extralight">{folder.foldername}</span>
                            </div>
                            {openFolders.includes(folder.foldername) && (
                                <div className="ml-5 border-l border-gray-600 pl-3">
                                    {folder.snippets.map((snippet, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex items-center mt-1 gap-2 p-2 rounded cursor-pointer ${activeFile === snippet ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
                                                }`}
                                            onClick={() => setActiveFile(snippet)}
                                        >
                                            <FileText size={16} className="text-gray-400" />
                                            <span>{snippet}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* {fileForm && <FileCreateForm addSnippet={addSnippet} closeForm={() => setFileForm(false)} folders={fileStructure} />} */}
            {/* {folderForm && <FolderCreateForm addFolder={addFolder} closeForm={() => setFolderForm(false)} />} */}
        </div>
    );
}

// function FolderCreateForm({ addFolder, closeForm }) {
//     const [folderName, setFolderName] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         addFolder(folderName);
//         closeForm();
//     };

//     return (
//         <div className="fixed inset-0 flex items-center justify-center z-[100] bg-[rgba(0,0,0,0.6)]">
//             <div className="bg-gray-900 border border-gray-500 p-6 rounded-2xl shadow-lg w-96 relative">
//                 <button className="absolute top-3 right-3 text-white" onClick={closeForm}><X /></button>
//                 <h2 className="text-xl text-gray-200 font-semibold mb-4 text-center">Create Folder</h2>
//                 <form onSubmit={handleSubmit}>
//                     <input className="w-full p-2 border text-white rounded-lg mb-4" value={folderName} onChange={(e) => setFolderName(e.target.value)} placeholder="Enter folder name" type="text" />
//                     <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition" type="submit">Submit</button>
//                 </form>
//             </div>
//         </div>
//     );
// }


// function FileCreateForm({ addSnippet, closeForm, folders }) {
//     const [fileName, setFileName] = useState("");
//     const [folderName, setFolderName] = useState(folders[0]?.foldername || "");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         addSnippet(folderName, fileName);
//         closeForm();
//     };

//     return (
//         <div className="fixed inset-0 flex items-center justify-center z-[100] bg-[rgba(0,0,0,0.6)]">
//             <div className="bg-gray-950 border border-gray-500 p-6 rounded-2xl shadow-lg w-96 relative">
//                 <button className="absolute top-3 right-3 text-white" onClick={closeForm}><X /></button>
//                 <h2 className="text-xl text-gray-200 font-semibold mb-4 text-center">Create File</h2>
//                 <form onSubmit={handleSubmit}>
//                     <input className="w-full p-2 border text-gray-200 bg-gray-950 hover:bg-gray-900 rounded-lg mb-4" value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="Enter file name" type="text" />
//                     <select className="w-full p-2 border text-gray-200 bg-gray-950 hover:bg-gray-900  rounded-lg mb-4" value={folderName} onChange={(e) => setFolderName(e.target.value)}>
//                         {folders.map((folder) => <option key={folder.foldername} className="text-gray-200 bg-gray-950 hover:bg-gray-900" value={folder.foldername}>{folder.foldername}</option>)}
//                     </select>
//                     <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition" type="submit">Submit</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// function SortDropdown() {
//     const [selected, setSelected] = useState("Sort by");
//     const [isOpen, setIsOpen] = useState(false);

//     const options = ["Sort by Size", "Sort by Date", "Sort by Name"];

//     return (
//         <div className="relative w-42 rounded-2xl">

//             <ul className="absolute left-0 mt-1 w-full bg-gray-950 border border-gray-800 rounded shadow-lg">
//                 {options.map((option) => (
//                     <li
//                         key={option}
//                         className="p-2 hover:bg-gray-800 cursor-pointer text-sm text-white border-b border-b-gray-600"
//                         onClick={() => {
//                             setSelected(option);
//                             setIsOpen(false);
//                         }}
//                     >
//                         {option}
//                     </li>
//                 ))}
//             </ul>

//         </div>
//     );
// }

