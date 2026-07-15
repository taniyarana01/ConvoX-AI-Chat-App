import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Search, Users } from "lucide-react";
import { motion } from "framer-motion";


const Sidebar = () => {

const {
getUsers,
users,
selectedUser,
setSelectedUser,
isUsersLoading
}=useChatStore();


const {onlineUsers}=useAuthStore();


const [showOnlineOnly,setShowOnlineOnly]=useState(false);
const [search,setSearch]=useState("");


useEffect(()=>{

getUsers();

},[getUsers]);

const filteredUsers = users
.filter(user =>
showOnlineOnly
? onlineUsers.includes(user._id)
:true
)
.filter(user =>
user.fullName
.toLowerCase()
.includes(search.toLowerCase())
);



if(isUsersLoading)
return <SidebarSkeleton/>;

return (

<aside className="
w-20
lg:w-80
h-full
border-r
border-white/10
bg-slate-950/60
backdrop-blur-xl
flex
flex-col
">

{/* Header */}
<div className="
p-5
border-b
border-white/10
">
<div className="flex items-center gap-3">

<Users className="text-cyan-400"/>

<h2 className="
hidden
lg:block
text-white
font-semibold
text-lg
">

Contacts

</h2>

</div>



{/* Search */}

<div className="
hidden
lg:flex
mt-5
items-center
bg-white/5
border
border-white/10
rounded-xl
px-3
">


<Search size={18}
className="text-slate-400"
/>


<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search users..."

className="
bg-transparent
outline-none
px-3
py-2
w-full
text-white
placeholder:text-slate-500
"

/>


</div>




<div className="
hidden
lg:flex
items-center
gap-2
mt-4
text-sm
text-slate-400
">


<input

type="checkbox"

checked={showOnlineOnly}

onChange={(e)=>setShowOnlineOnly(e.target.checked)}
className="accent-cyan-500"
/>
Online only ({onlineUsers.length-1})
</div>

</div>

{/* Users */}

<div className="
overflow-y-auto
flex-1
py-3
">
 {filteredUsers.map((user) => {
  const online = onlineUsers.some(
    (id) => String(id) === String(user._id)
  );

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      key={user._id}
      onClick={() => setSelectedUser(user)}
      className={`
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        transition
        ${
          selectedUser?._id === user._id
            ? "bg-cyan-500/20 border-r-4 border-cyan-400"
            : "hover:bg-white/5"
        }
      `}
    >
      <div className="relative">
        <img
          src={user.profilePic || "/avatar.png"}
          alt={user.fullName}
          className="w-12 h-12 rounded-full object-cover"
        />

        {online && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-slate-900" />
        )}
      </div>

      <div className="hidden lg:block text-left flex-1">
        <h3 className="text-white font-medium truncate">
          {user.fullName}
        </h3>

        <p className={`text-xs ${online ? "text-green-400" : "text-slate-400"}`}>
          {online ? "Online" : "Offline"}
        </p>
      </div>
    </motion.button>
  );
})}

{
filteredUsers.length===0 &&

<p className="
text-center
text-slate-500
mt-5
">
No users found
</p>
}
</div>
</aside>
);
};
export default Sidebar;