import React, { useState } from "react";
import { Sidebar } from "../components/SideBar";
import { Chat } from "../components/Chat";
import { TopBar } from "../components/TopBar";


export default function App() {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // default open for all screen sizes

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
        <Chat session={activeSession} addSession={addSession} />
      </div>
    </div>
  );
}
