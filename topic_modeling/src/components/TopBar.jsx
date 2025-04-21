import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

export const TopBar = ({ onToggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login_page");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
      <div className="flex items-center gap-4">
        {/* Toggle button for the sidebar */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md bg-gray-200 hover:bg-gray-300"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">DocChat</h1>
      </div>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen((open) => !open)}
          className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
        >
          <img
            src="https://ui-avatars.com/api/?name=User"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md z-20">
            <div className="px-4 py-2 text-sm font-medium text-gray-700">user@example.com</div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
