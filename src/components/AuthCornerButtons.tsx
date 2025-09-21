import React from 'react';
import { useAuth } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AuthCornerButtons = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // إضافة تصحيح لمعرفة حالة المستخدم
  console.log('AuthCornerButtons - user:', user);

  // لا تظهر الأزرار إذا كان المستخدم مسجل دخول
  if (user) {
    console.log('AuthCornerButtons - user is logged in, not showing buttons');
    return null;
  }

  console.log('AuthCornerButtons - showing buttons for non-logged in user');

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/login')}
        className="bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90 transition-all duration-200 shadow-lg text-foreground"
      >
        {t('navigation.signIn')}
      </Button>
      
      <Button
        variant="default"
        size="sm"
        onClick={() => navigate('/signup')}
        className="bg-accent hover:bg-accent/90 transition-all duration-200 shadow-lg"
      >
        {t('navigation.signUp')}
      </Button>
    </div>
  );
};

export default AuthCornerButtons;
