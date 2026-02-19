import { useState } from 'react';
import { Search, Send, User, Paperclip, MoreVertical } from 'lucide-react';

// Sample conversations data
const conversationsData = [
  {
    id: 1,
    doctor: "Dr. Michael Chen",
    specialty: "Cardiologist",
    lastMessage: "Your test results look good. Continue with the current medication.",
    timestamp: "10:30 AM",
    unread: 2,
    online: true
  },
  {
    id: 2,
    doctor: "Dr. Sarah Williams",
    specialty: "Dermatologist",
    lastMessage: "Please apply the cream twice daily as prescribed.",
    timestamp: "Yesterday",
    unread: 0,
    online: false
  },
  {
    id: 3,
    doctor: "Dr. Emily Roberts",
    specialty: "General Physician",
    lastMessage: "You're welcome! Let me know if you have any concerns.",
    timestamp: "Jan 4",
    unread: 0,
    online: true
  },
  {
    id: 4,
    doctor: "Dr. James Wilson",
    specialty: "Orthopedic",
    lastMessage: "The X-ray shows improvement. Keep doing the exercises.",
    timestamp: "Jan 2",
    unread: 0,
    online: false
  }
];

// Sample messages for selected conversation
const messagesData = {
  1: [
    {
      id: 1,
      sender: "doctor",
      text: "Hello! I've reviewed your latest ECG results.",
      timestamp: "10:15 AM"
    },
    {
      id: 2,
      sender: "patient",
      text: "Hi Doctor! How do they look?",
      timestamp: "10:20 AM"
    },
    {
      id: 3,
      sender: "doctor",
      text: "Your test results look good. Continue with the current medication.",
      timestamp: "10:30 AM"
    },
    {
      id: 4,
      sender: "patient",
      text: "That's great to hear! Thank you doctor.",
      timestamp: "10:32 AM"
    }
  ],
  2: [
    {
      id: 1,
      sender: "doctor",
      text: "Hi! I'm sending your prescription for the skin condition we discussed.",
      timestamp: "2:00 PM"
    },
    {
      id: 2,
      sender: "patient",
      text: "Thank you! How often should I apply it?",
      timestamp: "2:05 PM"
    },
    {
      id: 3,
      sender: "doctor",
      text: "Please apply the cream twice daily as prescribed.",
      timestamp: "2:10 PM"
    }
  ],
  3: [
    {
      id: 1,
      sender: "patient",
      text: "Hi Dr. Roberts, I wanted to ask about the medication schedule.",
      timestamp: "11:00 AM"
    },
    {
      id: 2,
      sender: "doctor",
      text: "Of course! What would you like to know?",
      timestamp: "11:15 AM"
    },
    {
      id: 3,
      sender: "patient",
      text: "Should I take it before or after meals?",
      timestamp: "11:20 AM"
    },
    {
      id: 4,
      sender: "doctor",
      text: "Take it after meals, preferably with water.",
      timestamp: "11:25 AM"
    },
    {
      id: 5,
      sender: "patient",
      text: "Perfect, thank you!",
      timestamp: "11:30 AM"
    },
    {
      id: 6,
      sender: "doctor",
      text: "You're welcome! Let me know if you have any concerns.",
      timestamp: "11:35 AM"
    }
  ]
};

function Messages() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');

  const filteredConversations = conversationsData.filter(conv =>
    conv.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = messagesData[selectedChat] || [];
  const currentDoctor = conversationsData.find(c => c.id === selectedChat);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      alert(`Message sent: ${messageText}`);
      // In real app: send message to backend
      setMessageText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ height: '600px' }}>
      <div className="grid grid-cols-12 h-full">
        {/* Conversations List */}
        <div className="col-span-12 md:col-span-4 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Messages</h2>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition text-left ${
                  selectedChat === conv.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <User size={24} className="text-blue-600" />
                    </div>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">
                        {conv.doctor}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2">{conv.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{conv.specialty}</p>
                    <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="bg-blue-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-12 md:col-span-8 flex flex-col">
          {/* Chat Header */}
          {currentDoctor && (
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User size={20} className="text-blue-600" />
                  </div>
                  {currentDoctor.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{currentDoctor.doctor}</h3>
                  <p className="text-xs text-gray-500">
                    {currentDoctor.online ? 'Online' : 'Offline'} • {currentDoctor.specialty}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md ${msg.sender === 'patient' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      msg.sender === 'patient'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 ${msg.sender === 'patient' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-end gap-2">
              <button className="text-gray-400 hover:text-gray-600 p-2">
                <Paperclip size={20} />
              </button>
              <div className="flex-1">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ maxHeight: '100px' }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PatientMessages() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Connect with your healthcare providers</p>
        </div>
        <Messages />
      </div>
    </div>
  );
}