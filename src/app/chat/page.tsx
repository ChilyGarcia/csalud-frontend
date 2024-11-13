"use client";

import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    // Inicializa Pusher
    const pusher = new Pusher("a7f9b80f8e8d1c4a0e09", {
      cluster: "mt1",
    });

    // Suscríbete al canal
    const channel = pusher.subscribe("chat");

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

    // Cargar mensajes al inicio
    fetch("http://csalud.test/api/messages")
      .then((response) => response.json())
      .then((messages) => {
        setMessages(messages);
      });

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
        "X-CSRF-TOKEN":
          document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content") || "",
      },
      body: JSON.stringify({ message: messageInput }),
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
          {messages.map((msg, index) => (
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

export default Chat;
