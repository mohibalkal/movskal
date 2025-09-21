
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DropdownMenu from './DropdownMenu';
import { Film, Tv, Users, TrendingUp } from 'lucide-react';

const NavLinks = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const movieItems = [
    { label: t('navigation.foreignMovies'), path: '/movies', icon: <Film className="w-4 h-4" /> },
    { label: t('navigation.arabicMovies'), path: '/arabic-movies', icon: <Film className="w-4 h-4" /> },
  ];

  const tvItems = [
    { label: t('navigation.foreignTVShows'), path: '/tv', icon: <Tv className="w-4 h-4" /> },
    { label: t('navigation.arabicTVShows'), path: '/arabic-tv', icon: <Tv className="w-4 h-4" /> },
  ];

  const links = [
    { name: t('navigation.home'), path: '/', key: 'home' },
    { name: t('navigation.movies'), path: '/movie', key: 'movies', dropdown: movieItems },
    { name: t('navigation.tvShows'), path: '/tv', key: 'tvShows', dropdown: tvItems },
    { name: t('navigation.sports'), path: '/sports', key: 'sports' },
    { name: t('navigation.trending'), path: '/trending', key: 'trending' },
    { name: t('actor.popularWorks'), path: '/actors', key: 'actors' },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
      {links.map((link, index) => {
        if (link.dropdown) {
          return (
            <DropdownMenu
              key={link.key}
              title={link.name}
              items={link.dropdown}
            />
          );
        }
        
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm transition-colors hover:text-white ${
              isActive(link.path) ? 'text-white font-medium' : 'text-white/70'
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLinks;
