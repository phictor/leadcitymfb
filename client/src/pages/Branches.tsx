import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import type { Branch } from "@shared/schema";

export default function Branches() {
  const { data: branches, isLoading } = useQuery<Branch[]>({
    queryKey: ["/api/branches"],
  });

  const handleGetDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-green mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading branch locations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-light-green to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold dark-green mb-6">
              Our Branch Locations
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find our branches across Nigeria for in-person banking services and personalized financial solutions
            </p>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Branch List */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold dark-green mb-6">Visit Our Branches</h2>
              {branches?.map((branch) => (
                <Card key={branch.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold dark-green mb-2">{branch.name}</h3>
                          <p className="text-gray-600 mb-3 leading-relaxed">
                            {branch.address}
                          </p>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2" />
                              {branch.phone}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {branch.hours}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleGetDirections(branch.address)}
                        size="sm"
                        className="ml-4 bg-brand-green hover:bg-dark-green"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map Container */}
            <div className="lg:sticky lg:top-24">
              <Card className="overflow-hidden">
                <div className="h-96 lg:h-[600px] bg-gray-200 flex items-center justify-center relative">
                  {/* Map Placeholder - In production, integrate with Google Maps API */}
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-600 text-lg font-semibold">Interactive Map</div>
                    <div className="text-sm text-gray-500 mt-2">
                      Branch locations will be displayed here
                    </div>
                    <div className="text-xs text-gray-400 mt-4">
                      Google Maps integration coming soon
                    </div>
                  </div>
                  
                  {/* Sample map markers overlay */}
                  <div className="absolute top-20 left-20 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute top-32 right-24 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-20 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold dark-green mb-8">Need Help Finding Us?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our customer service team is here to help you locate the nearest branch
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-brand-green hover:bg-dark-green">
              <Phone className="w-4 h-4 mr-2" />
              Call Us: +234 803 456 7890
            </Button>
            <Button variant="outline" className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
              <MapPin className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
