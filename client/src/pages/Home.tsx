import { Link } from "wouter";
import { Car, Bike, Truck, Bus, Mountain, CheckCircle, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
const heroImage="https://wallpapertag.com/wallpaper/full/a/c/c/254557-download-car-wallpapers-hd-2560x1440.jpg";
const vehicleCategories = [
  {
    id: "car",
    name: "Cars",
    icon: Car,
    description: "Sedans, SUVs, and luxury vehicles for comfortable travel",
    count: "50+ vehicles",
  },
  {
    id: "bike",
    name: "Bikes",
    icon: Bike,
    description: "Motorcycles and scooters for quick city rides",
    count: "30+ vehicles",
  },
  {
    id: "truck",
    name: "Trucks",
    icon: Truck,
    description: "Commercial trucks for heavy-duty transportation",
    count: "20+ vehicles",
  },
  {
    id: "bus",
    name: "Buses",
    icon: Bus,
    description: "Tour buses and minibuses for group travel",
    count: "15+ vehicles",
  },
  {
    id: "bicycle",
    name: "Bicycles",
    icon: Mountain,
    description: "Eco-friendly bikes for city exploration",
    count: "40+ vehicles",
  },
];

const features = [
  {
    icon: CheckCircle,
    title: "Wide Selection",
    description: "Choose from 150+ vehicles across 5 categories",
  },
  {
    icon: Shield,
    title: "Professional Drivers",
    description: "Optional experienced drivers for safer journeys",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer service for your convenience",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Rent Your Perfect Ride
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Choose from cars, bikes, trucks, buses, and bicycles with optional professional drivers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vehicles">
              <Button size="lg" className="text-lg px-8" data-testid="button-browse-vehicles">
                Browse Vehicles
              </Button>
            </Link>
            <Link href="/about">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Ride Rent?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience premium vehicle rental with flexible options and secure bookings
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="hover-elevate active-elevate-2">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-lg text-muted-foreground">
              Select your preferred vehicle type and start your journey
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {vehicleCategories.map((category) => (
              <Link key={category.id} href={`/vehicles/${category.id}`}>
                <Card className="hover-elevate active-elevate-2 cursor-pointer h-full transition-all duration-300" data-testid={`card-category-${category.id}`}>
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 rounded-full bg-primary/10">
                        <category.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                    <p className="text-xs font-medium text-primary">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
