import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";


const ProfilePage = () => {

const {
authUser,
isUpdatingProfile,
updateProfile
}=useAuthStore();


const [selectedImg,setSelectedImg]=useState(null);



const handleImageUpload=async(e)=>{

const file=e.target.files[0];

if(!file) return;


const reader=new FileReader();


reader.readAsDataURL(file);


reader.onload=async()=>{

const image=reader.result;

setSelectedImg(image);

await updateProfile({
profilePic:image
});

};


};



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


<motion.div

initial={{opacity:0,y:30}}

animate={{opacity:1,y:0}}

className="
max-w-2xl
mx-auto
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-8
shadow-2xl
"


>


<div className="text-center mb-8">

<h1 className="
text-3xl
font-black
text-white
">

Profile

</h1>


<p className="text-slate-400 mt-2">
Manage your ConvoX account
</p>


</div>





{/* Avatar */}

<div className="
flex
flex-col
items-center
gap-4
">


<div className="relative">


<motion.img

whileHover={{scale:1.05}}

src={
selectedImg ||
authUser.profilePic ||
"/avatar.png"
}

className="
w-36
h-36
rounded-full
object-cover
ring-4
ring-cyan-400
"

/>



<label

htmlFor="avatar-upload"

className="
absolute
bottom-2
right-2
p-3
rounded-full
bg-gradient-to-r
from-cyan-500
to-indigo-600
cursor-pointer
hover:scale-110
transition
"

>


<Camera
size={20}
className="text-white"
/>



<input

id="avatar-upload"

type="file"

accept="image/*"

hidden

disabled={isUpdatingProfile}

onChange={handleImageUpload}

/>


</label>


</div>



<p className="text-sm text-slate-400">

{
isUpdatingProfile
?
"Uploading..."
:
"Update your profile picture"

}

</p>


</div>





<div className="
mt-8
space-y-5
">



<div className="
rounded-2xl
bg-white/5
border
border-white/10
p-4
">

<div className="
flex
items-center
gap-2
text-slate-400
text-sm
">

<User size={16}/>

Full Name

</div>


<p className="
mt-2
text-white
font-medium
">

{authUser?.fullName}

</p>


</div>





<div className="
rounded-2xl
bg-white/5
border
border-white/10
p-4
">


<div className="
flex
items-center
gap-2
text-slate-400
text-sm
">

<Mail size={16}/>

Email

</div>


<p className="
mt-2
text-white
font-medium
">

{authUser?.email}

</p>


</div>



</div>





<div className="
mt-8
rounded-2xl
border
border-white/10
bg-white/5
p-5
">


<h2 className="
text-white
font-semibold
mb-4
">

Account Information

</h2>



<div className="
flex
justify-between
py-3
border-b
border-white/10
text-sm
">


<span className="text-slate-400 flex gap-2 items-center">

<Calendar size={16}/>

Member Since

</span>


<span className="text-white">

{authUser.createdAt?.split("T")[0]}

</span>


</div>




<div className="
flex
justify-between
py-3
text-sm
">


<span className="text-slate-400 flex gap-2 items-center">

<ShieldCheck size={16}/>

Status

</span>


<span className="text-green-400">

Active

</span>


</div>



</div>



</motion.div>


</div>

);

};


export default ProfilePage;