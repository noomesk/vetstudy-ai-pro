# VetStudy AI Pro - Asistente de Estudio para Veterinaria

Aplicación web progresiva (PWA) para el estudio de materias de veterinaria, diseñada como herramienta integral de aprendizaje con flashcards, cuestionarios, tutor IA y temporizador Pomodoro.

## 🎯 Estado del Proyecto

**Tipo:** Frontend-only (Single Page Application)  
**Arquitectura:** React + TypeScript + Vite - Aplicación 100% cliente, sin backend ni servidor API  
**Estado:** ✅ Funcional y operativa para desarrollo local  
**Persistencia:** localStorage (datos se almacenan en el navegador del usuario)

---

## 🛠️ Stack Tecnológico

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
└── 📁 src/                     # Código fuente principal
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

## 🚀 Funcionalidades por Módulo

### 1. 📚 **Dashboard** (`dashboard-page.tsx`)
- Panel principal con resumen de actividad
- Accesos rápidos a todos los módulos
- Estadísticas de estudio

### 2. 🤖 **Tutor IA** (`tutor-page.tsx` + `use-chat.ts`)
- **Sistema de IA con memoria de conversación**
- Responde preguntas sobre materias veterinarias:
  - **Virología**: Orthomyxovirus, Retrovirus (VIH), clasificación de Baltimore, replicación viral
  - **Parasitología**: Fasciola hepatica, Leishmania, ciclos de vida
  - **Ecología, Cinematografía, Literatura, Inglés** (estructura preparada)
- Detecta el tipo de pregunta: definición, proceso, ciclo de vida, clínica
- **Mantiene contexto** entre mensajes para conversaciones coherentes

### 3. 🎴 **Flashcards** (`flashcards-page.tsx` + `use-flashcards.ts`)
- Sistema de estudio con tarjetas
- Soporte para tarjetas de opción múltiple y definición
- Organización por materia
- Tracking de progreso y dominio

### 4. 📝 **Cuestionarios** (`quizzes-page.tsx` + `use-quizzes.ts`)
- Evaluaciones con múltiples tipos de preguntas:
  - Opción múltiple
  - Verdadero/Falso
  - Completar espacios (fill-in-the-blank)
- Sistema de puntuación y retroalimentación
- Historial de resultados

### 5. ⏱️ **Pomodoro** (`pomodoro-page.tsx` + `use-pomodoro.ts`)
- Temporizador Pomodoro con sesiones de trabajo/descanso
- Asociación de sesiones a materias específicas
- Estadísticas de sesiones completadas

### 6. 👤 **Perfil** (`profile-page.tsx`)
- Información del usuario
- Estadísticas de estudio globales
- Gestión de preferencias

### 7. ⚙️ **Configuración** (`settings-page.tsx`)
- Gestión de materias/asignaturas (crear, editar, activar/desactivar)
- Selector de tema (claro/oscuro)
- Preferencias de estudio

### 8. 📖 **Contenido** (`content-page.tsx`)
- Gestión de material de estudio organizado por materia
- Estructura jerárquica de temas

---

## 🧠 Sistema de Datos

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

## 🏃‍♂️ Scripts Disponibles

```bash
# Desarrollo local
npm run dev              # Inicia servidor de desarrollo en localhost:5173

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

## 🌐 Arquitectura de Comunicación

```
┌─────────────────────────────────────────────────────────────┐
│                      NAVEGADOR WEB                          │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              VetStudy AI Pro (React SPA)                ││
│  │  ┌─────────┐ ┌──────────┐ ┌───────────┐ ┌─────────────┐ ││
│  │  │ Tutor   │ │Flashcards│ │ Cuestionarios│ │ Pomodoro │ ││
│  │  │   IA    │ │          │ │             │ │          │ ││
│  │  └────┬────┘ └──────────┘ └───────────┘ └─────────────┘ ││
│  │       │                                                  ││
│  │  ┌────▼───────────────────────────────────────────────┐  ││
│  │  │           Custom Hooks (Lógica de Negocio)          │  ││
│  │  │  useChat │ useFlashcards │ useQuizzes │ usePomodoro  │  ││
│  │  └────┬────────────────────────────────────────────────┘  ││
│  │       │                                                  ││
│  │  ┌────▼───────────┐                                      ││
│  │  │  localStorage  │  ← Persistencia local en el navegador ││
│  │  └────────────────┘                                      ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘

⚠️ NOTA: No hay backend ni servidor API. Toda la lógica es cliente-side.
```

---

## 🎓 Sistema de Tutor IA - Detalle Técnico

El Tutor IA implementado en `use-chat.ts` (22839 bytes) es un sistema **frontend-only** de generación de respuestas:

### Flujo de Trabajo:
1. **Análisis semántico** de la pregunta del usuario
2. **Detección de entidades** científicas específicas
3. **Clasificación de tipo de pregunta** (definición, proceso, ciclo, clínica)
4. **Generación de respuesta** desde base de conocimiento local
5. **Memoria de conversación** para mantener contexto entre mensajes

### Entidades Soportadas:
- **Virología**: orthomyxovirus, retrovirus, VIH, hepatitis, herpesvirus, coronavirus
- **Parasitología**: Fasciola, Leishmania, Toxocara, Giardia
- **Preparado para**: Ecología, Cinematografía, Literatura, Inglés

### Características:
- Respuestas estructuradas a nivel universitario
- Formato Markdown con emojis para legibilidad
- Detección de preguntas de seguimiento
- Expansión contextual automática

---

## 🔧 Configuración de Desarrollo

### Requisitos:
- Node.js 18+
- pnpm (instalado automáticamente por el proyecto)

### Instalación:
```bash
# 1. Clonar o navegar al proyecto
cd vetstudy-ai-pro

# 2. Instalar dependencias
npm run install-deps

# 3. Iniciar desarrollo
npm run dev

# 4. Abrir navegador en http://localhost:5173
```

### Configuración shadcn/ui:
- Componentes base en `@/components/ui/`
- Tema configurado en `tailwind.config.js`
- Soporte para modo oscuro con `next-themes`

---

## 📦 Build de Producción

```bash
npm run build
```

Genera la carpeta `dist/` con:
- `index.html` - Entry point
- `assets/` - JS/CSS optimizados y minificados
- Listo para desplegar en cualquier hosting estático (Netlify, Vercel, GitHub Pages)

---

## 🚧 Limitaciones Conocidas

1. **Sin Backend**: No hay sincronización entre dispositivos. Los datos viven solo en el navegador local.
2. **Sin Autenticación**: No hay sistema de usuarios/login.
3. **AI Simulada**: El "Tutor IA" usa lógica de patrones, no LLM real. Las respuestas están predefinidas para términos conocidos y usa frameworks académicos genéricos para términos desconocidos.
4. **Persistencia Local**: Borrar datos del navegador = pérdida de todo el progreso.

---

## 🔄 Flujo de Datos - Ejemplo

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

## 🎯 Roadmap Sugerido

- [ ] Implementar backend real con API REST
- [ ] Sistema de autenticación de usuarios
- [ ] Sincronización en la nube
- [ ] Integración con LLM real (OpenAI/Anthropic) para respuestas dinámicas
- [ ] App móvil nativa (React Native)
- [ ] Modo offline completo con Service Workers
- [ ] Exportación/importación de datos

---

## 📄 Licencia

Proyecto privado - Propiedad del desarrollador.

---

**Última actualización:** Febrero 2026  
**Versión actual:** 0.0.0 (desarrollo activo)
