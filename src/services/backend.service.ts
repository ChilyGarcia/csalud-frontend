import Cookies from "js-cookie";

const BACKEND_URL = "http://127.0.0.1:8000/api";

export const backendService = {
  professionalList: async () => {
    try {
      const response = await fetch(BACKEND_URL + "/specialties");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "Error fetching professional list:",
        (error as Error).message
      );
      return [];
    }
  },
  filteredProfessionals: async (body: any) => {
    try {
      const response = await fetch(BACKEND_URL + "/find-availaibility-filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "Error fetching filtered professionals:",
        (error as Error).message
      );
      return [];
    }
  },
  appointment: async (body: any) => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(BACKEND_URL + "/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating appointment:", (error as Error).message);
    }
  },

  listAppointments: async () => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(BACKEND_URL + "/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching appointments:", (error as Error).message);
      return [];
    }
  },

  getMessages: async (sender_id: number, receiver_id: number) => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(BACKEND_URL + "/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiver_id: receiver_id,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching messages:", (error as Error).message);
      return [];
    }
  },

  registerProfesional: async (body) => {
    console.log("Este es el cuerpo que se deberia de enviar", body);

    try {
      const response = await fetch(`${BACKEND_URL}/health-professionals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error registering:", (error as Error).message);
      return { success: false, errors: { message: (error as Error).message } };
    }
  },

  getProfessionalAppointments: async () => {
    const token = Cookies.get("token");

    try {
      const response = await fetch(BACKEND_URL + "/professional/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching professional:", (error as Error).message);
      return [];
    }
  },

  professionalAvailabilities: async () => {
    const token = Cookies.get("token");

    try {
      const response = await fetch(BACKEND_URL + "/availabilities", {
         headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {}
  },
};
