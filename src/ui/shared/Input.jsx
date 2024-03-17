import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
    "rounded-xl w-full py-2 px-4 border-2 focus:outline-none focus:ring focus:border-[#227F4B]";
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
      <label htmlFor={id} className="text-sm md:text-base">
        {title}
      </label>
      <div className="relative flex">
        <input
          type={isPassword && ShowPassword ? "text" : type}
          placeholder={isPassword && ShowPassword ? "password" : placeholder}
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
              <FontAwesomeIcon
                icon={faEye}
                className="text-[#227F4B] w-5 h-5"
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="text-[#227F4B] w-5 h-5"
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;
