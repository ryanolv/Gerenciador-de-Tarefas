import Sidebar from "./components/SideBar";
import Tasks from "./components/Tasks";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
    </div>
  );
}

export default App;
