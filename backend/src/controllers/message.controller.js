import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    console.log("Logged In User:", loggedInUserId);
    console.log(
    "Users Returned:",
    filteredUsers.map((u) => ({
    id: u._id.toString(),
    name: u.fullName,
  }))
);

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

   const messages = await Message.find({
   $or: [
    { senderId: myId, receiverId: userToChatId },
    { senderId: userToChatId, receiverId: myId },
   ],
   }).populate("replyTo");
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
     console.log("BODY:", req.body);

    const { text, image, audio,replyTo  } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    let audioUrl;
   console.log("Audio received:", !!audio);
if (audio) {
  const uploadResponse = await cloudinary.uploader.upload(audio, {
    resource_type: "video",
    });

  audioUrl = uploadResponse.secure_url;
  console.log("Cloudinary URL:", audioUrl);
   }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
      audio: audioUrl,
       replyTo,
      delivered: false,
      read: false,
    });
       
      
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {

    newMessage.delivered = true;
    await newMessage.save();

    io.to(receiverSocketId).emit("newMessage", newMessage);

}

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

   export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (String(message.senderId) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    message.isDeleted = true;
    message.text = "";
    message.image = "";
    message.audio = "";

    await message.save();

    res.status(200).json(message);
  } catch (error) {
    console.log("Delete Message Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const editMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    if (String(message.senderId) !== String(req.user._id)) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    message.text = text;
    await message.save();

    res.status(200).json(message);
  } catch (error) {
    console.log("Edit Message Error:", error.message);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const markAsRead = async (req,res)=>{

try{

const {id}=req.params;

await Message.findByIdAndUpdate(id,{
read:true,
 
});

res.json({
success:true
});

}catch(err){

res.status(500).json({ 
message:"Server Error"
});

}
};
