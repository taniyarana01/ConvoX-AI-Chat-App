import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  replyMessage: null,
  searchQuery: "",

  aiResponse: "",
  translations: {},
  isAiLoading: false,
  chatSummary: "",

  isUsersLoading: false,
  isMessagesLoading: false,
  
  isTyping: false,
  typingUser: null,

  

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
    
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      const audio = new Audio("/sounds/notification.mp3");
      audio.play().catch(() => {});

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

    unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  deleteMessage: async (messageId) => {
  try {
    await axiosInstance.delete(`/messages/${messageId}`);

    set({
      messages: get().messages.map((msg) =>
        msg._id === messageId
          ? {
              ...msg,
              isDeleted: true,
              text: "",
              image: "",
              audio: "",
            }
          : msg
      ),
    });

    toast.success("Message deleted");
  } catch (error) {
    toast.error(error.response?.data?.message || "Delete failed");
  }
},
editMessage: async (messageId, text) => {
  try {
    const res = await axiosInstance.put(
      `/messages/edit/${messageId}`,
      { text }
    );

    set({
      messages: get().messages.map((msg) =>
        msg._id === messageId ? res.data : msg
      ),
    });

    toast.success("Message updated");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to edit"
    );
  }
},
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setSearchQuery: (searchQuery) =>
  set({
    searchQuery,
  }),
  
  setReplyMessage: (replyMessage) =>
  set({
    replyMessage,
  }),

  askAI: async (prompt) => {
  set({ isAiLoading: true });

  try {
    const res = await axiosInstance.post("/ai/ask", {
      prompt,
    });

    set({
    aiResponse: {
    _id: Date.now(),
    senderId: "AI",
    text: res.data.reply,
    createdAt: new Date(),
  },
 });
  } catch (error) {
    console.error("❌ AI Error:", error.response || error);

    toast.error(
      error.response?.data?.message || "AI Error"
    );
  } finally {
    set({
      isAiLoading: false,
    });
  }
},
summarizeChat: async () => {
  set({ isAiLoading: true });

  try {
    const { messages } = get();

    const formattedMessages = messages.map((msg) => ({
      sender:
        msg.senderId === useAuthStore.getState().authUser._id
          ? "Me"
          : "User",
      text: msg.text || "",
    }));

    const res = await axiosInstance.post("/ai/summary", {
      messages: formattedMessages,
    });

    set({
      chatSummary: res.data.summary,
    });

    toast.success("Summary Generated");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Summary Failed"
    );
  } finally {
    set({
      isAiLoading: false,
    });
  }
},
translateMessage: async (id, text) => {
  try {
    const res = await axiosInstance.post("/ai/translate", {
      text,
    });

    set((state) => ({
      translations: {
        ...state.translations,
        [id]: res.data.translation,
      },
    }));
  } catch (error) {
    toast.error("Translation Failed");
  }
},
  startTyping: () => {
    const { socket, authUser } = useAuthStore.getState();
    const { selectedUser } = get();

    if (!socket || !selectedUser) return;

    socket.emit("typing", {
      receiverId: selectedUser._id,
      senderName: authUser.fullName,
    });
  },

  stopTyping: () => {
    const { socket } = useAuthStore.getState();
    const { selectedUser } = get();

    if (!socket || !selectedUser) return;

    socket.emit("stopTyping", {
      receiverId: selectedUser._id,
    });
  },

  listenTyping: () => {
    const socket = useAuthStore.getState().socket;

    if (!socket) return;

    socket.off("userTyping");
    socket.off("userStopTyping");

    socket.on("userTyping", ({ senderId, senderName }) => {
  const { selectedUser } = get();

  if (!selectedUser) return;

  if (String(senderId) !== String(selectedUser._id)) return;

  set({
    isTyping: true,
    typingUser: senderName,
  });
});

socket.on("userStopTyping", ({ senderId }) => {
  const { selectedUser } = get();

  if (!selectedUser) return;

  if (String(senderId) !== String(selectedUser._id)) return;

  set({
    isTyping: false,
    typingUser: null,
  });
});
  },
}));