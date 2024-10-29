"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, Settings, LogOut } from "lucide-react";
import Cookies from "js-cookie";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [perfil, setPerfil] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setPerfil(true);
    } else {
      setPerfil(false);
    }
  }, [perfil]);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">CSalud</span>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <a
              href="#"
              className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Inicio
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Servicios
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Sobre nosotros
            </a>
            <a
              href="/login"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Ingresar
            </a>

            {perfil ? (
              <>
                {" "}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://github.com/shadcn.png"
                      alt="User avatar"
                    />
                  </button>
                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="px-4 py-2">
                        <p className="text-sm font-medium text-gray-900">
                          Juan Garcia
                        </p>
                        <p className="text-sm text-gray-500">tom@example.com</p>
                      </div>
                      <hr className="border-gray-200" />
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Configuración
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm  hover:bg-gray-100 flex items-center text-red-500"
                      >
                        <LogOut className="mr-2 h-4 w-4 text-red-500" />
                        Cerrar sesión
                      </a>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Inicio
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Servicios
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Sobre nosotros
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Contactanos
            </a>
            <a
              href="/login"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Ingresar
            </a>
          </div>
          {perfil ? (
            <>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://github.com/shadcn.png"
                      alt="User avatar"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      Juan Garcia
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      tom@example.com
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 flex items-center"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Configuración
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 flex items-center text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4 text-red-500" />
                    Cerrar sesión
                  </a>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </nav>
  );
}
