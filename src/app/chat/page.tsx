"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import Cookies from "js-cookie";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const userId = 1;
  const receiverId = 2;

  useEffect(() => {
    // Inicializa Pusher
    const pusher = new Pusher("a7f9b80f8e8d1c4a0e09", {
      cluster: "mt1",
    });

    // Suscríbete al canal privado del usuario autenticado
    const channel = pusher.subscribe(`private-chat.${userId}`);

    // Escucha el evento MessageSent
    channel.bind("App\\Events\\MessageSent", (data) => {
      if (data.senderId === receiverId || data.receiverId === receiverId) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender_id: data.senderId, message: data.message },
        ]);
      }
    });

    // Cargar mensajes iniciales
    axios
      .get(`http://127.0.0.1:8000/api/messages?receiver_id=${receiverId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setMessages(response.data);
      });

    // Limpieza al desmontar el componente
    return () => {
      pusher.unsubscribe(`private-chat.${userId}`);
    };
  }, []);

  const handleSendMessage = () => {
    axios
      .post(
        "/chat/message",
        {
          receiver_id: receiverId,
          message: messageInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')
              .content,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
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
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.sender_id}:</strong> {msg.message}
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
        <button onClick={handleSendMessage} style={{ padding: "10px" }}>
          Enviar
        </button>
      </div>
    </div>
  );
}
