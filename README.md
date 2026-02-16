# VetStudy AI Pro - Asistente de Estudio para Veterinaria

> **Stack Tecnológico:** React 18 + TypeScript + Vite + Tailwind CSS + Express.js + Groq API (LLM)
>
> **Licencia:** Open Source - Libre para todos los estudiantes y educadores

Aplicación web progresiva (PWA) para el estudio de materias de veterinaria, diseñada como herramienta integral de aprendizaje con flashcards, cuestionarios, tutor IA potenciado por LLM y temporizador Pomodoro.

## Estado del Proyecto

**Tipo:** Full-Stack Application (React Frontend + Express Backend)
**Arquitectura:** React SPA + API REST con integración a Groq (LLM)
**Estado:** Funcional y operativa con IA real
**Persistencia:** localStorage (frontend) + Groq API (respuestas IA)

---

## Stack Tecnológico

### Frontend

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **React** | 18.3.1 | Framework UI principal |
| **TypeScript** | ~5.6.2 | Tipado estático |
| **Vite** | ^6.0.1 | Build tool y dev server |
| **Tailwind CSS** | v3.4.16 | Estilos utilitarios |
| **React Router DOM** | ^6 | Enrutamiento SPA |
| **shadcn/ui + Radix** | Latest | Componentes UI accesibles |
| **pnpm** | 10.21.0 | Gestor de paquetes |
| **date-fns** | ^3.0.0 | Manejo de fechas |
| **lucide-react** | ^0.364.0 | Iconos |
| **zod** | ^3.24.1 | Validación de esquemas |
| **next-themes** | ^0.4.4 | Gestión de tema oscuro/claro |

### Backend

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Express.js** | ^4.18.2 | Framework servidor Node.js |
| **CORS** | ^2.8.5 | Habilitar CORS para API |
| **dotenv** | ^16.3.1 | Variables de entorno |
| **concurrently** | ^8.2.2 | Ejecutar frontend y backend simultáneamente |

### Inteligencia Artificial

| Tecnología | Descripción |
|------------|-------------|
| **Groq API** | API de inferencia de alta velocidad |
| **llama-3.3-70b-versatile** | Modelo LLM para respuestas del tutor |

---

## 📁 Estructura de Archivos

