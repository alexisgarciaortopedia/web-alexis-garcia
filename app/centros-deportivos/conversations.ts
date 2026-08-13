export type Turno =
  | { tipo: "mensaje"; de: "atleta" | "luna"; texto: string }
  | { tipo: "separador"; texto: string };

export type Conversacion = {
  id: string;
  titulo: string;
  turnos: Turno[];
};

function mensaje(de: "atleta" | "luna", texto: string): Turno {
  return { tipo: "mensaje", de, texto };
}

function separador(texto: string): Turno {
  return { tipo: "separador", texto };
}

export const CONVERSACIONES: Conversacion[] = [
  {
    id: "lesion-a-tiempo",
    titulo: "Una lesión a tiempo",
    turnos: [
      mensaje("atleta", "Me duele mucho la rodilla y se me hinchó desde ayer"),
      mensaje(
        "luna",
        "Dolor fuerte con hinchazón desde ayer sí necesita que te valore un traumatólogo hoy. Mientras te valoran, no entrenes pierna ni cargues peso con esa rodilla. Manténla en reposo relativo, elévala y aplica frío indirecto 10–15 minutos. ¿Puedes apoyar y caminar, o la rodilla no te responde?",
      ),
      mensaje("atleta", "sigue igual, no puedo apoyar bien"),
      mensaje(
        "luna",
        "Que no puedas apoyar bien confirma que la rodilla está limitando tu función. Necesitas valoración hoy. Como eres parte de Muévete Seguro, tu consulta tiene precio preferente: puedes escribirle al Dr. Alexis al 773 175 4638 o agendar en alexisgarciaortopedia.com/agendar. Ya avisé al equipo para que te contacten. Si no puedes dar pasos, se ve deformada, está muy roja o caliente, o tienes fiebre, ve directo a urgencias.",
      ),
      mensaje("atleta", "ya me atendieron, era una distensión"),
      mensaje(
        "luna",
        "Qué bueno que ya te valoraron 🙌 Sigue las indicaciones que te dieron y no aceleres el regreso a pierna aunque te sientas bien. Te escribo en unos días para ver cómo vas.",
      ),
      separador("3 días después"),
      mensaje("luna", "¿Cómo va esa rodilla? ¿Ya puedes apoyar sin molestia?"),
      mensaje("atleta", "mucho mejor, ya casi no me duele"),
      mensaje(
        "luna",
        "Me da gusto 💪 Antes de volver a cargar peso, prueba movimientos sin carga y fíjate si el dolor regresa siempre en el mismo punto. Si vuelve la hinchazón o el dolor al apoyar, escríbeme.",
      ),
    ],
  },
  {
    id: "cuando-es-urgente",
    titulo: "Cuando es urgente",
    turnos: [
      mensaje(
        "atleta",
        "Oye nada grave, pero se me durmió toda la pierna desde en la mañana y no la siento bien jaja",
      ),
      mensaje(
        "luna",
        "Esto sí necesita atención urgente. Que una pierna completa lleve dormida desde la mañana y no la sientas bien puede indicar un problema neurológico; no es seguro esperar a que se quite ni manejarlo solo por chat.",
      ),
      mensaje(
        "luna",
        "Ve a urgencias ahora o llama al 911. No manejes: pide que te acompañen. No camines sin apoyo y no entrenes. Ya avisé al equipo médico.",
      ),
      mensaje("atleta", "va, ya voy para allá"),
      mensaje(
        "luna",
        "Bien. Al llegar diles exactamente desde cuándo empezó y que es toda la pierna. Cuéntame cómo te fue cuando puedas.",
      ),
    ],
  },
  {
    id: "cuando-no-es-nada",
    titulo: "Cuando no es nada",
    turnos: [
      mensaje("atleta", "me quedó adolorido el hombro del entrenamiento de ayer"),
      mensaje(
        "luna",
        "Ese tipo de molestia después de una sesión fuerte suele ser normal y ceder en 48–72 horas. Baja la carga en hombro un par de días, no lo fuerces por encima de la cabeza y date recuperación entre sesiones.",
      ),
      mensaje("atleta", "sale, gracias"),
      mensaje(
        "luna",
        "💪 Escríbeme si el dolor aparece siempre en el mismo punto, si empeora durante la sesión o si amaneces con él. Eso ya no es molestia normal y vale la pena revisarlo.",
      ),
    ],
  },
];
