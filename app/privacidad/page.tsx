import type { ReactNode } from "react";
import Link from "next/link";

const CONTACT_EMAIL = "alexisgarciaortopedia@gmail.com";
const CONTACT_PHONE_DISPLAY = "773 175 4638";
const CONTACT_PHONE_TEL = "+527731754638";
const LAST_UPDATED = "11 de agosto de 2026";

type IndiceItem = {
  id: string;
  num: number;
  title: string;
};

const INDICE: IndiceItem[] = [
  { id: "responsable", num: 1, title: "Quién es responsable de sus datos" },
  { id: "que-es-y-como-funciona", num: 2, title: "Qué es Muévete Seguro y cómo funciona" },
  { id: "que-datos-tratamos", num: 3, title: "Qué datos tratamos" },
  { id: "para-que-usamos-su-informacion", num: 4, title: "Para qué usamos su información" },
  { id: "su-consentimiento", num: 5, title: "Su consentimiento" },
  { id: "quien-puede-ver-su-informacion", num: 6, title: "Quién puede ver su información" },
  { id: "como-limitar-el-uso", num: 7, title: "Cómo limitar el uso de su información" },
  { id: "derechos-arco", num: 8, title: "Sus derechos ARCO y la revocación del consentimiento" },
  { id: "cuanto-tiempo-conservamos", num: 9, title: "Cuánto tiempo conservamos su información" },
  { id: "medidas-de-seguridad", num: 10, title: "Medidas de seguridad" },
  { id: "tratamiento-automatizado", num: 11, title: "Tratamiento automatizado y supervisión humana" },
  { id: "menores-de-edad", num: 12, title: "Personas menores de edad" },
  { id: "cambios-a-este-aviso", num: 13, title: "Cambios a este aviso" },
  { id: "autoridad", num: 14, title: "Autoridad" },
];

function Seccion({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mb-6 scroll-mt-24 rounded-[20px] border border-white/10 bg-[rgba(16,18,22,0.45)] p-6 backdrop-blur-[20px] sm:p-8"
    >
      <h2
        id={`${id}-title`}
        className="mb-4 font-serif text-xl leading-snug text-white sm:text-2xl"
      >
        <span className="mr-2 text-teal-400">{num}.</span>
        {title}
      </h2>
      <div className="flex max-w-[65ch] flex-col gap-4 text-sm leading-relaxed text-[#B9C0CC] sm:text-base">
        {children}
      </div>
    </section>
  );
}

function SubTitulo({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-teal-300 sm:text-sm">
      {children}
    </h3>
  );
}

function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-teal-400">
      {children}
    </ul>
  );
}

function OL({ children }: { children: ReactNode }) {
  return (
    <ol className="flex list-decimal flex-col gap-2 pl-5 marker:font-semibold marker:text-teal-400">
      {children}
    </ol>
  );
}

function AnclaSeccion({ id, children }: { id: string; children: ReactNode }) {
  return (
    <a href={`#${id}`} className="text-teal-300 underline decoration-teal-500/40 underline-offset-2 hover:text-teal-200">
      {children}
    </a>
  );
}

