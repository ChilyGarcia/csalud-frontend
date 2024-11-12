import Cookies from "js-cookie";

const BACKEND_URL = "https://clownfish-app-8pq82.ondigitalocean.app";

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
};
