import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-sky-500" />
              <span className="ml-2 text-2xl font-bold text-sky-500">
                CSalud
              </span>
            </div>
            <p className="mt-4 text-gray-400">
              Conectando pacientes con profesionales de la salud para mejorar la
              calidad de vida.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rapidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-sky-500">
                  Encontrar profesionales
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sky-500">
                  Opiniones
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Para profesionales</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-sky-500">
                  Ingresar como profesional
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sky-500">
                  Panel del profesional
                </a>
              </li>
              {/* <li>
                <a href="#" className="text-gray-400 hover:text-sky-500">
                  Recursos
                </a>
              </li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">support@csalud.com</li>
              <li className="text-gray-400">1-800-CSALUD</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} CSalud. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
