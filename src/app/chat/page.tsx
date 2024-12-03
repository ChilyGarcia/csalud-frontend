"use client";

import Chat from "@/components/chat";
import { authenticationService } from "@/services/auth.service";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function ChatPage() {
  const [sender_id, setSender] = useState<number | null>(null);
  const [receiver_id, setReceiver] = useState(1); // Enviado al profesional
  const [messages, setMessages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const token = Cookies.get("token");

  const fetchUserDetails = async () => {
    try {
      const response = await authenticationService.userDetails();
      setSender(response.id);
      return response;
    } catch (error) {
      console.error("Error fetching user details:", (error as Error).message);
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserDetails();

      fetch("http://csalud.test/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiver_id: receiver_id,
        }),
      })
        .then((response) => response.json())
        .then((messages) => {
          setMessages(messages);
          setIsLoaded(true);
        })
        .catch((error) => {
          console.error("Error fetching messages:", (error as Error).message);
        });
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoaded && sender_id !== null && (
        <Chat
          sender_id={sender_id}
          receiver_id={receiver_id}
          messages={messages}
        />
      )}
    </>
  );
}
