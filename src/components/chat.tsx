"use client";

import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Cookies from "js-cookie";

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: string;
  updated_at: string;
}

interface ChatProps {
  sender_id: number;
  receiver_id: number;
  messages: Message[];
}

export default function Chat({ sender_id, receiver_id, messages }: ChatProps) {
  const [messagesSubscribe, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const token = Cookies.get;

  useEffect(() => {
    // Inicializa Pusher
    const pusher = new Pusher("a7f9b80f8e8d1c4a0e09", {
      cluster: "mt1",
    });

    console.log(sender_id, receiver_id, messages);

    setMessages(messages);

    // Suscríbete al canal
    const minId = Math.min(sender_id, receiver_id);
    const maxId = Math.max(sender_id, receiver_id);
    const channel = pusher.subscribe(`chat.${minId}.${maxId}`);

    // Escucha el evento MessageSent
    channel.bind(
      "App\\Events\\MessageSent",
      (data: { user: string; message: string }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: data.user, message: data.message },
        ]);
      }
    );

    // Cleanup al desmontar el componente
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const handleSendMessage = () => {
    if (messageInput.trim() === "") return;

    fetch("http://csalud.test/api/chat/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
        "X-CSRF-TOKEN":
          document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content") || "",
      },
      body: JSON.stringify({ message: messageInput, receiver_id: receiver_id }),
    }).then((response) => {
      if (response.ok) {
        setMessageInput(""); // Limpiar el campo de entrada
      }
    });
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <h3>Chat en Tiempo Real</h3>
      <div
        id="chat-container"
        style={{
          maxWidth: "600px",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <div
          id="messages"
          style={{
            height: "300px",
            overflowY: "auto",
            marginBottom: "10px",
            border: "1px solid #ddd",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          {messagesSubscribe.map((msg, index) => (
            <div key={index}>
              <strong>{msg.user}:</strong> {msg.message}
            </div>
          ))}
        </div>
        <input
          id="message-input"
          type="text"
          placeholder="Escribe un mensaje..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          style={{ width: "calc(100% - 70px)", padding: "10px" }}
        />
        <button
          id="send-button"
          onClick={handleSendMessage}
          style={{ padding: "10px" }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
