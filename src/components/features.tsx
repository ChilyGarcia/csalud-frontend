import React from "react";
import { Calendar, MessageCircle, VideoIcon, Shield } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="py-16 bg-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose CSalud?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Calendar className="h-8 w-8 text-sky-500" />}
            title="Easy Scheduling"
            description="Book appointments with healthcare professionals in just a few clicks"
          />
          <FeatureCard
            icon={<MessageCircle className="h-8 w-8 text-sky-500" />}
            title="Direct Communication"
            description="Chat with your healthcare provider before and after appointments"
          />
          <FeatureCard
            icon={<VideoIcon className="h-8 w-8 text-sky-500" />}
            title="Video Consultations"
            description="Connect with professionals through secure video calls"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-sky-500" />}
            title="Secure Platform"
            description="Your health information is protected with enterprise-grade security"
          />
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};