```
vetstudy-ai-pro/
├── 📄 index.html              # Entry point HTML
├── 📄 package.json            # Dependencias y scripts
├── 📄 README.md               # Este archivo
├── 📄 components.json         # Config shadcn/ui
├── 📄 vite.config.ts          # Configuración Vite
├── 📄 tailwind.config.js      # Configuración Tailwind
├── 📄 postcss.config.js       # Configuración PostCSS
├── 📄 eslint.config.js        # Reglas ESLint
├── 📄 tsconfig.json           # Config TypeScript base
├── 📄 tsconfig.app.json       # Config TypeScript app
├── 📄 tsconfig.node.json      # Config TypeScript node
├── 📄 .gitignore              # Archivos ignorados por git
├── 📄 .npmrc                  # Configuración npm/pnpm
├── 📄 pnpm-lock.yaml          # Lockfile de dependencias
│
├── 📁 dist/                   # Build de producción (generado)
├── 📁 node_modules/             # Dependencias instaladas
├── 📁 public/                 # Assets estáticos públicos
│
├── 📁 server/                 # Backend Express.js
│   ├── 📄 index.js            # Servidor API y integración Groq
│   └── 📄 .env                # Variables de entorno (API keys)
│
└── 📁 src/                    # Código fuente principal
    ├── 📄 main.tsx             # Punto de entrada React
    ├── 📄 App.tsx              # Componente raíz con rutas
    ├── 📄 App.css              # Estilos globales de App
    ├── 📄 index.css            # Estilos globales + Tailwind
    ├── 📄 vite-env.d.ts        # Tipos de Vite
    │
    ├── 📁 components/          # Componentes React
    │   ├── 📁 dashboard/       # Componentes del dashboard
    │   │   └── 📄 quick-actions.tsx
    │   ├── 📁 layout/          # Componentes de layout
    │   │   ├── 📄 main-layout.tsx      # Layout principal con sidebar
    │   │   └── 📄 sidebar.tsx          # Barra lateral de navegación
    │   ├── 📁 ui/              # Componentes UI reutilizables
    │   │   ├── 📄 badge.tsx
    │   │   ├── 📄 button.tsx
    │   │   ├── 📄 card.tsx
    │   │   ├── 📄 message.tsx          # Mensajes de chat
    │   │   ├── 📄 pomodoro-timer.tsx   # Timer Pomodoro
    │   │   ├── 📄 progress.tsx
    │   │   ├── 📄 quiz-question.tsx    # Componente de preguntas
    │   │   ├── 📄 quiz-results.tsx     # Resultados de quizzes
    │   │   ├── 📄 subject-manager.tsx  # Gestor de materias
    │   │   └── 📄 theme-toggle.tsx     # Toggle tema claro/oscuro
    │   └── 📄 ErrorBoundary.tsx        # Manejo de errores
    │
    ├── 📁 hooks/               # Custom React Hooks
    │   ├── 📄 use-chat.ts      # Hook del Tutor IA (23KB)
    │   ├── 📄 use-flashcards.ts # Gestión de flashcards
    │   ├── 📄 use-mobile.tsx    # Detección de dispositivo móvil
    │   ├── 📄 use-pomodoro.ts   # Lógica del temporizador Pomodoro
    │   ├── 📄 use-quizzes.ts    # Gestión de cuestionarios
    │   ├── 📄 use-subjects.ts   # Gestión de materias/asignaturas
    │   └── 📄 use-theme.ts      # Gestión de tema (claro/oscuro)
    │
    ├── 📁 lib/                 # Utilidades y helpers
    │   └── 📄 utils.ts         # Funciones utilitarias (cn, etc.)
    │
    └── 📁 pages/               # Páginas/Vistas de la aplicación
        ├── 📄 content-page.tsx      # Gestor de contenido de estudio
        ├── 📄 dashboard-page.tsx    # Dashboard principal
        ├── 📄 flashcards-page.tsx   # Módulo de flashcards
        ├── 📄 pomodoro-page.tsx     # Temporizador Pomodoro
        ├── 📄 profile-page.tsx      # Peril del usuario
        ├── 📄 quizzes-page.tsx      # Cuestionarios/evaluaciones
        ├── 📄 settings-page.tsx     # Configuración de la app
        └── 📄 tutor-page.tsx        # Tutor IA interactivo
```

---

## Funcionalidades por Módulo

### 1. **Dashboard** (`dashboard-page.tsx`)
- Panel principal con resumen de actividad
- Accesos rápidos a todos los módulos
- Estadísticas de estudio

### 2. **Tutor IA** (`tutor-page.tsx` + `use-chat.ts`)
- **Sistema de IA con memoria de conversación**
- Responde preguntas sobre materias veterinarias:
  - **Virología**: Orthomyxovirus, Retrovirus (VIH), clasificación de Baltimore, replicación viral
  - **Parasitología**: Fasciola hepatica, Leishmania, ciclos de vida
  - **Ecología, Cinematografía, Literatura, Inglés** (estructura preparada)
- Detecta el tipo de pregunta: definición, proceso, ciclo de vida, clínica
- **Mantiene contexto** entre mensajes para conversaciones coherentes

### 3. **Flashcards** (`flashcards-page.tsx` + `use-flashcards.ts`)
- Sistema de estudio con tarjetas
- Soporte para tarjetas de opción múltiple y definición
- Organización por materia
- Tracking de progreso y dominio

### 4. **Cuestionarios** (`quizzes-page.tsx` + `use-quizzes.ts`)
- Evaluaciones con múltiples tipos de preguntas:
  - Opción múltiple
  - Verdadero/Falso
  - Completar espacios (fill-in-the-blank)
