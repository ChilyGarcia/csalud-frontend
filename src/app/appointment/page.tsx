"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Appointment() {
  const [formData, setFormData] = useState({
    professional: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add logic here to handle the form submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          href="/"
          className="flex items-center justify-center text-blue-600 hover:text-blue-500 mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span>Volver a la página principal</span>
        </Link>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Agendar Cita
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Complete el formulario para programar su cita con un profesional de
            la salud
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="professional"
                className="block text-sm font-medium text-gray-700"
              >
                Profesional de la salud
              </label>
              <select
                id="professional"
                name="professional"
                value={formData.professional}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Seleccione un profesional</option>
                <option value="doctor">Doctor General</option>
                <option value="dentist">Dentista</option>
                <option value="psychologist">Psicólogo</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hora de inicio
                </label>
                <input
                  type="time"
                  name="startTime"
                  id="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="endTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hora de finalización
                </label>
                <input
                  type="time"
                  name="endTime"
                  id="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Agendar Cita
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h3 className="text-lg font-medium text-gray-900">
            ¿Necesita ayuda?
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Contáctenos si tiene alguna pregunta sobre el proceso de
            programación
          </p>
          <div className="mt-4 flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Servicio al Cliente
              </p>
              <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
