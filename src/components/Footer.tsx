
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, 
  Github, 
  Twitter, 
  Facebook, 
  Instagram, 
  Mail, 
  ChevronDown, 
  Heart,
  Smartphone
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const FooterSection = ({ 
    title, 
    children, 
    id 
  }: { 
    title: string; 
    children: React.ReactNode; 
    id: string;
  }) => {
    const isExpanded = expandedSection === id;
    
    return (
      <div className="w-full">
        {isMobile ? (
          <div className="w-full">
            <button 
              onClick={() => toggleSection(id)}
              className="w-full flex justify-between items-center py-3 text-white font-medium"
            >
              <span>{title}</span>
              <ChevronDown 
                className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} 
              />
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? 'max-h-60 opacity-100 mb-4' : 'max-h-0 opacity-0'
              }`}
            >
              {children}
            </div>
            {!isExpanded && <Separator className="bg-white/10 my-1" />}
          </div>
        ) : (
          <div className="w-full">
            <h3 className="text-white font-medium text-lg mb-4">{title}</h3>
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <footer className="mt-auto bg-gradient-to-b from-black/60 to-black border-t border-white/10 pt-8 pb-6">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className={`${isMobile ? 'flex flex-col' : 'grid grid-cols-1 md:grid-cols-4 gap-8'}`}>
          
          {/* About Section */}
          <FooterSection title={t('footer.about')} id="about">
            <p className="text-white/70 text-sm mb-4">
              {t('footer.aboutDescription')}
            </p>
            {isMobile && (
              <div className="flex items-center mb-2">
                <Smartphone className="h-4 w-4 text-accent mr-2" />
                <span className="text-white/70 text-xs">{t('footer.downloadApp')}</span>
              </div>
            )}
          </FooterSection>
          
          {/* Quick Links */}
          <FooterSection title={t('footer.explore')} id="explore">
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-white/70 hover:text-accent transition-colors flex items-center">
                  <span className="w-1 h-1 bg-accent/70 rounded-full mr-2"></span>
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-white/70 hover:text-accent transition-colors flex items-center">
                  <span className="w-1 h-1 bg-accent/70 rounded-full mr-2"></span>
                  {t('navigation.movies')}
                </Link>
              </li>
              <li>
                <Link to="/tv" className="text-white/70 hover:text-accent transition-colors flex items-center">
                  <span className="w-1 h-1 bg-accent/70 rounded-full mr-2"></span>
                  {t('navigation.tvShows')}
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-white/70 hover:text-accent transition-colors flex items-center">
                  <span className="w-1 h-1 bg-accent/70 rounded-full mr-2"></span>
                  {t('navigation.trending')}
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-white/70 hover:text-accent transition-colors flex items-center">
                  <span className="w-1 h-1 bg-accent/70 rounded-full mr-2"></span>
                  {t('navigation.search')}
                </Link>
              </li>
            </ul>
          </FooterSection>
          
          {/* Legal */}
          <FooterSection title={t('footer.legal')} id="legal">
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-white/70 hover:text-accent transition-colors flex items-center">
                  <span className="w-1 h-1 bg-accent/70 rounded-full mr-2"></span>
                  {t('footer.termsOfService')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/70 hover:text-accent transition-colors flex items-center">
                  <span className="w-1 h-1 bg-accent/70 rounded-full mr-2"></span>
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link to="/dmca" className="text-white/70 hover:text-accent transition-colors flex items-center">
                  <span className="w-1 h-1 bg-accent/70 rounded-full mr-2"></span>
                  {t('footer.dmcaNotice')}
                </Link>
              </li>
              <li>
                <Link to="/content-removal" className="text-white/70 hover:text-accent transition-colors flex items-center">
                  <span className="w-1 h-1 bg-accent/70 rounded-full mr-2"></span>
                  {t('footer.contentRemoval')}
                </Link>
              </li>
            </ul>
          </FooterSection>
          
          {/* Social */}
          <FooterSection title={t('footer.connect')} id="connect">
            <div className="flex flex-wrap gap-2">
              <a 
                href="https://github.com/chintan992" 
                className="bg-white/5 hover:bg-accent/20 hover:scale-105 p-2 rounded-full transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-white" />
              </a>
              <a 
                href="https://x.com/sid992r" 
                className="bg-white/5 hover:bg-accent/20 hover:scale-105 p-2 rounded-full transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-white" />
              </a>
              <a 
                href="https://facebook.com/chintan992" 
                className="bg-white/5 hover:bg-accent/20 hover:scale-105 p-2 rounded-full transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a 
                href="https://instagram.com/chintan992" 
                className="bg-white/5 hover:bg-accent/20 hover:scale-105 p-2 rounded-full transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a 
                href="mailto:chintanr21@gmail.com" 
                className="bg-white/5 hover:bg-accent/20 hover:scale-105 p-2 rounded-full transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-white" />
              </a>
            </div>
            <p className="mt-4 text-white/50 text-xs flex items-center">
              <span className="mr-1">{t('footer.poweredBy')}</span>
              <a 
                href="https://www.themoviedb.org/" 
                className="hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                TMDB
              </a>
            </p>
          </FooterSection>
        </div>
        
        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-white/50 text-xs flex items-center">
              {t('footer.copyright')}
            </p>
            
            <p className="text-white/50 text-xs hidden md:block">
              {t('footer.disclaimer')}
            </p>
          </div>
          
          {isMobile && (
            <p className="text-white/50 text-xs mt-2">
              {t('footer.disclaimer')}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
