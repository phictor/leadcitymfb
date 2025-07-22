import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome! How can we help you today?",
      sender: "agent",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = {
        id: messages.length + 2,
        text: "Thank you for your message. An agent will be with you shortly.",
        sender: "agent",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Live Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col">
            <div className="bg-brand-green text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                <span className="font-semibold">Live Chat</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block max-w-xs p-2 rounded-lg text-sm ${
                      message.sender === "user"
                        ? "bg-brand-green text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 rounded-r-none"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-brand-green hover:bg-dark-green rounded-l-none"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Chat Toggle Button */}
      <div className="fixed bottom-20 left-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-brand-green hover:bg-dark-green text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
          aria-label="Toggle live chat"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
