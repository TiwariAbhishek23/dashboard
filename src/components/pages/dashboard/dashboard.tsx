'use client';
import Editor from "@/components/editor/editor";
import FolderPanel from "@/components/panels/FolderPanel/page";
import FunctionsPanel from "@/components/panels/FunctionsPanel/page";
import OpenFolder from "@/components/pages/OpenFolder/page";
import { useEffect, useState } from "react";
import { useFilestructure } from "../FilestructureContext/Filestruture";
import { update } from "lodash-es";


type SnippetData = {
  label : string;
  shortcut: string;
  snippetName: string;   
  contentHTML: string;
};

type Folder = {
  foldername: string;
  snippets: string[];
};

const Dashboard = () => {
  const [isFolderInfoOpen, setIsFolderInfoOpen] = useState(false);
  const [openFolderName, setOpenFolderName] = useState("");
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [EditorcontentHTML , setEditorContentHTML] = useState<string>("");

  const {fileStructure, setFileStructure} = useFilestructure()

  const updatecontentHTML = ({
    openFolderName,
    activeFile,
  }: {
    openFolderName: string;
    activeFile: string | null;
  }) => {
    try {
      const folder = fileStructure.find(
        (folder) => folder.foldername === openFolderName
      );
  
      if (!folder) {
        console.warn(`Folder '${openFolderName}' not found.`);
        setEditorContentHTML("");
        return;
      }
  
      if (!activeFile) {
        console.warn(`No active file selected.`);
        setEditorContentHTML("");
        return;
      }
  
      const snippet = folder.snippets.find(
        (snippet) => snippet.snippetName === activeFile
      );
  
      if (!snippet) {
        console.warn(`Snippet '${activeFile}' not found in folder '${openFolderName}'.`);
        setEditorContentHTML("");
        return;
      }
  
      setEditorContentHTML(snippet.contentHTML || "");
    } catch (error) {
      console.error("Error updating editor content:", error);
      setEditorContentHTML(""); // fallback
    }
  };
  

  useEffect(() => {
    updatecontentHTML({ openFolderName, activeFile });
  }, [openFolderName, activeFile]);

  const handleFolderInfoOpen = (folder: string) => {
    setIsFolderInfoOpen(true);
    setOpenFolderName(folder);
  };

  // const renderMainPanel = () => {
  //   if (isFolderInfoOpen) {
  //     return (
  //       <OpenFolder
  //         setOpenFolderName={setOpenFolderName}
  //         OpenFolderName={openFolderName}
  //       />
  //     );
  //   }
  //   return (
  //     <>
        
  //     </>
  //   );
  // };

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden gap-2">
      <FolderPanel
        setActiveFile={setActiveFile}
        activeFile={activeFile}
        handleFOlderInformationOpen={handleFolderInfoOpen}
      />
      <Editor  contentHTML={EditorcontentHTML} />
      <FunctionsPanel />
    </div>
  );
};

export default Dashboard;
