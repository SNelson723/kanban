import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
console.log('howdy')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* store */}
    <Provider store={store}>
      <ToastContainer theme="colored" pauseOnHover={false} />
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
