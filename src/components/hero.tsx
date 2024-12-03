import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Hero() {
  const router = useRouter();

  const handleAppointment = () => {
    const token = Cookies.get("token");

    console.log("Este es el token pues", token);

    if (!token || token === undefined) {
      router.push("/login");
    } else {
      router.push("/appointment");
    }
  };

  return (
    <div className="relative bg-white h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
          <div className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Contenido del lado izquierdo */}
              <div className="sm:text-center lg:text-left lg:col-span-6">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Agenda tu cita</span>
                  <span className="block text-blue-600 mt-1">
                    médica en línea
                  </span>
                </h1>
                <p className="mt-6 text-base text-gray-500 sm:text-lg md:text-xl">
                  Fácil, rápido y seguro. Agenda tu cita médica en línea con
                  solo unos clics. Nuestra plataforma le conecta con los mejores
                  profesionales de la salud.
                </p>
                <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div>
                    <a
                      onClick={handleAppointment}
                      className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200 cursor-pointer"
                    >
                      Agenda tu cita ahora mismo
                    </a>
                  </div>
                </div>
              </div>

              {/* Contenido del lado derecho - Imagen */}
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <div className="relative mx-auto w-full rounded-lg lg:max-w-md">
                  <img
                    className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-lg"
                    src="/images/hero.png"
                    alt="Medical professionals"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
