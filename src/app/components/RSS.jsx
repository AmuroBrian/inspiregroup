"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "@/TranslationContext";
import { FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";

export default function NewsFeed() {
  const [feedItems, setFeedItems] = useState([]);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { translateDynamicText } = useTranslation();

  // Determine number of visible items based on screen size
  const getVisibleCount = () => {
    if (windowWidth < 640) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const res = await fetch(
          "https://data.gmanetwork.com/gno/rss/scitech/technology/feed.xml"
        );
        if (!res.ok) throw new Error("Failed to fetch feed");
        
        const xml = await res.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "application/xml");
        
        // Parse error handling
        if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
          throw new Error("Error parsing XML feed");
        }

        const items = Array.from(xmlDoc.getElementsByTagName("item")).map(
          (item) => {
            const description =
              item.getElementsByTagName("description")[0]?.textContent || "";
            const imgMatch = description.match(/<img[^>]+src="([^"]+)"/);
            const imageUrl = imgMatch ? imgMatch[1] : "";
            const pubDate = item.getElementsByTagName("pubDate")[0]?.textContent;

            return {
              title: item.getElementsByTagName("title")[0]?.textContent,
              description: description
                .replace(/<[^>]+>/g, " ") // Remove all HTML tags
                .replace(/\s+/g, " ") // Collapse multiple spaces
                .trim(),
              link: item.getElementsByTagName("link")[0]?.textContent,
              image: imageUrl,
              date: pubDate ? new Date(pubDate).toLocaleDateString() : "",
            };
          }
        );

        // Translate items
        const translatedItems = await Promise.all(
          items.map(async (item) => ({
            ...item,
            title: await translateDynamicText(item.title),
            description: await translateDynamicText(item.description),
          }))
        );

        setFeedItems(translatedItems);
      } catch (err) {
        console.error("Error fetching feed:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeed();
  }, [translateDynamicText]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextPage = () => {
    setCurrentStartIndex((prevIndex) => {
      const nextIndex = prevIndex + getVisibleCount();
      return nextIndex >= feedItems.length ? 0 : nextIndex;
    });
  };

  const prevPage = () => {
    setCurrentStartIndex((prevIndex) => {
      const prevIndexNew = prevIndex - getVisibleCount();
      return prevIndexNew < 0 ? feedItems.length - getVisibleCount() : prevIndexNew;
    });
  };

  const visibleItems = feedItems.slice(
    currentStartIndex,
    currentStartIndex + getVisibleCount()
  );

  // Simple skeleton loader using Tailwind
  const renderSkeletons = () => {
    return Array(getVisibleCount()).fill(0).map((_, index) => (
      <div key={index} className="p-4 border rounded-lg shadow-sm bg-white flex flex-col h-full animate-pulse">
        <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
        <div className="w-3/4 h-6 bg-gray-200 mb-3"></div>
        <div className="w-full h-4 bg-gray-200 mb-2"></div>
        <div className="w-full h-4 bg-gray-200 mb-2"></div>
        <div className="w-full h-4 bg-gray-200 mb-2"></div>
        <div className="w-24 h-4 bg-gray-200 mt-auto"></div>
      </div>
    ));
  };

  return (
    <section className="relative w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Latest Tech News
        </h2>
        
        {error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">Error loading news feed: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={prevPage}
              aria-label="Previous articles"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 bg-white text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 transition-all z-10 border border-gray-200 hover:border-gray-300"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                renderSkeletons()
              ) : (
                visibleItems.map((item, index) => (
                  <article
                    key={`${index}-${item.link}`}
                    className="group p-4 border rounded-lg shadow-sm bg-white flex flex-col h-full hover:shadow-md transition-shadow duration-300"
                  >
                    {item.image && (
                      <div className="relative overflow-hidden rounded-md mb-4 aspect-video">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      {item.date && (
                        <span className="text-xs text-gray-500 mb-2 block">
                          {item.date}
                        </span>
                      )}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 transition-colors"
                        >
                          {item.title}
                        </a>
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                      Read more <FiExternalLink className="ml-1 w-4 h-4" />
                    </a>
                  </article>
                ))
              )}
            </div>

            <button
              onClick={nextPage}
              aria-label="Next articles"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 bg-white text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 transition-all z-10 border border-gray-200 hover:border-gray-300"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Pagination indicators */}
        {!isLoading && !error && feedItems.length > 0 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array(Math.ceil(feedItems.length / getVisibleCount()))
              .fill(0)
              .map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStartIndex(index * getVisibleCount())}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentStartIndex >= index * getVisibleCount() &&
                    currentStartIndex < (index + 1) * getVisibleCount()
                      ? "bg-blue-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
          </div>
        )}
      </div>
    </section>
  );
}