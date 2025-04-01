import Editor from "@/components/editor/editor";
import FolderPanel from "@/components/panels/FolderPanel/page";
import FunctionsPanel from "@/components/panels/FunctionsPanel/page";

const Dashboard = () => {
    return (
        <div>
            <FolderPanel />
            <Editor />
            <FunctionsPanel />
        </div>
    );
};

export default Dashboard;

