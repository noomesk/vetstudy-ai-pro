import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSubjects } from './use-subjects';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  interval: number;
  repetition: number;
  easeFactor: number;
  nextReview: Date;
  isStudying?: boolean;
}

export interface FlashcardStats {
  total: number;
  mastered: number;
  learning: number;
  toReview: number;
  streak: number;
}

const generateFlashcardsForSubjects = (subjects: any[]): Flashcard[] => {
  const allFlashcards: Flashcard[] = [];
  
  subjects.forEach(subject => {
    switch (subject.id) {
      case 'virology':
        allFlashcards.push(
          {
            id: 'virology-1',
            front: '¿Qué es un retrovirus y cuál es su mecanismo de replicación?',
            back: 'Un retrovirus es un virus que contiene ARN y utiliza la enzima transcriptasa inversa para convertir su ARN en ADN, que luego se integra en el genoma de la célula huésped. Ejemplos: VIH, HTLV, virus de la leucemia felina.',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'virology-2',
            front: '¿Cuál es la diferencia entre virus ADN y ARN?',
            back: 'Los virus ADN tienen ADN como material genético (ej: Herpesvirus, Poxvirus) mientras que los virus ARN tienen ARN (ej: Retrovirus, Flavivirus). Esta diferencia afecta su replicación y estrategias de evasión inmune.',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'virology-3',
            front: '¿Qué es la Clasificación de Baltimore y cuáles son sus grupos?',
            back: 'La Clasificación de Baltimore divide a los virus según su tipo de ácido nucleico y mecanismo de replicación: Grupo I (ADN bicatenario), II (ADN monocatenario), III (ARN bicatenario), IV (ARN monocatenario +), V (ARN monocatenario -), VI (retrovirus ARN), VII (pararetrovirus ADN).',
            subject: subject.name,
            difficulty: 'hard',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'virology-4',
            front: '¿Cuáles son las etapas del ciclo de replicación viral?',
            back: '1) Adsorción/uncoating, 2) Penetración, 3) Replicación del genoma, 4) Síntesis de proteínas estructurales y no estructurales, 5) Ensamblaje de nuevas partículas virales, 6) Maduración, 7) Liberación (budding o lisis celular).',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'virology-5',
            front: '¿Qué son los viriones y cuál es su estructura básica?',
            back: 'Los viriones son partículas virales maduras e infectivas. Estructura: 1) Ácido nucleico (ADN o ARN), 2) Cápside (proteínas estructurales), 3) Envolvente (lipídica, en virus envueltos), 4) Proteínas de superficie (peplómeros).',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'virology-6',
            front: '¿Qué es la transcriptasa inversa y qué virus la poseen?',
            back: 'La transcriptasa inversa es una enzima que sintetiza ADN a partir de una plantilla de ARN. La poseen los retrovirus (VIH, HTLV) y permite integrar el genoma viral al ADN del hospedero. Es blanco de fármacos antirretrovirales.',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'virology-7',
            front: '¿Cómo se clasifican los virus según su tropismo?',
            back: 'Por tropismo: 1) Ectromas (piel/epitelio), 2) Viscerotropas (órganos internos), 3) Neurotropas (sistema nervioso). Ej: Rabia (neurotropa), Hepatitis (viscerotropa), Herpes simplex (ectroma).',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'virology-8',
            front: '¿Qué es el interferón y cuál es su función antiviral?',
            back: 'El interferón es una citoquina producida por células infectadas que induce estado antiviral en células vecinas. Bloquea la traducción proteica viral y activa células NK. Tipos: alfa (leucocitos), beta (fibroblastos), gamma (linfocitos T).',
            subject: subject.name,
            difficulty: 'hard',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'virology-9',
            front: '¿Qué es la transformación viral y qué virus la causan?',
            back: 'Es la conversión de células normales en células cancerosas por virus oncogénicos. Mecanismos: genes virales de oncogenes (v-onc), proteínas que inactivan p53/Rb, integración cercana a proto-oncogenes. Ej: Papilomavirus (cérvix), HTLV-1 (leucemia).',
            subject: subject.name,
            difficulty: 'hard',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'virology-10',
            front: '¿Cuáles son los mecanismos de evasión del sistema inmune por virus?',
            back: '1) Antígenos de superficie variables (VIH, influenza), 2) Inhibición de presentación de antígenos (CMV, VEB), 3) Latencia (herpesvirus), 4) Infección de células inmunes (VIH infecta CD4+), 5) Producción de moléculas similares a citoquinas.',
            subject: subject.name,
            difficulty: 'hard',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          }
        );
        break;
        
      case 'parasitology':
        allFlashcards.push(
          {
            id: 'parasitology-1',
            front: '¿Cómo se clasifican los protozoos de importancia veterinaria?',
            back: 'Se clasifican en: Amoebidae (Entamoeba), Flagellata (Giardia, Trichomonas), Ciliophora (Balantidium), y Apicomplexa (Eimeria, Cryptosporidium, Toxoplasma). Cada grupo tiene características distintivas de movimiento y reproducción.',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'parasitology-2',
            front: '¿Cuál es el ciclo de vida de Toxocara canis?',
            back: 'Toxocara canis tiene un ciclo directo: huevos en heces → larva L1-L2-L3 en ambiente → infección por ingestión → larvas migran en hígado/pulmón → regreso a intestino → adulto. Transmisión transplacentaria y lactogénica también ocurren.',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'parasitology-3',
            front: '¿Qué es la teniasis y qué agente la causa?',
            back: 'La teniasis es una parasitosis intestinal causada por Taenia solium (cerdo) o Taenia saginata (ganado). El humano es hospedero definitivo. Se adquiere por consumo de carne cruda o poco cocida con quistes larvarios (cisticercos).',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'parasitology-4',
            front: '¿Cómo se diagnostica la giardiasis?',
            back: 'Diagnóstico: examen coproparasitoscópico (formol-eter concentración), tinción con lugol (quistes), inmunofluorescencia, ELISA para detección de antígenos, PCR. Los quistes son muy resistentes en ambiente.',
            subject: subject.name,
            difficulty: 'hard',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'parasitology-5',
            front: '¿Cuáles son las principales familias de helmintos en veterinaria?',
            back: '1) Strongylidae (Strongylus), 2) Ascarididae (Ascaris, Toxocara), 3) Ancylostomatidae (Ancylostoma), 4) Trichuridae (Trichuris), 5) Taeniidae (Taenia), 6) Dicrocoeliidae (Fasciola), 7) Paramphistomidae.',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'parasitology-6',
            front: '¿Qué es la cisticercosis y cómo se transmite?',
            back: 'Cisticercosis es la infección por la forma larvaria (cisticerco) de Taenia solium. Se transmite por ingestión de huevos de tenia en heces humanas contaminadas. El cerdo es hospedero intermediario, el humano puede ser hospedero intermediario (cisticercosis) o definitivo (teniasis).',
            subject: subject.name,
            difficulty: 'hard',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'parasitology-7',
            front: '¿Cuál es el ciclo biológico de Fasciola hepatica?',
            back: 'Huevos en heces de hospedero definitivo (rumiantes) → miracidio en agua → invade caracol (hospedero intermediario) → esporocistos, redias, cercarias → metacercarias en vegetación → ingestión → adulto en vesícula biliar.',
            subject: subject.name,
            difficulty: 'hard',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'parasitology-8',
            front: '¿Qué es la toxoplasmosis y quiénes son sus hospederos?',
            back: 'Toxoplasmosis es causada por Toxoplasma gondii (Apicomplexa). Hospedero definitivo: felinos. Hospederos intermediarios: humanos, ganado, aves, roedores. Se transmite por ingestión de ooquistes, carne cruda con quistes, transmisión congénita.',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'parasitology-9',
            front: '¿Cuáles son los ectoparásitos más importantes en animales domésticos?',
            back: 'Ácaros: Sarcoptes (sarna), Demodex, Otodectes. Insectos: Pulgas (Ctenocephalides), Piojos (Linognathus), Mosca de los establos (Stomoxys), Tábanos. Pueden causar dermatitis, anemia, transmitir agentes patógenos.',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'parasitology-10',
            front: '¿Qué medidas de control se usan contra los parásitos gastrointestinales?',
            back: '1) Desparasitación estratégica, 2) Pastoreo rotativo, 3) Control de hospederos intermediarios (caracoles), 4) Manejo de estiércol, 5) Cuarentena de animales nuevos, 6) Mejorar nutrición y albergue, 7) Vacunación (algunos parásitos).',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          }
        );
        break;
        
      case 'ecology':
        allFlashcards.push(
          {
            id: 'ecology-1',
            front: '¿Qué es una pirámide ecológica y qué representa?',
            back: 'Una pirámide ecológica representa la estructura trófica de un ecosistema, mostrando la transferencia de energía entre niveles. La base son productores, seguidos de consumidores primarios, secundarios y terciarios. La energía disminuye en cada nivel (~10%).',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'ecology-2',
            front: '¿Cuál es la diferencia entre hábitat y nicho ecológico?',
            back: 'Hábitat es el lugar físico donde vive un organismo (ej: bosque, río), mientras que nicho ecológico es el rol funcional que desempeña en el ecosistema (qué come, cómo se reproduce, sus interacciones). Varios organismos pueden compartir hábitat pero tener nichos diferentes.',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'ecology-3',
            front: '¿Qué es la biodiversidad y por qué es importante?',
            back: 'La biodiversidad es la variedad de vida en todos sus niveles: genética, especies y ecosistemas. Es importante porque proporciona servicios ecosistémicos (polinización, purificación de agua), estabilidad, recursos genéticos para medicinas y alimentos, y valor cultural.',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'ecology-4',
            front: '¿Cuáles son los niveles tróficos en un ecosistema?',
            back: '1) Productores (plantas, algas - fotosíntesis), 2) Consumidores primarios (herbívoros), 3) Consumidores secundarios (carnívoros que comen herbívoros), 4) Consumidores terciarios (carnívoros tope), 5) Descomponedores (bacterias, hongos).',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'ecology-5',
            front: '¿Qué es la sucesión ecológica y qué tipos existen?',
            back: 'Sucesión ecológica es el cambio gradual en la estructura de una comunidad biológica a lo largo del tiempo. Primaria (en sustrato sin suelo previo) y secundaria (en área con suelo preexistente tras perturbación).',
            subject: subject.name,
            difficulty: 'hard',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'ecology-6',
            front: '¿Qué son las redes tróficas y cómo funcionan?',
            back: 'Las redes tróficas son interconexiones de cadenas alimentarias en un ecosistema. Muestran quién come a quién y las relaciones de dependencia energética. Son más estables que cadenas simples porque tienen vías alternativas de flujo de energía.',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'ecology-7',
            front: '¿Qué es la biomasa y cómo se distribuye en los ecosistemas?',
            back: 'Biomasa es la masa total de organismos vivos en un área o volumen. Disminuye en cada nivel trófico (~90% de pérdida entre niveles). Los productores tienen la mayor biomasa, los tope de cadena la menor.',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'ecology-8',
            front: '¿Qué factores determinan el clima de un ecosistema?',
            back: 'Factores: latitud, altitud, distancia al mar, corrientes oceánicas, vientos predominantes. Elementos: temperatura, precipitación, humedad, radiación solar, presión atmosférica.',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'ecology-9',
            front: '¿Qué es la capacidad de carga de un ambiente?',
            back: 'Capacidad de carga (K) es el número máximo de individuos de una especie que un ambiente puede sostener indefinidamente con recursos disponibles. Limitada por alimento, espacio, agua, depredadores y enfermedades.',
            subject: subject.name,
            difficulty: 'hard',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'ecology-10',
            front: '¿Cómo afecta el cambio climático a los ecosistemas?',
            back: 'Efectos: desplazamiento de especies hacia polos/altitudes mayores, fenólogía alterada (floración, migración), acidificación oceánica, bleaching de corales, extinciones, alteración de ciclos biogeoquímicos, invasión de especies exóticas.',
            subject: subject.name,
            difficulty: 'hard',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          }
        );
        break;
        
      case 'literature-cinema':
        allFlashcards.push(
          {
            id: 'literature-cinema-1',
            front: '¿Cuáles son los principales géneros literarios?',
            back: 'Los tres grandes géneros son: 1) Lírico (expresión de sentimientos, poesía), 2) Narrativo (relato de historias, novela, cuento), 3) Dramático (obras teatrales, diálogo entre personajes). Cada género tiene características y subgéneros específicos.',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'literature-cinema-2',
            front: '¿Qué es el narrador y qué tipos existen?',
            back: 'El narrador es la voz que cuenta la historia. Tipos principales: 1) Primera persona ("yo"), 2) Tercera persona limitada (sabe pensamientos de un personaje), 3) Tercera persona omnisciente (sabe todo), 4) Segunda persona ("tú", poco común).',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'literature-cinema-3',
            front: '¿Cuáles son los tipos básicos de planos cinematográficos?',
            back: 'Planos principales: 1) Gran plano (detalle), 2) Primer plano (rostro), 3) Plano medio (cintura arriba), 4) Plano entero (cuerpo completo), 5) Plano general (contexto completo), 6) Gran plano general (vista amplia del entorno).',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'literature-cinema-4',
            front: '¿Qué es el montaje paralelo y para qué se usa?',
            back: 'El montaje paralelo muestra dos o más acciones simultáneas en diferentes lugares, creando tensión o revelando conexiones. Ejemplo: héroe corriendo a rescatar vs bomba haciendo cuenta regresiva. Crea ritmo y significado a través de yuxtaposición.',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'literature-cinema-5',
            front: '¿Qué es la estructura dramática de tres actos?',
            back: 'Estructura clásica: Acto I (presentación/conflicto inicial), Acto II (desarrollo/confrontación/punto medio), Acto III (clímax/resolución). También conocida como setup, confrontation, resolution. Usada en teatro, cine y narrativa.',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'literature-cinema-6',
            front: '¿Qué es el punto de vista en cinematografía?',
            back: 'El punto de vista (POV) muestra lo que ve un personaje específico. Técnicas: Plano subjetivo (cámara como ojos del personaje), miradas de personajes, reacciones. Crea identificación emocional con el personaje.',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'literature-cinema-7',
            front: '¿Qué es el tiempo narrativo y qué relación tiene con el tiempo histórico?',
            back: 'Tiempo narrativo: duración de la historia contada. Puede ser igual, mayor (dilatación), menor (síntesis) o diferente (analepsis/flashback, prolepsis/flashforward) al tiempo histórico (tiempo real de los eventos).',
            subject: subject.name,
            difficulty: 'hard',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'literature-cinema-8',
            front: '¿Cuáles son los elementos de la trama en un guion cinematográfico?',
            back: 'Elementos: Premisa (idea central), Conflicto (obstáculo protagonista), Personajes (protagonista, antagonista, secundarios), Estructura (3 actos), Escenas (unidades de acción), Diálogos, Desenlace. El conflicto impulsa la narrativa.',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          }
        );
        break;
        
      case 'english':
        allFlashcards.push(
          {
            id: 'english-1',
            front: 'What are the main verb tenses in English?',
            back: 'Main tenses: 1) Present (simple, continuous, perfect, perfect continuous), 2) Past (simple, continuous, perfect, perfect continuous), 3) Future (simple, continuous, perfect, perfect continuous). Each tense has specific usage rules.',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'english-2',
            front: 'When do we use "a" vs "an"?',
            back: 'Use "an" before vowel sounds (a, e, i, o, u sounds): an apple, an hour, an MBA. Use "a" before consonant sounds: a book, a university, a European. It depends on pronunciation, not spelling.',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'english-3',
            front: 'What is the difference between "present perfect" and "past simple"?',
            back: 'Past simple: completed actions at specific times (I went yesterday). Present perfect: actions with connection to present, unspecified time, or continuing relevance (I have been to Paris, I have lived here for 5 years).',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'english-4',
            front: 'What are phrasal verbs and how are they used?',
            back: 'Phrasal verbs are verbs combined with prepositions/adverbs that change meaning (e.g., "give up" = surrender, "look after" = care for). They are common in informal English and often have non-literal meanings.',
            subject: subject.name,
            difficulty: 'hard',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'english-5',
            front: 'What are the conditionals (if-clauses) in English?',
            back: 'Zero conditional: general truths (If you heat water, it boils). First: real possibilities (If it rains, I will stay). Second: hypothetical present (If I were rich, I would travel). Third: hypothetical past (If I had studied, I would have passed).',
            subject: subject.name,
            difficulty: 'hard',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'english-6',
            front: 'What is the passive voice and when is it used?',
            back: 'Passive voice: object becomes subject (The cake was eaten by John). Used when the agent is unknown, unimportant, or when we want to emphasize the action/object rather than who did it. Structure: be + past participle.',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'english-7',
            front: 'What are modal verbs and what do they express?',
            back: 'Modal verbs (can, could, may, might, must, should, would) express: ability, possibility, permission, obligation, advice, deduction. They are followed by bare infinitive (without "to") and have no -s in third person.',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'english-8',
            front: 'What is the difference between "make" and "do"?',
            back: '"Make" often implies creation or production (make a cake, make money). "Do" is used for activities, tasks, and general actions (do homework, do business). Some collocations are idiomatic and must be memorized.',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          }
        );
        break;
    }
  });
  
  return allFlashcards;
};

