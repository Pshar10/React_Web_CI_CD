import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 p-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-20 left-6 z-40 w-[90vw] max-w-md h-[600px] rounded-2xl shadow-2xl border backdrop-blur-lg transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
        style={{
          background: "rgba(255, 255, 255, 0.85)",
        }}
      >
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/7YlTJkmFqtDRBNMfN365x"
          title="Chatbase Chatbot"
          width="100%"
          height="100%"
          style={{ border: "none", borderRadius: "16px" }}
        />
      </div>
    </>
  );
};

export default Chatbot;
