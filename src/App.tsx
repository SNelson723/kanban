import SideBar from "./components/SideBar";
import TitleBar from "./components/Titlebar";
import Content from "./components/Content";

const App = () => {

  return (
    <div className="w-screen h-screen bg-slate-600 text-white">
      <TitleBar />
      <div className="flex">
        <SideBar />
        <Content />
      </div>
    </div>
  );
};

export default App
