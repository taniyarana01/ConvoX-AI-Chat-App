import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Palette } from "lucide-react";
import { motion } from "framer-motion";


const PREVIEW_MESSAGES = [
  {
    id:1,
    content:"Hey! How's it going?",
    isSent:false
  },
  {
    id:2,
    content:"I'm building something amazing 🚀",
    isSent:true
  },
];



const SettingsPage =()=>{


const {
theme,
setTheme
}=useThemeStore();



return (

<div className="
min-h-screen
pt-20
px-4
bg-gradient-to-br
from-slate-950
via-slate-900
to-indigo-950
">


<div className="
max-w-5xl
mx-auto
space-y-8
">



{/* Heading */}

<div>

<div className="
flex
items-center
gap-3
text-white
">

<Palette
className="text-cyan-400"
/>


<h1 className="
text-3xl
font-black
">

Settings

</h1>


</div>



<p className="
text-slate-400
mt-2
">

Customize your ConvoX experience

</p>


</div>







{/* Themes */}

<div className="
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-6
">


<h2 className="
text-xl
font-semibold
text-white
mb-2
">

Theme

</h2>


<p className="
text-slate-400
text-sm
mb-6
">

Choose your chat interface style

</p>




<div className="
grid
grid-cols-3
sm:grid-cols-5
md:grid-cols-8
gap-4
">


{
THEMES.map((t)=>(


<motion.button

whileHover={{
scale:1.05
}}

key={t}

onClick={()=>setTheme(t)}

className={`
rounded-xl
p-2
transition

${
theme===t

?

"bg-cyan-500/20 ring-2 ring-cyan-400"

:

"hover:bg-white/10"

}

`}


>


<div
data-theme={t}

className="
h-10
rounded-lg
overflow-hidden
grid
grid-cols-4
gap-1
p-1
bg-base-100
">


<div className="bg-primary rounded"/>

<div className="bg-secondary rounded"/>

<div className="bg-accent rounded"/>

<div className="bg-neutral rounded"/>


</div>



<p className="
text-xs
text-white
mt-2
truncate
">

{t}

</p>



</motion.button>


))

}


</div>


</div>








{/* Preview */}

<div className="
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-6
">


<h2 className="
text-xl
font-semibold
text-white
mb-5
">

Preview

</h2>




<div className="
max-w-md
mx-auto
rounded-2xl
overflow-hidden
border
border-white/10
bg-slate-900
shadow-xl
">



{/* Header */}

<div className="
p-4
border-b
border-white/10
flex
items-center
gap-3
">


<div className="
w-10
h-10
rounded-full
bg-gradient-to-r
from-cyan-500
to-indigo-600
flex
items-center
justify-center
text-white
font-bold
">

J

</div>



<div>

<h3 className="
text-white
font-medium
">

John Doe

</h3>


<p className="
text-xs
text-green-400
">

Online

</p>


</div>



</div>







{/* Messages */}

<div className="
p-4
space-y-4
min-h-[220px]
">


{
PREVIEW_MESSAGES.map(msg=>(


<div

key={msg.id}

className={`flex ${
msg.isSent
?
"justify-end"
:
"justify-start"
}`}

>


<div className={`
max-w-[80%]
rounded-2xl
px-4
py-3
text-sm

${
msg.isSent

?

"bg-gradient-to-r from-cyan-500 to-indigo-600 text-white"

:

"bg-white/10 text-white"

}

`}>

{msg.content}


<p className="
text-[10px]
mt-2
opacity-60
">

12:00 PM

</p>


</div>


</div>


))

}


</div>






{/* Input */}

<div className="
p-4
border-t
border-white/10
flex
gap-2
">


<input

readOnly

value="This is a preview"

className="
flex-1
rounded-xl
bg-white/5
border
border-white/10
px-4
text-white
outline-none
"

/>



<button className="
p-3
rounded-xl
bg-gradient-to-r
from-cyan-500
to-indigo-600
text-white
">

<Send size={18}/>

</button>



</div>




</div>



</div>





</div>


</div>

);


};


export default SettingsPage;