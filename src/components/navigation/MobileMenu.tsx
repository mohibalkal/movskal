
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, Film, Tv2, Trophy, Flame, Search, User, History, X, Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks';
import { useTranslation } from 'react-i18next';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.05,
        when: 'beforeChildren',
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: 20,
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const menuItems = [
    { name: t('mobileMenu.home', 'Home'), path: '/', icon: Home },
    { name: t('mobileMenu.movies', 'Movies'), path: '/movie', icon: Film },
    { name: t('mobileMenu.tvShows', 'TV Shows'), path: '/tv', icon: Tv2 },
    { name: t('mobileMenu.sports', 'Sports'), path: '/sports', icon: Trophy },
    { name: t('mobileMenu.trending', 'Trending'), path: '/trending', icon: Flame },
    { name: t('actor.popularWorks'), path: '/actors', icon: Users },
    { name: t('mobileMenu.search', 'Search'), path: '/search', icon: Search },
  ];

  if (user) {
    menuItems.push(
      { name: t('mobileMenu.profile', 'Profile'), path: '/profile', icon: User },
      { name: t('mobileMenu.watchHistory', 'Watch History'), path: '/watch-history', icon: History }
    );
  } else {
    menuItems.push(
      { name: t('mobileMenu.login', 'Login'), path: '/login', icon: User },
      { name: t('mobileMenu.signUp', 'Sign Up'), path: '/signup', icon: User }
    );
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Menu */}
      <motion.div
        className="fixed top-0 right-0 bottom-0 w-64 bg-background/95 backdrop-blur-lg shadow-lg z-50 overflow-y-auto"
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        <div className="flex justify-end p-4">
          <button 
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white transition-colors"
            aria-label={t('mobileMenu.closeMenu', 'Close menu')}
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="px-4 pb-6">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <motion.li key={item.path} variants={menuItemVariants}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={cn(
                    "flex items-center py-3 px-4 rounded-md transition-colors",
                    isActive(item.path)
                      ? "bg-accent/20 text-white"
                      : "hover:bg-white/10 text-white/70 hover:text-white"
                  )}
                >
                  <item.icon size={18} className="mr-3" />
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </>
  );
};

export default MobileMenu;
