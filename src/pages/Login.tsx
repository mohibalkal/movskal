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

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Map Firebase error codes to user-friendly messages
  const getFriendlyError = (error: unknown) => {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      typeof (error as { code: unknown }).code === 'string'
    ) {
      switch ((error as { code: string }).code) {
        case 'auth/invalid-email':
          return t('auth.errors.invalidEmail', 'Invalid email address.');
        case 'auth/user-disabled':
          return t('auth.errors.userDisabled', 'This user account has been disabled.');
        case 'auth/user-not-found':
          return t('auth.errors.userNotFound', 'No user found with this email.');
        case 'auth/wrong-password':
          return t('auth.errors.wrongPassword', 'Incorrect password.');
        case 'auth/too-many-requests':
          return t('auth.errors.tooManyRequests', 'Too many failed attempts. Please try again later.');
        default:
          return (error as { message?: string }).message || t('auth.errors.genericError', 'An error occurred. Please try again.');
      }
    }
    return t('auth.errors.genericError', 'An error occurred. Please try again.');
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerHapticFeedback(20);
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await signIn(email, password);
      triggerSuccessHaptic();
      await trackEvent({
        name: 'user_login',
        params: {
          method: 'email',
          email,
        },
      });
      navigate('/');
    } catch (error: unknown) {
      setErrorMessage(getFriendlyError(error));
      // Error is also handled in auth context (toast)
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    triggerHapticFeedback(20);
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await signInWithGoogle();
      await trackEvent({
        name: 'user_login',
        params: {
          method: 'google',
        },
      });
      navigate('/');
    } catch (error: unknown) {
      setErrorMessage(getFriendlyError(error));
      // Error is also handled in auth context (toast)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{t('auth.welcomeBackTitle', 'Welcome back')}</CardTitle>
          <CardDescription>{t('auth.signInSubtitle', 'Sign in to your account to continue')}</CardDescription>
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
                autoComplete="username"
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
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t('auth.signingIn', 'Signing in...') : t('navigation.signIn', 'Sign in')}
            </Button>
            {errorMessage && (
              <div className="mt-2 text-sm text-white/70 text-center" role="alert"> {/* Changed text-red-500 to text-white/70 */}
                {errorMessage}
              </div>
            )}
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
            {t('auth.dontHaveAccount', "Don't have an account?")}{' '}
            <Link to="/signup" className="text-white hover:underline"> {/* Changed text-primary to text-white */}
              {t('navigation.signUp', 'Sign up')}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}