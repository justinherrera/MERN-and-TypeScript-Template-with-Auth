import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css'
import AppRouter from '../src/routes/AppRouter';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <AppRouter />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

