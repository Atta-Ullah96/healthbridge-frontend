import { useEffect, useState } from "react";

function DoctorMessages() {
  // 🩺 Dummy Conversations
  const mockConversations = [
    {
      id: "c1",
      patientName: "Ali Raza",
      lastMessage: "Thank you doctor",
      unread: 0,
      messages: [
        { from: "patient", text: "I have a fever and sore throat.", at: new Date() },
        { from: "doctor", text: "Take rest and stay hydrated.", at: new Date() },
        { from: "patient", text: "Thank you doctor", at: new Date() },
      ],
    },
    {
      id: "c2",
      patientName: "Sara Malik",
      lastMessage: "Can we reschedule?",
      unread: 1,
      messages: [
        { from: "patient", text: "Can we reschedule?", at: new Date() },
      ],
    },
    {
      id: "c3",
      patientName: "Ahmed Khan",
      lastMessage: "I feel better now.",
      unread: 0,
      messages: [
        { from: "patient", text: "I had a headache.", at: new Date() },
        { from: "doctor", text: "Did you take the prescribed medicine?", at: new Date() },
        { from: "patient", text: "Yes, I feel better now.", at: new Date() },
      ],
    },
  ];

  const [conversations, setConversations] = useState(mockConversations);
  const [activeConv, setActiveConv] = useState(mockConversations[0].id);
  const [text, setText] = useState("");

  // Send new message
  const send = () => {
    if (!text.trim()) return;

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConv
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                { from: "doctor", text: text.trim(), at: new Date() },
              ],
              lastMessage: text.trim(),
            }
          : conv
      )
    );
    setText("");
  };

  const active = conversations.find((c) => c.id === activeConv) || {};

  return (
    <div className="flex gap-4">
      {/* Sidebar Conversations */}
      <div className="w-1/3 bg-[#FBFDFF] rounded-xl p-3">
        <h3 className="font-semibold mb-3">Conversations</h3>
        <div className="space-y-2">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveConv(c.id)}
              className={`w-full text-left p-2 rounded transition ${
                activeConv === c.id
                  ? "bg-white border border-[#3A59D1]"
                  : "hover:bg-white"
              }`}
            >
              <div className="font-medium flex justify-between">
                <span>{c.patientName}</span>
                {c.unread > 0 && (
                  <span className="text-xs bg-[#3A59D1] text-white px-2 py-[2px] rounded-full">
                    {c.unread}
                  </span>
                )}
              </div>
              <div className="text-xs text-[#6B7280] truncate">
                {c.lastMessage}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-[#FBFDFF] rounded-xl p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-3 p-2">
          {active.messages?.map((m, i) => (
            <div
              key={i}
              className={`max-w-[70%] p-3 rounded-lg ${
                m.from === "doctor"
                  ? "ml-auto bg-[#EEF2FF] text-right"
                  : "bg-white text-left"
              }`}
            >
              <div className="text-sm">{m.text}</div>
              <div className="text-xs text-[#6B7280] mt-1">
                {new Date(m.at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="mt-3 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A59D1]"
          />
          <button
            onClick={send}
            className="px-4 py-2 bg-[#3A59D1] text-white rounded-lg hover:bg-[#324bbd] transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorMessages;
