'use client';

import React, { useEffect, useState } from 'react';

export default function Page() {
  // State for storing the fetched RSS feed items
  const [feedItems, setFeedItems] = useState([]);
  const [currentStartIndex, setCurrentStartIndex] = useState(0); // The index of the first item in the visible container

  // Fetch the RSS feed from the server directly
  useEffect(() => {
    const fetchFeed = async () => {
      const res = await fetch('https://data.gmanetwork.com/gno/rss/scitech/technology/feed.xml');
      const xml = await res.text();

      // Parse the XML to extract RSS feed items
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, 'application/xml');
      const items = Array.from(xmlDoc.getElementsByTagName('item')).map((item) => {
        const description = item.getElementsByTagName('description')[0]?.textContent || '';
        const imgMatch = description.match(/<img[^>]+src="([^"]+)"/);
        const imageUrl = imgMatch ? imgMatch[1] : '';

        return {
          title: item.getElementsByTagName('title')[0]?.textContent,
          description: description.replace(/<br\/>/g, '').replace(/<img[^>]+>/, '').trim(), // Clean the description
          link: item.getElementsByTagName('link')[0]?.textContent,
          image: imageUrl,
        };
      });

      setFeedItems(items);
    };

    fetchFeed();  // Fetch the feed
  }, []);  // Empty array means this will run only once when the component mounts

  // Function to handle the "Next" button
  const nextPage = () => {
    // If we are at the end of the list, reset to the first container (loop)
    if (currentStartIndex + 1 >= feedItems.length) {
      setCurrentStartIndex(0);
    } else {
      setCurrentStartIndex(currentStartIndex + 1);
    }
  };

  // Function to handle the "Previous" button
  const prevPage = () => {
    // Prevent going below 0
    if (currentStartIndex > 0) {
      setCurrentStartIndex(currentStartIndex - 1);
    } else {
      // If at the first container, wrap around to the last container
      setCurrentStartIndex(feedItems.length - 1);
    }
  };

  // Get the items for the current visible containers (5 items at a time)
  const visibleItems = feedItems.slice(currentStartIndex, currentStartIndex + 5);

  return (
    <div className="relative w-full h-[500px] bg-white text-black p-6 flex flex-col items-center">
      {/* Previous Button */}
      <button
        onClick={prevPage}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent text-black-500 p-2 rounded z-10 border-2 border-gray-500 hover:bg-gray-200 transition-all"
      >
        &lt;
      </button>

      {/* Feed Display - One row of 5 containers */}
      <div className="absolute w-[95%] h-full top-0 left-0 grid grid-cols-5 gap-4 overflow-hidden ml-10 mr-10">
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded shadow bg-white flex flex-col relative"
            style={{
              height: '100%', // Ensure container fills the available height
            }}
          >
            {item.image && <img src={item.image} alt={item.title} className="w-full h-48 object-cover mb-2" />}
            <h2 className="text-lg font-bold text-black mb-2 text-center">
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-black text-justify">{item.title}</a>
            </h2>
            <p className="text-sm text-black mb-2 text-justify flex-grow">{item.description}</p> {/* Justified description */}
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-bold absolute bottom-2 left-2">Read more</a> {/* Fixed bottom */}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={nextPage}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent text-black-500 p-2 rounded z-10 border-2 border-gray-500 hover:bg-gray-200 transition-all"
      >
        &gt;
      </button>
     

      
    </div>
  );
}
