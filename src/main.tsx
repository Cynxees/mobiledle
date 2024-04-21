import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
import './i18n';
import MobileLegendsCharactersProvider from './providers/MobileLegendsCharactersProvider.tsx';

let x = Amplify.configure(amplifyconfig)

ReactDOM.createRoot(document.getElementById('root')!).render(
    
    <MobileLegendsCharactersProvider>
      <App />
    </MobileLegendsCharactersProvider>,
)
