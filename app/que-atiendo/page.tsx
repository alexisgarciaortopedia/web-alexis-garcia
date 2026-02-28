"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import WhatsAppFloating from "@/components/WhatsAppFloating";

type Condition = {
  title: string;
  description: string;
  whenTo: string[];
};

type Category = {
  id: string;
  title: string;
  conditions: Condition[];
};

const CATEGORIES: Category[] = [
  {
    id: "trauma",
    title: "TRAUMA",
    conditions: [
      {
        title: "Fracturas (muñeca, tobillo, clavícula, húmero)",
        description:
          "Dolor intenso, inflamación o deformidad después de una caída o golpe pueden indicar una fractura. En algunos casos el hueso no está desplazado, pero el dolor persiste y limita el movimiento. Una valoración adecuada permite confirmar el diagnóstico con estudios de imagen, alinear correctamente si es necesario y evitar complicaciones como mala consolidación o pérdida de función.",
        whenTo: [
          "Deformidad, dolor intenso o incapacidad para mover o apoyar.",
          "Aumento progresivo de inflamación, moretón o dolor que no cede.",
          "Entumecimiento, cambio de color o frialdad en la extremidad.",
        ],
      },
      {
        title: "Esguinces y luxaciones",
        description:
          "Dolor, inflamación o sensación de que la articulación “se salió” tras una torcedura pueden indicar lesión ligamentaria o luxación. Aunque parezca leve, puede generar inestabilidad si no se trata correctamente. Evaluar el grado de lesión permite definir si el manejo es conservador o requiere inmovilización especializada, reduciendo el riesgo de recaídas.",
        whenTo: [
          "Dolor intenso, inflamación marcada o dificultad para apoyar.",
          "Sensación de inestabilidad o de que “se sale” la articulación.",
          "Si no mejora en 48–72 horas o empeora al caminar/mover.",
        ],
      },
      {
        title: "Lesiones deportivas agudas",
        description:
          "Dolor súbito durante ejercicio, inflamación inmediata o dificultad para apoyar pueden indicar una lesión muscular, ligamentaria o articular. Un diagnóstico temprano acelera la recuperación, evita que la lesión se vuelva crónica y permite regresar a la actividad física de manera segura.",
        whenTo: [
          "Dolor súbito que obliga a suspender la actividad.",
          "Inflamación inmediata, moretón o chasquido al lesionarte.",
          "Inestabilidad o incapacidad para apoyar con normalidad.",
        ],
      },
    ],
  },
  {
    id: "columna",
    title: "COLUMNA",
    conditions: [
      {
        title: "Dolor lumbar (lumbalgia) / ciática",
        description:
          "Dolor en la parte baja de la espalda que puede irradiarse hacia la pierna es una de las causas más frecuentes de limitación funcional. Puede empeorar al estar sentado o al cargar peso. Identificar si el origen es muscular, discal o nervioso permite diseñar un plan de tratamiento efectivo y prevenir episodios recurrentes.",
        whenTo: [
          "Dolor que baja a la pierna, hormigueo o adormecimiento.",
          "Dolor que no mejora en 7–10 días o limita tus actividades.",
          "Debilidad, dificultad para caminar o dolor nocturno intenso.",
        ],
      },
      {
        title: "Dolor cervical",
        description:
          "Rigidez o dolor en el cuello que puede extenderse hacia hombros o brazos suele relacionarse con sobrecarga, contractura o problemas discales. Una valoración oportuna ayuda a recuperar movilidad, disminuir el dolor y descartar compresión nerviosa.",
        whenTo: [
          "Dolor que se irradia al brazo o se acompaña de hormigueo.",
          "Pérdida de fuerza, torpeza en mano o dolor persistente.",
          "Dolor tras caída/accidente o con limitación importante del cuello.",
        ],
      },
      {
        title: "Hernia lumbar",
        description:
          "Dolor persistente acompañado de hormigueo, adormecimiento o debilidad en la pierna puede indicar compresión de un nervio por un disco intervertebral. Un estudio adecuado permite determinar si el manejo será conservador o si existe indicación quirúrgica, siempre priorizando la función y la calidad de vida.",
        whenTo: [
          "Dolor que baja a la pierna con entumecimiento o debilidad.",
          "Dolor que empeora al sentarte, toser o agacharte.",
          "Si presentas pérdida progresiva de fuerza o limitación severa.",
        ],
      },
    ],
  },
  {
    id: "hombro-codo",
    title: "HOMBRO / CODO",
    conditions: [
      {
        title: "Dolor de hombro",
        description:
          "Dolor al levantar el brazo, cargar objetos o dormir de lado puede indicar inflamación, lesión tendinosa o desgaste articular. Detectar la causa tempranamente evita pérdida progresiva de movilidad y permite recuperar fuerza con el tratamiento adecuado.",
        whenTo: [
          "Dolor nocturno frecuente o incapacidad para elevar el brazo.",
          "Pérdida de fuerza, chasquidos o limitación progresiva.",
          "Dolor posterior a golpe/caída o que no mejora en 1–2 semanas.",
        ],
      },
      {
        title: "Lesión del manguito rotador",
        description:
          "Debilidad al elevar el brazo, dolor nocturno o limitación funcional son síntomas frecuentes de esta lesión. Una evaluación precisa define si el tratamiento es conservador o quirúrgico, buscando restaurar función y disminuir dolor.",
        whenTo: [
          "Dolor al elevar el brazo con pérdida notable de fuerza.",
          "Dolor nocturno persistente o dificultad para actividades básicas.",
          "Empeoramiento progresivo pese a reposo o analgésicos.",
        ],
      },
      {
        title: "Dolor de codo (epicondilitis)",
        description:
          "Dolor en la parte externa o interna del codo al cargar objetos o realizar movimientos repetitivos es común en actividades laborales y deportivas. Un manejo temprano evita que el dolor se vuelva crónico y facilita la recuperación completa.",
        whenTo: [
          "Dolor que limita cargar objetos o trabajar con la mano.",
          "Dolor que persiste más de 2–3 semanas.",
          "Dolor con debilidad marcada o incapacidad para extender/flexionar.",
        ],
      },
    ],
  },
  {
    id: "mano-muneca",
    title: "MANO / MUÑECA",
    conditions: [
      {
        title: "Túnel del carpo",
        description:
          "Hormigueo, adormecimiento o pérdida de fuerza en la mano, especialmente por la noche, pueden indicar compresión del nervio mediano. Tratarlo oportunamente previene daño nervioso progresivo y mejora la función manual.",
        whenTo: [
          "Hormigueo nocturno frecuente o adormecimiento diario.",
          "Pérdida de fuerza, se caen objetos o torpeza al agarrar.",
          "Síntomas que no mejoran con reposo o férula.",
        ],
      },
      {
        title: "Dolor de muñeca",
        description:
          "Molestia al apoyar peso, girar la mano o cargar objetos puede estar relacionada con esguinces, tendinitis o lesiones ocultas. Una evaluación adecuada descarta fracturas pequeñas y define el tratamiento más apropiado.",
        whenTo: [
          "Dolor tras caída o golpe directo en la muñeca.",
          "Inflamación persistente o dolor al cargar peso.",
          "Dolor que no mejora en 7–10 días o limita actividades.",
        ],
      },
      {
        title: "Dedo en gatillo",
        description:
          "Dedo que se atora, chasquea o duele al flexionarlo es una condición frecuente que puede limitar actividades diarias. Existen opciones de tratamiento efectivas que permiten recuperar movilidad sin dolor.",
        whenTo: [
          "Dedo que se traba a diario o duele al moverlo.",
          "Rigidez matutina progresiva o dificultad para cerrar la mano.",
          "Si empeora o ya limita trabajo/actividades.",
        ],
      },
    ],
  },
  {
    id: "cadera",
    title: "CADERA",
    conditions: [
      {
        title: "Dolor de cadera",
        description:
          "Dolor al caminar, subir escaleras o levantarse de una silla puede indicar inflamación, desgaste o sobrecarga mecánica. Identificar el origen exacto permite mejorar movilidad y evitar progresión del problema.",
        whenTo: [
          "Dolor que limita caminar o actividades básicas.",
          "Dolor persistente más de 2–3 semanas o que progresa.",
          "Cojera, rigidez marcada o dolor nocturno.",
        ],
      },
      {
        title: "Bursitis trocantérica",
        description:
          "Dolor en la parte lateral de la cadera que empeora al acostarse de lado o caminar distancias prolongadas. Un tratamiento dirigido reduce inflamación y permite retomar actividades con mayor comodidad.",
        whenTo: [
          "Dolor lateral que impide dormir de lado.",
          "Dolor al caminar que limita actividades diarias.",
          "Si reaparece con frecuencia o no mejora con reposo.",
        ],
      },
      {
        title: "Artrosis de cadera",
        description:
          "Rigidez y dolor progresivo que limita la marcha y las actividades diarias. Dependiendo del grado de desgaste, existen alternativas que van desde manejo conservador hasta opciones quirúrgicas para mejorar calidad de vida.",
        whenTo: [
          "Rigidez matutina o dolor que aumenta con el paso de los meses.",
          "Dificultad para caminar, subir escaleras o ponerse zapatos.",
          "Dolor que ya afecta sueño o actividad diaria.",
        ],
      },
    ],
  },
  {
    id: "rodilla",
    title: "RODILLA",
    conditions: [
      {
        title: "Dolor de rodilla",
        description:
          "Inflamación, dolor al subir escaleras o dificultad para caminar pueden indicar desgaste, sobrecarga o lesión interna. Detectar la causa a tiempo evita deterioro progresivo de la articulación.",
        whenTo: [
          "Inflamación repetida o dolor persistente al caminar.",
          "Dolor que limita subir escaleras o ponerse en cuclillas.",
          "Sensación de inestabilidad o dolor nocturno.",
        ],
      },
      {
        title: "Lesiones de menisco",
        description:
          "Dolor acompañado de sensación de bloqueo o chasquido tras un giro o impacto. Un diagnóstico adecuado permite decidir el tratamiento más conveniente y prevenir daño articular mayor.",
        whenTo: [
          "Bloqueo, chasquidos dolorosos o inflamación después de actividad.",
          "Dolor tras giro/torcedura con limitación para flexionar/estirar.",
          "Episodios repetidos o dolor que no mejora en 1–2 semanas.",
        ],
      },
      {
        title: "Lesiones de ligamentos",
        description:
          "Sensación de inestabilidad o que la rodilla “falla” al caminar o girar. Evaluar correctamente la estabilidad permite definir si el manejo será rehabilitación especializada o intervención quirúrgica.",
        whenTo: [
          "Rodilla que “se va” al caminar, girar o bajar escaleras.",
          "Inflamación importante tras lesión deportiva o caída.",
          "Dificultad para retomar actividad física por inestabilidad.",
        ],
      },
    ],
  },
  {
    id: "tobillo-pie",
    title: "TOBILLO / PIE",
    conditions: [
      {
        title: "Esguince de tobillo",
        description:
          "Torcedura con inflamación y dolor al apoyar el pie, frecuente en actividad deportiva o caídas. Un manejo adecuado evita inestabilidad crónica y recaídas frecuentes.",
        whenTo: [
          "Dolor intenso, incapacidad para apoyar o deformidad.",
          "Inflamación marcada o moretón que progresa.",
          "Inestabilidad persistente o esguinces repetidos.",
        ],
      },
      {
        title: "Fascitis plantar",
        description:
          "Dolor punzante en la planta del pie al dar los primeros pasos del día o después de reposo. El tratamiento oportuno mejora progresivamente el dolor y la función al caminar.",
        whenTo: [
          "Dolor matutino diario que persiste más de 2–3 semanas.",
          "Dolor que empeora con estar de pie o caminar.",
          "Si ya limita trabajo, ejercicio o actividades cotidianas.",
        ],
      },
      {
        title: "Dolor de pie",
        description:
          "Molestia persistente al apoyar peso o caminar que puede deberse a alteraciones mecánicas o inflamatorias. Identificar la causa permite recuperar estabilidad y comodidad en las actividades diarias.",
        whenTo: [
          "Dolor persistente más de 2 semanas o que progresa.",
          "Dolor con inflamación, enrojecimiento o limitación al apoyar.",
          "Dolor tras golpe/caída o deformidad visible.",
        ],
      },
    ],
  },
];

