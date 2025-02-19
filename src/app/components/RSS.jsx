"use client";

import React, { useEffect, useState } from "react";

export default function Page() {
  const [feedItems, setFeedItems] = useState([]);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024); // Default width for SSR-safe rendering

  useEffect(() => {
    // Fetch feed data
    const fetchFeed = async () => {
      const res = await fetch(
        "https://data.gmanetwork.com/gno/rss/scitech/technology/feed.xml"
      );
      const xml = await res.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "application/xml");
      const items = Array.from(xmlDoc.getElementsByTagName("item")).map(
        (item) => {
          const description =
            item.getElementsByTagName("description")[0]?.textContent || "";
          const imgMatch = description.match(/<img[^>]+src="([^"]+)"/);
          const imageUrl = imgMatch ? imgMatch[1] : "";

          return {
            title: item.getElementsByTagName("title")[0]?.textContent,
            description: description
              .replace(/<br\/>/g, "")
              .replace(/<img[^>]+>/, "")
              .trim(),
            link: item.getElementsByTagName("link")[0]?.textContent,
            image: imageUrl,
          };
        }
      );
      setFeedItems(items);
    };

    fetchFeed();
  }, []);

  useEffect(() => {
    // Function to update window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width after component mounts
    setWindowWidth(window.innerWidth);

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextPage = () => {
    setCurrentStartIndex((prevIndex) =>
      prevIndex + 1 >= feedItems.length ? 0 : prevIndex + 1
    );
  };

  const prevPage = () => {
    setCurrentStartIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : feedItems.length - 1
    );
  };

  const visibleItems = feedItems.slice(
    currentStartIndex,
    currentStartIndex + (windowWidth < 768 ? 1 : 3) // Use windowWidth state instead of window.innerWidth
  );

  return (
    <div className="relative w-full h-[40%] bg-white text-black p-6 flex flex-col items-center">
      <button
        onClick={prevPage}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent text-black-500 p-2 rounded z-10 border-2 border-gray-500 hover:bg-gray-200 transition-all"
      >
        &lt;
      </button>

      <div className="w-[95%] h-full top-0 left-0 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden">
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded shadow bg-white flex flex-col relative"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover mb-2"
              />
            )}
            <h2 className="text-lg font-bold text-black mb-2 text-center">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black text-justify"
              >
                {item.title}
              </a>
            </h2>
            <p className="text-sm text-black mb-2 text-justify flex-grow">
              {item.description}
            </p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 font-bold relative"
            >
              Read more
            </a>
          </div>
        ))}
      </div>

      <button
        onClick={nextPage}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent text-black-500 p-2 rounded z-10 border-2 border-gray-500 hover:bg-gray-200 transition-all"
      >
        &gt;
      </button>
    </div>
  );
}
