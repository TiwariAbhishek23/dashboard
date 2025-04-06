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
    PanelRightClose,
    Trash2,
} from "lucide-react";

type Folder = {
    foldername: string;
    snippets: string[];
};

export default function FolderPanel() {
    const [fileStructure, setFileStructure] = useState<Folder[]>(() => {
        const saved = localStorage.getItem("fileStructure");
        return saved ? JSON.parse(saved) : [];
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
        if (!folderName.trim()) return;
        if (fileStructure.some((f) => f.foldername === folderName)) {
            alert("Folder already exists!");
            return;
        }
        setFileStructure((prev) => [
            ...prev,
            { foldername: folderName, snippets: ["dummy"] },
        ]);
    };

    const addSnippet = (folderName: string, snippetName: string) => {
        if (!snippetName.trim()) return;

        let updatedStructure = [...fileStructure];
        if (updatedStructure.length === 0) {
            updatedStructure.push({ foldername: "default", snippets: [] });
            folderName = "default";
        }

        const folderIndex = updatedStructure.findIndex(
            (f) => f.foldername === folderName
        );
        if (folderIndex === -1) return;

        const folder = updatedStructure[folderIndex];
        if (folder.snippets.includes(snippetName)) {
            alert("Snippet with this name already exists!");
            return;
        }

        updatedStructure[folderIndex] = {
            ...folder,
            snippets: [...folder.snippets, snippetName],
        };
        setFileStructure(updatedStructure);
    };

    const deleteFolder = (folderName: string) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete the folder "${folderName}" and all its snippets?`
        );
        if (!confirmDelete) return;

        setFileStructure((prev) => prev.filter((f) => f.foldername !== folderName));
        setOpenFolders((prev) => prev.filter((name) => name !== folderName));
    };

    const deleteSnippet = (folderName: string, snippetName: string) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete the snippet "${snippetName}"?`
        );
        if (!confirmDelete) return;

        setFileStructure((prev) =>
            prev.map((folder) =>
                folder.foldername === folderName
                    ? {
                        ...folder,
                        snippets: folder.snippets.filter((s) => s !== snippetName),
                    }
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

    const filteredStructure = fileStructure
        .map((folder) => ({
            ...folder,
            snippets: folder.snippets.filter((snippet) =>
                snippet.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        }))
        .filter(
            (folder) =>
                folder.snippets.length > 0 ||
                folder.foldername.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className="left-0 h-screen flex text-gray-800">
            {/* Collapsed State */}
            {isCollapsed && (
                <button
                    onClick={toggleCollapse}
                    className="p-2 rounded-r-lg bg-white shadow-md mt-20 hover:bg-gray-100 transition-all cursor-pointer"
                >
                    <ChevronLeft size={24} className="rotate-180" />
                </button>
            )}

            {/* Expanded State */}
            {!isCollapsed && (
                <div className="w-64 h-full border-r bg-white p-4 flex flex-col rounded-r-xl shadow-md transition-all duration-300">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-4">
                        {isSearching ? (
                            <div className="flex items-center w-full space-x-2 border border-gray-300 rounded-xl px-3 py-2">
                                <Search size={18} />
                                <input
                                    className="w-full focus:outline-none text-sm"
                                    value={searchQuery}
                                    onBlur={() => setIsSearching(false)}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    autoFocus
                                />
                                <X size={18} className="cursor-pointer" onClick={() => setIsSearching(false)} />
                            </div>
                        ) : (
                            <>
                                <Filter size={16} className="cursor-pointer" onClick={toggleSort} />
                                {sortOpen && (
                                    <div className="absolute w-40 border border-gray-300 rounded shadow-md bg-white z-10">
                                        <button className="w-full px-4 py-2 hover:bg-gray-100" onClick={() => sortFolders("name")}>
                                            Sort by Name
                                        </button>
                                        <button className="w-full px-4 py-2 hover:bg-gray-100" onClick={() => sortFolders("size")}>
                                            Sort by Size
                                        </button>
                                    </div>
                                )}
                                <div className="flex space-x-3">
                                    <FilePlus2Icon className="cursor-pointer w-5 h-5" onClick={() => toggleForm("file")} />
                                    <FolderPlus className="cursor-pointer w-5 h-5" onClick={() => toggleForm("folder")} />
                                    <Search className="cursor-pointer w-5 h-5" onClick={() => setIsSearching(true)} />
                                    <PanelRightClose className="cursor-pointer w-5 h-5 rotate-180" onClick={toggleCollapse} />
                                </div>
                            </>
                        )}
                    </div>

                    {/* File Structure */}
                    <div className="flex-1 overflow-y-auto space-y-2">
                        {filteredStructure.map((folder, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between px-2 py-1 rounded hover:bg-gray-100 group">
                                    <div
                                        className="flex items-center gap-2 cursor-pointer flex-1"
                                        onClick={() => toggleFolder(folder.foldername)}
                                    >
                                        {openFolders.includes(folder.foldername) ? <FolderOpen size={18} /> : <FolderClosed size={18} />}
                                        <span className="font-medium text-sm">{folder.foldername}</span>
                                    </div>
                                    <Trash2
                                        size={16}
                                        className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 cursor-pointer"
                                        onClick={() => deleteFolder(folder.foldername)}
                                    />
                                </div>
                                {openFolders.includes(folder.foldername) && (
                                    <div className="ml-5 pl-2 border-l border-gray-200 space-y-1">
                                        {folder.snippets.map((snippet, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex items-center justify-between px-2 py-1 rounded group text-sm ${activeFile === snippet ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
                                                    }`}
                                            >
                                                <div
                                                    className="flex items-center gap-2 cursor-pointer flex-1"
                                                    onClick={() => setActiveFile(snippet)}
                                                >
                                                    <FileText size={16} />
                                                    <span>{snippet}</span>
                                                </div>
                                                <Trash2
                                                    size={16}
                                                    className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 cursor-pointer"
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
            {fileForm && (
                <FileCreateForm
                    addSnippet={addSnippet}
                    closeForm={() => setFileForm(false)}
                    folders={fileStructure}
                />
            )}
            {folderForm && (
                <FolderCreateForm
                    addFolder={addFolder}
                    closeForm={() => setFolderForm(false)}
                />
            )}
        </div>
    );
}

function FolderCreateForm({
    addFolder,
    closeForm,
}: {
    addFolder: (name: string) => void;
    closeForm: () => void;
}) {
    const [folderName, setFolderName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addFolder(folderName);
        closeForm();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-80 relative">
                <button className="absolute top-3 right-3 text-gray-600" onClick={closeForm}>
                    <X size={20} />
                </button>
                <h2 className="text-xl font-semibold mb-4 text-center">Create Folder</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring"
                        placeholder="Folder name"
                    />
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

function FileCreateForm({
    addSnippet,
    closeForm,
    folders,
}: {
    addSnippet: (folder: string, name: string) => void;
    closeForm: () => void;
    folders: Folder[];
}) {
    const [fileName, setFileName] = useState("");
    const [folderName, setFolderName] = useState(folders[0]?.foldername || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addSnippet(folderName, fileName);
        closeForm();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-80 relative">
                <button className="absolute top-3 right-3 text-gray-600" onClick={closeForm}>
                    <X size={20} />
                </button>
                <h2 className="text-xl font-semibold mb-4 text-center">Create Snippet</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring"
                        placeholder="Snippet name"
                    />
                    <select
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring"
                    >
                        {folders.map((f) => (
                            <option key={f.foldername} value={f.foldername}>
                                {f.foldername}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