const initialFlashcards: Flashcard[] = [
  {
    id: '1',
    front: '¿Qué es un retrovirus y cuál es su mecanismo de replicación?',
    back: 'Un retrovirus es un virus que contiene ARN y utiliza la enzima transcriptasa inversa para convertir su ARN en ADN, que luego se integra en el genoma de la célula huésped. Ejemplos: VIH, HTLV, virus de la leucemia felina.',
    subject: 'virology',
    difficulty: 'medium',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReview: new Date(),
    isStudying: false,
  },
  {
    id: '2',
    front: '¿Cuáles son los síntomas iniciales de la rabia en animales?',
    back: 'Los síntomas iniciales incluyen cambios de comportamiento, agresividad, aislamiento, fiebre, dificultad para tragar, y exceso de salivación. El período de incubación varía de 1 semana a varios meses.',
    subject: 'virology',
    difficulty: 'hard',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReview: new Date(),
    isStudying: false,
  },
  {
    id: '3',
    front: '¿Cómo se clasifican los protozoos de importancia veterinaria?',
    back: 'Se clasifican en: Amoebidae (Entamoeba), Flagellata (Giardia, Trichomonas), Ciliophora (Balantidium), y Apicomplexa (Eimeria, Cryptosporidium, Toxoplasma). Cada grupo tiene características distintivas de movimiento y reproducción.',
    subject: 'parasitology',
    difficulty: 'easy',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReview: new Date(),
    isStudying: false,
  },
];

