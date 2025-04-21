import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { PDFViewer } from "@react-pdf-viewer/core"; // Install this library for PDF viewing

export const Chat = ({ session, addSession }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    if (session?.messages) {
      setMessages(session.messages);
    }
  }, [session]);

  const handleSubmit = async () => {
    if (!input && !file) return;
    const newMessage = { type: "user", content: input || file.name };
    const updated = [...messages, newMessage];

    const reply = {
      type: "system",
      content: `Here are some links for your input: ${input || file.name}`,
    };

    const updatedSession = {
      title: session?.title || input || file.name,
      messages: [...updated, reply],
      file: file ? URL.createObjectURL(file) : null, // Store file URL for preview
    };

    setMessages(updatedSession.messages);
    addSession(updatedSession);

    setInput("");
    setFile(null);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto flex flex-col relative">
      <div className="flex-1 space-y-4 mb-6">
        {(messages || []).map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-lg p-4 rounded-xl shadow-sm text-sm ${
              msg.type === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 border-t pt-4 pb-6 px-4 bg-white">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter DOI or message"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          Send
        </button>
      </div>
      {uploadSuccess && (
        <div className="absolute bottom-24 right-6 bg-white p-4 rounded-lg shadow-lg border flex items-center space-x-3">
          <CheckCircle className="text-green-500" />
          <span className="text-sm font-medium">File uploaded successfully</span>
        </div>
      )}
    </div>
  );
};
