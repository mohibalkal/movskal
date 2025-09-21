import { useState } from 'react';
import { triggerHapticFeedback, triggerSuccessHaptic } from '@/utils/haptic-feedback';
import { useNavigate, Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import { useAuth } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
// import { FcGoogle } from 'react-icons/fc'; // Removed colorful icon
import { useTranslation } from 'react-i18next';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerHapticFeedback(20);
    if (password !== confirmPassword) {
      alert(t('auth.passwordMismatch', 'Passwords do not match'));
      return;
    }
    setIsLoading(true);
    try {
      await signUp(email, password);
      triggerSuccessHaptic();
      await trackEvent({
        name: 'user_signup',
        params: {
          method: 'email',
          email,
        },
      });
      navigate('/');
    } catch (error) {
      // Error is handled in auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    triggerHapticFeedback(20);
    setIsLoading(true);
    try {
      await signInWithGoogle();
      await trackEvent({
        name: 'user_signup',
        params: {
          method: 'google',
        },
      });
      navigate('/');
    } catch (error) {
      // Error is handled in auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{t('auth.createAccountTitle', 'Create an account')}</CardTitle>
          <CardDescription>{t('auth.createAccountSubtitle', 'Enter your email below to create your account')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email', 'Email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('auth.emailPlaceholder', 'Enter your email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password', 'Password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t('auth.passwordPlaceholder', 'Enter your password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">{t('auth.confirmPassword', 'Confirm Password')}</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder={t('auth.confirmPasswordPlaceholder', 'Confirm your password')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t('auth.creatingAccount', 'Creating account...') : t('auth.createAccount', 'Create account')}
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t('auth.orContinueWith', 'Or continue with')}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            {/* <FcGoogle className="mr-2 h-4 w-4" /> */} {/* Removed colorful icon */}
            Google {/* Replaced icon with text */}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            {t('auth.alreadyHaveAccount', 'Already have an account?')}{' '}
            <Link to="/login" className="text-white hover:underline"> {/* Changed text-primary to text-white */}
              {t('navigation.signIn', 'Sign in')}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}