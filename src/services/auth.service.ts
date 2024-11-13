import { Credentials } from "@/interfaces/credentials.interface";
import Cookies from "js-cookie";

const BACKEND_URL = "http://csalud.test/api/auth"; // https://clownfish-app-8pq82.ondigitalocean.app/api/auth    http://127.0.0.1:8000/api/auth

export const authenticationService = {
  login: async (credentials: Credentials) => {
    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error logging in:", (error as Error).message);
      return false;
    }
  },
  logOut: async () => {
    try {
      const token = Cookies.get("token");

      const response = await fetch(`${BACKEND_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error("Error logging out:", (error as Error).message);
      return false;
    }
  },
};
