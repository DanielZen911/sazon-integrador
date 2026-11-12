import { Link } from 'react-router-dom';

export const RecipeMiniCard = ({ receta }) => {
  return (
    <article className="bg-white dark:bg-sazon-verdeNutresaCard rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <figure className="h-36 w-full m-0">
        <img
          src={receta.imagen}
          alt={receta.nombre}
          className="w-full h-full object-cover"
        />
      </figure>
      <section className="p-4 flex flex-col gap-2 flex-grow justify-between">
        <header>
          <h3 className="font-poppins font-semibold text-sazon-cacao dark:text-sazon-marfil text-base m-0 leading-tight">
            {receta.nombre}
          </h3>
          <p className="font-inter text-sm text-gray-600 dark:text-gray-400 mt-1 mb-0">
            Tiempo: <time>{receta.tiempoPreparacion}</time>
          </p>
        </header>
        <nav className="mt-3">
          <Link
            to={`/recetario/${receta.id}`}
            className="font-mono-tag text-sazon-verdeHoja dark:text-sazon-verdeNeon text-sm font-bold uppercase hover:underline inline-flex items-center gap-1"
          >
            <span>Ver receta</span>
            <span>&rarr;</span>
          </Link>
        </nav>
      </section>
    </article>
  );
};