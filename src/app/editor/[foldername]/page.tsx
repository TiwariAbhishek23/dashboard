'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation' 
import Editor from "@/components/editor/editor";
import FunctionsPanel from "@/components/panels/FunctionsPanel/page";

type fileStructure = {
  foldername: string;
  snippets: {
    snippetName: string;
    contentHTML: string;
  }[];
}

function Page() {
  const params = useParams();  
  const searchParams = useSearchParams();  

  const folderNameParams = params.foldername as string;  
  const snippetNameParams = searchParams.get('snippetName'); 

  const [snippetContent, setSnippetContent] = useState<string>("");
  const [folderFound, setFolderFound] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const contentHTML = localStorage.getItem('fileStructure');
      
      if (!contentHTML) {
        throw new Error("File structure not found in localStorage");
      }

      const fileStructure: fileStructure[] = JSON.parse(contentHTML);

      const folder = fileStructure.find(folder => folder.foldername === folderNameParams);
      
      if (!folder) {
        setError(`Folder "${folderNameParams}" not found`);
        return;
      }

      const snippet = folder.snippets.find(snippet => snippet.snippetName === snippetNameParams);
      
      if (!snippet) {
        setError(`Snippet "${snippetNameParams}" not found in folder "${folderNameParams}"`);
        return;
      }

      setSnippetContent(snippet.contentHTML);
      setFolderFound(true);
      setError(null);  // Reset error if folder and snippet are found

    } catch (err) {
      setError(`An error occurred while processing the file structure: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }, [folderNameParams, snippetNameParams]);

  return (
    <div className='flex flex-row h-screen w-screen overflow-hidden gap-2'>
      {error && <div style={{ color: 'red' }}>{error}</div>}
        
      {/* Pass the snippet content to the editor */}
      {folderFound && <Editor contentHTML="Hi i am prajwal" />}
      
      <FunctionsPanel />
    </div>
  );
}

export default Page;
