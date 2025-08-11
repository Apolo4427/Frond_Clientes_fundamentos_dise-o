# ClientesCRM – Frontend (React + TypeScript + Vite)

SPA minimalista para consumir la API de **Clientes**. Usa **React + TypeScript**, **React Router**, **React Query**, **Axios** y **CSS simple** (sin frameworks).

---

## Tabla de contenidos
- [Stack](#stack)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Arquitectura y patrones](#arquitectura-y-patrones)
- [Variables de entorno](#variables-de-entorno)
- [Scripts](#scripts)
- [Rutas de la aplicación](#rutas-de-la-aplicación)
- [Capa de datos (API)](#capa-de-datos-api)
- [Hooks de datos](#hooks-de-datos)
- [Páginas y componentes](#páginas-y-componentes)
- [Estilos](#estilos)
- [Puesta en marcha](#puesta-en-marcha)
- [Solución de problemas comunes](#solución-de-problemas-comunes)
- [Extensiones sugeridas](#extensiones-sugeridas)

---

## Stack

- **Vite + React + TypeScript**: build rápido y DX simple.
- **React Router**: enrutamiento SPA.
- **@tanstack/react-query**: caché/estado remoto, revalidación, mutaciones.
- **Axios**: cliente HTTP con interceptores.
- **react-hook-form** (+ validaciones básicas) para formularios.
- **CSS** plano y ligero (sin Tailwind/Material).

---

## Estructura del proyecto

cliente-app/
└─ src/
├─ api/
│ ├─ axiosClient.ts # instancia Axios (baseURL, headers, interceptores)
│ └─ clientes.ts # funciones HTTP: get, list, create, update, delete
├─ components/
│ ├─ ClienteForm.tsx # ClienteCreateForm / ClienteEditForm
│ └─ NavBar.tsx # navegación superior + búsqueda por Id
├─ hooks/
│ └─ useClientes.ts # React Query hooks (lista, por id, crear, actualizar, borrar)
├─ pages/
│ ├─ ListadoClientes.tsx # tabla con (Nombre, Teléfono, Detalle)
│ ├─ CrearCliente.tsx # crear cliente → redirige a /clientes/:id
│ ├─ VerCliente.tsx # detalle: muestra datos + Editar / Eliminar
│ └─ EditarCliente.tsx # actualizar datos de contacto
├─ types/
│ └─ cliente.ts # DTOs del front (Response, Create, Update)
├─ App.tsx # BrowserRouter + rutas
├─ main.tsx # QueryClientProvider + render raíz
├─ index.css # estilos globales simples
└─ index.html


---

## Arquitectura y patrones

- **Componentes funcionales + Hooks** (paradigma declarativo/funcional en UI).
- **Separación de capas**:
  - `api/` → acceso HTTP (Axios) **sin** lógica de UI.
  - `hooks/` → orquestación de datos (React Query), invalidación de caché.
  - `pages/` → pantallas que componen componentes + hooks.
  - `components/` → piezas reutilizables (forms, navbar).
  - `types/` → contrato de tipos (DTOs) alineados con la API.
- **Patrones**:
  - _Module pattern_ por feature (`clientes.ts` agrupa endpoints).
  - _Custom hooks_ para encapsular llamadas y estados de carga/error.
  - _Presentational & Container-ish_: páginas como “containers” que usan componentes presentacionales.

**Paradigma de programación**: Declarativo en UI + OOP en DTOs/estructura (TS interfaces). Asincronía con `async/await`.

---

## Variables de entorno

Crea un archivo **`.env.local`**:

```bash
VITE_API_URL=http://localhost:5251/api

--- 

Scripts
En la carpeta del front:

bash
Copiar
Editar
npm install           # instalar dependencias
npm run dev           # desarrollo (Vite)
npm run build         # build de producción
npm run preview       # previsualizar build
Rutas de la aplicación
/clientes → listado (Nombre, Teléfono, botón Detalle).

/clientes/nuevo → formulario de creación.

/clientes/:id → detalle de un cliente (ver datos / Editar / Eliminar).

/clientes/:id/editar → formulario de edición (contacto).

El NavBar incluye:

Lista → /clientes

Crear cliente → /clientes/nuevo

Input “ID de cliente…” + botón Ir (navega a /clientes/:id)

Capa de datos (API)
src/api/axiosClient.ts
Instancia Axios con baseURL = import.meta.env.VITE_API_URL y Content-Type: application/json.
(Se recomienda habilitar interceptores de logging en desarrollo).

src/api/clientes.ts
Funciones HTTP que llaman a la API REST:

getClientes(): Promise<ClienteResponseDto[]>

getClienteById(id: string): Promise<ClienteResponseDto>

createCliente(data: ClienteCreateDto): Promise<ClienteResponseDto>

updateCliente(data: ClienteUpdateDto): Promise<ClienteResponseDto>
(id en la URL, body solo con campos de contacto)

deleteCliente(id: string): Promise<void>

Hooks de datos
src/hooks/useClientes.ts define hooks React Query:

useClientes() → lista completa (cacheada, revalida en segundo plano).

useClienteById(id) → un cliente por Id (habilitado si hay id).

useCrearCliente() → mutación; al onSuccess invalida ['clientes'].

useActualizarCliente() → mutación; al onSuccess actualiza cache e invalida lista.

useBorrarCliente() → mutación; al onSuccess invalida ['clientes'].

Provider: en main.tsx la app envuelve App con <QueryClientProvider client={queryClient} />.

Páginas y componentes
ListadoClientes
Tabla con columnas: Nombre, Teléfono y Detalle.

Usa useClientes() para poblar.

Botón Detalle navega a /clientes/:id.

CrearCliente
Usa ClienteCreateForm.

Al enviar, useCrearCliente().mutateAsync(data) y redirige a /clientes/:id del creado.

VerCliente
Carga useClienteById(id).

Muestra datos del cliente y botones:

Editar → /clientes/:id/editar

Eliminar → useBorrarCliente().mutateAsync(id) y redirige a /clientes/nuevo o /clientes.

EditarCliente
Carga useClienteById(id).

Usa ClienteEditForm (solo contacto).

Al enviar, useActualizarCliente().mutateAsync({ id, ...values }) y redirige a /clientes/:id.

ClienteForm
ClienteCreateForm: inputs para nombre, apellido, telefono, correoElectronico, direccionPrincipal, notasGenerales.

ClienteEditForm: inputs para telefono, correoElectronico, direccionPrincipal.

NavBar
Links a Lista y Crear.

Input para navegar por Id.

Estilos
src/index.css incluye un reset básico y utilidades simples:

.container, .card, .btn, .table, .navbar, .input, etc.

No se usa framework de CSS; el objetivo es mantenerlo ligero y claro.

Puesta en marcha
Clonar/abrir el proyecto.

Configurar la API (ver README-backend.md): correr en http://localhost:5251 (o el puerto que prefieras).

Crear .env.local en el front con:

bash
Copiar
Editar
VITE_API_URL=http://localhost:5251/api
Instalar y arrancar:

bash
Copiar
Editar
npm install
npm run dev
Abrir http://localhost:5173 y navegar:

Lista → Crear → Detalle → Editar → Eliminar.

Solución de problemas comunes
Pantalla en blanco / error “No QueryClient set”
Asegúrate de envolver la app con QueryClientProvider en main.tsx.

ERR_CONNECTION_REFUSED desde el front
La API no corre en el puerto configurado. Revisa VITE_API_URL y los logs de la API (“Now listening on: …”).

CORS bloqueado
Habilita CORS en la API para http://localhost:5173 y http://127.0.0.1:5173.

500 Internal Server Error en llamadas
Ver logs de la API. Típicos:

Tabla inexistente → revisar OnModelCreating y EnsureCreated/Migrate en backend.

Error de conexión SQL → revisar cadena de conexión y permisos del usuario.

IDs
En backend se usa Guid (viaja como string en JSON). En el front, el tipo es string.

Extensiones sugeridas
Paginación y filtros en GET /api/clientes + UI (búsqueda, ordenar).

Validación más rica con zod/yup.

Toasts de éxito/error.

Manejo de estados de error globales (error boundaries, 404/500 dedicados).

Internacionalización si más idiomas son requeridos.

Tests (unitarios para hooks y E2E para flujos críticos).
