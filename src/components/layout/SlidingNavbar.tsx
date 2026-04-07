import { useRef, useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import type { AppDefinition } from '@model/index';

interface SlidingNavbarProps {
  apps: AppDefinition[];
}

/**
 * SlidingNavbar Component
 * 
 * A horizontal scrollable navigation bar that can scale infinitely.
 * Features:
 * - Smooth horizontal scrolling with arrow buttons
 * - Mouse wheel horizontal scrolling
 * - Touch swipe support for mobile
 * - Auto-hiding arrows when at boundaries
 * - Active route highlighting
 * - Responsive design
 */
export const SlidingNavbar = ({ apps }: SlidingNavbarProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Filter apps - exclude dashboard as it's always first
  const navApps = apps.filter(app => app.id !== 'dashboard');

  const checkScrollPosition = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    // Use a smaller threshold for better detection
    setShowLeftArrow(scrollLeft > 5);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
  }, []);

  // Check scroll position on mount and resize
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    const raf = requestAnimationFrame(() => {
      checkScrollPosition();
    });
    
    window.addEventListener('resize', checkScrollPosition);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [checkScrollPosition]);

  // Also check after content loads (for images, fonts, etc.)
  useEffect(() => {
    const timeout = setTimeout(() => {
      checkScrollPosition();
    }, 100);
    return () => clearTimeout(timeout);
  }, [checkScrollPosition]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.8;
    const newScrollLeft = direction === 'left' 
      ? el.scrollLeft - scrollAmount 
      : el.scrollLeft + scrollAmount;

    el.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  // Handle mouse wheel - convert to horizontal scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      const el = scrollRef.current;
      if (el) {
        el.scrollLeft += e.deltaY;
      }
    }
  };

  // Handle touch swipe
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX - touchEndX;
    if (Math.abs(swipeDistance) > 50) {
      // Significant swipe detected
      const el = scrollRef.current;
      if (el) {
        el.scrollLeft += swipeDistance;
      }
    }
    setTouchStartX(0);
    setTouchEndX(0);
  };

  // Determine if arrows should be visible
  // On desktop, show arrows when hovering if there's scrollable content
  const shouldShowLeftArrow = showLeftArrow;
  const shouldShowRightArrow = showRightArrow;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Left Arrow - visible on desktop when hovering and there's content to scroll */}
      <button
        onClick={() => scroll('left')}
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 z-10
          w-8 h-8 rounded-full bg-black-800 border border-black-600
          flex items-center justify-center
          text-black-400 hover:text-802 hover:border-802/50
          transition-all duration-200 shadow-lg
          lg:opacity-0 lg:pointer-events-none
          ${shouldShowLeftArrow ? 'lg:opacity-100 lg:pointer-events-auto' : ''}
          ${isHovering ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={checkScrollPosition}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="
          flex items-center gap-1 overflow-x-auto
          scrollbar-hide scroll-smooth
          px-1
        "
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Home Link */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all duration-200
            ${isActive 
              ? 'bg-802/15 text-802 font-medium' 
              : 'text-black-400 hover:text-black-200 hover:bg-black-800'
            }`
          }
        >
          <Home className="w-4 h-4 flex-shrink-0" />
          <span className="hidden sm:inline">Home</span>
        </NavLink>

        {/* App Links */}
        {navApps.map(app => (
          <NavLink
            key={app.id}
            to={app.route}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all duration-200
              ${isActive 
                ? 'bg-802/15 text-802 font-medium' 
                : 'text-black-400 hover:text-black-200 hover:bg-black-800'
              }`
            }
          >
            {/* Icon - always visible */}
            <span className="w-4 h-4 flex-shrink-0">{app.icon}</span>
            {/* Name - hidden on very small screens, visible on larger */}
            <span className="hidden md:inline flex-shrink-0">{app.name}</span>
          </NavLink>
        ))}

      </div>

      {/* Right Arrow - visible on desktop when hovering and there's content to scroll */}
      <button
        onClick={() => scroll('right')}
        className={`
          absolute right-0 top-1/2 -translate-y-1/2 z-10
          w-8 h-8 rounded-full bg-black-800 border border-black-600
          flex items-center justify-center
          text-black-400 hover:text-802 hover:border-802/50
          transition-all duration-200 shadow-lg
          lg:opacity-0 lg:pointer-events-none
          ${shouldShowRightArrow ? 'lg:opacity-100 lg:pointer-events-auto' : ''}
          ${isHovering ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Gradient overlays for visual scroll indication - only show on hover */}
      <div className={`
        absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent pointer-events-none z-0
        transition-opacity duration-200
        ${isHovering && showLeftArrow ? 'opacity-100' : 'opacity-0'}
      `} />
      <div className={`
        absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none z-0
        transition-opacity duration-200
        ${isHovering && showRightArrow ? 'opacity-100' : 'opacity-0'}
      `} />
    </div>
  );
};