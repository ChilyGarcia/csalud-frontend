"use client";

import { useState } from "react";
import { ChevronLeft, CreditCard, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data for the appointment (in a real app, this would come from the previous page or API)
const appointmentData = {
  professional: "Dra. Ana García",
  specialty: "Médico General",
  date: "2023-10-30",
  time: "14:00",
  duration: "30 minutos",
  price: 80.0,
};

export default function Payment() {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically process the payment
    // For this example, we'll just log the data
    console.log("Payment submitted:", formData);
    alert("Pago procesado con éxito!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          href="/appointment"
          className="flex items-center justify-center text-blue-600 hover:text-blue-500 mb-6 transition duration-150 ease-in-out"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span>Volver a la página de cita</span>
        </Link>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Pago de Cita
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Complete la información de pago para confirmar su cita
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
          <div className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Resumen de la Cita
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <User className="h-5 w-5 text-blue-500 mr-2" />
                <p className="text-sm text-gray-600">
                  <strong>{appointmentData.professional}</strong> -{" "}
                  {appointmentData.specialty}
                </p>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                <p className="text-sm text-gray-600">{appointmentData.date}</p>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <p className="text-sm text-gray-600">
                  {appointmentData.time} ({appointmentData.duration})
                </p>
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-800 mt-4">
              Total a pagar: ${appointmentData.price.toFixed(2)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Número de Tarjeta
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cardName"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre en la Tarjeta
              </label>
              <input
                type="text"
                name="cardName"
                id="cardName"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Juan Pérez"
                value={formData.cardName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expiryDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de Expiración
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  id="expiryDate"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="MM/AA"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-gray-700"
                >
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  id="cvv"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="saveCard"
                name="saveCard"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="saveCard"
                className="ml-2 block text-sm text-gray-900"
              >
                Guardar esta tarjeta para futuros pagos
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Pagar ${appointmentData.price.toFixed(2)}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Métodos de Pago Aceptados
          </h3>
          <div className="flex justify-center space-x-4">
            <Image
              src="/placeholder.svg?height=40&width=60&text=Visa"
              alt="Visa"
              width={60}
              height={40}
              className="rounded-md shadow-sm"
            />
            <Image
              src="/placeholder.svg?height=40&width=60&text=Mastercard"
              alt="Mastercard"
              width={60}
              height={40}
              className="rounded-md shadow-sm"
            />
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Sus datos de pago están seguros y encriptados
          </p>
        </div>
      </div>
    </div>
  );
}
