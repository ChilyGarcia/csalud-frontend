import React from "react";
import { Star } from "lucide-react";

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Lo que nuestros usuarios opinan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ReviewCard
            name="Sarah Johnson"
            role="Patient"
            content="CSalud made it incredibly easy to find and schedule appointments with healthcare professionals. The video consultation feature is a game-changer!"
            rating={5}
            image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
          />
          <ReviewCard
            name="Dr. Michael Chen"
            role="Cardiologist"
            content="As a healthcare provider, CSalud has streamlined my practice management and improved patient communication significantly."
            rating={5}
            image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80"
          />
          <ReviewCard
            name="Emily Rodriguez"
            role="Patient"
            content="The chat feature helps me stay connected with my healthcare provider. It's reassuring to know I can reach out when needed."
            rating={5}
            image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80"
          />
        </div>
      </div>
    </section>
  );
}

const ReviewCard = ({ name, role, content, rating, image }) => {
  return (
    <div className="bg-sky-50 p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sky-500">{role}</p>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{content}</p>
      <div className="flex">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
        ))}
      </div>
    </div>
  );
};
