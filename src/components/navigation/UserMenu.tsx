
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, LogOut, Settings, User, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  mobile?: boolean;
  onAction?: () => void;
}

const UserMenu = ({ mobile = false, onAction }: UserMenuProps) => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await logout();
      setIsOpen(false);
      if (onAction) onAction();
      toast({
        title: t('auth.logoutSuccess', 'Logged out successfully!'),
        description: t('auth.logoutSuccessDescription', 'You have been successfully signed out.'),
      });
    } catch (error) {
      toast({
        title: t('common.error', 'Error'),
        description: t('auth.logoutFailed', 'Failed to sign out. Please try again.'),
        variant: "destructive",
      });
    }
  };

  if (mobile) {
    return (
      <div className="flex flex-col space-y-2">
        <Link 
          to="/profile" 
          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          aria-label={t('navigation.profile', 'Profile')}
          onClick={onAction}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="text-left">
            <div className="font-medium">{user?.displayName || t('common.user', 'User')}</div>
            <div className="text-xs text-white/60">{user?.email}</div>
          </div>
        </Link>
        
        <Link 
          to="/watch-history" 
          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          onClick={onAction}
        >
          <History className="h-5 w-5 text-white" />
          <div className="text-left">
            <div className="font-medium">{t('navigation.watchHistory', 'Watch History')}</div>
          </div>
        </Link>

        <Link 
          to="/settings" 
          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          onClick={onAction}
        >
          <Settings className="h-5 w-5 text-white" />
          <div className="text-left">
            <div className="font-medium">{t('navigation.settings', 'Settings')}</div>
          </div>
        </Link>

        <Button 
          variant="outline" 
          className="w-full justify-start text-white/80"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t('navigation.signOut', 'Sign Out')}
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="nav-profile-button">
          <span className="sr-only">{t('navigation.userMenu', 'User menu')}</span>
          <UserCircle className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56 mt-1 bg-black/95 backdrop-blur-xl border-white/10 p-2">
        <div className="flex items-center gap-3 p-2 mb-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="text-left">
            <div className="font-medium">{user?.displayName || t('common.user', 'User')}</div>
            <div className="text-xs text-white/60">{user?.email}</div>
          </div>
        </div>
        
        <DropdownMenuSeparator className="bg-white/10" />
        
        <DropdownMenuItem asChild className="cursor-pointer h-9">
          <Link to="/profile" className="flex items-center" onClick={() => { setIsOpen(false); if (onAction) onAction(); }}>
            <User className="mr-2 h-4 w-4" />
            <span>{t('navigation.profile', 'Profile')}</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild className="cursor-pointer h-9">
          <Link to="/watch-history" className="flex items-center" onClick={() => { setIsOpen(false); if (onAction) onAction(); }}>
            <History className="mr-2 h-4 w-4" />
            <span>{t('navigation.watchHistory', 'Watch History')}</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild className="cursor-pointer h-9">
          <Link to="/settings" className="flex items-center" onClick={() => { setIsOpen(false); if (onAction) onAction(); }}>
            <Settings className="mr-2 h-4 w-4" />
            <span>{t('navigation.settings', 'Settings')}</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-white/10" />
        
        <DropdownMenuItem 
          className="cursor-pointer text-red-400 focus:text-red-400 h-9" 
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t('navigation.signOut', 'Sign Out')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