export default function QueAtiendoPage() {
  const [openCategory, setOpenCategory] = useState<string>(CATEGORIES[0].id);
  const [openCondition, setOpenCondition] = useState<string>("");
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const hashMap = useMemo(() => {
    return CATEGORIES.reduce<Record<string, string>>((acc, category) => {
      acc[category.id] = category.id;
      return acc;
    }, {});
  }, []);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && hashMap[hash]) {
        setOpenCategory(hash);
        setOpenCondition("");
        const target = categoryRefs.current[hash];
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [hashMap]);

  const handleCategoryToggle = (id: string) => {
    setOpenCategory((prev) => (prev === id ? "" : id));
    setOpenCondition("");
  };

  const handleConditionToggle = (id: string) => {
    setOpenCondition((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050608]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#0B0F17_50%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-28 top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(148,156,170,0.18),transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-20" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-8 pb-24 pt-10 sm:px-10 lg:pt-14">
        <section className="flex flex-col gap-3">
          <h1 className="font-serif text-3xl text-white sm:text-4xl">
            ¿Qué atiendo?
          </h1>
          <p className="text-sm text-[#B9C0CC] sm:text-base">
            Problemas frecuentes que evalúo y trato. Si no ves tu caso, agenda y
            lo valoramos.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          {CATEGORIES.map((category) => {
            const isOpen = openCategory === category.id;

            return (
              <article
                key={category.id}
                id={category.id}
                ref={(node) => {
                  categoryRefs.current[category.id] = node;
                }}
                className="scroll-mt-28 rounded-[24px] border border-white/10 bg-[rgba(16,18,22,0.55)] p-6 shadow-[0_30px_80px_rgba(2,6,12,0.55)]"
              >
                <button
                  type="button"
                  onClick={() => handleCategoryToggle(category.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="font-serif text-lg text-white">
                    {category.title}
                  </span>
                  <span className="text-sm text-white/60">
                    {isOpen ? "Cerrar" : "Ver más"}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? "mt-6 max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-col gap-4">
                    {category.conditions.map((condition) => {
                      const conditionId = `${category.id}-${condition.title}`;
                      const isConditionOpen = openCondition === conditionId;

                      return (
                        <div
                          key={conditionId}
                          className="rounded-[18px] border border-white/10 bg-white/5 p-4 transition-all duration-200"
                        >
                          <button
                            type="button"
                            onClick={() => handleConditionToggle(conditionId)}
                            aria-expanded={isConditionOpen}
                            className="flex w-full items-center justify-between text-left"
                          >
                            <span className="text-sm font-semibold text-white">
                              {condition.title}
                            </span>
                            <span className="text-xs text-white/60">
                              {isConditionOpen ? "Ocultar" : "Detalle"}
                            </span>
                          </button>

                          <div
                            className={`overflow-hidden transition-all duration-200 ${
                              isConditionOpen
                                ? "mt-4 max-h-[300px] opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <p className="text-sm text-[#B9C0CC]">
                              {condition.description}
                            </p>
                            <p className="text-sm text-[#B9C0CC]">
                              ¿Cuándo acudir a valoración?
                            </p>
                            {condition.whenTo.map((item) => (
                              <p
                                key={item}
                                className="text-sm text-[#B9C0CC]"
                              >
                                • {item}
                              </p>
                            ))}
                            <div className="mt-4 flex flex-col gap-2">
                              <Link
                                href={`/agendar?motivo=${encodeURIComponent(
                                  condition.title
                                )}`}
                                className="inline-flex w-full items-center justify-center rounded-lg bg-[#0A2540] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 sm:w-fit"
                              >
                                Agendar cita
                              </Link>
                              <span className="text-xs text-[#8C95A3]">
                                Agenda evaluación y recibe un plan claro desde
                                la primera consulta.
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>

      <WhatsAppFloating />
    </div>
  );
}
