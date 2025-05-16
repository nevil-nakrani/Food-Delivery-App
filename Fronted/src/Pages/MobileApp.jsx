import React from "react";

const MobileApp = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-sm mt-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Our Mobile App</h1>
      <p className="text-gray-700 mb-6 text-center">
        Experience our services on the go with our mobile app. Download now for iOS and Android.
      </p>

      <div className="flex justify-center gap-6">
        <a
          href="https://apps.apple.com/app/idXXXXXXXXX" // replace with actual app link
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-800 transition"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19.6 7.6c-.2-.1-2.7-1.7-2.1-5.5 0 0-3.1.2-3.8 3.9-1.3 5.6 3 7.3 3 7.3 3.7-1.7 3.2-5.7 3.2-5.7zM16.7 18.6c-.4-.5-2.7-2.7-5-1.5-1.5.7-2.4 2.4-2.7 2.7-4.8 6.4 6.3 9.5 6.3 9.5 1.5.1 3-.7 4.1-1.8-1.6-1.4-2.9-4-2.7-6.6.1-1.3.7-2.5 1.3-3.3z" />
          </svg>
          App Store
        </a>

        <a
          href="https://play.google.com/store/apps/details?id=your.app.id" // replace with actual app link
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-green-700 transition"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M3.9 1.7L19 12 3.9 22.3v-20.6z" />
          </svg>
          Google Play
        </a>
      </div>

      <p className="mt-8 text-center text-gray-500">
        Stay connected anywhere, anytime.
      </p>
    </div>
  );
};

export default MobileApp;
