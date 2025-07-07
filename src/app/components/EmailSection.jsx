"use client";

import React, { useState, useEffect } from "react";
import { Globe, Phone, Mail, Facebook, Instagram, Youtube, ArrowRight, Smartphone, PhoneCall } from "lucide-react";
import emailjs from "@emailjs/browser";

const EmailSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation trigger when component is in view
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: "Inspire",
      message: formData.message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSuccess(false);
      console.error("Email sending error:", error);
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    {
      icon: <Globe className="mr-2 text-blue-400" size={20} />,
      label: "Website:",
      content: (
        <>
          <a 
            href="https://www.inspirenextglobal.com" 
            className="text-blue-400 hover:text-blue-300 transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.inspirenextglobal.com
            <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">
              <ArrowRight size={14} className="inline" />
            </span>
          </a>
          {" | "}
          <a 
            href="https://www.inspireholdings.ph" 
            className="text-blue-400 hover:text-blue-300 transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.inspireholdings.ph
            <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">
              <ArrowRight size={14} className="inline" />
            </span>
          </a>
        </>
      )
    },
    {
      icon: <PhoneCall className="mr-2 text-blue-400" size={20} />,
      label: "Telephone:",
      content: (
        <div className="space-y-2">
          <div className="flex items-center">
            <Phone className="mr-2 text-blue-400" size={16} />
            <span>
              Landline: <a href="tel:+63285385054" className="hover:text-blue-300 transition-colors">(02) 8538-5054</a> | <a href="tel:+6327750605" className="hover:text-blue-300 transition-colors">(02) 7750-605</a>
            </span>
          </div>
          <div className="flex items-center">
            <Smartphone className="mr-2 text-blue-400" size={16} />
            <span>
              Mobile: <a href="tel:+639946529009" className="hover:text-blue-300 transition-colors">+63 994 652 9009</a>
            </span>
          </div>
        </div>
      )
    },
    {
      icon: <Mail className="mr-2 text-blue-400" size={20} />,
      label: "Email:",
      content: (
        <a 
          href="mailto:info@inspireholdings.ph" 
          className="text-blue-400 hover:text-blue-300 transition-colors group"
        >
          info@inspireholdings.ph
          <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">
            <ArrowRight size={14} className="inline" />
          </span>
        </a>
      )
    },
    {
      icon: <Facebook className="mr-2 text-blue-400" size={20} />,
      label: "Facebook:",
      content: (
        <a 
          href="https://facebook.com/InspireNextGlobalInc" 
          className="text-blue-400 hover:text-blue-300 transition-colors group"
          target="_blank"
          rel="noopener noreferrer"
        >
          Inspire Next Global Official Facebook Page
          <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">
            <ArrowRight size={14} className="inline" />
          </span>
        </a>
      )
    },
    {
      icon: <Instagram className="mr-2 text-blue-400" size={20} />,
      label: "Instagram:",
      content: (
        <a 
          href="https://instagram.com/inspire.next.global.inc" 
          className="text-blue-400 hover:text-blue-300 transition-colors group"
          target="_blank"
          rel="noopener noreferrer"
        >
          Inspire Next Global Official Instagram Page
          <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">
            <ArrowRight size={14} className="inline" />
          </span>
        </a>
      )
    },
    {
      icon: <Youtube className="mr-2 text-blue-400" size={20} />,
      label: "YouTube:",
      content: (
        <a 
          href="https://www.youtube.com/channel/UCUGE-qPvLqYmZhQ25aLXm6A" 
          className="text-blue-400 hover:text-blue-300 transition-colors group"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Inspire Next Global Youtube Official
          <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">
            <ArrowRight size={14} className="inline" />
          </span>
        </a>
      )
    }
  ];

  return (
    <section
      className={`relative min-h-screen p-4 md:p-8 bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/building3.jpg')",
        backgroundAttachment: "fixed"
      }}
      id="contacts"
    >
      <div className="w-full max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className={`p-6 md:p-8 bg-white rounded-xl shadow-lg transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative pb-6 mb-6 border-b border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
              Let's Start a Conversation
            </h2>
            <p className="text-center text-gray-600 mt-2 text-sm md:text-base">
              Have questions or want to discuss a project? We're here to help.
            </p>
          </div>

          {success !== null && (
            <div className={`mb-6 p-3 md:p-4 rounded-lg text-center text-sm md:text-base ${
              success ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {success
                ? "Thank you! Your message has been sent successfully."
                : "We encountered an error. Please try again or contact us directly."}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 md:p-4 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
                placeholder="Shelah Reynaldo"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 md:p-4 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
                placeholder="she@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 md:p-4 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
                placeholder="Tell us about your project or inquiry..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 md:py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 disabled:opacity-70 flex items-center justify-center group text-sm md:text-base"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={16} className="md:size-[18px]" />
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className={`p-6 md:p-8 bg-gray-900 rounded-xl shadow-lg transform transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="pb-4 md:pb-6 mb-4 md:mb-6 border-b border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
              Connect With Us
            </h2>
            <p className="text-center text-gray-400 mt-2 text-sm md:text-base">
              We're always happy to hear from you. Choose your preferred method.
            </p>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            {contactItems.map((item, index) => (
              <div 
                key={index} 
                className="flex items-start p-3 md:p-4 hover:bg-gray-800 rounded-lg transition-colors duration-300"
              >
                <span className="mt-0.5 md:mt-1 flex-shrink-0">{item.icon}</span>
                <div className="text-sm md:text-base">
                  <span className="font-medium text-gray-400">{item.label}</span>{" "}
                  <span className="text-white">{item.content}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-700">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-4">Business Hours</h3>
            <p className="text-gray-400 text-sm md:text-base">Monday - Friday: 9:30 AM - 6:30 PM</p>
            <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">Closed on Saturday, Sundays and Public Holidays</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailSection;