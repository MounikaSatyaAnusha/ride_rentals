import { Link } from "wouter";
import { Car, Bike, Truck, Bus, Mountain, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "car",
    name: "Cars",
    icon: Car,
    description: "Sedans, SUVs, and luxury vehicles perfect for comfortable travel and road trips",
    vehicles: "50+ vehicles available",
    priceRange: "₹1500 - ₹6000 per day",
  },
  {
    id: "bike",
    name: "Bikes",
    icon: Bike,
    description: "Motorcycles and scooters ideal for quick city rides and exploring urban areas",
    vehicles: "30+ vehicles available",
    priceRange: "₹500 - ₹1999 per day",
  },
  {
    id: "truck",
    name: "Trucks",
    icon: Truck,
    description: "Commercial trucks for heavy-duty transportation and moving services",
    vehicles: "20+ vehicles available",
    priceRange: "₹2999 - ₹5999 per day",
  },
  {
    id: "bus",
    name: "Buses",
    icon: Bus,
    description: "Tour buses and minibuses perfect for group travel and corporate events",
    vehicles: "15+ vehicles available",
    priceRange: "₹9000 - ₹15,000 per day",
  },
  {
    id: "bicycle",
    name: "Bicycles",
    icon: Mountain,
    description: "Eco-friendly bikes for city exploration and outdoor adventures",
    vehicles: "40+ vehicles available",
    priceRange: "₹149 - ₹499 per day",
  },
];

export default function Vehicles() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Vehicle Fleet</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through our extensive collection of vehicles across multiple categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="hover-elevate active-elevate-2" data-testid={`card-category-${category.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <category.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{category.name}</CardTitle>
                      <CardDescription className="mt-1">{category.vehicles}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{category.description}</p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Price Range</p>
                    <p className="font-semibold">{category.priceRange}</p>
                  </div>
                  <Link href={`/vehicles/${category.id}`}>
                    <Button data-testid={`button-view-${category.id}`}>
                      View {category.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
