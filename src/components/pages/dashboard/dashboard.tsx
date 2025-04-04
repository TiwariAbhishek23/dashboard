import Editor from "@/components/editor/editor";
import FolderPanel from "@/components/panels/FolderPanel/page";
import FunctionsPanel from "@/components/panels/FunctionsPanel/page";

const Dashboard = () => {
    return (
        <div className= "flex flex-row h-screen w-screen overflow-hidden gap-2">
            <FolderPanel />
            <Editor />
            <FunctionsPanel />
        </div>
    );
};

export default Dashboard;

