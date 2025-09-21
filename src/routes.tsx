
import { Routes, Route, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AnalyticsWrapper } from '@/components/AnalyticsWrapper';

// Lazy load pages
const Index = lazy(() => import('./pages/Index'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazy(() => import('./pages/Profile'));
const Movies = lazy(() => import('./pages/Movies'));
const TVShowsPage = lazy(() => import('./pages/tv'));
const Sports = lazy(() => import('./pages/Sports'));
const Search = lazy(() => import('./pages/Search'));
const WatchHistory = lazy(() => import('./pages/WatchHistory'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));
const TVDetails = lazy(() => import('./pages/TVDetails'));
const SportMatch = lazy(() => import('./pages/SportMatch'));
const SportMatchPlayer = lazy(() => import('./pages/SportMatchPlayer'));
const Player = lazy(() => import('./pages/Player'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Trending = lazy(() => import('./pages/Trending'));
const SettingsPage = lazy(() => import('./pages/Settings'));

// Live streams pages
const LiveStreams = lazy(() => import('./pages/LiveStreams'));
const LiveStreamPlayer = lazy(() => import('./pages/LiveStreamPlayer'));

// Legal pages
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const ContentRemoval = lazy(() => import('./pages/ContentRemoval'));
const DMCANotice = lazy(() => import('./pages/DMCANotice'));

// Actor pages
const ActorDetails = lazy(() => import('./pages/ActorDetails'));
const Actors = lazy(() => import('./pages/Actors'));

// Arabic content pages
const ArabicMovies = lazy(() => import('./pages/ArabicMovies'));
const ArabicTVShows = lazy(() => import('./pages/ArabicTVShows'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnalyticsWrapper>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/watch-history" element={<WatchHistory />} />
          </Route>

          {/* Content routes */}
          <Route path="/movie" element={<Movies />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/tv" element={<TVShowsPage />} />
          <Route path="/tv/:id" element={<TVDetails />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/sports/:id" element={<SportMatch />} />
          <Route path="/sports/player/:id" element={<SportMatchPlayer />} />
          <Route path="/watch/:type/:id" element={<Player />} />
          <Route path="/watch/:type/:id/:season/:episode" element={<Player />} />
          <Route path="/search" element={<Search />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Live streams routes */}
          <Route path="/live" element={<LiveStreams />} />
          <Route path="/watch/live/:id" element={<LiveStreamPlayer />} />

          {/* Actor routes */}
          <Route path="/actor/:id" element={<ActorDetails />} />
          <Route path="/actors" element={<Actors />} />

          {/* Arabic content routes */}
          <Route path="/arabic-movies" element={<ArabicMovies />} />
          <Route path="/arabic-tv" element={<ArabicTVShows />} />

          {/* Legal routes */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/content-removal" element={<ContentRemoval />} />
          <Route path="/dmca" element={<DMCANotice />} />

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnalyticsWrapper>
    </Suspense>
  );
}
