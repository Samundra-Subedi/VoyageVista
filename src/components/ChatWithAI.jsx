import React, { useState } from 'react';
import { FaCommentDots, FaTimes, FaPaperPlane } from 'react-icons/fa';

const ChatWithAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "This is a simulated AI response.", sender: 'ai' }]);
      }, 1000);
    }
  };

  return (
    <div>
      <button
        className="fixed bottom-6 right-6 bg-gradient-to-r bg-[#f5bb64] text-white p-4 rounded-full shadow-lg hover:bg-[#fcb166] focus:outline-none transition-all duration-300 transform hover:scale-110"
        onClick={toggleChat}
      >
        <FaCommentDots size={28} />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 bg-white rounded-md shadow-2xl w-[22rem] h-[32rem] flex flex-col overflow-hidden transition-all duration-300 animate-slideUp">
          <div className="flex justify-between items-center p-4 bg-gradient-to-r bg-[#FCBF66] text-white">
            <h2 className="text-xl font-semibold">Chat with AI</h2>
            <button onClick={toggleChat} className="text-white hover:text-gray-200 transition-colors">
              <FaTimes size={24} />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <span className={`inline-block p-3 rounded-lg max-w-[70%] ${
                    msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}>
                    {msg.text}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-8">Start your conversation...</p>
            )}
          </div>
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className=" text-gray-400 p-2 rounded-md  focus:outline-none transition-colors ml-2"
              >
                <FaPaperPlane size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWithAI;