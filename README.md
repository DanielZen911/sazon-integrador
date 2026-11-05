# Sa·zón · Recetario Digital con Productos Nutresa

Plataforma gastronómica inteligente orientada a la planificación de menús, inventario de despensa y descubrimiento de recetas oficiales con las marcas de **Grupo Nutresa** (Zenú, Doria, Pietrán, Noel, etc.). 

El proyecto está diseñado bajo una arquitectura modular desacoplada para el trabajo concurrente entre equipos independientes mediante el flujo de trabajo **GitFlow**.

---

## 1. Puntos de Entrada y Archivos Principales

* **`index.html` (Aterrizaje Principal):** Es el archivo de entrada principal de la aplicación. Presenta una interfaz cinematográfica a pantalla completa (`100vh`) que contextualiza el ecosistema gastronómico de Sa·zón y cuenta con el botón de acción **"Explora"** que direcciona al inicio de sesión (`./src/auth-usuarios/login.html`).
* **`landing.html` (Plantilla Base de Referencia / Dashboard):**
  > [!TIP]
  > **PLANTILLA BASE PARA EL DESARROLLO DE CÉLULAS:**
  > `landing.html` es el **modelo y plantilla base de referencia** que todos los equipos deben tomar como ejemplo para estructurar sus propias pantallas interiores (encabezado sticky con perfil, menú lateral off-canvas, pie de página institucional, soporte para Modo Día / Modo Noche y semántica estricta de HTML5 sin `<div>`).
  > 
  > **IMPORTANTE: NO se trabaja ni se edita directamente sobre `landing.html`.** Este archivo es exclusivamente un molde de consulta y demostración transversal. Cada célula debe copiar la estructura que requiera e implementarla de manera autónoma dentro de su carpeta designada.

---

## 2. Recursos Compartidos (`src/assets/`)

La carpeta `src/assets/` centraliza todo el contenido de **uso común y lectura para todas las células**. Su objetivo es garantizar la consistencia visual y de comportamiento sin duplicar código:

* **Tipografías Locales (`src/assets/fonts/` y `fonts.css`):**
  * Para asegurar que el proyecto funcione de forma 100% autónoma y sin dependencias externas obligatorias de conexión, se descargaron las fuentes oficiales en formato de alto rendimiento `.woff2`:
    * **Poppins:** Títulos, encabezados y logotipos.
    * **Inter:** Textos de lectura continua, párrafos y enlaces.
    * **IBM Plex Mono:** Etiquetas de módulo, badges, botones, código y métricas.
  * Se declaran en `src/assets/css/fonts.css` para ser consumidas automáticamente en toda la plataforma.
* **Estilos Globales (`src/assets/css/global.css`):**
  * Define la paleta de colores corporativos Nutresa (`sazon-marfil`, `sazon-verdeHoja`, `sazon-verdeNutresa`, `sazon-cacao`, etc.).
  * Configuración del scrollbar institucional y variables CSS.
* **Lógica Global (`src/assets/js/global.js`):**
  * Control del menú lateral off-canvas (`#sidebar`).
  * Gestión y persistencia del tema Día/Noche (`switchTheme`).
  * Componente de notificación flotante (`showToast`).

---

## 3. Regla Estricta de Desarrollo por Células (GitFlow)

> [!IMPORTANT]
> **REGLA DE AISLAMIENTO POR CÉLULA:**
> Cada equipo debe trabajar **ÚNICAMENTE** dentro de la carpeta correspondiente a su célula (ubicada en `src/<nombre-celula>/`).
>
> 1. **Los archivos externos y compartidos (`index.html`, `landing.html`, `src/assets/`) son de uso común para todos los equipos.** Ninguna célula individual debe modificar archivos compartidos sin previa concertación, para evitar conflictos de fusión (*merge conflicts*) en ramas de GitFlow.
> 2. **Toda vista HTML, script JS específico o estilos propios de una célula deben residir exclusivamente dentro de su directorio.**

---

## 4. Estructura de Carpetas (Encarpetado)

