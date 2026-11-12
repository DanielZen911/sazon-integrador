import { useParams, useNavigate } from 'react-router-dom';
import { useCatalogo } from '../context/CatalogoContext';
import { RecipeMiniCard } from '../components/user/RecipeMiniCard';

export const ProductDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { obtenerProductoPorId } = useCatalogo();

  const producto = obtenerProductoPorId(id);

  if (!producto) {
    return (
      <main className="min-h-screen bg-sazon-marfil dark:bg-sazon-verdeNutresa flex flex-col items-center justify-center p-6">
        <section className="bg-white dark:bg-sazon-verdeNutresaCard p-8 rounded-2xl shadow-lg text-center max-w-md flex flex-col items-center gap-4">
          <h1 className="font-poppins text-3xl text-sazon-brandZenu font-bold m-0">
            Error 404
          </h1>
          <p className="font-inter text-sazon-cacao dark:text-sazon-marfil m-0">
            El producto con el identificador seleccionado no existe en el catálogo.
          </p>
          <button
            onClick={() => navigate('/catalogo')}
            className="font-mono-tag mt-4 bg-sazon-verdeHoja text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-bold uppercase"
          >
            Volver al catálogo
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-sazon-marfil dark:bg-sazon-verdeNutresa p-6 md:p-10 flex flex-col gap-8">
      <nav>
        <button
          onClick={() => navigate('/catalogo')}
          className="font-mono-tag flex items-center gap-2 text-sazon-verdeHoja dark:text-sazon-verdeNeon hover:underline bg-transparent border-none cursor-pointer p-0"
        >
          <span>&larr;</span>
          <span>Volver a la vitrina</span>
        </button>
      </nav>

      <article className="bg-white dark:bg-sazon-verdeNutresaCard rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <figure className="w-full md:w-1/2 m-0 bg-gray-50 dark:bg-sazon-verdeNutresa flex items-center justify-center p-10">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="max-w-full h-auto object-contain drop-shadow-2xl"
          />
        </figure>

        <section className="w-full md:w-1/2 p-8 md:p-12 flex flex-col gap-6 justify-center">
          <header className="flex flex-col gap-3">
            <span className="font-mono-tag text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full self-start uppercase tracking-wider">
              SKU: {producto.sku}
            </span>
            <h1 className="font-poppins text-3xl md:text-4xl font-bold text-sazon-cacao dark:text-sazon-marfil m-0 leading-tight">
              {producto.nombre}
            </h1>
            <span className="font-mono-tag text-sm text-sazon-verdeHoja dark:text-sazon-verdeNeon font-bold tracking-widest uppercase">
              {producto.marca}
            </span>
          </header>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 font-inter text-sm m-0 border-y border-gray-200 dark:border-gray-700 py-6">
            <section className="flex flex-col gap-1">
              <dt className="text-gray-500 dark:text-gray-400 font-semibold m-0">Gramaje</dt>
              <dd className="text-sazon-cacao dark:text-sazon-marfil m-0 font-medium">
                {producto.gramaje}
              </dd>
            </section>
            <section className="flex flex-col gap-1">
              <dt className="text-gray-500 dark:text-gray-400 font-semibold m-0">Conservación</dt>
              <dd className="text-sazon-cacao dark:text-sazon-marfil m-0 font-medium">
                {producto.modoConservacion}
              </dd>
            </section>
            <section className="flex flex-col gap-1">
              <dt className="text-gray-500 dark:text-gray-400 font-semibold m-0">Categoría</dt>
              <dd className="text-sazon-cacao dark:text-sazon-marfil m-0 font-medium">
                {producto.categoria}
              </dd>
            </section>
          </dl>

          <section className="flex flex-col gap-2 pt-2">
            <span className="font-inter text-gray-500 dark:text-gray-400 text-sm font-semibold">
              Precio Sugerido
            </span>
            <output className="font-mono-tag text-4xl font-bold text-sazon-verdeHoja dark:text-sazon-verdeNeon m-0">
              ${producto.precioSugerido?.toLocaleString('es-CO')}
            </output>
          </section>
        </section>
      </article>

      <section className="flex flex-col gap-6 mt-4">
        <header>
          <h2 className="font-poppins text-2xl font-bold text-sazon-cacao dark:text-sazon-marfil m-0">
            Recetas que usan este producto
          </h2>
        </header>

        {producto.recetasAsociadas && producto.recetasAsociadas.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-0 m-0 list-none">
            {producto.recetasAsociadas.map((receta) => (
              <li key={receta.id} className="m-0 p-0 h-full">
                <RecipeMiniCard receta={receta} />
              </li>
            ))}
          </ul>
        ) : (
          <article className="bg-white/60 dark:bg-sazon-verdeNutresaCard/60 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 flex items-center justify-center text-center">
            <p className="font-inter text-gray-600 dark:text-gray-300 m-0 text-lg font-medium">
              Este ingrediente aún no cuenta con recetas publicadas.
            </p>
          </article>
        )}
      </section>
    </main>
  );
};