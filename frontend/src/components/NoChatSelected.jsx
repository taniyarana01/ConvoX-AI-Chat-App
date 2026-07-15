import { MessageSquare, Sparkles, Zap, Users } from "lucide-react";
import { motion } from "framer-motion";


const NoChatSelected = () => {

return (

<div className="
relative
flex-1
flex
items-center
justify-center
overflow-hidden
bg-gradient-to-br
from-slate-950
via-slate-900
to-indigo-950
p-6
">


{/* Glow Background */}

<div className="
absolute
-top-20
-left-20
h-80
w-80
rounded-full
bg-cyan-500/20
blur-3xl
"/>


<div className="
absolute
bottom-0
right-0
h-96
w-96
rounded-full
bg-violet-600/20
blur-3xl
"/>



{/* Floating dots */}

<motion.div

animate={{
y:[0,-20,0]
}}

transition={{
duration:4,
repeat:Infinity
}}

className="
absolute
top-32
right-32
w-4
h-4
rounded-full
bg-cyan-400
blur-sm
"

/>



<motion.div

animate={{
y:[0,20,0]
}}

transition={{
duration:5,
repeat:Infinity
}}

className="
absolute
bottom-40
left-40
w-5
h-5
rounded-full
bg-violet-400
blur-sm
"

/>





<motion.div

initial={{
opacity:0,
scale:.9
}}

animate={{
opacity:1,
scale:1
}}

transition={{
duration:.7
}}

className="
relative
z-10
max-w-2xl
text-center
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-8
shadow-2xl
"



>



{/* Logo */}

<motion.div

animate={{
rotate:[0,5,-5,0]
}}

transition={{
duration:5,
repeat:Infinity
}}

className="
mx-auto
mb-8
flex
h-24
w-24
items-center
justify-center
rounded-3xl
bg-gradient-to-r
from-cyan-500
to-indigo-600
shadow-xl
shadow-cyan-500/30
"

>

<MessageSquare
size={42}
className="text-white"
/>


</motion.div>





<h1 className="
text-4xl
md:text-5xl
font-black
text-white
">

Welcome to

</h1>



<h2 className="
mt-2
text-5xl
md:text-6xl
font-black
bg-gradient-to-r
from-cyan-400
via-blue-400
to-violet-500
bg-clip-text
text-transparent
">

ConvoX

</h2>




<p className="
mt-5
text-lg
text-slate-300
">

Real-Time Chat & Collaboration Platform

</p>




<p className="
mt-4
text-slate-400
leading-7
">

Connect with people instantly, share ideas,
exchange files and collaborate through a
modern communication experience.

</p>





<div className="
mt-8
flex
flex-wrap
justify-center
gap-4
">



<div className="
flex
items-center
gap-2
rounded-xl
border
border-cyan-400/20
bg-cyan-400/10
px-5
py-3
text-cyan-300
">

<Zap size={18}/>

Fast Messaging

</div>




<div className="
flex
items-center
gap-2
rounded-xl
border
border-violet-400/20
bg-violet-400/10
px-5
py-3
text-violet-300
">

<Sparkles size={18}/>

AI Ready

</div>




<div className="
flex
items-center
gap-2
rounded-xl
border
border-green-400/20
bg-green-400/10
px-5
py-3
text-green-300
">

<Users size={18}/>

Team Connect

</div>



</div>



</motion.div>



</div>


);

};


export default NoChatSelected;