- Sistema de puntuación y retroalimentación
- Historial de resultados

### 5. **Pomodoro** (`pomodoro-page.tsx` + `use-pomodoro.ts`)
- Temporizador Pomodoro con sesiones de trabajo/descanso
- Asociación de sesiones a materias específicas
- Estadísticas de sesiones completadas

### 6. **Perfil** (`profile-page.tsx`)
- Información del usuario
- Estadísticas de estudio globales
- Gestión de preferencias

### 7. **Configuración** (`settings-page.tsx`)
- Gestión de materias/asignaturas (crear, editar, activar/desactivar)
- Selector de tema (claro/oscuro)
- Preferencias de estudio

### 8. **Contenido** (`content-page.tsx`)
- Gestión de material de estudio organizado por materia
- Estructura jerárquica de temas

---

## Sistema de Datos

**Almacenamiento:** Todo se guarda en `localStorage` del navegador

| Entidad | Storage Key | Descripción |
|---------|-------------|-------------|
| Materias | `subjects` | Lista de asignaturas del usuario |
| Flashcards | `flashcards` | Tarjetas de estudio |
| Cuestionarios | `quizzes` | Evaluaciones creadas |
| Mensajes Tutor | `chatMessages` | Historial de conversaciones |
| Sesiones Pomodoro | `pomodoroSessions` | Registro de sesiones |
| Progreso | `userProgress` | Estadísticas de estudio |
| Perfil | `userProfile` | Datos del usuario |
| Tema | `theme` | Preferencia de tema visual |

---

## Scripts Disponibles

```bash
# Desarrollo local
npm run dev              # Inicia solo frontend (localhost:5173)
npm run server           # Inicia solo backend API (localhost:3001)
npm run dev:full         # Inicia frontend + backend simultáneamente

# Build
npm run build            # Compila para producción (genera /dist)
npm run build:prod       # Build optimizado para producción

# Preview
npm run preview          # Previsualiza build de producción

# Linting
npm run lint             # Ejecuta ESLint

# Gestión de dependencias
npm run install-deps     # Instala dependencias con pnpm
npm run clean            # Limpia node_modules y lockfiles
```

---

## Arquitectura de Comunicación

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              NAVEGADOR WEB                                │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                  VetStudy AI Pro (React SPA)                        │  │
│  │  ┌─────────┐ ┌──────────┐ ┌───────────┐ ┌─────────────────────────┐ │  │
│  │  │ Tutor   │ │Flashcards│ │Cuestionarios│ │      Pomodoro         │ │  │
│  │  │   IA    │ │          │ │             │ │                       │ │  │
│  │  └────┬────┘ └──────────┘ └───────────┘ └─────────────────────────┘ │  │
│  │       │                                                             │  │
│  │  ┌────▼──────────────────────────────────────────────────────────┐  │  │
│  │  │              Custom Hooks (Lógica de Negocio)                  │  │  │
│  │  │  useChat │ useFlashcards │ useQuizzes │ usePomodoro            │  │  │
│  │  └────┬──────────────────────────────────────────────────────────┘  │  │
│  │       │                                                             │  │
│  │  ┌────▼───────────┐                                                 │  │
│  │  │   localStorage │  ← Persistencia local (flashcards, quizzes...)  │  │
│  │  └────────────────┘                                                 │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                      │
│                                    │ fetch('/api/chat')                   │
│                                    ▼                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                    SERVIDOR EXPRESS (localhost:3001)                  │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │  POST /api/chat  →  Groq API (llama-3.3-70b-versatile)        │  │  │
│  │  │  GET  /api/health → Health check                            │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

**Proxy Configurado:** Vite proxy redirige `/api` → `http://localhost:3001`

---

## Sistema de Tutor IA - Detalle Técnico

El Tutor IA está conectado a **Groq API** utilizando el modelo **llama-3.3-70b-versatile** para generar respuestas académicas de nivel universitario en tiempo real.

