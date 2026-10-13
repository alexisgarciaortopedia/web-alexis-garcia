import type { Metadata } from "next";
import Link from "next/link";

const url = "https://www.alexisgarciaortopedia.com/private-practice-agent/privacidad";

export const metadata: Metadata = {
  title: "Privacidad de Private Practice Agent",
  description: "Cómo Private Practice Agent utiliza los datos autorizados de Google.",
  alternates: { canonical: url },
  robots: { index: false, follow: true },
};

export default function PrivatePracticePrivacyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-20 text-white">
      <h1 className="mb-6 font-serif text-4xl">Aviso de privacidad de Private Practice Agent</h1>
      <p className="mb-8 text-sm text-white/60">Actualizado el 12 de octubre de 2026</p>
      <div className="space-y-6 leading-relaxed text-white/80">
        <p>
          El responsable de esta herramienta interna es el Dr. Alexis Eduardo García de los Santos. Para consultas
          sobre los datos tratados o para solicitar su eliminación, escribe a alexisgarciaortopedia@gmail.com.
        </p>
        <p>
          Si autorizas el acceso de Google, la herramienta consulta el monitor de Google Ads en una hoja de cálculo,
          los datos de rendimiento de Search Console y las métricas y datos básicos de las fichas de Google Business
          Profile de la práctica. Accede únicamente a las cuentas, propiedades y fichas que la cuenta autorizada puede ver.
        </p>
        <p>
          Esos datos se usan para sincronizar métricas, conservar su procedencia, detectar fallos de actualización y
          elaborar reportes internos de adquisición. La herramienta no usa estos permisos para editar campañas,
          propiedades de Search Console ni fichas de negocio. Las métricas de interacción no se consideran pacientes
          ni ingresos sin evidencia adicional.
        </p>
        <p>
          Los permisos de Google se guardan como secretos del servicio en la infraestructura cloud de la práctica.
          Las métricas normalizadas y el estado de sincronización se almacenan en su base de datos aislada. El acceso
          está limitado a personal autorizado de la práctica y a los proveedores de infraestructura necesarios para
          operar el servicio. No vendemos datos personales ni datos obtenidos de Google. No usamos estos datos para
          publicidad dirigida a terceros.
        </p>
        <p>
          Conservamos los datos operativos durante el tiempo necesario para los reportes y obligaciones aplicables;
          los datos temporales de procesamiento se eliminan según las reglas de retención del servicio. Puedes revocar
          el acceso de la aplicación desde la configuración de seguridad de tu cuenta de Google. La revocación detiene
          futuras sincronizaciones; puedes solicitar la eliminación de datos ya almacenados mediante el correo indicado.
        </p>
        <p>
          Aplicamos controles de acceso, separación de secretos y registro de fallos sin incluir tokens ni contenido
          sensible en los logs. Este aviso puede actualizarse si cambian las funciones o los datos utilizados; la
          versión vigente estará disponible en esta dirección.
        </p>
      </div>
      <Link className="mt-10 inline-block underline decoration-teal-400 underline-offset-4" href="/private-practice-agent">
        Volver a Private Practice Agent
      </Link>
    </main>
  );
}
