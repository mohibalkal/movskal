import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActorDetails, ActorCredit } from '@/utils/services/actor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Film, Tv, Star, Calendar, TrendingUp } from 'lucide-react';

interface ActorStatsProps {
  actor: ActorDetails;
  filmography: { cast: ActorCredit[]; crew: ActorCredit[] };
}

export const ActorStats: React.FC<ActorStatsProps> = ({ actor, filmography }) => {
  const { t } = useTranslation();

  // Calculate statistics
  const totalWorks = filmography.cast.length + filmography.crew.length;
  const movies = filmography.cast.filter(credit => credit.media_type === 'movie').length;
  const tvShows = filmography.cast.filter(credit => credit.media_type === 'tv').length;
  
  // Calculate average rating
  const ratedWorks = filmography.cast.filter(credit => credit.vote_average > 0);
  const averageRating = ratedWorks.length > 0 
    ? ratedWorks.reduce((sum, credit) => sum + credit.vote_average, 0) / ratedWorks.length 
    : 0;

  // Get recent works (last 5 years)
  const currentYear = new Date().getFullYear();
  const recentWorks = filmography.cast.filter(credit => {
    const year = new Date(credit.release_date || credit.first_air_date || '1900-01-01').getFullYear();
    return year >= currentYear - 5;
  }).length;

  // Prepare chart data for yearly activity
  const yearlyData = filmography.cast.reduce((acc, credit) => {
    const year = new Date(credit.release_date || credit.first_air_date || '1900-01-01').getFullYear();
    if (year >= currentYear - 10) { // Last 10 years
      const existing = acc.find(item => item.year === year);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ year, count: 1 });
      }
    }
    return acc;
  }, [] as { year: number; count: number }[]).sort((a, b) => a.year - b.year);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Basic Stats */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            {t('actor.popularity')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/80">{t('actor.popularity')}</span>
              <Badge variant="secondary">{actor.popularity.toFixed(1)}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80">{t('actor.allWorks')}</span>
              <Badge variant="outline">{totalWorks}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80">{t('actor.recentWorks')}</span>
              <Badge variant="outline">{recentWorks}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Type Breakdown */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Film className="w-5 h-5" />
            {t('actor.filmography')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/80 flex items-center gap-2">
                <Film className="w-4 h-4" />
                {t('actor.movies')}
              </span>
              <Badge variant="outline">{movies}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80 flex items-center gap-2">
                <Tv className="w-4 h-4" />
                {t('actor.tvShows')}
              </span>
              <Badge variant="outline">{tvShows}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80 flex items-center gap-2">
                <Star className="w-4 h-4" />
                {t('media.rating')}
              </span>
              <Badge variant="outline">{averageRating.toFixed(1)}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Yearly Activity Summary */}
      <Card className="bg-white/5 border-white/10 md:col-span-2 lg:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {t('actor.recentWorks')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {yearlyData.length > 0 ? (
            <div className="space-y-2">
              {yearlyData.slice(-5).map((item) => (
                <div key={item.year} className="flex justify-between items-center">
                  <span className="text-white/80">{item.year}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${Math.min((item.count / Math.max(...yearlyData.map(d => d.count))) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-white/60 text-sm">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white/60 text-center py-8">
              {t('actor.noWorksFound')}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActorStats;
