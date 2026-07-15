import clsx from "clsx";

const CustomInput = ({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  rightIcon,
  onRightIconClick,
  className,
}) => {
  return (
    <div
      className={clsx(
        "relative group transition-all duration-300",
        className
      )}
    >
      {/* Left Icon */}
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors">
          <Icon size={20} />
        </div>
      )}

      {/* Input */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
        w-full
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        py-4
        pl-12
        pr-12
        text-white
        placeholder:text-slate-500
        outline-none
        transition-all
        duration-300
        focus:border-cyan-400
        focus:ring-2
        focus:ring-cyan-500/30
        "
      />

      {/* Right Icon */}
      {rightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition"
        >
          {rightIcon}
        </button>
      )}
    </div>
  );
};

export default CustomInput;