
import { Button } from '@/components/ui/button';
import { Heart, Bookmark, ArrowLeft, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface MediaActionsProps {
  isFavorite: boolean;
  isInWatchlist: boolean;
  onToggleFavorite: () => void;
  onToggleWatchlist: () => void;
  onBack: () => void;
  onViewDetails: () => void;
}

const MediaActions = ({
  isFavorite,
  isInWatchlist,
  onToggleFavorite,
  onToggleWatchlist,
  onBack,
  onViewDetails
}: MediaActionsProps) => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 py-4 mt-16"
    >
      <Button
        variant="ghost"
        size="sm"
        className="text-white/80 hover:text-white transition-colors"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t('player.back', 'Back')}
      </Button>

      <div className="flex-1" />

      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-full transition-all duration-300",
            isFavorite ? "text-white hover:text-gray-300" : "text-white/80 hover:text-white"
          )}
          onClick={onToggleFavorite}
        >
          <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-full transition-all duration-300",
            isInWatchlist ? "text-white hover:text-gray-300" : "text-white/80 hover:text-white"
          )}
          onClick={onToggleWatchlist}
        >
          <Bookmark className={cn("h-5 w-5", isInWatchlist && "fill-current")} />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default MediaActions;
