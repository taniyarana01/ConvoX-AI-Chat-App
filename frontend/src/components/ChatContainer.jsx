import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { Trash2 } from "lucide-react";
import { Reply } from "lucide-react";
import { Pencil } from "lucide-react";


const ChatContainer = () => {

const {
  messages,
  aiResponse,
  chatSummary,
  summarizeChat,
  getMessages,
  isMessagesLoading,
  selectedUser,
  subscribeToMessages,
  unsubscribeFromMessages,
  listenTyping,
  isTyping,
  typingUser,
  deleteMessage,
  setReplyMessage,
  searchQuery,
  setSearchQuery,
  editMessage,
  translations,
  translateMessage,
} = useChatStore();

const {authUser}=useAuthStore();


const messageEndRef=useRef(null);


useEffect(()=>{

getMessages(selectedUser._id);

subscribeToMessages();
listenTyping();

return () => {
  unsubscribeFromMessages();
};

},[
selectedUser._id,
getMessages,
subscribeToMessages,
unsubscribeFromMessages
]);

useEffect(()=>{
messageEndRef.current?.scrollIntoView({
behavior:"smooth"
});
},[messages]);

if(isMessagesLoading){

return(
<div className="flex-1 flex flex-col bg-slate-950">
<ChatHeader/>
<MessageSkeleton/>
<MessageInput/>
</div>

)
}
return (
<div className="
flex-1
flex
flex-col
overflow-hidden
bg-gradient-to-br
from-slate-950
via-slate-900
to-indigo-950
">
<ChatHeader/>
<div className="p-3 border-b border-white/10">
  <input
    type="text"
    placeholder="Search messages..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full rounded-xl bg-white/10 px-4 py-2 text-white outline-none"
  />
</div>

<div className="px-4 pt-3">
  <button
    onClick={summarizeChat}
    className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white"
  >
    ✨ Summarize Chat
  </button>
</div>

<div className="
flex-1
overflow-y-auto
p-5
space-y-5
scrollbar-thin
">

{chatSummary && (
  <div className="mx-4 mt-3 mb-4 p-4 rounded-xl bg-violet-500/20 border border-violet-500 text-white">
    <h3 className="font-bold mb-2">
      🤖 AI Chat Summary
    </h3>

    <p>{chatSummary}</p>
  </div>
)}
{
messages.length===0 &&
<div className="
h-full
flex
items-center
justify-center
text-slate-400
">

Start conversation with {selectedUser.fullName} 💬

</div>
}
{
messages
  .filter((message) =>
    message.text
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
  )
  .map((message) => (
<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

key={message._id}

className={`flex gap-3 ${
message.senderId===authUser._id
?"justify-end"
:"justify-start"
}`}

ref={messageEndRef}
>
{
message.senderId!==authUser._id &&

<img
src={
selectedUser.profilePic ||
"/avatar.png"
}

className="
w-10
h-10
rounded-full
object-cover
ring-2
ring-cyan-400
"
/>

}

<div className="max-w-xs sm:max-w-md relative group">
<div
className={`
px-4
py-3
rounded-2xl
shadow-lg

${
message.senderId===authUser._id

?

"bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-br-sm"

:

"bg-white/10 backdrop-blur-xl text-white border border-white/10 rounded-bl-sm"

}
`}
>
{!message.isDeleted && (
  <button
    onClick={() => setReplyMessage(message)}
    className="mb-2 flex items-center gap-1 text-xs text-cyan-300 hover:text-cyan-400"
  >
    <Reply size={14} />
    Reply
  </button>
)}

{message.isDeleted ? (
  <p className="italic text-gray-400">
    This message was deleted
  </p>
) : (
  <>
  {message.replyTo && (
  <div className="mb-2 border-l-4 border-cyan-500 pl-2 text-xs text-slate-300">
    <p className="font-semibold">
      Reply
    </p>

    <p>
      {message.replyTo.text || "📷 Image / 🎤 Voice Message"}
    </p>
  </div>
)}
{message.text && (
  <p>{message.text}</p>
)}
{message.text && (
  <button
    onClick={() =>
      translateMessage(message._id, message.text)
    }
    className="mt-2 block text-xs text-cyan-300 hover:text-cyan-400"
  >
    🌍 Translate
  </button>
)}
{translations[message._id] && (
  <div className="mt-2 rounded-lg bg-white/10 p-2 text-sm italic">
    🌍 {translations[message._id]}
  </div>
)}
{message.image && (
  <img
    src={message.image}
    className="rounded-xl mb-2 max-w-[250px]"
  />
)}

{message.audio && (
  <audio
    controls
    src={message.audio}
    className="w-full mt-2 rounded-lg"
  />
)}
 </>
)}

</div>
<div className="flex items-center gap-1 mt-1 px-2">

  <p className="text-xs text-slate-500">
    {formatMessageTime(message.createdAt)}
  </p>

  {message.senderId === authUser._id && (
    <span
    className={`text-xs ${
    message.read
      ? "text-blue-500"
      : "text-gray-400"
     }`}
     >
      {message.read
        ? "✔✔"
        : message.delivered
        ? "✔✔"
        : "✔"}
    </span>
  )}

</div>
{message.senderId === authUser._id && !message.isDeleted && (
  <button
    onClick={() => deleteMessage(message._id)}
    className="absolute -top-2 -right-2 hidden group-hover:flex bg-red-600 text-white p-1 rounded-full"
  >
    <button
  onClick={() => {
    const newText = prompt("Edit message", message.text);

    if (
      newText !== null &&
      newText.trim() !== ""
    ) {
      editMessage(message._id, newText);
    }
  }}
  className="text-blue-400 hover:text-blue-600 mr-2"
>
  <Pencil size={15} />
</button>

    <Trash2 size={14} />
  </button>
)}
</div>
{
message.senderId===authUser._id &&

<img
src={
authUser.profilePic ||
"/avatar.png"
}

className="
w-10
h-10
rounded-full
object-cover
ring-2
ring-indigo-400
"
/>
}
</motion.div>
))
}
{aiResponse && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex gap-3 justify-start"
  >
    <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white">
      🤖
    </div>

    <div className="max-w-xs sm:max-w-md">
      <div className="bg-violet-600/20 border border-violet-500 rounded-2xl px-4 py-3 text-white">
        {aiResponse.text}
      </div>
      <p className="text-xs text-slate-500 mt-1">
        AI Assistant
      </p>
       <p className="text-xs text-slate-500 mt-1 px-2">
        {formatMessageTime(aiResponse.createdAt)}
      </p>
    </div>
  </motion.div>
)}



</div>
{isTyping && (
  <div className="flex items-center px-4 py-2">
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl px-4 py-2">
      <p className="text-sm text-slate-300 animate-pulse">
        {typingUser} is typing...
      </p>
    </div>
  </div>
)}
<MessageInput/>
</div>
);
};

export default ChatContainer;