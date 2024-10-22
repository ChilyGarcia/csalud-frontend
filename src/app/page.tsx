"use client";

import { Star } from "lucide-react";
import NavBar from "@/components/navbar";
import Link from "next/link";

export default function LandingPage() {
  const reviews = [
    {
      id: 1,
      name: "Johan Jhonston",
      rating: 5,
      text: "Excelente servicio! Facil agendamiento.",
    },
    {
      id: 2,
      name: "Julianna Smith",
      rating: 4,
      text: "Muy util, me ahorro bastante tiempo.",
    },
    {
      id: 3,
      name: "Mike Tyson",
      rating: 5,
      text: "Excelente aplicacion, la recomiendo!",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}

      <NavBar></NavBar>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Agenda tu cita</span>{" "}
                  <span className="block text-blue-600 xl:inline">
                    médica en línea
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Fácil, rápido y seguro. Agenda tu cita médica en línea con
                  solo unos clics. Nuestra plataforma le conecta con los mejores
                  profesionales de la salud.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/appointment"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Agenda tu cita ahora mismo
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="/images/illustration.png"
            alt="Medical professionals"
          />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Testimonios
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Lo que nuestros usuarios opinan
            </p>
          </div>
          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white shadow overflow-hidden rounded-lg p-6"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://i.pravatar.cc/40?u=${review.id}`}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {review.name}
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    {review.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
