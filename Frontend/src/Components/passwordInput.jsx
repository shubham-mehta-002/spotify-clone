import show from "../images/show.png";
import hide from "../images/hide.png";
import { useState } from "react";

export function PasswordInput({
  attributes,
  label,
  placeholder,
  classname,
  registerDetails: { register, registerFor, validation },
}) {
  
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <div className={`w-full flex flex-col gap-2 mb-4 ${classname}`}>
      <label className="text-l font-bold">{label}</label>
      <div className=" flex flex-row justify-evenly relative">
        <input
          {...attributes}
          {...register(registerFor, validation)}
          type={passwordVisibility ? "text" : "password"}
          placeholder={placeholder}
          className="w-full border-2 border-solid border-gray-400 p-3 rounded placeholder-gray-500"
        />
        <button
          className="absolute right-2 top-1/3 -translate-y-1/4"
          onClick={(e) => {
            e.preventDefault();
            setPasswordVisibility((passwordVisibility) => !passwordVisibility);
          }}
        >
          <img src={passwordVisibility ? hide : show} className="h-8" />
        </button>
      </div>
    </div>
  );
}
