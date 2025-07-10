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
  const { translateDynamicText, t, isClient } = useTranslation();

  const visibleCount = useMemo(() => {
    if (windowWidth < BREAKPOINTS.mobile) return 1;
    if (windowWidth < BREAKPOINTS.tablet) return 2;
    return 3;
  }, [windowWidth]);

  const visibleItems = useMemo(() => (
    feedItems.slice(currentStartIndex, currentStartIndex + visibleCount)
  ), [feedItems, currentStartIndex, visibleCount]);

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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Reset to first page when screen size changes
      setCurrentStartIndex(0);
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage]);

  useEffect(() => {
    if (feedItems.length === 0 || isLoading || error) return;

    const interval = setInterval(() => {
      nextPage();
    }, 8000);

    return () => clearInterval(interval);
  }, [feedItems.length, isLoading, error, nextPage]);

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

  const paginationDots = useMemo(() => {
    if (isLoading || error || feedItems.length === 0) return null;
    
    const totalPages = Math.ceil(feedItems.length / visibleCount);
    const currentPage = Math.floor(currentStartIndex / visibleCount);
    const maxDots = 5;
    
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
  }, [isLoading, error, feedItems.length, visibleCount, currentStartIndex, windowWidth]);

  return (
    <section 
      id="news-feed"
      className="relative w-full min-h-fit bg-gradient-to-br from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8"
      aria-busy={isLoading}
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-20 blur-xl"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-blue-200 opacity-15 blur-xl"></div>
        </div>

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
            <button
              onClick={prevPage}
              aria-label="Previous articles"
              disabled={isLoading || feedItems.length <= visibleCount}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-50 transition-all z-10 border border-blue-100 hover:border-blue-200 ${
                isLoading || feedItems.length <= visibleCount ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      aria-label={`Read more about ${item.title}`}
                    >
                      Read more <FiExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </motion.article>
                ))
              )}
            </div>

            <button
              onClick={nextPage}
              aria-label="Next articles"
              disabled={isLoading || feedItems.length <= visibleCount}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-50 transition-all z-10 border border-blue-100 hover:border-blue-200 ${
                isLoading || feedItems.length <= visibleCount ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {!isLoading && !error && feedItems.length > visibleCount && (
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