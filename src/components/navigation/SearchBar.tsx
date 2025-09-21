import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, ArrowRight, Film, Tv } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from 'react-i18next';
import { searchMedia } from '@/utils/api';
import { Media } from '@/utils/types';

interface SearchBarProps {
  isMobile?: boolean;
  onSearch?: () => void;
  className?: string;
  expanded?: boolean;
  onToggleExpand?: () => void;
}

const SearchBar = ({ 
  isMobile = false, 
  onSearch,
  className = '',
  expanded = false,
  onToggleExpand
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Media[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        if (onToggleExpand) onToggleExpand();
        else searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onToggleExpand]);

  useEffect(() => {
    if (expanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [expanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        try {
          const results = await searchMedia(searchQuery);
          setSearchSuggestions(results.slice(0, 6));
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSearchSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSuggestions(false);
      if (onSearch) onSearch();
      if (onToggleExpand) onToggleExpand();

      toast({
        title: "Searching...",
        description: `Finding results for "${searchQuery.trim()}"`,
        duration: 2000,
      });
    }
  };

  const handleSuggestionClick = (item: Media) => {
    navigate(`/${item.media_type}/${item.id}`);
    setSearchQuery('');
    setShowSuggestions(false);
    if (onSearch) onSearch();
    if (onToggleExpand) onToggleExpand();

    toast({
      title: "Navigating...",
      description: `Going to ${item.title || item.name}`,
      duration: 2000,
    });
  };

  // For mobile collapsed state (icon only)
  if (isMobile && !expanded) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleExpand}
        className="text-white hover:bg-white/10"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <form onSubmit={handleSearch} className={`search-container ${isMobile ? 'w-full' : 'w-64'} ${className}`}>
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4 pointer-events-none" />
        <Input
          type="search"
          placeholder={t('common.search', 'بحث')}
          className="search-input pl-8 pr-12 h-10" // Reduced left padding to move text left
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          ref={searchInputRef}
        />

        <Button
          type="submit"
          size="icon"
          className="search-button absolute right-2.5 top-1/2 transform -translate-y-1/2" // Adjusted right position
          aria-label="Search"
        >
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>

        {showSuggestions && searchSuggestions.length > 0 && (
          <div ref={suggestionsRef} className="search-suggestions">
            {searchSuggestions.map((item) => (
              <button
                key={`${item.media_type}-${item.id}`}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(item)}
              >
                <span className="mr-2 flex-shrink-0">
                  {item.media_type === 'movie' ?
                    <Film className="h-4 w-4 text-white/70" /> :
                    <Tv className="h-4 w-4 text-white/70" />
                  }
                </span>
                <span className="flex-1 text-left truncate">{item.title || item.name}</span>
                <span className="ml-2 opacity-50 text-xs bg-white/10 px-1.5 py-0.5 rounded flex-shrink-0">Enter</span>
              </button>
            ))}
            <button
              onClick={handleSearch}
              className="suggestion-item font-medium text-white/90 justify-center" // Changed text-accent to text-white/90
            >
              View all results for "{searchQuery}"
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
