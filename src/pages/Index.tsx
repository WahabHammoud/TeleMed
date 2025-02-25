
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import {
  Calendar,
  Video,
  Users,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Video,
      title: "Video Consultations",
      description: "Connect with healthcare professionals from anywhere",
      link: "/consultations",
    },
    {
      icon: Calendar,
      title: "Appointment Booking",
      description: "Schedule and manage your medical appointments",
      link: "/appointments",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join discussions and share experiences",
      link: "/community",
    },
    {
      icon: ShoppingBag,
      title: "Health Store",
      description: "Purchase vitamins, supplements and more",
      link: "/shop",
    },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-7xl animate-fadeIn">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Health, Connected
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Access quality healthcare from the comfort of your home with our comprehensive telemedicine platform
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-medical-600 hover:bg-medical-700">
              <Link to="/appointments">Book Appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/consultations">Start Consultation</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature) => (
            <Link
              key={feature.title}
              to={feature.link}
              className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="h-12 w-12 bg-medical-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-medical-200 transition-colors">
                <feature.icon className="h-6 w-6 text-medical-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className="flex items-center text-medical-600 group-hover:text-medical-700">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-medical-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-medical-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Create an Account</h3>
              <p className="text-gray-600">
                Sign up and complete your health profile
              </p>
            </div>
            <div className="text-center">
              <div className="bg-medical-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-medical-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Book an Appointment</h3>
              <p className="text-gray-600">
                Choose your doctor and preferred time slot
              </p>
            </div>
            <div className="text-center">
              <div className="bg-medical-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-medical-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Start Consultation</h3>
              <p className="text-gray-600">
                Connect with your doctor through secure video call
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
