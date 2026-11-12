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
        imagen: "", 
        recetasAsociadas: [
          {
            id: "101",
            nombre: "Arroz con Salchichas Zenú",
            tiempoPreparacion: "25 min",
            imagen: "https://zenu.com.co/wp-content/uploads/2023/12/DUMMIE-ZENU-SCHA-TRADICIONAL-450G-1.webp"
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