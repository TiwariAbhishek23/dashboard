"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { content } from "tailwind.config";

    type SnippetData = {
      label : string,
      shortcut : string,
      snippetName: string;
      contentHTML: string;
    }

    type Folder = {
      foldername: string;
      snippets: SnippetData[];  
    };

    interface FilestructureContextType {
      fileStructure: Folder[];
      setFileStructure: React.Dispatch<React.SetStateAction<Folder[]>>;
      addFolder: (folderName: string) => void;
      addSnippet: (folderName: string, snippetName: string) => void;
      deleteFolder: (folderName: string) => void;
      deleteSnippet: (folderName: string, snippetName: string) => void;
      sortFolders: (criteria: "name" | "size") => void;
      updateFolder: (updatedFolder: Folder) => void;
    }

    const FilestructureContext = createContext<FilestructureContextType | undefined>(undefined);

    export const FilestructureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [fileStructure, setFileStructure] = useState<Folder[]>(() => {
        try {
          const saved = JSON.parse(localStorage.getItem("fileStructure") || "[]");
          return Array.isArray(saved) ? saved : [];
        } catch {
          return [];
        }
      });

      useEffect(() => {
        localStorage.setItem("fileStructure", JSON.stringify(fileStructure));
      }, [fileStructure]);

      const addFolder = (folderName: string) => {
        if (!folderName.trim()) return;
        if (fileStructure.some((f) => f.foldername === folderName)) {
          alert("Folder already exists!");
          return;
        }
        setFileStructure((prev) => [...prev, { foldername: folderName, snippets: [{snippetName : "dummy" ,contentHTML: "", label :"",shortcut:"" }] }]);
      };

      const addSnippet = (folderName: string, snippetName: string) => {
        if (!snippetName.trim()) return;

        let updatedStructure = [...fileStructure];
        if (updatedStructure.length === 0) {
          updatedStructure.push({ foldername: "default", snippets: [] });
          folderName = "default";
        }

        const folderIndex = updatedStructure.findIndex((f) => f.foldername === folderName);
        if (folderIndex === -1) return;

        const folder = updatedStructure[folderIndex];
        if (folder.snippets.some((s) => s.snippetName === snippetName)) {
          alert("Snippet with this name already exists!");
          return;
        }

        updatedStructure[folderIndex] = {
          ...folder,
          snippets: [...folder.snippets, {snippetName , contentHTML : "" , label : "" , shortcut : "" }],
        };
        setFileStructure(updatedStructure);
      };

      const deleteFolder = (folderName: string) => {
        const confirmDelete = window.confirm(
          `Are you sure you want to delete the folder "${folderName}" and all its snippets?`
        );
        if (!confirmDelete) return;

        setFileStructure((prev) => prev.filter((f) => f.foldername !== folderName));
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
                  snippets: folder.snippets.filter((s) => s.snippetName !== snippetName),
                }
              : folder
          )
        );
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
      };

      const updateFolder = (updatedFolder: Folder) => {
        setFileStructure((prev) =>
          prev.map((folder) =>
            folder.foldername === updatedFolder.foldername ? updatedFolder : folder
          )
        );
      };

      return (
        <FilestructureContext.Provider
          value={{
            fileStructure,
            setFileStructure,
            addFolder,
            addSnippet,
            deleteFolder,
            deleteSnippet,
            sortFolders,
            updateFolder,
          }}
        >
          {children}
        </FilestructureContext.Provider>
      );
    };

    export const useFilestructure = () => {
      const context = useContext(FilestructureContext);
      if (!context) {
        throw new Error("useFilestructure must be used within a FilestructureProvider");
      }
      return context;
    };
