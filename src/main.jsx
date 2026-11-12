import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Header from './components/Header'
import { ProductDetailView } from './views/ProductDetailView'
import { CatalogoProvider } from './context/CatalogoContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CatalogoProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          
          <Header />
          
          <div className="flex-grow">
            <Routes>
              <Route path="/catalogo/:id" element={<ProductDetailView />} />
            </Routes>
          </div>

        

        </div>
      </BrowserRouter>
    </CatalogoProvider>
  </StrictMode>,
)