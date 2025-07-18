"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useTranslation } from "@/TranslationContext";
import { FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

const SPRING_CONFIG = {
  type: "spring",
  stiffness: 300,
  damping: 20,
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
  const [isLanguageChanging, setIsLanguageChanging] = useState(false); // State for language change in progress
  const { translateDynamicText, t, isClient, language } = useTranslation();

  // Memoized visible count based on window width
  const visibleCount = useMemo(() => {
    if (windowWidth < BREAKPOINTS.mobile) return 1;
    if (windowWidth < BREAKPOINTS.tablet) return 2;
    return 3;
  }, [windowWidth]);

  // Memoized visible items
  const visibleItems = useMemo(() => (
    feedItems.slice(currentStartIndex, currentStartIndex + visibleCount)
  ), [feedItems, currentStartIndex, visibleCount]);

  // Intersection observer for animations
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

  // Main feed fetching function with proper translation handling
  const fetchFeed = useCallback(async () => {
    console.log("[RSS] fetchFeed called. Current language:", language); // Debug log
    try {
      setIsLoading(true); // Always set loading to true when starting a fetch
      setError(null);
      setFeedItems([]); // Clear existing items while loading

      // Fetch RSS feed
      const res = await fetch(RSS_FEED_URL);
      if (!res.ok) throw new Error("Failed to fetch feed");
      
      const xml = await res.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "application/xml");
      
      if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
        throw new Error("Error parsing XML feed");
      }

      // Parse feed items
      const items = Array.from(xmlDoc.getElementsByTagName("item")).map((item) => {
        const description = item.getElementsByTagName("description")[0]?.textContent || "";
        const pubDate = item.getElementsByTagName("pubDate")[0]?.textContent;
        
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

      const validItems = items.filter(item => item.title && item.link);

      // Process translations sequentially to avoid API rate limits
      const translatedItems = [];
      for (const item of validItems) {
        try {
          // Only translate if not English
          const shouldTranslate = language !== "en";
          
          const [translatedTitle, translatedDescription] = await Promise.all([
            shouldTranslate ? 
              translateDynamicText(item.title).catch(() => item.title) : 
              Promise.resolve(item.title),
            shouldTranslate ? 
              translateDynamicText(item.description).catch(() => item.description) : 
              Promise.resolve(item.description)
          ]);

          translatedItems.push({
            ...item,
            title: translatedTitle,
            description: translatedDescription
          });
        } catch (err) {
          console.error("Error processing item:", err);
          translatedItems.push(item); // Fallback to original item
        }
      }

      setFeedItems(translatedItems);
    } catch (err) {
      console.error("Error fetching feed:", err);
      setError(err.message);
    } finally {
      setIsLoading(false); // Always set loading to false when fetch is complete
      setIsLanguageChanging(false); // Reset language changing state
    }
  }, [translateDynamicText, language]); // Dependencies ensure fetchFeed re-creates if language or translate function changes

  // Fetch feed when language changes or on initial client load
  // FIX: Removed setTimeout to fetch immediately on language change
  useEffect(() => {
    if (isClient) {
      console.log("[RSS] Language changed to:", language); // Debug log
      fetchFeed();
    }
  }, [fetchFeed, isClient, language]); // 'language' is now a direct trigger

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setCurrentStartIndex(0);
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pagination controls
  const nextPage = useCallback(() => {
    setCurrentStartIndex(prevIndex => {
      const nextIndex = prevIndex + visibleCount;
      return nextIndex >= feedItems.length ? 0 : nextIndex;
    });
  }, [visibleCount, feedItems.length]);

  const prevPage = useCallback(() => {
    setCurrentStartIndex(prevIndex => {
      const prevIndexNew = prevIndex - visibleCount;
      return prevIndexNew < 0 ? Math.max(0, feedItems.length - visibleCount) : prevIndexNew;
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
    // Only auto-rotate if there are items, not loading, no error, and language isn't actively changing
    if (feedItems.length === 0 || isLoading || error || isLanguageChanging) return;

    const interval = setInterval(() => {
      nextPage();
    }, 8000); // Rotate every 8 seconds

    return () => clearInterval(interval);
  }, [feedItems.length, isLoading, error, nextPage, isLanguageChanging]);

  // Loading skeletons
  const renderSkeletons = useCallback(() => (
    Array(visibleCount).fill(0).map((_, index) => (
      <div key={`skeleton-${index}`} className="p-6 border border-blue-100 rounded-2xl shadow-sm bg-white flex flex-col h-full animate-pulse">
        <div className="w-3/4 h-6 bg-blue-100 mb-4 rounded-lg"></div>
        <div className="w-full h-4 bg-blue-100 mb-3 rounded-lg"></div>
        <div className="w-full h-4 bg-blue-100 mb-3 rounded-lg"></div>
        <div className="w-5/6 h-4 bg-blue-100 mb-3 rounded-lg"></div>
        <div className="w-24 h-4 bg-blue-100 mt-auto rounded-lg"></div>
      </div>
    ))
  ), [visibleCount]);

  // Pagination dots
  const paginationDots = useMemo(() => {
    if (isLoading || error || feedItems.length === 0 || isLanguageChanging) return null;
    
    const totalPages = Math.ceil(feedItems.length / visibleCount);
    const currentPage = Math.floor(currentStartIndex / visibleCount);
    const maxDots = 5; // Max number of dots to show
    
    let startPage, endPage;
    if (totalPages <= maxDots) {
      startPage = 0;
      endPage = totalPages - 1;
    } else {
      const halfMax = Math.floor(maxDots / 2);
      if (currentPage <= halfMax) {
        startPage = 0;
        endPage = maxDots - 1;
      } else if (currentPage >= totalPages - 1 - halfMax) {
        startPage = totalPages - maxDots;
        endPage = totalPages - 1;
      } else {
        startPage = currentPage - halfMax;
        endPage = currentPage + halfMax;
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => {
      const pageIndex = startPage + i;
      return (
        <button
          key={`dot-${pageIndex}`}
          onClick={() => setCurrentStartIndex(pageIndex * visibleCount)}
          className={`${windowWidth < BREAKPOINTS.mobile ? 'w-4 h-4' : 'w-3 h-3'} mx-1 rounded-full transition-all ${
            currentPage === pageIndex ? "bg-blue-600 scale-125" : "bg-blue-200 hover:bg-blue-400"
          }`}
          aria-label={`Go to page ${pageIndex + 1}`}
        />
      );
    });
  }, [isLoading, error, feedItems.length, visibleCount, currentStartIndex, windowWidth, isLanguageChanging]);

  return (
    <section 
      id="news-feed"
      className="relative w-full min-h-fit bg-gradient-to-br from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8"
      aria-busy={isLoading || isLanguageChanging}
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-20 blur-xl"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-blue-200 opacity-15 blur-xl"></div>
        </div>

        {/* Title section */}
        <motion.div 
          className="relative w-full mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block relative">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
              {t.worldLatestTechNews || "WORLD'S LATEST TECH NEWS"}
            </h2>
            {!prefersReducedMotion && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isVisible ? { 
                  scaleX: 1,
                  transition: {
                    ...SPRING_CONFIG,
                    delay: 0.3
                  }
                } : {}}
                className="absolute -bottom-2 left-0 right-0 mx-auto h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                style={{ width: '70%' }}
              />
            )}
          </div>
        </motion.div>
        
        {/* Error state */}
        {error ? (
          <motion.div 
            className="text-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-red-500 mb-4">Error loading news feed: {error}</p>
            <button 
              onClick={fetchFeed}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
              aria-label="Retry loading news feed"
            >
              Retry
            </button>
          </motion.div>
        ) : (
          <div className="relative">
            {/* Previous button */}
            <button
              onClick={prevPage}
              aria-label="Previous articles"
              disabled={isLoading || feedItems.length <= visibleCount || isLanguageChanging}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-50 transition-all z-10 border border-blue-100 hover:border-blue-200 ${
                isLoading || feedItems.length <= visibleCount || isLanguageChanging ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>

            {/* Feed items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading || isLanguageChanging ? (
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
                    whileHover={{ y: -5 }}
                    className="group bg-white p-6 rounded-2xl shadow-lg border border-blue-100 flex flex-col h-full hover:shadow-xl transition-all duration-300"
                    aria-labelledby={`article-title-${item.id}`}
                  >
                    <div className="flex-grow">
                      {item.date && (
                        <time dateTime={item.date} className="text-sm text-blue-500 mb-2 block">
                          {item.date}
                        </time>
                      )}
                      <h3 id={`article-title-${item.id}`} className="text-xl font-semibold text-blue-900 mb-3 line-clamp-2">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 transition-colors"
                        >
                          {item.title}
                        </a>
                      </h3>
                      <p className="text-blue-900/90 mb-4 line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group-hover:underline"
                      aria-label={`${t.readMore || "Read more"} about ${item.title}`}
                    >
                      {t.readMore || "Read more"} <FiExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </motion.article>
                ))
              )}
            </div>

            {/* Next button */}
            <button
              onClick={nextPage}
              aria-label="Next articles"
              disabled={isLoading || feedItems.length <= visibleCount || isLanguageChanging}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-50 transition-all z-10 border border-blue-100 hover:border-blue-200 ${
                isLoading || feedItems.length <= visibleCount || isLanguageChanging ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Pagination dots */}
        {!isLoading && !error && !isLanguageChanging && feedItems.length > visibleCount && (
          <motion.div 
            className="flex justify-center mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center space-x-2">
              {paginationDots}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}