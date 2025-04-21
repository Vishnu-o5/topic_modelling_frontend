import React, { useEffect,useState } from "react";
import { Sidebar } from "../components/SideBar";
import { Chat } from "../components/Chat";
import { TopBar } from "../components/TopBar";


export default function App() {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // default open for all screen sizes

  // const addSession = (session) => {
  //   setSessions((prev) => [...prev, session]);
  //   setActiveSession(session);
  // };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://localhost:8080/files/listFileName", {
          credentials: "include",
        });

        if (response.ok) {
          const files = await response.json();
          console.log(files);
          const sessionList = files.map((fileObj) => ({
            title: fileObj.filename,
            file: `http://localhost:8080/api/files/${fileObj.filename}`,
          }));
          setSessions(sessionList);
        } else {
          console.error("Failed to fetch file list");
        }
      } catch (error) {
        console.error("Error fetching file list:", error);
      }
    };

    fetchFiles();
  }, []);

  const addSession = (session) => {
    setSessions((prev) => [...prev, session]);
    setActiveSession(session);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans bg-gray-100">
      {/* Sidebar with dynamic width */}
      <div
        className={`transition-all duration-300 ease-in-out 
          ${sidebarOpen ? "w-64" : "w-0"} 
          bg-white border-r h-full shadow-lg overflow-hidden`}
      >
        {sidebarOpen && (
          <Sidebar sessions={sessions} onSelect={setActiveSession} />
        )}
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <TopBar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <div className="flex-1 overflow-auto p-4">
          <Chat session={activeSession} addSession={addSession} />
          {/* {activeSession?.file && (
            <iframe
              src={activeSession.file}
              title={activeSession.title}
              className="w-full h-[600px] mt-4 border rounded-lg"
            />
          )} */}
        </div>
      </div>
    </div>
  );
}
