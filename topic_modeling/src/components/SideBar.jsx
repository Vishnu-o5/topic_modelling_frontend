import React from "react";

export const Sidebar = ({ sessions, onSelect }) => (
  <div className="p-4 overflow-y-auto h-full">
    <h2 className="text-md font-bold mb-4">My Sessions</h2>
    <ul className="space-y-2">
      {sessions.map((session, index) => (
        <li
          key={index}
          className="cursor-pointer text-blue-600 hover:underline"
          onClick={() => onSelect(session)}
        >
          {session.title}
          {session.file && (
            <button
              onClick={() => window.open(session.file, "_blank")}
              className="block text-sm text-gray-500 hover:text-gray-800"
            >
              View PDF
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);
