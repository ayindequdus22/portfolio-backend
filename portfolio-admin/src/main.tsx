import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import UsercontextProvider from './context.tsx'
  const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <UsercontextProvider>
    <App />
        </UsercontextProvider>
    </QueryClientProvider>

  </StrictMode>,
)
