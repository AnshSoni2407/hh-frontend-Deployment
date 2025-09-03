import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-[#E0C163] py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
        {/* Logo / Name */}
        <div>
          <h2 className="text-2xl font-bold tracking-widest">Hire Hunt</h2>
          <p className="text-sm mt-1">Connecting Talent with Opportunity</p>
        </div>

        {/* Quick Links */}
        <div className=" hidden sm:flex flex-col gap-1 text-center">
          <h3 className="font-semibold ">Download the app now</h3>
          <div>

          <a href="https://apps.apple.com/app/id1234567890" target="_blank" rel="noopener noreferrer">
            <img src="./public/ios-app_v1.png" className="inline cursor-pointer mr-2.5 w-[10vw]" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.example.app" target="_blank" rel="noopener noreferrer">
            <img src="./public/android-app_v1.png" className="inline cursor-pointer w-[10vw]" />
          </a>
        </div>
      </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg">Contact</h3>
          <p>Email: hirehunt@support.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Dehradun, India</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 border-t border-[#E0C163] pt-4 text-center text-sm">
        © 2025 Hire Hunt. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
