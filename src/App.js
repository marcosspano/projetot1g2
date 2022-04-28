import React from 'react';
import './App.css';
import Router from './routes';

import { ContextMenuMobileProvider } from './hooks/useMenuMobile';
import { ContextSessionProvider } from './hooks/useSession';
// import { server } from './server';

import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

// server();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ContextMenuMobileProvider>
          <ContextSessionProvider>
            <Router/>
          </ContextSessionProvider>
        </ContextMenuMobileProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;