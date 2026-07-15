import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  LogOut,
  MessageSquare,
  Settings,
  Bell,
  User,
  Search,
  Moon
} from "lucide-react";
import { motion } from "framer-motion";


const Navbar = () => {

const {logout,authUser}=useAuthStore();


return (

<header className="
fixed
top-0
z-50
w-full
border-b
border-white/10
bg-slate-950/70
backdrop-blur-xl
">


<div className="
h-16
px-6
flex
items-center
justify-between
">


{/* Logo */}

<Link
to="/"
className="
flex
items-center
gap-3
"
>


<motion.div

whileHover={{
rotate:10,
scale:1.05
}}

className="
w-11
h-11
rounded-2xl
bg-gradient-to-r
from-cyan-500
to-indigo-600
flex
items-center
justify-center
shadow-lg
shadow-cyan-500/30
"

>

<MessageSquare
className="text-white"
/>

</motion.div>



<div>

<h1 className="
text-2xl
font-extrabold
bg-gradient-to-r
from-cyan-400
to-violet-500
bg-clip-text
text-transparent
">

ConvoX

</h1>


<p className="
text-xs
text-slate-400
hidden
md:block
">

Real-Time Chat

</p>

</div>



</Link>





{/* Search */}

<div className="
hidden
md:flex
items-center
gap-2
bg-white/5
border
border-white/10
rounded-xl
px-4
py-2
w-80
">


<Search
size={18}
className="text-slate-400"
/>


<input

placeholder="Search chats..."

className="
bg-transparent
outline-none
text-white
w-full
placeholder:text-slate-500
"

/>


</div>





{/* Right */}

<div className="
flex
items-center
gap-3
">


<button
className="
p-2
rounded-xl
hover:bg-white/10
transition
"
>

<Bell size={20}/>

</button>




<button
className="
p-2
rounded-xl
hover:bg-white/10
transition
"
>

<Moon size={20}/>

</button>





<Link

to="/settings"

className="
hidden
md:flex
p-2
rounded-xl
hover:bg-white/10
transition
"

>

<Settings size={20}/>

</Link>





{
authUser &&

<>


<Link

to="/profile"

className="
flex
items-center
gap-2
"

>


<img

src={
authUser.profilePic ||
"/avatar.png"
}

className="
w-9
h-9
rounded-full
object-cover
ring-2
ring-cyan-400
"

/>



<span className="
hidden
lg:block
text-white
text-sm
">

{authUser.fullName}

</span>


</Link>





<button

onClick={logout}

className="
p-2
rounded-xl
bg-red-500/20
hover:bg-red-500/40
transition
text-red-400
"

>

<LogOut size={20}/>

</button>


</>

}



</div>



</div>


</header>


);

};


export default Navbar;