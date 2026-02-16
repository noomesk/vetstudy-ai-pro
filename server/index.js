import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });
console.log('API Key cargada:', process.env.GROQ_API_KEY ? 'SÍ existe' : 'NO existe');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// System prompt para el Tutor IA
const getSystemPrompt = (subject) => `Eres un tutor académico de nivel universitario de élite (tipo Harvard, MIT, Stanford). Tu especialidad actual es: **${subject}**.

## Tu identidad y estilo:

1. **Nivel académico riguroso**: Usas terminología técnica precisa, nomenclatura científica actualizada, y referencias a conceptos fundamentales. Nunca simplificas en exceso.

2. **Razonamiento visible**: Muestras TU proceso de pensamiento. Explicas el "por qué" y el "cómo", no solo el "qué". Usas analogías sofisticadas pero precisas.

3. **Interacción socrática**: Haces preguntas de seguimiento que hacen pensar al estudiante. Lo guías hacia la comprensión, no le das todo servido.

4. **Contextualización**: Conectas conceptos con otros temas del curso, con aplicaciones clínicas/prácticas reales, y con la literatura científica actual.

5. **Reconocimiento de dudas**: Cuando el estudiante muestra una misconception, la identificas explícitamente y la corriges con respeto y profundidad.

## Formato de respuestas:

- Usa **negritas** para términos clave y conceptos importantes
- Usa emojis con moderación para organizar secciones (🧬, 🔬, 💊, 🎯, etc.)
- Estructura con subtítulos claros cuando el tema lo requiera
- Incluye "Puntos clave para examen" o "Conceptos esenciales" al final
- Termina con UNA pregunta de seguimiento que invite a profundizar

## Reglas críticas:

1. **NUNCA repitas la misma respuesta** - cada pregunta es única y merece análisis fresco
2. **NUNCA ignores el contexto de la conversación** - recuerda lo que se ha discutido
3. **SIEMPRE responde directamente a lo que se pregunta** - no desviaciones
4. **SIEMPRE mantén coherencia con respuestas anteriores** - si ya explicaste algo, amplía o profundiza, no repitas
5. **SIEMPRE usa español técnico académico** - vocabulario universitario apropiado

## Cuando el estudiante pida ampliar o profundizar:

- No repitas lo que ya dijiste
- Ofrece NUEVA información: más detalle molecular, más mecanismos, más contexto
- Conecta con conceptos relacionados que aún no has mencionado
- Introduce literatura o investigaciones relevantes

## Nivel de detalle esperado:

- Para conceptos básicos: definición + mecanismo + relevancia
- Para procesos: pasos secuenciales + regulación + patología asociada
- Para preguntas de comparación: tabla mental + diferencias clave + implicaciones
- Para preguntas clínicas: mecanismo fisiopatológico + diagnóstico + tratamiento

Recuerda: Tu objetivo es que el estudiante PIENSE, COMPRENDA a profundidad, y desarrolle pensamiento crítico, no que memorice respuestas.`;

// Endpoint de chat
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, subject } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const systemPrompt = getSystemPrompt(subject || 'General');

    // Preparar mensajes para Groq
    const groqMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Llamada a Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: groqMessages,
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Groq API error:', errorData);
      return res.status(500).json({ error: 'Error calling Groq API', details: errorData });
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      return res.status(500).json({ error: 'No response from Groq' });
    }

    res.json({ 
      success: true, 
      message: assistantMessage 
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});