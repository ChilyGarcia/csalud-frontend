import { Credentials } from "@/interfaces/credentials.interface";
import Cookies from "js-cookie";

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const authenticationService = {
  login: async (credentials: Credentials) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/login`, {
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

      const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/logout`, {
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
