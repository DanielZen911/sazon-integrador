import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Header from './components/Header'
import { ProductDetailView } from './views/ProductDetailView';
import { CatalogoProvider } from './context/CatalogoContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CatalogoProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/catalogo/:id" element={<ProductDetailView />} />
        </Routes>
      </BrowserRouter>
    </CatalogoProvider>
  </StrictMode>,
)