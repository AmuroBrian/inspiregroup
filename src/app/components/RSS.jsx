"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useTranslation } from "@/TranslationContext";
import { FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

// Constants
const SPRING_CONFIG = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 0.5,
  restDelta: 0.001
};

const RSS_FEED_URL = "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml";
const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024
};

export default function NewsFeed() {
  const [feedItems, setFeedItems] = useState([]);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { translateDynamicText } = useTranslation();

  // Memoized visible items calculation
  const visibleCount = useMemo(() => {
    if (windowWidth < BREAKPOINTS.mobile) return 1;
    if (windowWidth < BREAKPOINTS.tablet) return 2;
    return 3;
  }, [windowWidth]);

  const visibleItems = useMemo(() => (
    feedItems.slice(currentStartIndex, currentStartIndex + visibleCount)
  ), [feedItems, currentStartIndex, visibleCount]);

  // Intersection Observer setup
  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    const element = document.querySelector("#news-feed");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // Fetch and parse RSS feed
  const fetchFeed = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const res = await fetch(RSS_FEED_URL);
      if (!res.ok) throw new Error("Failed to fetch feed");
      
      const xml = await res.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "application/xml");
      
      if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
        throw new Error("Error parsing XML feed");
      }

      const items = Array.from(xmlDoc.getElementsByTagName("item")).map((item) => {
        const description = item.getElementsByTagName("description")[0]?.textContent || "";
        const pubDate = item.getElementsByTagName("pubDate")[0]?.textContent;
        
        // Sanitize description
        const cleanDescription = description
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        return {
          title: item.getElementsByTagName("title")[0]?.textContent || "No title",
          description: cleanDescription || "No description available",
          link: item.getElementsByTagName("link")[0]?.textContent || "#",
          date: pubDate ? new Date(pubDate).toLocaleDateString() : "",
          id: `${item.getElementsByTagName("guid")[0]?.textContent || Math.random().toString(36).substring(2, 9)}`
        };
      });

      // Filter out items without required fields
      const validItems = items.filter(item => item.title && item.link);

      // Translate items
      const translatedItems = await Promise.all(
        validItems.map(async (item) => ({
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
  }, [translateDynamicText]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation handlers
  const nextPage = useCallback(() => {
    setCurrentStartIndex(prevIndex => {
      const nextIndex = prevIndex + visibleCount;
      if (nextIndex >= feedItems.length) return 0;
      return nextIndex;
    });
  }, [visibleCount, feedItems.length]);

  const prevPage = useCallback(() => {
    setCurrentStartIndex(prevIndex => {
      const prevIndexNew = prevIndex - visibleCount;
      if (prevIndexNew < 0) {
        // Calculate the start index of the last page
        const lastPageStart = Math.max(0, feedItems.length - (feedItems.length % visibleCount || visibleCount));
        return lastPageStart;
      }
      return prevIndexNew;
    });
  }, [visibleCount, feedItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage]);

  // Auto-rotation of items
  useEffect(() => {
    if (feedItems.length === 0 || isLoading || error) return;

    const interval = setInterval(() => {
      nextPage();
    }, 8000);

    return () => clearInterval(interval);
  }, [feedItems.length, isLoading, error, nextPage]);

  // Skeleton loader
  const renderSkeletons = useCallback(() => (
    Array(visibleCount).fill(0).map((_, index) => (
      <div key={`skeleton-${index}`} className="p-4 border rounded-lg shadow-sm bg-white flex flex-col h-full animate-pulse">
        <div className="w-3/4 h-6 bg-gray-200 mb-3 rounded"></div>
        <div className="w-full h-4 bg-gray-200 mb-2 rounded"></div>
        <div className="w-full h-4 bg-gray-200 mb-2 rounded"></div>
        <div className="w-5/6 h-4 bg-gray-200 mb-2 rounded"></div>
        <div className="w-24 h-4 bg-gray-200 mt-auto rounded"></div>
      </div>
    ))
  ), [visibleCount]);

  // Pagination dots
  const paginationDots = useMemo(() => {
    if (isLoading || error || feedItems.length === 0) return null;
    
    const pageCount = Math.ceil(feedItems.length / visibleCount);
    return Array(pageCount).fill(0).map((_, index) => {
      const isActive = currentStartIndex >= index * visibleCount && 
                     currentStartIndex < (index + 1) * visibleCount;
      
      return (
        <button
          key={`dot-${index}`}
          onClick={() => setCurrentStartIndex(index * visibleCount)}
          className={`w-3 h-3 rounded-full transition-colors ${
            isActive ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
          }`}
          aria-label={`Go to page ${index + 1}`}
          aria-current={isActive ? "true" : "false"}
        />
      );
    });
  }, [isLoading, error, feedItems.length, visibleCount, currentStartIndex]);

  return (
    <section 
      id="news-feed"
      className="relative w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      aria-busy={isLoading}
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title with animated underline */}
        <motion.div 
          className="relative w-full mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="inline-block text-2xl font-bold text-gray-900 relative pb-2">
            WORLD'S LATEST TECH NEWS
            {!prefersReducedMotion && (
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={isVisible ? { 
                  scaleX: 1,
                  transition: {
                    ...SPRING_CONFIG,
                    delay: 0.3
                  }
                } : {}}
                className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 origin-left"
              />
            )}
          </h2>
        </motion.div>
        
        {error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">Error loading news feed: {error}</p>
            <button 
              onClick={fetchFeed}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              aria-label="Retry loading news feed"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={prevPage}
              aria-label="Previous articles"
              disabled={isLoading || feedItems.length <= visibleCount}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 bg-white text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 transition-all z-10 border border-gray-200 hover:border-gray-300 ${
                isLoading || feedItems.length <= visibleCount ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                renderSkeletons()
              ) : (
                visibleItems.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        delay: index * 0.1,
                        duration: 0.5
                      }
                    } : {}}
                    className="group p-4 border rounded-lg shadow-sm bg-white flex flex-col h-full hover:shadow-md transition-shadow duration-300"
                    aria-labelledby={`article-title-${item.id}`}
                  >
                    <div className="flex-grow">
                      {item.date && (
                        <time dateTime={item.date} className="text-xs text-gray-500 mb-2 block">
                          {item.date}
                        </time>
                      )}
                      <h3 id={`article-title-${item.id}`} className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
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
                      aria-label={`Read more about ${item.title}`}
                    >
                      Read more <FiExternalLink className="ml-1 w-4 h-4" />
                    </a>
                  </motion.article>
                ))
              )}
            </div>

            <button
              onClick={nextPage}
              aria-label="Next articles"
              disabled={isLoading || feedItems.length <= visibleCount}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 bg-white text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 transition-all z-10 border border-gray-200 hover:border-gray-300 ${
                isLoading || feedItems.length <= visibleCount ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Pagination indicators */}
        {!isLoading && !error && feedItems.length > visibleCount && (
          <div className="flex justify-center mt-8 space-x-2">
            {paginationDots}
          </div>
        )}
      </div>
    </section>
  );
}