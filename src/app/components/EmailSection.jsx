"use client";

import React, { useState } from "react";

import emailjs from "@emailjs/browser";

const EmailSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = "service_hymqbti";
    const templateId = "template_i7sn93g";
    const publicKey = "8nV8GppQ82RWajpEo";

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Inspire",
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch(() => setSuccess(false))
      .finally(() => setLoading(false));
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-gradient-animation p-6">

      {/* Waves */}
      <div className="wave"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>

      {/* Contact Form */}
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg z-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-black text-center ">
          Contact Us
        </h2>
        {success !== null && (
          <p
            className={`text-center text-sm ${
              success ? "text-green-500" : "text-red-500"
            }`}
          >
            {success ? "Email sent successfully!" : "Error sending email. Try again later."}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white dark:text-black focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white dark:text-black focus:ring focus:ring-blue-300"
            required
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border rounded-lg white dark:text-black focus:ring focus:ring-blue-300"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>

      <style jsx>{`
        

        @keyframes gradient {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }

        .wave {
          background: rgb(255 255 255 / 25%);
          border-radius: 1000% 1000% 0 0;
          position: fixed;
          width: 200%;
          height: 12em;
          animation: wave 10s -3s linear infinite;
          transform: translate3d(0, 0, 0);
          opacity: 0.8;
          bottom: 0;
          left: 0;
          z-index: -1;
        }

        .wave:nth-of-type(2) {
          bottom: -1.25em;
          animation: wave 18s linear reverse infinite;
          opacity: 0.8;
        }

        .wave:nth-of-type(3) {
          bottom: -2.5em;
          animation: wave 20s -1s reverse infinite;
          opacity: 0.9;
        }

        @keyframes wave {
          2% {
            transform: translateX(1);
          }

          25% {
            transform: translateX(-25%);
          }

          50% {
            transform: translateX(-50%);
          }

          75% {
            transform: translateX(-25%);
          }

          100% {
            transform: translateX(1);
          }
        }
      `}</style>
      

    </div>
  );
};

export default EmailSection;
