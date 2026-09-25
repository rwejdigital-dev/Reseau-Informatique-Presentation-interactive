import { useLayoutEffect } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, useLocation } from 'wouter';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SiteShell } from '@/components/SiteShell';
import { ConversationPage } from '@/pages/ConversationPage';
import { InfrastructurePage } from '@/pages/InfrastructurePage';
import { PresentationPage } from '@/pages/PresentationPage';
import { TerritoriesPage } from '@/pages/TerritoriesPage';
import { TrustPage } from '@/pages/TrustPage';

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="flex min-h-[calc(100dvh-73px)] items-center justify-center bg-[#082b32] px-6 text-center text-[#f2eee4]">
      <div>
        <span className="font-mono-craft text-[10px] uppercase tracking-[.2em] text-[#ed6a3c]">Erreur 404</span>
        <h1 className="mt-5 font-display text-6xl">Territoire inconnu.</h1>
        <p className="mt-4 text-sm text-[#dce8df]/70">Cette adresse ne correspond à aucun chapitre.</p>
      </div>
    </div>
  );
}

function RoutedChapters() {
  const [location] = useLocation();
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: reducedMotion ? 0 : 0.38, ease: 'easeOut' }}
      >
        <Switch>
          <Route path="/" component={PresentationPage} />
          <Route path="/territoires" component={TerritoriesPage} />
          <Route path="/infrastructure" component={InfrastructurePage} />
          <Route path="/conversation" component={ConversationPage} />
          <Route path="/confiance" component={TrustPage} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MotionConfig reducedMotion="user">
          <SiteShell>
            <RoutedChapters />
          </SiteShell>
          <Toaster />
        </MotionConfig>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;