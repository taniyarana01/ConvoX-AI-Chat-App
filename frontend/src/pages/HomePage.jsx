import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";


const HomePage = () => {

const {selectedUser}=useChatStore();


return (

<div className="
h-screen
pt-16
bg-gradient-to-br
from-slate-950
via-slate-900
to-indigo-950
overflow-hidden
">


<div className="
h-full
p-4
md:p-6
">


<div className="
h-full
w-full
rounded-3xl
overflow-hidden
border
border-white/10
bg-white/5
backdrop-blur-xl
shadow-2xl
">


<div className="
flex
h-full
">


{/* Sidebar */}

<Sidebar />



{/* Chat Area */}

{
!selectedUser

?

<NoChatSelected />

:

<ChatContainer />

}


</div>


</div>


</div>


</div>


);

};


export default HomePage;