```text
sazon-integrador/
├── index.html                   # Portada principal cinematográfica (Punto de inicio)
├── landing.html                 # Plantilla base y ejemplo de referencia (NO editar directamente)
├── README.md                    # Documentación general y lineamientos técnicos
├── .gitignore                   # Exclusiones de control de versiones
└── src/
    ├── assets/                  # RECURSOS COMPARTIDOS (Uso común para todas las células)
    │   ├── css/
    │   │   ├── fonts.css        # Declaración de tipografías locales @font-face
    │   │   └── global.css       # Estilos globales, variables y temas
    │   ├── fonts/               # Archivos .woff2 descargados (Poppins, Inter, IBM Plex Mono)
    │   ├── images/              # Fotografías e ilustraciones comunes (fondo.jpg, etc.)
    │   └── js/
    │       ├── global.js        # Utilidades transversales (sidebar, toast, modo día/noche)
    │       ├── local-storage.js # Funciones reutilizables de persistencia (localStorage)
    │       └── templates.js     # Plantillas y componentes reutilizables
    │
    ├── auth-usuarios/           # CÉLULA 0 (BASE): Usuarios, Login, Registro, Roles y Perfil
    │   ├── login.html
    │   ├── registro.html
    │   └── perfil.html
    │
    ├── catalogo-productos/      # CÉLULA 1: Catálogo oficial de productos y marcas Nutresa
    ├── recetario-contenido/     # CÉLULA 2: Recetas, ingredientes, pasos y dificultad
    ├── despensa-virtual/        # CÉLULA 3: Inventario de cocina y "Cocina con lo que hay"
    ├── nutricion-perfiles/      # CÉLULA 4: Semáforo nutricional, calorías y alérgenos
    ├── planificador-mercado/    # CÉLULA 5: Plan semanal de comidas y lista de mercado
    ├── comunidad-valoraciones/  # CÉLULA 6: Reseñas, estrellas, favoritos y comunidad
    ├── mercadeo-campanas/       # CÉLULA 7: Campañas, cupones, retos y puntos de fidelización
    └── shared/                  # Módulos JS o contratos de datos transversales
```

---

## 5. Persistencia de Datos con `localStorage`

Dado que el proyecto opera de manera desacoplada y sin un backend centralizado en esta fase, **todas las células deben utilizar `localStorage` del navegador para almacenar, consultar y sincronizar su información**.

### 5.1 Convención de Nombres de Claves (Namespace)
Para evitar que dos células sobreescriban los datos de la otra, cada equipo debe utilizar un prefijo único bajo el formato `sazon_<modulo>_<recurso>`:

| Módulo / Célula | Prefijo Sugerido | Ejemplos de Claves |
| :--- | :--- | :--- |
| **Tema Global** | `sazon_theme` | `'sazon_theme'` (`'light'` / `'dark'`) |
| **Auth y Sesión** | `sazon_auth_` | `sazon_auth_session`, `sazon_auth_users` |
| **Catálogo** | `sazon_catalogo_` | `sazon_catalogo_filtros` |
| **Recetario** | `sazon_recetas_` | `sazon_recetas_lista`, `sazon_recetas_favoritas` |
| **Despensa** | `sazon_despensa_` | `sazon_despensa_items` |
| **Nutrición** | `sazon_nutricion_` | `sazon_nutricion_metas` |
| **Planificador**| `sazon_planificador_`| `sazon_planificador_semana` |
| **Comunidad** | `sazon_comunidad_` | `sazon_comunidad_resenas` |
| **Mercadeo** | `sazon_mercadeo_` | `sazon_mercadeo_puntos` |

### 5.2 Lineamientos de Uso para los Desarrolladores
1. **Formato JSON:** Toda estructura de datos (arreglos u objetos) debe convertirse a texto con `JSON.stringify` al momento de guardarse, y reconvertirse a objeto con `JSON.parse` al momento de consultarse.
2. **Valores de respaldo:** Al leer datos, siempre se debe contemplar un valor por defecto (un arreglo o un objeto vacío) para los casos en que la clave aún no exista en el navegador.
3. **Prohibición de `localStorage.clear()`:** Bajo ninguna circunstancia se debe ejecutar un borrado total del almacenamiento local, ya que eliminaría los datos de las demás células. Para reiniciar o limpiar datos, cada célula debe remover exclusivamente sus propias claves mediante `removeItem`.
4. **Manejo defensivo de errores:** Se recomienda encapsular las operaciones de lectura y escritura en bloques de control de excepciones (`try / catch`) para prevenir fallos en modos de navegación privada o ante cuotas agotadas de almacenamiento.
5. **Seguridad básica:** La célula de autenticación no debe almacenar contraseñas en texto plano en el navegador.
