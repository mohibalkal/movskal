
import { TabsContent, TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import TabContent from './TabContent';

interface TVShowsTabsProps {
  activeTab: 'popular' | 'top_rated' | 'trending';
  onTabChange: (value: string) => void;
  viewMode: 'grid' | 'list';
  sortBy: 'default' | 'name' | 'first_air_date' | 'rating';
  genreFilter: string;
  platformFilters: string[];
}

const TVShowsTabs = ({ 
  activeTab, 
  onTabChange, 
  viewMode, 
  sortBy, 
  genreFilter, 
  platformFilters 
}: TVShowsTabsProps) => {
  const { t } = useTranslation();
  return (
    <Tabs defaultValue={activeTab} onValueChange={onTabChange}>
      <TabsList className="mb-4 md:mb-6">
        <TabsTrigger value="popular" className="data-[state=active]:bg-accent/20">{t('tvShows.tabs.popular', 'Popular')}</TabsTrigger>
        <TabsTrigger value="top_rated" className="data-[state=active]:bg-accent/20">{t('tvShows.tabs.topRated', 'Top Rated')}</TabsTrigger>
        <TabsTrigger value="trending" className="data-[state=active]:bg-accent/20">{t('tvShows.tabs.trending', 'Trending')}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="popular" className="focus-visible:outline-none animate-fade-in">
        <TabContent 
          type="popular" 
          viewMode={viewMode} 
          sortBy={sortBy}
          genreFilter={genreFilter}
          platformFilters={platformFilters}
        />
      </TabsContent>
      
      <TabsContent value="top_rated" className="focus-visible:outline-none animate-fade-in">
        <TabContent 
          type="top_rated" 
          viewMode={viewMode}
          sortBy={sortBy}
          genreFilter={genreFilter}
          platformFilters={platformFilters}
        />
      </TabsContent>
      
      <TabsContent value="trending" className="focus-visible:outline-none animate-fade-in">
        <TabContent 
          type="trending" 
          viewMode={viewMode}
          sortBy={sortBy}
          genreFilter={genreFilter}
          platformFilters={platformFilters}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TVShowsTabs;
