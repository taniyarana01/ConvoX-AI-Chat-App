import { X, Phone, Video, MoreVertical } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { motion } from "framer-motion";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="border-b border-white/10 bg-slate-950/40 backdrop-blur-xl p-4">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="relative">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-400"
            />

            {isOnline && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-slate-900"/>
            )}
          </div>


          <div>
            <h3 className="font-semibold text-white text-lg">
              {selectedUser.fullName}
            </h3>

            <p className="text-sm text-slate-400">
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>

        </div>


        <div className="flex items-center gap-2">

          <button className="p-2 rounded-xl hover:bg-white/10 transition">
            <Phone size={19}/>
          </button>

          <button className="p-2 rounded-xl hover:bg-white/10 transition">
            <Video size={19}/>
          </button>


          <button className="p-2 rounded-xl hover:bg-white/10 transition">
            <MoreVertical size={20}/>
          </button>


          <button
            onClick={()=>setSelectedUser(null)}
            className="p-2 rounded-xl hover:bg-red-500/20 transition"
          >
            <X size={20}/>
          </button>

        </div>

      </div>

    </div>
  );
};

export default ChatHeader;