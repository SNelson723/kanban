import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { BrowserRouter, Routes, Route } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* store */}
    <Provider store={store}>
      {/* router */}
      <BrowserRouter>
      {/* App */}
        <Routes>
          <Route path='/' element={<App/>}>
            <Route path="boards" element={<div>Boards</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
