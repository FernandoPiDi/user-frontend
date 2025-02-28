# Full and Fast

Una aplicación web moderna desarrollada con Next.js, React y TypeScript que permite gestionar y visualizar información de usuarios de manera eficiente y elegante. El proyecto implementa una arquitectura basada en componentes reutilizables, con un enfoque en la experiencia de usuario, rendimiento y mantenibilidad del código.

La aplicación permite a los usuarios visualizar una lista completa de perfiles, realizar búsquedas por diferentes criterios, filtrar resultados, y ver información detallada de cada usuario. Todo esto con una interfaz moderna, responsiva y fácil de usar que se adapta a diferentes dispositivos y tamaños de pantalla.

## 🚀 Características

- **Listado de usuarios**: Visualización de usuarios con paginación, ordenamiento y filtrado avanzado
- **Búsqueda en tiempo real**: Sistema de búsqueda optimizado que filtra resultados mientras el usuario escribe
- **Detalles de usuario**: Vista detallada de la información de cada usuario incluyendo datos personales, dirección y empresa
- **Interfaz responsiva**: Diseño adaptable a diferentes dispositivos (móviles, tablets y escritorio)
- **Modo claro/oscuro**: Soporte para diferentes temas de visualización
- **Componentes reutilizables**: Arquitectura modular basada en componentes con Storybook
- **Gestión de estado global**: Implementación de Context API para manejo eficiente del estado
- **Testing completo**: Pruebas unitarias y de integración con Jest y Testing Library

## 🛠️ Tecnologías

- **Next.js 15**: Framework de React para aplicaciones web con renderizado del lado del servidor (SSR) y generación estática (SSG)
- **React 19**: Biblioteca para construir interfaces de usuario con las últimas características y mejoras de rendimiento
- **TypeScript**: Superset tipado de JavaScript para desarrollo más seguro y productivo
- **Tailwind CSS**: Framework de CSS utilitario para diseño rápido y consistente
- **Storybook**: Herramienta para desarrollo, documentación y prueba de componentes UI de forma aislada
- **Jest & Testing Library**: Framework de testing para pruebas unitarias y de integración
- **Axios**: Cliente HTTP para realizar peticiones a APIs externas
- **Context API**: API de React para manejo de estado global sin dependencias externas

## 📋 Requisitos previos

- Node.js 20
- pnpm (recomendado pnpm por su eficiencia)

## 🔧 Instalación

1. Clonar el repositorio:

```bash
git clone git@github.com:FernandoPiDi/user-frontend.git
cd user-frontend
```

2. Instalar dependencias:

```bash
pnpm install
```

3. Iniciar el servidor de desarrollo:

```bash
pnpm dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## 🐳 Docker

La aplicación puede ser construida y ejecutada fácilmente utilizando Docker, lo que garantiza un entorno consistente y aislado.

### Requisitos previos para Docker

- Docker instalado en su sistema

### Construir y ejecutar con Docker

1. Construir la imagen de Docker:

```bash
docker build -f ./build/Dockerfile -t frontend .
```

2. Ejecutar el contenedor:

```bash
docker run -p 3010:3000 frontend
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## 📚 Scripts disponibles

- `pnpm dev`: Inicia el servidor de desarrollo
- `pnpm build`: Construye la aplicación para producción
- `pnpm start`: Inicia la aplicación en modo producción
- `pnpm lint`: Ejecuta el linter para detectar problemas de código
- `pnpm test`: Ejecuta todas las pruebas
- `pnpm test:watch`: Ejecuta las pruebas en modo watch (útil durante el desarrollo)
- `pnpm test:home`: Ejecuta las pruebas específicas del componente Home
- `pnpm test:usuarios`: Ejecuta las pruebas específicas del componente Usuarios
- `pnpm storybook`: Inicia Storybook para desarrollo de componentes
- `pnpm build-storybook`: Construye Storybook para despliegue

## 🧪 Testing

El proyecto incluye pruebas unitarias y de integración utilizando Jest y Testing Library, asegurando la calidad y estabilidad del código:

```bash
# Ejecutar todas las pruebas
pnpm test

# Ejecutar pruebas específicas
pnpm test:home
pnpm test:usuarios

# Ejecutar pruebas en modo watch (útil durante el desarrollo)
pnpm test:watch
```

## 📖 Storybook

Para visualizar y desarrollar componentes de forma aislada, el proyecto utiliza Storybook, permitiendo probar y documentar cada componente individualmente:

```bash
pnpm storybook
```

Storybook estará disponible en [http://localhost:6006](http://localhost:6006).

## 📁 Estructura del proyecto

```
src/
├── app/                # Rutas y páginas de Next.js
│   ├── layout.tsx      # Layout principal de la aplicación
│   ├── page.tsx        # Página principal
│   └── globals.css     # Estilos globales
│
├── context/            # Contextos de React para manejo de estado global
│   └── UserContext.tsx # Contexto para gestión de usuarios
│
├── stories/            # Componentes y sus historias para Storybook
│   ├── Navbar/         # Barra de navegación principal
│   │   ├── Navbar.tsx
│   │   ├── Navbar.css
│   │   └── Navbar.stories.ts
│   │
│   ├── Usuarios/       # Componente principal de listado de usuarios
│   │   ├── Usuarios.tsx
│   │   ├── Usuarios.css
│   │   └── Usuarios.stories.tsx
│   │
│   ├── UserCard/       # Componente de tarjeta detallada de usuario
│   │   ├── UserCard.tsx
│   │   ├── UserCard.css
│   │   └── UserCard.stories.tsx
│   │
│   ├── Buscar/         # Componente de búsqueda
│   │   ├── Buscar.tsx
│   │   ├── Buscar.css
│   │   └── Buscar.stories.tsx
│   │
│   └── assets/         # Recursos estáticos para Storybook
│
└── __tests__/          # Pruebas unitarias y de integración
    ├── Home.test.tsx   # Pruebas para la página principal
    └── Usuarios.test.tsx # Pruebas para el componente de usuarios
```

## 🔄 Flujo de datos

La aplicación utiliza Context API para gestionar el estado global de los usuarios:

1. **UserContext**: Proporciona acceso a la lista de usuarios, filtros, paginación y selección de usuario.
2. **Componentes**: Consumen el contexto para mostrar y manipular los datos.
3. **API**: Los datos se obtienen de una API externa mediante Axios.

## 👥 Autor

- **Duvan Fernando Pinto Diaz** - _Trabajo inicial_ - [TuUsuario](https://github.com/FernandoPiDi)
