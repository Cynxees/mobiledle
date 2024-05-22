import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Amplify } from 'aws-amplify';
import { QueryClient, QueryClientProvider } from 'react-query';
import amplifyconfig from './amplifyconfiguration.json';
import './i18n';

Amplify.configure(amplifyconfig);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
);

// hi
// ho