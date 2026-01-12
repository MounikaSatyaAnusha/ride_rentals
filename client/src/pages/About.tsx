import { CheckCircle, Shield, Clock, Users, Award, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: CheckCircle,
    title: "150+ Premium Vehicles",
    description: "Extensive fleet covering all your transportation needs from bicycles to buses",
  },
  {
    icon: Shield,
    title: "Fully Insured & Verified",
    description: "All vehicles are regularly maintained and comprehensively insured for your safety",
  },
  {
    icon: Clock,
    title: "24/7 Customer Support",
    description: "Round-the-clock assistance to ensure a smooth rental experience",
  },
  {
    icon: Users,
    title: "Professional Drivers",
    description: "Optional experienced drivers for safer and more convenient journeys",
  },
  {
    icon: Award,
    title: "Competitive Pricing",
    description: "Transparent pricing with no hidden fees and flexible rental periods",
  },
  {
    icon: MapPin,
    title: "Multiple Locations",
    description: "Convenient pickup and drop-off points across the city",
  },
];

const stats = [
  { value: "150+", label: "Vehicles" },
  { value: "10K+", label: "Happy Customers" },
  { value: "50+", label: "Professional Drivers" },
  { value: "5", label: "Vehicle Categories" },
];

export default function About() {
  return (
    <div className="flex flex-col">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Ride Rent</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We're transforming vehicle rental with a simple mission: provide quality vehicles, 
            exceptional service, and flexible options that meet your unique transportation needs.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="p-6">
                  <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4">Our Story</h2>
            <div className="max-w-3xl mx-auto space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Founded in 2020, Ride Rent emerged from a simple observation: vehicle rental 
                should be accessible, transparent, and tailored to diverse needs. Whether you're 
                a solo traveler seeking a bicycle for city exploration, a family planning a 
                road trip, or a business requiring commercial transportation, we believe everyone 
                deserves quality options.
              </p>
              <p>
                Our platform brings together a comprehensive fleet of 150+ vehicles across five 
                categories, complemented by a network of professional drivers who prioritize 
                your safety and comfort. We've streamlined the booking process, eliminated 
                hidden fees, and built a service that puts customers first.
              </p>
              <p>
                Today, we're proud to serve thousands of satisfied customers, helping them 
                reach their destinations safely and affordably. Our commitment to quality, 
                transparency, and innovation drives everything we do.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="hover-elevate active-elevate-2">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
