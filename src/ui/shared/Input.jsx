import React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Input({
  title,
  type,
  placeholder,
  onChange,
  id,
  value,
  isRequired,
  disabled,
  customClass,
}) {
  const defaultClass =
    "rounded-lg w-full py-2 px-4 border focus:outline-none focus:ring focus:border-[#227F4B]";
  const buttonClass = customClass
    ? `${defaultClass} ${customClass}`
    : defaultClass;

  const isPassword = type === "password";
  const [ShowPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!ShowPassword);
  };
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {title}
      </label>
      <div className="relative flex">
        <input
          type={isPassword && ShowPassword ? "text" : type}
          placeholder={isPassword && ShowPassword ? "Password" : placeholder}
          id={id}
          onChange={onChange}
          required={isRequired}
          className={buttonClass}
          disabled={disabled}
          value={value}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="svg-size absolute top-[12px] right-3"
          >
            {ShowPassword ? (
              <Eye className="h-5 w-5 text-[#227F4B]" />
            ) : (
              <EyeOff className="h-5 w-5 text-[#227F4B]" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;
