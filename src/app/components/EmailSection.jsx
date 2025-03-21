"use client";

import React, { useState } from "react";
import { Globe, Phone, Mail, Facebook, Instagram, Music } from "lucide-react";
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

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

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
    <div
      className="relative min-h-[80vh] p-6 bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center lg:flex-row"
      style={{ backgroundImage: "url('/images/building3.jpg')" }}
      id="contacts"
    >
      {/* Contact Form */}
      <div className="max-w-lg w-full p-6 bg-transparent backdrop-blur-md rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-black text-center mb-5">
          Email Us
        </h2>

        {success !== null && (
          <p
            className={`text-center text-sm ${
              success ? "text-green-500" : "text-red-500"
            }`}
          >
            {success
              ? "Email sent successfully!"
              : "Error sending email. Try again later."}
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
            className="w-full p-3 border rounded-lg bg-white dark:text-black focus:ring focus:ring-blue-300"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>

      {/* Contact Us Section */}
      <div className="w-full lg:w-[350px] p-4 bg-gray-700 text-white rounded-lg shadow-lg mt-5 lg:mt-0 lg:ml-10">
        <h2 className="text-2xl font-semibold mb-2 text-center">Contact Us</h2>
        <div className="space-y-2">
          <h2 className="text-lg font-medium flex items-center">
            <Globe className="mr-2 text-blue-300" />
            Website:{" "}
            <a
              href="https://inspirenextglobal.com"
              className="text-blue-300 hover:underline"
            >
              inspirenextglobal.com
            </a>
          </h2>
          <h2 className="text-lg font-medium flex items-center">
            <Globe className="mr-2 text-blue-300" />
            Website:{" "}
            <a
              href="https://inspireholding.ph"
              className="text-blue-300 hover:underline"
            >
              inspireholdings.ph
            </a>
          </h2>
          <h2 className="text-lg font-medium flex items-center">
            <Phone className="mr-5 text-blue-300" />
            Telephone No: 02-8538-5054 / 02-7750605 / +639946529009
          </h2>
          <h2 className="text-lg font-medium flex items-center">
            <Mail className="mr-2 text-blue-300" />
            Email:{" "}
            <a
              href="mailto:info@inspirenextglobal.com"
              className="text-blue-300 hover:underline"
            >
              info@inspireholdings.ph
            </a>
          </h2>
          <h2 className="text-lg font-medium flex items-center">
            <Facebook className="mr-2 text-blue-300" />
            Facebook: Inspire Next Global Inc.
          </h2>
          <h2 className="text-lg font-medium flex items-center">
            <Instagram className="mr-2 text-blue-300" />
            Instagram: @inspire.next.global.inc
          </h2>
          <h2 className="text-lg font-medium flex items-center">
            <Music className="mr-2 text-blue-300" />
            TikTok: @inspire.next.glob
          </h2>
        </div>
      </div>
    </div>
  );
};

export default EmailSection;
