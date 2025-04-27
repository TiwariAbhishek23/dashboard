'use client';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Ban, Check, Clock, Copy, Download, Edit2Icon, File, FileText,
  Folder, HardDrive, LinkIcon, Mail, Share, Shield, Star, Trash,
  Trash2, Upload, Users
} from "lucide-react";
import { useFilestructure } from "../FilestructureContext/Filestruture";

type Folder = {
  foldername: string;
  snippets: string[];
};

const FileManager = ({
  setOpenFolderName,
  OpenFolderName,
}: {
  setOpenFolderName: Dispatch<SetStateAction<string>>;
  OpenFolderName: string;
}) => {
  const [folderDesc, setFolderDesc] = useState("");
  const [descSaved, setDescSaved] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const [popups , setpopups] = useState({
    share: false,
    delete: false,
    disable: false,
    editName: false,
  });

  const {fileStructure , setFileStructure} = useFilestructure();


  useEffect(() => {
    const storedData = localStorage.getItem("FolderDescriptions");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        const folderData = parsed.find((folder: { folder: string }) => folder.folder === OpenFolderName);
        setFolderDesc(folderData ? folderData.desc : "");
      } catch (e) {
        console.error("Invalid localStorage data:", e);
      }
    }
  }, [OpenFolderName]);

  const handleSaveDesc = () => {
    const newEntry = { folder: OpenFolderName, desc: folderDesc };
    const existing = localStorage.getItem("FolderDescriptions");
    let updatedDescriptions = [];

    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        updatedDescriptions = parsed.filter((item: { folder: string }) => item.folder !== OpenFolderName);
      } catch (e) {
        console.error("Invalid localStorage data:", e);
      }
    }

    updatedDescriptions.push(newEntry);
    localStorage.setItem("FolderDescriptions", JSON.stringify(updatedDescriptions));
    setDescSaved(true);
    setTimeout(() => setDescSaved(false), 1500);
  };

  const handleNameChange = () => {
    const existingData = localStorage.getItem("FolderDescriptions");
    if (existingData) {
      try {
        const parsedData = JSON.parse(existingData);
        const updatedData = parsedData.map((item: { folder: string; desc: string }) => {
          return item.folder === OpenFolderName ? { ...item, folder: newFolderName } : item;
        });

        const updatedFileStructure = fileStructure.map((folder) => {
          return folder.foldername === OpenFolderName
            ? { ...folder, foldername: newFolderName }
            : folder;
        });

        setFileStructure(updatedFileStructure);
        localStorage.setItem("FolderDescriptions", JSON.stringify(updatedData));
        setOpenFolderName(newFolderName);
        setNewFolderName("");
        setpopups({ ...popups, editName: false });
        alert("Folder name updated successfully!");
      } catch (e) {
        alert("Something went wrong, please try again later");
        console.error("Invalid localStorage data:", e);
      }
    }
  };

  const stats = [
    { icon: <File size={16} />, label: "Total Files", value: "10" },
    { icon: <Clock size={16} />, label: "Last Edited", value: "2 days ago" },
    { icon: <HardDrive size={16} />, label: "Folder Size", value: "2.5GB" },
    { icon: <Users size={16} />, label: "Shared With", value: "3 users" },
    { icon: <Folder size={16} />, label: "Total Folders", value: "1" },
    { icon: <Upload size={16} />, label: "Last Upload", value: "1 hour ago" },
    { icon: <Download size={16} />, label: "Total Downloads", value: "25" },
    { icon: <Trash size={16} />, label: "Deleted Items", value: "3" },
    { icon: <Star size={16} />, label: "Favorite Files", value: "4" },
  ];

  return (
    <div className="flex h-screen text-white">
      <main className="flex-1 w-full p-6">
        <h1 className="text-2xl text-gray-900 font-medium mb-4 bg-transparent text-center py-3 rounded-lg">
          <div className="flex flex-row justify-center text-lg items-center">
            <FileText size={19} className="text-gray-600 text-sm" />
            <span className="text-lg ml-1">{OpenFolderName.toUpperCase()}</span>
            <Edit2Icon onClick={() => setpopups({...popups , editName : true})} size={15} className="text-gray-600 text-sm ml-2 mb-2 cursor-pointer" />
          </div>
        </h1>

        <div className="border w-[60rem] border-gray-500 p-6 mb-4 rounded-lg">
          <textarea
            value={folderDesc}
            onChange={(e) => setFolderDesc(e.target.value)}
            placeholder="Write folder description..."
            className="h-64 w-full resize-none p-4 text-sm rounded-md border border-gray-300 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <div className="flex justify-end mt-3">
            <button onClick={handleSaveDesc} className="bg-blue-400 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-md">
              Save Description
            </button>
          </div>
          {descSaved && <p className="text-green-600 text-sm mt-2 text-right">Description saved!</p>}
        </div>

        <div className="flex justify-center items-center space-x-4 mt-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center" onClick={() => setpopups({...popups , share : true})}>
            <Share size={16} className="mr-2" /> Share
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center" onClick={() => setpopups({...popups , delete : true})}> 
            <Trash2 size={16} className="mr-2" /> Delete
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center" onClick={() => setpopups({...popups , disable : true})}>
            <Ban size={16} className="mr-2" /> Disable
          </button>
        </div>
      </main>

      <aside className="w-[17rem] p-5 shadow-md rounded-lg bg-white">
        <h2 className="text-md font-serif text-gray-800 mb-4 mx-auto">FOLDER STATS</h2>
        <ul>
          {stats.map((stat, index) => (
            <li key={index} className="pb-3 mb-5 border-b border-gray-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <span>{stat.icon}</span>
                  <span className="text-sm">{stat.label}</span>
                </div>
                <span className="font-mono text-[0.65rem] font-medium text-gray-800">{stat.value}</span>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {popups.share && <SharePopup setpopups={setpopups} />}
      {popups.delete && <DeletePopup setpopups={setpopups} />}
      {popups.disable && <DisablePopup setpopups={setpopups} />}
      {popups.editName && (
        <FolderNameEditPopup
          newFolderName={newFolderName}
          setNewFolderName={setNewFolderName}
          handleNameChange={handleNameChange}
          setpopups={setpopups}
        />
      )}
    </div>
  );
};

export const SharePopup = ({ setpopups }: {setpopups: Dispatch<SetStateAction<{share: boolean;delete: boolean;disable: boolean;editName: boolean;}>> }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/30 w-full"> 
  <div className="bg-white p-5 w-md rounded-lg">

  
    <h2 className="text-xl font-semibold text-center text-gray-900">Share File</h2>
    <div className="space-y-4 py-4">
      <div className="flex items-center gap-2 rounded-md border bg-gray-50 px-3">
        <Mail className="h-4 w-4 text-gray-500" />
        <input
          className="flex-1 bg-transparent px-1 placeholder:text-gray-500 py-2 outline-none text-sm"
          placeholder="Email"
          type="email"
        />
      </div>

      <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700">
        <option value="">Access Type</option>
        <option  value="view">View Only</option>
        <option  value="edit">Can Edit</option>
        <option  value="admin">Admin Access</option>
      </select>

      <div className="flex items-center gap-2 rounded-md border bg-gray-50 px-3">
        <LinkIcon className="h-4 w-4 text-gray-500" />
        <input
          className="flex-1 bg-transparent text-sm px-1 py-2 outline-none text-gray-600"
          readOnly
          value="https://hi.com/hesvevbdbhvjk"
        />
        <button
          // onClick={handleCopyLink}
          className="text-sm flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 text-gray-700"
        >
          {false ? <><Check className="h-4 w-4" />Copied</> : <><Copy className="h-4 w-4" />Copy</>}
        </button>
      </div>

      <textarea
        placeholder="Add a message (optional)"
        className="w-full min-h-[96px] resize-none text-gray-600 border border-gray-300 rounded-md px-3 py-2 text-sm"
      />
    </div>
    <div className="flex justify-between pt-2">
      <button onClick={() => setpopups((prev) => ({...prev , share : false})) } className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">Share</button>
      <button onClick={() => setpopups((prev) => ({...prev , share : false})) } className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Cancel</button>
    </div>
    </div>
    </div>
  
);

export const DeletePopup =({ setpopups }: {setpopups: Dispatch<SetStateAction<{share: boolean;delete: boolean;disable: boolean;editName: boolean;}>> }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/30 w-full">
    <div className="bg-white p-5 w-md rounded-lg">
      <h2 className="text-xl font-semibold text-center text-gray-900">Delete Folder</h2>
      <p className="text-sm text-center text-gray-600 mt-2 mb-4">This action cannot be undone.</p>
      <input placeholder="Type folder name to confirm" className="w-full border px-3 py-2 rounded-md text-sm text-gray-800" />
      <div className="flex justify-between mt-6">
        <button onClick={() => setpopups((prev) => ({...prev , delete : false})) } className="bg-rose-600 text-white px-4 py-2 rounded-md">Delete</button>
        <button onClick={() => setpopups((prev) => ({...prev , delete : false})) } className="border px-4 py-2 rounded-md text-gray-700">Cancel</button>
      </div>
    </div>
  </div>
);

export const DisablePopup = ({ setpopups }: {setpopups: Dispatch<SetStateAction<{share: boolean;delete: boolean;disable: boolean;editName: boolean;}>> }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/30 w-full"> 
  <div className="bg-white p-5 w-md rounded-lg">
    <h2 className="text-xl font-semibold text-center text-gray-900">Disable File</h2>
    <p className="text-center text-sm text-gray-600 mt-1 mb-6">
      This file will be disabled but not deleted. You can enable it again later.
    </p>
    <div className="flex justify-center">
      <div className="rounded-full bg-amber-100 p-4 mb-6">
        <Shield className="h-10 w-10 text-amber-600" />
      </div>
    </div>
    <div className="flex justify-center">
      <button onClick={() => setpopups((prev) => ({...prev , disable : false})) } className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700">Confirm Disable</button>
    </div>
  </div>
  </div>
);

export const FolderNameEditPopup = ({
  newFolderName,
  setNewFolderName,
  handleNameChange,
  setpopups,
}: {
  newFolderName: string;
  setNewFolderName: Dispatch<SetStateAction<string>>;
  handleNameChange: () => void;
  setpopups: Dispatch<SetStateAction<{share: boolean;delete: boolean;disable: boolean;editName: boolean;}>>;
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/30 w-full">
    <div className="bg-white p-5 w-md rounded-lg text-center">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">Edit Folder Name</h2>
      <input
        className="w-full px-3 py-2 border rounded-md text-sm text-gray-800"
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.target.value)}
        placeholder="New folder name"
      />
      <div className="flex justify-between mt-5">
        <button onClick={handleNameChange} className="bg-blue-600 text-white px-4 py-2 rounded-md">Update</button>
        <button onClick={() => setpopups((prev) => ({...prev , editName : false})) } className="border px-4 py-2 rounded-md text-gray-700">Cancel</button>
      </div>
    </div>
  </div>
);


export default FileManager;
