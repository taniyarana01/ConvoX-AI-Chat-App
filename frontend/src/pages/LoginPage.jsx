import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";

import { useAuthStore } from "../store/useAuthStore";
import AnimatedLogo from "../components/AnimatedLogo";
import AuthLayout from "../components/AuthLayout";
import CustomInput from "../components/CustomInput";

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <AuthLayout>
      <AnimatedLogo />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .2 }}
        className="mt-10"
      >
        <h2 className="text-3xl font-bold text-white text-center">
          Welcome Back 👋
        </h2>

        <p className="text-center text-slate-400 mt-2">
          Login to continue your conversations.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 mt-8"
        >
          <CustomInput
            icon={Mail}
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <CustomInput
            icon={Lock}
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            rightIcon={
              showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )
            }
            onRightIconClick={() =>
              setShowPassword(!showPassword)
            }
          />
                    <div className="flex items-center justify-between">

            <label className="flex items-center gap-2 cursor-pointer select-none">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="checkbox checkbox-sm checkbox-primary"
              />

              <span className="text-sm text-slate-300">
                Remember Me
              </span>

            </label>

            <button
              type="button"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition"
            >
              Forgot Password?
            </button>

          </div>

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: .98,
            }}
            type="submit"
            disabled={isLoggingIn}
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 py-4 text-white font-semibold shadow-xl hover:shadow-cyan-500/30 transition-all duration-300"
          >
            {isLoggingIn ? (
              <div className="flex justify-center items-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </motion.button>

        </form>

        <div className="relative my-8">

          <div className="absolute inset-0 flex items-center">

            <div className="w-full border-t border-white/10"></div>

          </div>

          <div className="relative flex justify-center text-xs uppercase">

            <span className="bg-[#030712] px-4 text-slate-400">
              Or Continue With
            </span>

          </div>

        </div>

        <button
          className="w-full rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 py-4 text-white transition"
        >
          Continue with Google
        </button>

        <p className="text-center text-slate-400 mt-8">

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Create Account
          </Link>

        </p>

      </motion.div>

    </AuthLayout>
  );
};

export default LoginPage;