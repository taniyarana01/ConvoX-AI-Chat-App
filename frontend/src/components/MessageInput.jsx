import { useRef,useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Smile, Bot } from "lucide-react";
import { Mic, Square } from "lucide-react";
import EmojiPicker from "emoji-picker-react";


import toast from "react-hot-toast";


const MessageInput =()=>{

const [text,setText]=useState("");
const [imagePreview,setImagePreview]=useState(null);
const [showEmojiPicker, setShowEmojiPicker] = useState(false);
const [isRecording, setIsRecording] = useState(false);
const mediaRecorderRef = useRef(null);
const audioChunksRef = useRef([]);
const [audioPreview, setAudioPreview] = useState(null);
const [audioBlob, setAudioBlob] = useState(null);

const fileInputRef=useRef(null);
const typingTimeoutRef = useRef(null);

const {
  sendMessage,
  startTyping,
  stopTyping,
  askAI,
  isAiLoading,
  replyMessage,
  setReplyMessage,
} = useChatStore();

const handleImageChange=(e)=>{

const file=e.target.files[0];

if(!file?.type.startsWith("image/")){
toast.error("Select image only");
return;
}


const reader=new FileReader();

reader.onloadend=()=>{
setImagePreview(reader.result);
}

reader.readAsDataURL(file);

};



const removeImage=()=>{
setImagePreview(null);
fileInputRef.current.value="";
};

const handleTyping = (value) => {
  setText(value);

  startTyping();

  if (typingTimeoutRef.current) {
    clearTimeout(typingTimeoutRef.current);
  }

  typingTimeoutRef.current = setTimeout(() => {
    stopTyping();
  }, 1000);
};
const handleEmojiClick = (emojiData) => {
  setText((prev) => prev + emojiData.emoji);
  setShowEmojiPicker(false);
};

const handleSendMessage = async (e) => {
  e.preventDefault();

  if (!text.trim() && !imagePreview && !audioBlob) return;

  let audioBase64 = null;

  if (audioBlob) {
    audioBase64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = () => resolve(reader.result);
    });
  }

  await sendMessage({
    text: text.trim(),
    image: imagePreview,
    audio: audioBase64,
    replyTo: replyMessage?._id || null,
  });

  setText("");
  stopTyping();
  setImagePreview(null);
  setAudioPreview(null);
  setAudioBlob(null);
  setReplyMessage(null);
};




const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

   mediaRecorder.onstop = () => {
  console.log("Recording Stopped");

  const blob = new Blob(audioChunksRef.current, {
    type: "audio/webm",
  });

  console.log(blob);

  setAudioBlob(blob);

  const audioUrl = URL.createObjectURL(blob);
  setAudioPreview(audioUrl);
};

    mediaRecorder.start();
    setIsRecording(true);
  } catch (err) {
    console.error(err);
  }
};

const stopRecording = () => {
  console.log("Stop Clicked");

  if (mediaRecorderRef.current) {
    mediaRecorderRef.current.stop();
  }

  setIsRecording(false);
};

return(
<div className="p-4 border-t border-white/10 bg-slate-950/40 backdrop-blur-xl">
{
imagePreview &&

<div className="mb-3 relative w-fit">
<img
src={imagePreview}
className="w-24 h-24 rounded-xl object-cover"
/>

<button
onClick={removeImage}
className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
>
<X size={14}/>
</button>
</div>
}
{replyMessage && (
  <div className="mb-3 p-3 rounded-xl bg-slate-800 border-l-4 border-cyan-500">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-xs text-cyan-400 font-semibold">
          Replying to
        </p>

        <p className="text-sm text-white truncate">
          {replyMessage.text || "📷 Image / 🎤 Voice Message"}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setReplyMessage(null)}
        className="text-red-400 text-lg"
      >
        ✕
      </button>
    </div>
  </div>
)}
<form
onSubmit={handleSendMessage}
className="flex gap-3"
>

<input
type="text"
placeholder="Type your message..."
value={text}
onChange={(e) => handleTyping(e.target.value)}
className="
flex-1
rounded-2xl
bg-white/5
border
border-white/10
px-5
py-3
outline-none
text-white
placeholder:text-slate-500
focus:ring-2
focus:ring-cyan-500
"
/>

<div className="relative">

  <button
    type="button"
    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
    className="p-3 rounded-xl bg-white/5 hover:bg-cyan-500/20"
  >
    <Smile size={22} />
  </button>

  {showEmojiPicker && (
    <div className="absolute bottom-14 left-0 z-50">
      <EmojiPicker onEmojiClick={handleEmojiClick} />
    </div>
  )}

</div>

<input
type="file"
accept="image/*"
hidden
ref={fileInputRef}
onChange={handleImageChange}
/>

<button
type="button"
onClick={()=>fileInputRef.current.click()}
className="p-3 rounded-xl bg-white/5 hover:bg-cyan-500/20"
>
<Image size={22}/>
</button>

<button
  type="button"
  onClick={() => askAI(text)}
  disabled={!text.trim() || isAiLoading}
  className="p-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition"
>
  <Bot size={22} />
</button>

{isRecording ? (
  <button
    type="button"
    onClick={stopRecording}
    className="p-3 rounded-xl bg-red-600 text-white"
  >
    <Square size={22} />
  </button>
) : (
  <button
    type="button"
    onClick={startRecording}
    className="p-3 rounded-xl bg-white/5 hover:bg-cyan-500/20"
  >
    <Mic size={22} />
  </button>
)}

<button disabled={!text.trim() && !imagePreview && !audioBlob}
className="
p-3
rounded-xl
bg-gradient-to-r
from-cyan-500
to-indigo-600
text-white
hover:scale-105
transition
"
>
<Send size={22}/>
</button>



</form>

{audioPreview && (
  <div className="mt-3">
    <audio
      controls
      src={audioPreview}
      className="w-full"
    />
  </div>
)}

</div>
);
};

export default MessageInput;