export default function PrivacidadPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050608] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#071018_45%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.14),transparent_70%)] blur-[100px]" />
      <div className="pointer-events-none absolute -left-32 top-[30%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_70%)] blur-[110px]" />

      {/* Nav interna */}
      <header className="relative z-20 border-b border-white/5 bg-[#050608]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link href="/muevete-seguro" className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
              Ortik
            </span>
            <span className="text-sm font-semibold text-white">Muévete Seguro</span>
          </Link>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#B9C0CC] sm:text-sm">
            <Link href="/muevete-seguro" className="transition-colors hover:text-teal-300">
              ← Volver a Muévete Seguro
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
        {/* Hero */}
        <section className="mb-10 flex flex-col gap-4" aria-labelledby="hero-title">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/10 px-4 py-1.5 text-xs font-medium text-teal-300">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
            Aviso de privacidad
          </div>
          <h1
            id="hero-title"
            className="font-serif text-[clamp(2rem,6vw,3rem)] leading-[1.08] tracking-tight text-white"
          >
            Aviso de Privacidad
          </h1>
          <p className="text-lg text-[#C5CDD9] sm:text-xl">Muévete Seguro by Ortik</p>
          <p className="text-sm text-[#8C95A3]">Última actualización: {LAST_UPDATED}</p>
        </section>

        {/* Índice */}
        <section
          aria-labelledby="indice-title"
          className="mb-10 rounded-[20px] border border-white/10 bg-[rgba(16,18,22,0.45)] p-6 backdrop-blur-[20px] sm:p-8"
        >
          <h2 id="indice-title" className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-teal-400">
            Índice
          </h2>
          <ol className="grid list-none grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {INDICE.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex gap-2 text-sm text-[#B9C0CC] transition-colors hover:text-teal-300 sm:text-[0.95rem]"
                >
                  <span className="shrink-0 text-teal-400">{item.num}.</span>
                  <span>{item.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <Seccion id="responsable" num={1} title="Quién es responsable de sus datos">
          <p>
            El responsable del tratamiento de sus datos personales es el Dr. Alexis Eduardo García
            de los Santos, médico cirujano especialista en Ortopedia y Traumatología.
          </p>
          <UL>
            <li>Cédula Profesional: 12314318</li>
            <li>Cédula de Especialidad: 15549455</li>
            <li>Registro del Consejo Mexicano de Ortopedia y Traumatología: 1/8697/26</li>
          </UL>
          <p>Domicilios para oír y recibir solicitudes:</p>
          <UL>
            <li>Circuito Revolución 19, Colonia Iturbe, Tula de Allende, Hidalgo.</li>
            <li>Licenciado Hernández y Fernández 105, Colonia San Antonio, Pachuca de Soto, Hidalgo.</li>
          </UL>
          <p>
            Correo para asuntos de datos personales:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-400 transition-colors hover:text-teal-300">
              {CONTACT_EMAIL}
            </a>
          </p>
          <p>
            Teléfono:{" "}
            <a href={`tel:${CONTACT_PHONE_TEL}`} className="text-teal-400 transition-colors hover:text-teal-300">
              {CONTACT_PHONE_DISPLAY}
            </a>
          </p>
        </Seccion>

        <Seccion id="que-es-y-como-funciona" num={2} title="Qué es Muévete Seguro y cómo funciona">
          <p>
            Muévete Seguro es un servicio de acompañamiento y seguimiento deportivo-clínico que
            opera a través de WhatsApp. La conversación es atendida por un asistente automatizado
            llamado Luna, que funciona con tecnología de inteligencia artificial, bajo supervisión
            del médico responsable.
          </p>
          <p>Antes de dar su consentimiento, es importante que entienda lo siguiente:</p>
          <UL>
            <li>Luna no es un médico y no sustituye una consulta médica.</li>
            <li>
              Luna no emite diagnósticos, no prescribe medicamentos y no autoriza ni desautoriza la
              práctica deportiva o la competencia.
            </li>
            <li>
              Luna organiza la información que usted comparte, identifica señales que ameritan
              atención y, cuando corresponde, le recomienda acudir a valoración médica o a un
              servicio de urgencias.
            </li>
            <li>
              Toda interpretación clínica y todo documento firmado son responsabilidad de un
              médico, quien revisa y aprueba cada informe antes de entregárselo.
            </li>
            <li>
              El servicio no es un servicio de urgencias. Ante una emergencia médica, acuda de
              inmediato a urgencias o llame al 911.
            </li>
          </UL>
        </Seccion>

        <Seccion id="que-datos-tratamos" num={3} title="Qué datos tratamos">
          <SubTitulo>3.1 Datos de identificación y contacto</SubTitulo>
          <UL>
            <li>Su nombre o el nombre con el que prefiere que se le llame.</li>
            <li>Su número de teléfono de WhatsApp.</li>
            <li>
              El centro deportivo, club, equipo u organización de procedencia, cuando ingresa
              mediante un código de acceso.
            </li>
          </UL>
          <SubTitulo>3.2 Datos personales sensibles</SubTitulo>
          <p>
            Le informamos de manera expresa que este servicio trata datos personales sensibles,
            relativos a su estado de salud. En concreto:
          </p>
          <UL>
            <li>Molestias, dolor, lesiones y síntomas que usted reporta.</li>
            <li>Zona del cuerpo afectada, intensidad, evolución y antecedentes.</li>
            <li>Actividad deportiva, carga de entrenamiento y objetivos.</li>
            <li>Limitaciones funcionales que describa.</li>
            <li>
              El contenido de sus conversaciones con Luna, incluidos los mensajes de voz que
              envíe, los cuales se transcriben a texto para poder atenderlos.
            </li>
            <li>Los informes de seguimiento generados a partir de esa información.</li>
          </UL>
          <p>
            No solicitamos datos financieros, patrimoniales, biométricos, de origen étnico,
            religiosos, políticos ni de preferencia sexual. Le pedimos que no comparta información
            de esa naturaleza a través del servicio.
          </p>
        </Seccion>

        <Seccion id="para-que-usamos-su-informacion" num={4} title="Para qué usamos su información">
          <SubTitulo>4.1 Finalidades necesarias</SubTitulo>
          <p>
            Estas finalidades son indispensables para prestarle el servicio. Sin ellas no es
            posible brindárselo.
          </p>
          <OL>
            <li>Acompañarle y dar seguimiento a su entrenamiento y a las molestias que reporte.</li>
            <li>
              Identificar señales que ameriten atención médica y orientarle sobre cuándo y dónde
              buscar valoración.
            </li>
            <li>
              Generar informes de seguimiento que son revisados, corregidos y firmados por el
              médico responsable.
            </li>
            <li>Integrar y conservar su expediente clínico conforme a la NOM-004-SSA3-2012.</li>
            <li>Comunicarnos con usted por WhatsApp respecto de su seguimiento.</li>
            <li>
              Poner su caso a disposición de una persona del equipo cuando usted lo solicite o
              cuando la situación lo requiera.
            </li>
            <li>
              Cumplir las obligaciones legales aplicables y atender requerimientos de autoridad
              competente.
            </li>
          </OL>
          <SubTitulo>4.2 Finalidades adicionales</SubTitulo>
          <p>
            Estas finalidades no son necesarias para el servicio. Puede negarse a ellas y seguir
            recibiendo el servicio con normalidad.
          </p>
          <OL>
            <li>
              Estadística y desarrollo. Emplear la información de forma agregada y anonimizada
              —disociada de su nombre, su teléfono y de cualquier dato que permita identificarle—
              para elaborar estadísticas, realizar investigación en salud musculoesquelética y
              desarrollar o mejorar servicios y herramientas de salud.
            </li>
            <li>
              Informes agregados a su centro deportivo u organización. Compartir con el centro
              deportivo, club o empresa de la que usted proviene únicamente información agregada y
              sin identificarle (por ejemplo, número de personas activas o zonas del cuerpo más
              afectadas en el conjunto). En ningún caso se comparte su nombre, su teléfono, sus
              síntomas individuales ni su informe.
            </li>
          </OL>
          <p>
            Si prefiere que su información no se use para estas finalidades adicionales, basta con
            decírselo a Luna en la conversación —por ejemplo, escribiendo &quot;solo
            seguimiento&quot;— o enviarnos un correo. Su negativa no afecta la calidad ni la
            continuidad del servicio, y puede manifestarla en cualquier momento, no sólo al inicio.
          </p>
        </Seccion>

        <Seccion id="su-consentimiento" num={5} title="Su consentimiento">
          <p>
            Tratándose de datos personales sensibles, la ley exige su consentimiento expreso. Por
            eso, antes de registrar cualquier información sobre su salud, el servicio le solicita
            de manera explícita su autorización dentro de la conversación.
          </p>
          <p>
            Este aviso distingue las finalidades necesarias de las adicionales y le indica cómo
            negarse a estas últimas en cualquier momento, sin que ello afecte el servicio.
          </p>
          <p>
            De cada consentimiento otorgado se conserva constancia con la fecha y hora, la versión
            de este aviso vigente en ese momento y la finalidad consentida.
          </p>
          <p>
            Puede revocar su consentimiento en cualquier momento, conforme a la{" "}
            <AnclaSeccion id="derechos-arco">sección 8</AnclaSeccion>.
          </p>
        </Seccion>

        <Seccion id="quien-puede-ver-su-informacion" num={6} title="Quién puede ver su información">
          <SubTitulo>6.1 Personal autorizado</SubTitulo>
          <p>
            Su información individual sólo es accesible para el médico responsable y para el
            personal del equipo expresamente autorizado y sujeto a deber de confidencialidad.
          </p>
          <SubTitulo>6.2 Proveedores tecnológicos</SubTitulo>
          <p>
            Para operar, el servicio utiliza proveedores que procesan información por cuenta y bajo
            instrucciones del responsable:
          </p>
          <UL>
            <li>WhatsApp Business Platform (Meta): canal de mensajería.</li>
            <li>Supabase: alojamiento de la base de datos.</li>
            <li>OpenAI: procesamiento de lenguaje natural y transcripción de audio.</li>
          </UL>
          <p>
            Algunos de estos proveedores pueden almacenar o procesar información en servidores
            ubicados fuera de territorio mexicano. Se les exige mantener medidas de seguridad y
            confidencialidad, y tratar la información únicamente para prestar el servicio
            contratado, además de lo estrictamente necesario para su seguridad y para cumplir la
            ley.
          </p>
          <SubTitulo>6.3 Transferencias a terceros</SubTitulo>
          <UL>
            <li>
              A otros médicos de la red Muévete Seguro: cuando usted solicite o acepte ser atendido
              por un médico de su zona distinto del responsable, se compartirá únicamente la
              información clínica necesaria para su atención. Esta transferencia requiere su
              consentimiento y se le solicitará en el momento.
            </li>
            <li>
              A autoridades competentes: cuando exista un requerimiento fundado y motivado, o
              cuando la ley lo exija.
            </li>
            <li>
              A su centro deportivo, club o empresa: nunca de forma individual ni identificable.
              Únicamente información agregada, conforme a la{" "}
              <AnclaSeccion id="para-que-usamos-su-informacion">sección 4.2</AnclaSeccion>.
            </li>
          </UL>
        </Seccion>

        <Seccion id="como-limitar-el-uso" num={7} title="Cómo limitar el uso de su información">
          <p>Puede limitar el uso o la divulgación de su información:</p>
          <UL>
            <li>Escribiéndolo directamente en la conversación de WhatsApp.</li>
            <li>
              Enviándonos un correo a la dirección de la{" "}
              <AnclaSeccion id="responsable">sección 1</AnclaSeccion>.
            </li>
            <li>Solicitando la baja del servicio.</li>
          </UL>
        </Seccion>

        <Seccion id="derechos-arco" num={8} title="Sus derechos ARCO y la revocación del consentimiento">
          <p>
            Usted tiene derecho a acceder a sus datos, rectificarlos cuando sean inexactos,
            cancelarlos cuando considere que no son necesarios y oponerse a su tratamiento para
            fines específicos. También puede revocar su consentimiento en cualquier momento.
          </p>
          <p>
            Cómo ejercerlos: envíe su solicitud al correo o a los domicilios de la{" "}
            <AnclaSeccion id="responsable">sección 1</AnclaSeccion>, indicando:
          </p>
          <OL>
            <li>Su nombre y un medio para comunicarle la respuesta.</li>
            <li>Elementos que acrediten su identidad o, en su caso, su representación legal.</li>
            <li>Descripción clara de los datos y del derecho que desea ejercer.</li>
            <li>Cualquier dato que facilite la localización de su información.</li>
          </OL>
          <p>
            Por tratarse de información de salud, verificaremos su identidad antes de dar trámite a
            la solicitud, mediante un mecanismo seguro que le indicaremos al recibirla. No envíe
            copias de su identificación por WhatsApp.
          </p>
          <p>
            Plazos: le comunicaremos la determinación en un plazo máximo de 20 días hábiles y, de
            resultar procedente, se hará efectiva dentro de los 15 días hábiles siguientes. El
            ejercicio de estos derechos es gratuito, salvo los costos de reproducción, copia o
            envío que legalmente resulten procedentes.
          </p>
          <p>
            Un límite que debe conocer: la cancelación de sus datos no siempre procede de manera
            total. La NOM-004-SSA3-2012 obliga a conservar el expediente clínico por un plazo
            mínimo de cinco años contados a partir de la última atención. En ese supuesto, su
            expediente se bloquea —deja de utilizarse para prestarle el servicio y para cualquier
            otra finalidad— y se conserva únicamente para cumplir esa obligación legal, hasta que
            el plazo concluya y proceda su supresión.
          </p>
        </Seccion>

        <Seccion id="cuanto-tiempo-conservamos" num={9} title="Cuánto tiempo conservamos su información">
          <UL>
            <li>
              Expediente clínico e información clínica del seguimiento: cinco años a partir de la
              última atención, conforme a la NOM-004-SSA3-2012.
            </li>
            <li>
              Datos de contacto y de registro: mientras exista relación con el servicio y durante
              los plazos legales aplicables.
            </li>
            <li>
              Información agregada y anonimizada: al no permitir identificarle, puede conservarse
              de forma indefinida para fines estadísticos y de desarrollo.
            </li>
          </UL>
        </Seccion>

        <Seccion id="medidas-de-seguridad" num={10} title="Medidas de seguridad">
          <p>
            Hemos implementado medidas administrativas, técnicas y físicas para proteger su
            información contra daño, pérdida, alteración, destrucción o uso, acceso o tratamiento
            no autorizado. Entre ellas: control de acceso por usuario autorizado, cifrado de las
            comunicaciones, respaldos periódicos, seudonimización del número telefónico en los
            registros técnicos del sistema y acuerdos de confidencialidad con el personal.
          </p>
        </Seccion>

        <Seccion id="tratamiento-automatizado" num={11} title="Tratamiento automatizado y supervisión humana">
          <p>
            Su información es procesada por un sistema automatizado (Luna) que utiliza
            inteligencia artificial para conversar y organizar la información.
          </p>
          <p>
            Ese sistema no adopta decisiones clínicas. No emite diagnósticos, no prescribe
            tratamientos ni medicamentos, no autoriza actividad deportiva y no determina por sí
            solo la gravedad de su caso. Toda valoración clínica y todo informe firmado provienen
            de un médico que revisa la información antes de emitirlos.
          </p>
          <p>
            Puede solicitar la intervención de una persona en cualquier momento, escribiéndolo en
            la conversación, y ejercer, cuando corresponda conforme a la legislación aplicable, sus
            derechos respecto del tratamiento automatizado de sus datos.
          </p>
        </Seccion>

        <Seccion id="menores-de-edad" num={12} title="Personas menores de edad">
          <p>El servicio está disponible únicamente para personas mayores de 18 años.</p>
          <p>
            Si una persona manifiesta ser menor de edad, el sistema deja de recabar información
            sobre su salud, se lo hace saber y, cuando corresponde, pone el caso a disposición del
            equipo. Más adelante podrá habilitarse un flujo específico para personas menores de
            edad con el consentimiento de quien ejerza la patria potestad o la tutela.
          </p>
        </Seccion>

        <Seccion id="cambios-a-este-aviso" num={13} title="Cambios a este aviso">
          <p>
            Este aviso puede modificarse. Cualquier cambio se publicará en
            alexisgarciaortopedia.com/privacidad, indicando la fecha de la última actualización.
            Cuando el cambio sea sustancial —por ejemplo, una nueva finalidad que requiera su
            consentimiento— se lo notificaremos por WhatsApp y, en su caso, le solicitaremos
            nuevamente su consentimiento.
          </p>
        </Seccion>

        <Seccion id="autoridad" num={14} title="Autoridad">
          <p>
            Si considera que su derecho a la protección de datos personales ha sido vulnerado,
            puede acudir ante la Secretaría Anticorrupción y Buen Gobierno, autoridad competente en
            la materia.
          </p>
        </Seccion>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#050608]/90 px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs leading-relaxed text-[#6B7280] sm:text-sm">
            Muévete Seguro by Ortik es una iniciativa médico-deportiva vinculada a la práctica
            profesional del Dr. Alexis García.
          </p>
          <p className="mt-3 text-center text-xs text-[#4B5563]">
            Responsable: Dr. Alexis Eduardo García de los Santos.
          </p>
          <p className="mt-3 text-center text-xs text-[#4B5563]">
            © {new Date().getFullYear()} Muévete Seguro by Ortik
          </p>
        </div>
      </footer>
    </div>
  );
}
