// import Editor from "@/components/editor/editor";

// const Dashboard = () => {
//     return (
//         <div>
//             <Editor />
//         </div>
//     );
// };

// export default Dashboard;
// @ts-ignore
"use client";

import { useState, useEffect } from "react";
import {
    FilePlus2Icon,
    FileText,
    Filter,
    FolderClosed,
    FolderOpen,
    FolderPlus,
    Search,
    X,
    ChevronLeft,
    Trash2,
} from "lucide-react";

export default function Dashboard() {
    const [fileStructure, setFileStructure] = useState(() => {
        const saved = localStorage.getItem("fileStructure");
        return saved ? JSON.parse(saved) : [
            { foldername: "src", snippets: ["sample1", "sample2"] },
            { foldername: "components", snippets: ["sample1", "sample2", "sample3"] },
        ];
    });
    const [openFolders, setOpenFolders] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [fileForm, setFileForm] = useState(false);
    const [folderForm, setFolderForm] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        localStorage.setItem("fileStructure", JSON.stringify(fileStructure));
    }, [fileStructure]);

    const toggleFolder = (folderName: string) => {
        setOpenFolders((prev) =>
            prev.includes(folderName)
                ? prev.filter((name) => name !== folderName)
                : [...prev, folderName]
        );
    };

    const toggleForm = (type: "file" | "folder") => {
        if (type === "file") setFileForm((prev) => !prev);
        if (type === "folder") setFolderForm((prev) => !prev);
    };

    const toggleSort = () => setSortOpen((prev) => !prev);
    const toggleCollapse = () => setIsCollapsed((prev) => !prev);

    const addFolder = (folderName: string) => {
        if (folderName && !fileStructure.some(f=> f.foldername === folderName)) {
            setFileStructure([...fileStructure, { folderName, snippets: [] }]);
        }
    };

    const addSnippet = (folderName: string, snippetName: string) => {
        if (snippetName) {
            setFileStructure((prev) =>
                prev.map((folder) =>
                    folder.foldername === folderName
                        ? { ...folder, snippets: [...folder.snippets, snippetName] }
                        : folder
                )
            );
        }
    };

    const deleteFolder = (folderName: string) => {
        setFileStructure((prev) => prev.filter((f) => f.foldername !== folderName));
        setOpenFolders((prev) => prev.filter((name) => name !== folderName));
    };

    const deleteSnippet = (folderName: string, snippetName: string) => {
        setFileStructure((prev) =>
            prev.map((folder) =>
                folder.foldername === folderName
                    ? { ...folder, snippets: folder.snippets.filter((s) => s !== snippetName) }
                    : folder
            )
        );
        if (activeFile === snippetName) setActiveFile(null);
    };

    const sortFolders = (criteria: "name" | "size") => {
        setFileStructure((prev) => {
            const sorted = [...prev];
            if (criteria === "name") {
                sorted.sort((a, b) => a.foldername.localeCompare(b.foldername));
            } else if (criteria === "size") {
                sorted.sort((a, b) => b.snippets.length - a.snippets.length);
            }
            return sorted;
        });
        setSortOpen(false);
    };

    const filteredStructure = fileStructure.map((folder : object) => ({
        ...folder,
        snippets: folder.snippets.filter((snippet) =>
            snippet.toLowerCase().includes(searchQuery.toLowerCase())
        ),
    })).filter((folder) => folder.snippets.length > 0 || folder.foldername.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="fixed top-0 left-0 h-screen flex">
            {/* Collapsed State */}
            {isCollapsed && (
                <button
                    onClick={toggleCollapse}
                    className="p-2 rounded-r-lg shadow-lg hover:bg-gray-200 transition-all cursor-pointer"
                >
                    <ChevronLeft size={24} className="rotate-180" />
                </button>
            )}

            {/* Expanded State */}
            {!isCollapsed && (
                <div className="w-60 mt-[100px] h-full border-r border-gray-300 rounded-r-xl p-4 flex flex-col shadow-lg transition-all duration-300">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
                        {isSearching ? (
                            <div className="flex items-center w-full space-x-2 bg-gray-900 p-2 border border-gray-700 rounded">
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
                                <X size={20} className="text-gray-400 cursor-pointer" onClick={() => setIsSearching(false)} />
                            </div>
                        ) : (
                            <>
                                <Filter size={20} className="cursor-pointer" onClick={toggleSort} />
                                {sortOpen && (
                                    <div className="absolute top-12 left-4 w-40 bg-black border border-gray-700 rounded shadow-lg z-10">
                                        <button className="w-full p-2 hover:bg-gray-800" onClick={() => sortFolders("name")}>Sort by Name</button>
                                        <button className="w-full p-2 hover:bg-gray-800" onClick={() => sortFolders("size")}>Sort by Size</button>
                                    </div>
                                )}
                                <div className="flex space-x-3">
                                    <FilePlus2Icon size={20} className="cursor-pointer" onClick={() => toggleForm("file")} />
                                    <FolderPlus size={20} className="cursor-pointer" onClick={() => toggleForm("folder")} />
                                    <Search size={20} className="cursor-pointer" onClick={() => setIsSearching(true)} />
                                    <ChevronLeft size={20} className="cursor-pointer" onClick={toggleCollapse} />
                                </div>
                            </>
                        )}
                    </div>

                    {/* File Structure */}
                    <div className="flex-1 overflow-y-auto space-y-2">
                        {filteredStructure.map((folder : string, index : number) => (
                            <div key={index}>
                                <div className="flex items-center justify-between p-2 hover:bg-gray-900 rounded group">
                                    <div
                                        className="flex items-center gap-2 cursor-pointer flex-1"
                                        onClick={() => toggleFolder(folder.foldername)}
                                    >
                                        {openFolders.includes(folder.foldername) ? <FolderOpen size={18} /> : <FolderClosed size={18} />}
                                        <span className="font-light">{folder.foldername}</span>
                                    </div>
                                    <Trash2
                                        size={16}
                                        className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-400 cursor-pointer"
                                        onClick={() => deleteFolder(folder.foldername)}
                                    />
                                </div>
                                {openFolders.includes(folder.foldername) && (
                                    <div className="ml-5 border-l border-gray-700 pl-3 space-y-1">
                                        {folder.snippets.map((snippet : string, idx : string) => (
                                            <div
                                                key={idx}
                                                className={`flex items-center justify-between p-2 rounded group ${activeFile === snippet ? "bg-gray-800" : "hover:bg-gray-900"
                                                    }`}
                                            >
                                                <div
                                                    className="flex items-center gap-2 cursor-pointer flex-1"
                                                    onClick={() => setActiveFile(snippet)}
                                                >
                                                    <FileText size={16} className="text-gray-400" />
                                                    <span>{snippet}</span>
                                                </div>
                                                <Trash2
                                                    size={16}
                                                    className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-400 cursor-pointer"
                                                    onClick={() => deleteSnippet(folder.foldername, snippet)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Forms */}
            {fileForm && <FileCreateForm addSnippet={addSnippet} closeForm={() => setFileForm(false)} folders={fileStructure} />}
            {folderForm && <FolderCreateForm addFolder={addFolder} closeForm={() => setFolderForm(false)} />}
        </div>
    );
}

function FolderCreateForm({ addFolder, closeForm }: { addFolder: (name: string) => void; closeForm: () => void }) {
    const [folderName, setFolderName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addFolder(folderName);
        setFolderName("");
        closeForm();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black/60">
            <div className="bg-black border border-gray-700 p-6 rounded-2xl shadow-xl w-96">
                <button className="absolute top-3 right-3 text-white" onClick={closeForm}><X size={20} /></button>
                <h2 className="text-xl font-semibold mb-4 text-center">Create Folder</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="w-full p-2 border border-gray-700 bg-black text-white rounded-lg mb-4 focus:outline-none focus:border-gray-500"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        placeholder="Enter folder name"
                        type="text"
                    />
                    <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

function FileCreateForm({ addSnippet, closeForm, folders }: { addSnippet: (folder: string, name: string) => void; closeForm: () => void; folders: any[] }) {
    const [fileName, setFileName] = useState("");
    const [folderName, setFolderName] = useState(folders[0]?.foldername || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addSnippet(folderName, fileName);
        setFileName("");
        closeForm();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black/60">
            <div className="bg-black border border-gray-700 p-6 rounded-2xl shadow-xl w-96">
                <button className="absolute top-3 right-3 text-white" onClick={closeForm}><X size={20} /></button>
                <h2 className="text-xl font-semibold mb-4 text-center">Create File</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="w-full p-2 border border-gray-700 bg-black text-white rounded-lg mb-4 focus:outline-none focus:border-gray-500"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        placeholder="Enter file name"
                        type="text"
                    />
                    <select
                        className="w-full p-2 border border-gray-700 bg-black text-white rounded-lg mb-4 focus:outline-none focus:border-gray-500"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                    >
                        {folders.map((folder) => (
                            <option key={folder.foldername} value={folder.foldername}>{folder.foldername}</option>
                        ))}
                    </select>
                    <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}