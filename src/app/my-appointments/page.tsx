"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { backendService } from "@/services/backend.service";
import { Appointment } from "@/interfaces/appointment.interface";

export default function ElegantAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await backendService.listAppointments();
      return response;
    };

    const getData = async () => {
      const data = await fetchAppointments();

      setAppointments(data);
      console.log(data);
    };

    getData();
  }, []);

  const cancelAppointment = (id: number) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 text-sm mb-4 transition duration-300"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al Inicio
          </Link>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Mis Citas
          </h1>
          <div className="flex justify-center items-center mb-6">
            <div className="text-6xl font-bold">
              <span className="text-[#8B5CF6]">C</span>
              <span className="text-[#3B82F6] ml-2">SALUD</span>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gestione sus próximas consultas médicas con facilidad y eficiencia.
          </p>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white shadow-2xl rounded-2xl p-12 text-center">
            <svg
              className="w-24 h-24 text-gray-300 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-2xl text-gray-700 mb-8">
              No tiene citas agendadas en este momento.
            </p>
            <Link
              href="#"
              className="inline-block bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Agendar Nueva Cita
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white shadow-lg rounded-2xl overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        {appointment.health_professional.user.name}
                      </h2>
                      <p className="text-xl text-[#3B82F6] font-semibold mb-4">
                        {appointment.health_professional.specialty.name}
                      </p>
                    </div>
                    {/* <button
                      onClick={() => cancelAppointment(appointment.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center transition duration-300"
                    >
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Cancelar cita
                    </button> */}
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-700">
                      <svg
                        className="w-6 h-6 mr-3 text-[#8B5CF6]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-lg">
                        {new Date(
                          appointment.date + "T00:00:00"
                        ).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg
                        className="w-6 h-6 mr-3 text-[#8B5CF6]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-lg">
                        {appointment.start_time} - {appointment.end_time}
                      </span>
                    </div>
                    {/* <div className="flex items-center text-gray-700 col-span-2">
                      <svg
                        className="w-6 h-6 mr-3 text-[#8B5CF6]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-lg">{appointment.location}</span>
                    </div> */}
                  </div>
                </div>
                <div className="bg-gray-50 px-8 py-4">
                  <Link
                    href="#"
                    className="text-[#3B82F6] hover:text-[#8B5CF6] font-semibold transition duration-300"
                  >
                    Ver detalles de la cita
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {appointments.length > 0 && (
          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-lg"
            >
              Agendar Nueva Cita
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
