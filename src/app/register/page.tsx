"use client";

import { useState } from "react";
import Image from "next/image";
import { RegisterCredentials } from "@/interfaces/register.interface";
import { authenticationService } from "@/services/auth.service";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/navigation";

export default function Component() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialState: RegisterCredentials = {
    name: "",
    email: "",
    password: "",
    role: "patient",
    password_confirmation: "",
  };

  const [formRegister, setFormRegister] =
    useState<RegisterCredentials>(initialState);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [isVisibleToast, setIsVisibleToast] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormRegister((prev) => ({ ...prev, [name]: value }));
  };

  const fetchRegister = async () => {
    setIsLoading(true);
    try {
      const response = await authenticationService.register(formRegister);

      return response;
    } catch (error) {
      console.error("Error fetching user details:", (error as Error).message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors(null); // Reset errors before new submission

    try {
      const register = await fetchRegister();
      if (register.success) {
        console.log("Registro exitoso");
        router.push("/login");
      } else {
        const errorMessages = Object.values(register.errors).flat().join(", ");
        setErrors(errorMessages);
        console.log("Error en el registro", register.errors);

        setIsVisibleToast(true);
        setTimeout(() => {
          setIsVisibleToast(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error en la solicitud", error);
      setErrors("Error en la solicitud");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return Object.values(formRegister).every((field) => field.trim() !== "");
  };

  return (
    <>
      <div className="min-h-screen flex">
        <div className="w-full md:w-1/2 p-8 flex flex-col">
          <a href="/" className="text-[#4361ee] flex items-center gap-2 mb-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Volver</span>
          </a>

          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold mb-2">BIENVENIDO A</h1>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-[#4361ee] to-[#7209b7] bg-clip-text text-transparent">
                <div className="flex justify-center items-center w-full">
                  <img src="/images/csalud.png" className="w-52" alt="Logo" />
                </div>
              </h2>
            </div>

            <p className="text-center text-gray-600 mb-8">
              Ingresa tus datos para registrarte y obtener citas y diagnósticos
              en tiempo real
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombres completos"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4361ee]/20 focus:border-[#4361ee]"
                  value={formRegister.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4361ee]/20 focus:border-[#4361ee]"
                  value={formRegister.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4361ee]/20 focus:border-[#4361ee]"
                  value={formRegister.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {/* SVG Icons */}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirmation"
                  placeholder="Confirmar contraseña"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4361ee]/20 focus:border-[#4361ee]"
                  value={formRegister.password_confirmation}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {/* SVG Icons */}
                </button>
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  isFormValid()
                    ? "bg-[#4361ee] text-white hover:bg-[#3a50d9]"
                    : "bg-[#4362ee53] text-white cursor-not-allowed"
                }`}
                disabled={!isFormValid()}
              >
                {isLoading ? (
                  <>
                    {" "}
                    <Oval
                      height={20}
                      width={20}
                      color="#ffffff"
                      wrapperStyle={{
                        display: "inline-block",
                        verticalAlign: "middle",
                      }}
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#ffffff"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  </>
                ) : (
                  "Registrarse"
                )}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    o tambien puedes
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                Iniciar sesión con Google
              </button>
            </form>
          </div>
        </div>

        <div className="hidden md:block w-1/2 bg-gradient-to-br from-[#4361ee]/20 to-[#7209b7]/20">
          <Image
            src="/images/register.png"
            alt="Doctor"
            width={918}
            height={612}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {isVisibleToast && (
        <div className="toast toast-end">
          <div className="alert alert-error">
            <span className="text-white"> {errors} </span>
          </div>
        </div>
      )}
    </>
  );
}
