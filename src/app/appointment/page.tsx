"use client";

import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { backendService } from "@/services/backend.service";
import { Specialty } from "@/interfaces/specialty.interface";

export default function Appointment() {
  const [formData, setFormData] = useState({
    specialty: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProfessionalDetailsOpen, setIsProfessionalDetailsOpen] =
    useState(false);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);

  const [specialties, setSpecialties] = useState([]);

  // useEffect(() => {
  //   if (formData.specialty) {
  //     setFilteredProfessionals(
  //       healthProfessionals.filter((p) => p.specialty === formData.specialty)
  //     );
  //   } else {
  //     setFilteredProfessionals([]);
  //   }
  // }, [formData.specialty]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await backendService.professionalList();
        setSpecialties(response); // Asignar directamente la respuesta
      } catch (error) {
        console.error(error);
      }
    };

    fetchSpecialties();
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(filteredProfessionals);
  }, [filteredProfessionals]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      specialty_id: formData.specialty,
      date: formData.date,
      start_time: formData.startTime,
      end_time: formData.endTime,
    };

    const fetchFilterProfessional = async () => {
      try {
        const response = await backendService.filteredProfessionals(body);
        setFilteredProfessionals(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilterProfessional();

    setIsDialogOpen(true);
  };

  const handleProfessionalSelect = (professional) => {
    setSelectedProfessional(professional);
    setFormData((prevState) => ({
      ...prevState,
      professional: professional.name,
    }));
    setIsDialogOpen(false);
    setIsProfessionalDetailsOpen(false);
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
                htmlFor="specialty"
                className="block text-sm font-medium text-gray-700"
              >
                Especialidad
              </label>
              <select
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Seleccione una especialidad</option>
                {(specialties || []).map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
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
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Buscar Profesionales Disponibles
            </button>
          </form>
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Profesionales Disponibles
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Seleccione un profesional para su cita.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProfessionals.map((professional) => (
                <div
                  key={professional.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden"
                >
                  <div className="p-4">
                    <Image
                      src={`https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=500&q=80`}
                      alt={professional.specialty.name}
                      width={100}
                      height={100}
                      className="rounded-full mx-auto mb-4"
                    />
                    <h4 className="text-lg font-semibold text-center">
                      {professional.specialty.name}
                    </h4>
                    <p className="text-sm text-gray-500 text-center mb-2">
                      {professional.description}
                    </p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => {
                          setSelectedProfessional(professional);
                          setIsProfessionalDetailsOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Ver detalles
                      </button>
                      <button
                        onClick={() => handleProfessionalSelect(professional)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                      >
                        Seleccionar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-6 w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {isProfessionalDetailsOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {selectedProfessional?.specialty.name}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {selectedProfessional?.specialty.name}
            </p>
            <Image
              src={`https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=500&q=80`}
              alt={selectedProfessional?.specialty.name}
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
            />
            <p className="text-sm text-gray-600 mb-6">
              {selectedProfessional?.description}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsProfessionalDetailsOpen(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  handleProfessionalSelect(selectedProfessional);
                  setIsProfessionalDetailsOpen(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Seleccionar este profesional
              </button>
            </div>
          </div>
        </div>
      )}

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