const STORAGE_KEY = 'vetstudy-flashcards';

const loadFlashcardsFromStorage = (): Flashcard[] | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert date strings back to Date objects
      return parsed.map((card: any) => ({
        ...card,
        nextReview: new Date(card.nextReview),
      }));
    }
  } catch (error) {
    console.error('Error loading flashcards from storage:', error);
  }
  return null;
};

const saveFlashcardsToStorage = (flashcards: Flashcard[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));
  } catch (error) {
    console.error('Error saving flashcards to storage:', error);
  }
};

export const useFlashcards = () => {
  const { activeSubjects } = useSubjects();
  
  // Initialize flashcards from localStorage or generate new ones
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const saved = loadFlashcardsFromStorage();
    if (saved && saved.length > 0) {
      return saved;
    }
    return generateFlashcardsForSubjects(activeSubjects);
  });
  
  // State for subject filtering
  const [selectedSubject, setSelectedSubject] = useState<string>(() => {
    return activeSubjects.length > 0 ? activeSubjects[0].id : 'general';
  });
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studySession, setStudySession] = useState({
    startTime: new Date(),
    cardsStudied: 0,
    correctAnswers: 0,
  });

  // Persist flashcards to localStorage whenever they change
  useEffect(() => {
    saveFlashcardsToStorage(flashcards);
  }, [flashcards]);

  // Filter cards by selected subject
  const filteredCards = useMemo(() => {
    if (selectedSubject === 'all') {
      return flashcards;
    }
    return flashcards.filter(card => {
      const cardSubjectId = activeSubjects.find(s => 
        card.subject.toLowerCase().includes(s.name.toLowerCase()) ||
        s.name.toLowerCase().includes(card.subject.toLowerCase())
      )?.id;
      return cardSubjectId === selectedSubject || card.subject === selectedSubject;
    });
  }, [flashcards, selectedSubject, activeSubjects]);

  const cardsToReview = filteredCards.filter(card => 
    new Date(card.nextReview) <= new Date()
  );

  const currentCard = cardsToReview[currentCardIndex] || filteredCards[currentCardIndex];

  // Stats by subject
  const getStatsBySubject = useCallback((subjectId: string) => {
    const subjectCards = flashcards.filter(card => {
      const cardSubjectId = activeSubjects.find(s => 
        card.subject.toLowerCase().includes(s.name.toLowerCase()) ||
        s.name.toLowerCase().includes(card.subject.toLowerCase())
      )?.id;
      return cardSubjectId === subjectId || card.subject === subjectId;
    });
    
    return {
      total: subjectCards.length,
      mastered: subjectCards.filter(card => card.interval >= 21).length,
      learning: subjectCards.filter(card => card.interval > 1 && card.interval < 21).length,
      toReview: subjectCards.filter(card => new Date(card.nextReview) <= new Date()).length,
    };
  }, [flashcards, activeSubjects]);

  const stats: FlashcardStats = {
    total: flashcards.length,
    mastered: flashcards.filter(card => card.interval >= 21).length,
    learning: flashcards.filter(card => card.interval > 1 && card.interval < 21).length,
    toReview: cardsToReview.length,
    streak: 7,
  };

  // Function to add new flashcard
  const addFlashcard = useCallback((front: string, back: string, subject: string) => {
    const newCard: Flashcard = {
      id: `custom-${Date.now()}`,
      front,
      back,
      subject,
      difficulty: 'medium',
      interval: 1,
      repetition: 0,
      easeFactor: 2.5,
      nextReview: new Date(),
      isStudying: false,
    };
    
    setFlashcards(prev => [...prev, newCard]);
    return newCard;
  }, []);

  // Get current card subject name
  const getCurrentCardSubjectName = useCallback(() => {
    if (!currentCard) return 'General';
    const subject = activeSubjects.find(s => 
      currentCard.subject.toLowerCase().includes(s.name.toLowerCase()) ||
      s.name.toLowerCase().includes(currentCard.subject.toLowerCase()) ||
      s.id === currentCard.subject
    );
    return subject?.name || currentCard.subject || 'General';
  }, [currentCard, activeSubjects]);

  const calculateNextReview = useCallback((card: Flashcard, quality: number) => {
    const { interval, repetition, easeFactor } = card;
    
    let newInterval = interval;
    let newRepetition = repetition + 1;
    let newEaseFactor = easeFactor;

    if (quality >= 3) {
      if (repetition === 0) {
        newInterval = 1;
      } else if (repetition === 1) {
        newInterval = 6;
      } else {
        newInterval = Math.round(interval * easeFactor);
      }
    } else {
      newRepetition = 0;
      newInterval = 1;
    }

    newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + newInterval);

    return {
      interval: newInterval,
      repetition: newRepetition,
      easeFactor: Math.max(1.3, newEaseFactor),
      nextReview,
    };
  }, []);

  const rateCard = useCallback((quality: number) => {
    if (!currentCard) return;

    const reviewData = calculateNextReview(currentCard, quality);
    
    setFlashcards(prev => prev.map(card => 
      card.id === currentCard.id 
        ? {
            ...card,
            ...reviewData,
            difficulty: quality <= 2 ? 'hard' : quality === 3 ? 'medium' : 'easy',
          }
        : card
    ));

    setStudySession(prev => ({
      ...prev,
      cardsStudied: prev.cardsStudied + 1,
      correctAnswers: prev.correctAnswers + (quality >= 3 ? 1 : 0),
    }));

    // Move to next card
    setTimeout(() => {
      setShowAnswer(false);
      if (currentCardIndex < flashcards.length - 1) {
        setCurrentCardIndex(prev => prev + 1);
      }
    }, 500);
  }, [currentCard, currentCardIndex, flashcards.length, calculateNextReview]);

  const flipCard = useCallback(() => {
    setShowAnswer(!showAnswer);
  }, [showAnswer]);

  const nextCard = useCallback(() => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  }, [currentCardIndex, flashcards.length]);

  const previousCard = useCallback(() => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  }, [currentCardIndex]);

  const resetSession = useCallback(() => {
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setStudySession({
      startTime: new Date(),
      cardsStudied: 0,
      correctAnswers: 0,
    });
  }, []);

  const getSessionTime = useCallback(() => {
    const now = new Date();
    const diff = now.getTime() - studySession.startTime.getTime();
    const minutes = Math.floor(diff / 60000);
    return `${minutes} min`;
  }, [studySession.startTime]);

  const getSessionProgress = useCallback(() => {
    const reviewedCards = flashcards.slice(0, currentCardIndex + 1).filter(card => 
      card.interval > 1 || card.repetition > 0
    );
    return reviewedCards.length;
  }, [flashcards, currentCardIndex]);

  return {
    flashcards,
    currentCard,
    currentCardIndex,
    showAnswer,
    stats,
    studySession,
    cardsToReview,
    selectedSubject,
    setSelectedSubject,
    addFlashcard,
    getStatsBySubject,
    getCurrentCardSubjectName,
    rateCard,
    flipCard,
    nextCard,
    previousCard,
    resetSession,
    getSessionTime,
    getSessionProgress,
  };
};
