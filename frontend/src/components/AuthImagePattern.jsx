import {
  MessageSquare,
  Shield,
  Users,
  Sparkles,
} from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black p-12">

      <div className="max-w-lg">

        <div className="grid grid-cols-2 gap-6">

          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-6 hover:scale-105 transition">

            <MessageSquare className="w-10 h-10 text-cyan-400 mb-4"/>

            <h3 className="text-white text-lg font-bold">
              Instant Messaging
            </h3>

            <p className="text-slate-400 mt-2">
              Real-time conversations with Socket.IO.
            </p>

          </div>

          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-6 hover:scale-105 transition">

            <Users className="w-10 h-10 text-purple-400 mb-4"/>

            <h3 className="text-white text-lg font-bold">
              Team Collaboration
            </h3>

            <p className="text-slate-400 mt-2">
              Create groups and collaborate seamlessly.
            </p>

          </div>

          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-6 hover:scale-105 transition">

            <Shield className="w-10 h-10 text-green-400 mb-4"/>

            <h3 className="text-white text-lg font-bold">
              Secure Platform
            </h3>

            <p className="text-slate-400 mt-2">
              End-to-end authentication & secure messaging.
            </p>

          </div>

          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-6 hover:scale-105 transition">

            <Sparkles className="w-10 h-10 text-yellow-400 mb-4"/>

            <h3 className="text-white text-lg font-bold">
              AI Powered
            </h3>

            <p className="text-slate-400 mt-2">
              Smart conversations and modern collaboration.
            </p>

          </div>

        </div>

        <div className="text-center mt-12">

          <h2 className="text-4xl font-black text-white">
            {title}
          </h2>

          <p className="text-slate-400 mt-4 text-lg">
            {subtitle}
          </p>

        </div>

      </div>

    </div>
  );
};

export default AuthImagePattern;