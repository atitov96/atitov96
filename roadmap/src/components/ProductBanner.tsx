"use client";
import { useState, useLayoutEffect, useRef, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { analytics } from "@/utils/analytics";

const products = [
  {
    id: "basic",
    title: "Задачник прогера",
    price: "950 ₽",
    description:
      "Полный набор практических задач для подготовки к собеседованиям",
    features: [
      "Go задачник",
      "Python практикум",
      "SQL упражнения",
      "System Design кейсы",
      "API дизайн задачи",
    ],
    link: "https://t.me/tribute/app?startapp=paUP",
    color: "bg-purple-100",
  },
  {
    id: "pro",
    title: "Задачник прогера PRO",
    price: "1,950 ₽",
    description: "Авторские решения и детальные разборы всех задач",
    features: [
      "Детальный разбор каждой задачи",
      "Альтернативные решения",
      "Best practices и паттерны",
      "Code review комментарии",
      "Рекомендации по оптимизации",
    ],
    link: "https://t.me/tribute/app?startapp=paUQ",
    color: "bg-orange-100",
  },
  {
    id: "automation",
    title: "Гуру автоматизаций",
    price: "9,500 ₽",
    description: "Полный курс по созданию автоматизаций и интеграций",
    features: [
      "No-Code/Low-Code платформы",
      "Практические проекты",
      "AI интеграции",
      "Система достижений",
      "Техническая поддержка",
    ],
    link: "https://t.me/tribute/app?startapp=paUS",
    color: "bg-blue-100",
  },
];

export default function ProductBanner() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrolling = useRef(false);

  useLayoutEffect(() => {
    const mainElement = document.querySelector("main");
    if (mainElement) {
      const paddingBottom = isMinimized ? "50px" : "350px";
      mainElement.style.paddingBottom = paddingBottom;
    }
  }, [isMinimized]);

  useEffect(() => {
    analytics.trackProductBanner("view", "all");
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const slideWidth = clientWidth * 0.85;

    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    setActiveSlide(Math.round(scrollLeft / slideWidth));
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current || scrolling.current) return;

    scrolling.current = true;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.85;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    setTimeout(() => {
      scrolling.current = false;
    }, 500);
  };

  const scrollToSlide = (index: number) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const slideWidth = container.clientWidth * 0.85;
    container.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    });
  };

  const handleProductClick = (productId: string) => {
    analytics.trackProductBanner("click", productId);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            analytics.trackProductBanner("view", "all");
          }
        });
      },
      { threshold: 0.5 },
    );

    const bannerElement = document.querySelector(".product-banner");
    if (bannerElement) {
      observer.observe(bannerElement);
    }

    return () => {
      if (bannerElement) {
        observer.unobserve(bannerElement);
      }
    };
  }, []);

  return (
    <div className="fixed bottom-16 md:bottom-20 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40">
      <div className="relative">
        {/* Кнопка сворачивания */}
        <div className="absolute right-2 md:right-4 -top-8">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="bg-white p-2 rounded-t-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            {isMinimized ? (
              <ChevronUp size={20} className="text-gray-600" />
            ) : (
              <ChevronDown size={20} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Заголовок */}
        <div className="p-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">
              Прокачай навыки
            </h2>
            <a
              href="https://t.me/tribute/app?startapp=d6r4"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleProductClick("support")}
            >
              Поддержать
            </a>
          </div>
        </div>

        {/* Контент */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden relative"
            >
              <div className="px-4 pb-8 relative">
                {/* Навигационные стрелки */}
                <div className="md:hidden">
                  {showLeftArrow && (
                    <button
                      onClick={() => scroll("left")}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-r-lg shadow-md"
                      aria-label="Предыдущий слайд"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>
                  )}
                  {showRightArrow && (
                    <button
                      onClick={() => scroll("right")}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-l-lg shadow-md"
                      aria-label="Следующий слайд"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                  )}
                </div>

                {/* Карточки */}
                <div className="md:max-w-7xl md:mx-auto">
                  <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex md:grid md:grid-cols-3 md:gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 md:mx-0 px-4 md:px-0 space-x-4 md:space-x-0 no-scrollbar scroll-smooth"
                  >
                    {products.map((product) => (
                      <motion.div
                        key={product.id}
                        className={`${product.color} rounded-lg p-4 hover:shadow-md transition-all flex-shrink-0 w-[85vw] md:w-auto snap-center`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-800">
                            {product.title}
                          </h3>
                          <span className="font-bold text-blue-600">
                            {product.price}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {product.description}
                        </p>
                        <ul className="space-y-1 mb-4">
                          {product.features.map((feature, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-700 flex items-center gap-2"
                            >
                              <span className="text-green-500">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                          onClick={() => handleProductClick(product.id)}
                        >
                          Подробнее
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </a>
                      </motion.div>
                    ))}
                  </div>

                  {/* Индикаторы */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 md:hidden">
                    {products.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => scrollToSlide(index)}
                        className={`transition-all duration-300 rounded-full border ${
                          index === activeSlide
                            ? "w-6 h-2 bg-blue-600 border-blue-600"
                            : "w-2 h-2 bg-gray-300 hover:bg-gray-400 border-gray-300"
                        }`}
                        aria-label={`Слайд ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
