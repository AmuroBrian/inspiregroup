import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="Inspire Connect" className="h-10 mr-2" />
          <span className="text-blue-600 text-xl font-bold">INSPIRE GROUP</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-8">
          {[
            { text: "HOME", emoji: "🏠", href: "/" },
            { text: "ABOUT", emoji: "🏢", href: "/about" },
            { text: "CONTACT", emoji: "✉️", href: "/contact" }
          ].map((item, index) => (
            <li key={index} className="relative group">
              <Link href={item.href} className="flex flex-col items-center text-gray-700 hover:text-blue-600 cursor-pointer">
                <span className="text-lg">{item.emoji}</span>
                <span className="text-xs">{item.text}</span>
              </Link>

              {/* Underline Animation */}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
