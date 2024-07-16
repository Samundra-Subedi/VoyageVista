import React, { useState } from 'react';
import { FaCommentDots, FaTimes, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const ChatWithAI = ({ travelDestinations }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      const userMessage = input;
      setInput('');

      // Extract necessary information from travelDestinations
      const places = travelDestinations.map(({ name, location, description }) => ({
        name,
        location,
        description
      }));

      setLoading(true);

      try {
        // Send the user input and travelDestinations to the backend API
        const response = await axios.post('http://localhost:3000/suggestions', {
          places,
          question: userMessage
        });

        // Assume the response contains the suggestions in the desired format
        const aiMessage = response.data;

        // Update the messages with the AI response
        setMessages(prev => [...prev, { text: aiMessage.suggestions, sender: 'ai' }]);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setMessages(prev => [...prev, { text: 'Error fetching suggestions. Please try again later.', sender: 'ai' }]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <button
        className="fixed bottom-6 right-6 bg-gradient-to-r bg-black text-white p-4 rounded-full shadow-lg hover:bg-black focus:outline-none transition-all duration-300 transform hover:scale-110"
        onClick={toggleChat}
      >
        <FaCommentDots size={28} />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 bg-white rounded-md shadow-2xl w-[22rem] h-[32rem] flex flex-col overflow-hidden transition-all duration-300 animate-slideUp">
          <div className="flex justify-between items-center p-4 bg-gradient-to-r bg-black text-white">
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
                    msg.sender === 'user' ? 'bg-[#FCBF66] text-white' : 'bg-gray-200 text-gray-800'
                  }`}>
                    {msg.text}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-8">Plan your trip by starting conversation...</p>
            )}
            {loading && (
              <div className="flex justify-center my-4">
                <div className="loader"></div>
              </div>
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
                className="text-gray-400 p-2 rounded-md focus:outline-none transition-colors ml-2"
              >
                <FaPaperPlane size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .loader {
          border: 4px solid #f3f3f3; /* Light grey */
          border-top: 4px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ChatWithAI;
