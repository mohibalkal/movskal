import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropdownItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface DropdownMenuProps {
  title: string;
  items: DropdownItem[];
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, items, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 text-sm transition-colors hover:text-white",
          isOpen ? "text-white font-medium" : "text-white/70"
        )}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      <div className={`absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl z-[100] transition-all duration-200 ${
        isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
      }`}>
        <div className="py-2">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {item.icon && <span className="text-pink-400">{item.icon}</span>}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
