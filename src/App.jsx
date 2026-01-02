import React from 'react';
import { WindowProvider } from './context/WindowContext';
import { SystemProvider, useSystem } from './context/SystemContext';
import BlackScreen from './components/System/BlackScreen';
import BootScreen from './components/System/BootScreen';
const DesktopEnvironment = React.lazy(() => import('./components/Layout/DesktopEnvironment'));
const LoginScreen = React.lazy(() => import('./components/System/LoginScreen'));

// Optimization: Preload Desktop when possible
const preloadDesktop = () => {
  import('./components/Layout/DesktopEnvironment');
};

const SystemManager = () => {
  const { systemState } = useSystem();

  // Trigger preload when booting
  React.useEffect(() => {
    if (systemState === 'BOOTING') {
      preloadDesktop();
    }
  }, [systemState]);

  switch (systemState) {
    case 'OFF':
      return <BlackScreen />;
    case 'BOOTING':
      return <BootScreen />;
    case 'LOGIN':
      return (
        <React.Suspense fallback={<BootScreen />}>
          <LoginScreen />
        </React.Suspense>
      );
    case 'DESKTOP':
      return (
        <React.Suspense fallback={<div className="h-full w-full bg-[#004E98]" />}>
          <div className="animate-fade-in h-full w-full">
            <WindowProvider>
              <DesktopEnvironment />
            </WindowProvider>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fadeIn 3s ease-in-out;
                }
            `}</style>
          </div>
        </React.Suspense>
      );
    default:
      return <BlackScreen />;
  }
};

const App = () => {
  return (
    <SystemProvider>
      <SystemManager />
    </SystemProvider>
  );
};

export default App;
