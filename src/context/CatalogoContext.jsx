import { createContext, useContext } from 'react';

const CatalogoContext = createContext();

export const useCatalogo = () => {
  return useContext(CatalogoContext);
};

export const CatalogoProvider = ({ children }) => {
  const obtenerProductoPorId = (id) => {
    if (id === "1") {
      return {
        id: "1",
        sku: "NUT-ZEN-101",
        nombre: "Salchicha Tradicional Zenú",
        marca: "Zenú",
        gramaje: "480g",
        modoConservacion: "Refrigeración",
        categoria: "Cárnicos",
        precioSugerido: 13500,
        imagen: "https://images.unsplash.com/photo-1595856711589-91ee0a6ec6cb?auto=format&fit=crop&q=80&w=400", 
        recetasAsociadas: [
          {
            id: "101",
            nombre: "Arroz con Salchichas Zenú",
            tiempoPreparacion: "25 min",
            imagen: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=300"
          }
        ]
      };
    }

    return null; 
  };

  return (
    <CatalogoContext.Provider value={{ obtenerProductoPorId }}>
      {children}
    </CatalogoContext.Provider>
  );
};