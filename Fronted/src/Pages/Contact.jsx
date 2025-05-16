import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Contact<span className="text-orange-600"> Us</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form className="space-y-5 bg-orange-50 p-6 rounded-sm">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Your message..."
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info + Map */}
        <div className="space-y-6">
          <div className="bg-orange-50 p-6 rounded-sm space-y-3">
            <h3 className="text-lg font-bold text-gray-700">Reach Us At</h3>
            <p>📍 Vidyanagar, Anand, Gujarat, India</p>
            <p>📞 +91 (800) 555-FOOD</p>
            <p>✉️ support@fooddeliveryapp.com</p>
            <p>🕒 Mon–Sun: 9:00 AM – 11:00 PM</p>
          </div>

          <div className="rounded-sm overflow-hidden">
            <iframe
              title="location"
              src="https://maps.google.com/maps?q=Vidyanagar%2C%20Anand&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-64 border-none"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
