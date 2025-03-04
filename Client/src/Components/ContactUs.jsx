import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-black text-white py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-400 mb-4">Get in touch</h2>
          <p className="text-gray-300 max-w-md mx-auto md:mx-0">
            Want to get in touch? We'd love to hear from you. Here's how you can reach us.
          </p>
          <div className="mt-6">
            <p className="text-gray-300">📞 Phone: 
              <a href="https://wa.me/8123013525" className="font-semibold text-teal-400 hover:underline" target="_blank" rel="noopener noreferrer">
                8123013525
              </a>
            </p>
            <p className="text-gray-300">📧 Email: 
              <a href="mailto:anil@aquaticexperts.in" className="font-semibold text-teal-400 hover:underline">
                anil@aquaticexperts.in
              </a>
            </p>
          </div>
        </div>
        
        {/* Right Image Section */}
        <div className="relative flex justify-center">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-teal-500 rounded-full opacity-50 hidden md:block"></div>
          <img
            src="/your-image-path.jpg" 
            alt="Contact Us"
            className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-full"
          />
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
        {/* Sales Card */}
        <div className="bg-white text-black p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <span className="text-3xl">📞</span>
          <h3 className="text-lg sm:text-xl font-semibold mt-3">Talk to Sales</h3>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Interested in our services? Just pick up the phone to chat with our sales team.
          </p>
          <a href="https://wa.me/8123013525" className="text-teal-600 font-semibold mt-2 hover:underline" target="_blank" rel="noopener noreferrer">
            8123013525
          </a>
        </div>
        
        {/* Support Card */}
        <div className="bg-white text-black p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <span className="text-3xl">💬</span>
          <h3 className="text-lg sm:text-xl font-semibold mt-3">Contact Customer Support</h3>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Need help? Our support team is here for you.
          </p>
          <a href="mailto:anil@aquaticexperts.in" className="text-teal-600 font-semibold mt-2 hover:underline">
            anil@aquaticexperts.in
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;