const API_URL = process.env.API_URL || "http://localhost:8000/api";

export const backendService = {
  professionalList: async () => {
    try {
      const response = await fetch(API_URL + "/specialties");
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
      const response = await fetch(API_URL + "/find-availaibility-filter", {
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
};
