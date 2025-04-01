import Editor from "@/components/editor/editor";
import FolderPanel from "@/components/panels/FolderPanel/page";
import FunctionsPanel from "@/components/panels/FunctionsPanel/page";

const Dashboard = () => {
    return (
        <div className= "flex flex-col h-screen w-screen">
            <FolderPanel />
            <Editor />
            <FunctionsPanel />
        </div>
    );
};

export default Dashboard;