### Flujo de Trabajo:
1. Usuario envía pregunta desde el frontend (`tutor-page.tsx`)
2. Frontend envía mensajes al backend Express (`server/index.js`)
3. Backend agrega prompt del sistema con instrucciones académicas rigurosas
4. Backend llama a Groq API con contexto de conversación completo
5. Respuesta del LLM se devuelve al frontend y se renderiza con formato markdown

### Características del Sistema:
- **IA Real:** Respuestas generadas por LLM (no predefinidas)
- **Contexto Conversacional:** Mantiene historial de mensajes para respuestas coherentes
- **Especialización por Materia:** Prompt del sistema adapta el tono según la materia seleccionada
- **Formato Académico:** Respuestas estructuradas con markdown, emojis organizadores, y puntos clave para examen
- **Preguntas de Seguimiento:** El tutor siempre termina con una pregunta que invita a profundizar

---

## Configuración de Desarrollo

### Requisitos:
- Node.js 18+
- pnpm (instalado automáticamente por el proyecto)

### Instalación:

```bash
# 1. Clonar o navegar al proyecto
cd vetstudy-ai-pro

# 2. Instalar dependencias
npm run install-deps

# 3. Configurar variables de entorno
# Crear archivo server/.env con tu API key de Groq:
echo "GROQ_API_KEY=tu_api_key_aqui" > server/.env
echo "PORT=3001" >> server/.env

# 4. Iniciar desarrollo completo (frontend + backend)
npm run dev:full

# 5. Abrir navegador en http://localhost:5173
```

**Obtén tu API key gratuita en:** https://console.groq.com

**Para desarrollo solo frontend:**
```bash
npm run dev  # Solo frontend en localhost:5173
```

**Para desarrollo solo backend:**
```bash
npm run server  # Solo API en localhost:3001
```

### Configuración shadcn/ui:
- Componentes base en `@/components/ui/`
- Tema configurado en `tailwind.config.js`
- Soporte para modo oscuro con `next-themes`

---

## Build de Producción

```bash
npm run build
```

Genera la carpeta `dist/` con:
- `index.html` - Entry point
- `assets/` - JS/CSS optimizados y minificados
- Listo para desplegar en cualquier hosting estático (Netlify, Vercel, GitHub Pages)

---

## Limitaciones Conocidas

1. **Sin Sincronización en la Nube**: Los datos viven solo en el navegador local. No hay persistencia en servidor ni sincronización entre dispositivos.
2. **Sin Autenticación**: No hay sistema de usuarios/login.
3. **Requiere API Key**: Para usar el Tutor IA se necesita una API key de Groq (gratuita con límites generosos).
4. **Persistencia Local**: Borrar datos del navegador = pérdida de todo el progreso de flashcards, quizzes y historial de chat.

---

## Flujo de Datos - Ejemplo

```
Usuario crea Flashcard
    ↓
useFlashcards.ts procesa
    ↓
Guarda en localStorage (flashcards key)
    ↓
React re-renderiza componentes
    ↓
UI actualiza automáticamente
```

---

## Roadmap Sugerido

- [x] ~~Integración con LLM real (Groq API)~~ [COMPLETADO]
- [ ] Sistema de autenticación de usuarios
- [ ] Sincronización en la nube con base de datos
- [ ] Modo offline completo con Service Workers
- [ ] Exportación/importación de datos
- [ ] App móvil nativa (React Native)
- [ ] Soporte para más idiomas

---

## 📄 Licencia

**MIT License - Open Source**

Este proyecto es **libre y gratuito** para todos los estudiantes, educadores y desarrolladores.

- [ ] Uso personal y educativo ilimitado
- [ ] Uso comercial permitido
- [ ] Modificación y distribución permitidas
- [ ] Sublicenciamiento permitido

**Condiciones:** Mantener atribución al autor original.

---

**Desarrollado con amor para la comunidad educativa veterinaria mundial.**

**Última actualización:** Febrero 2026  
**Versión actual:** 0.0.0 (desarrollo activo)
