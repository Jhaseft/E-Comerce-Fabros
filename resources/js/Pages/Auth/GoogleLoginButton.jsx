import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  return (
    <a
      href={route("google.redirect")}
      className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl 
                 border border-[#25D366] bg-white text-gray-800
                 hover:bg-[#25D366] hover:text-white transition-all duration-300 
                 shadow-[0_0_10px_rgba(37,211,102,0.4)] hover:shadow-[0_0_20px_rgba(37,211,102,0.7)]
                 active:scale-95 focus:ring-2 focus:ring-[#25D366] focus:outline-none"
    >
      <FcGoogle className="text-2xl bg-white rounded-full p-[2px]" />
      <span className="font-semibold text-sm sm:text-base tracking-wide">
        Continuar con Google
      </span>
    </a>
  );
}
