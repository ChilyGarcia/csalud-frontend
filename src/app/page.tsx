"use client";

import { Star } from "lucide-react";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Reviews from "@/components/review";
import Features from "@/components/features";

export default function LandingPage() {
  const reviews = [
    {
      id: 1,
      name: "Johan Jhonston",
      rating: 5,
      text: "Excelente servicio! Facil agendamiento.",
    },
    {
      id: 2,
      name: "Julianna Smith",
      rating: 4,
      text: "Muy util, me ahorro bastante tiempo.",
    },
    {
      id: 3,
      name: "Mike Tyson",
      rating: 5,
      text: "Excelente aplicacion, la recomiendo!",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}

      <NavBar></NavBar>

      {/* Hero Section */}
      <Hero></Hero>

      {/* Features Section */}
      <Features></Features>

      {/* Reviews Section */}
      <Reviews></Reviews>

      <Footer></Footer>
    </div>
  );
}
