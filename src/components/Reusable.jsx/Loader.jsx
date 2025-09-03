import React, { useEffect } from "react";

const FancyLoader = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="bg-white px-6 py-4 rounded-2xl shadow-2xl border border-blue-100 flex flex-col gap-4 animate-fadeIn">
        <div className="relative w-10 h-10 flex items-center justify-center m-auto">
          <div className="absolute inset-0 border-4 border-[#E0C163] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-1 rounded-full"></div>
        </div>
        <div className="text-black text-lg font-bold tracking-wide animate-pulse">
          Please wait...
        </div>
      </div>
    </div>
  );
};

export default FancyLoader;
