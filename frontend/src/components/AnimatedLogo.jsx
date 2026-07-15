import { motion } from "framer-motion";
import { MessageCircleMore } from "lucide-react";

const AnimatedLogo = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center"
    >
      <motion.div
        animate={{
          rotate: [0, -8, 8, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="w-20 h-20 rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 flex items-center justify-center shadow-2xl"
      >
        <MessageCircleMore className="w-10 h-10 text-white" />
      </motion.div>

      <h1 className="mt-6 text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
       ConvoX
      </h1>

      <p className="mt-2 text-slate-400 text-center max-w-xs">
        Real-Time Chat & Collaboration Platform
      </p>
    </motion.div>
  );
};

export default AnimatedLogo;