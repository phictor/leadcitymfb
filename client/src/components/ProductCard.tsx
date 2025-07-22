import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ProductCardProps {
  name: string;
  description: string;
  features: string[];
  onApply: () => void;
  icon: React.ReactNode;
}

export default function ProductCard({ name, description, features, onApply, icon }: ProductCardProps) {
  return (
    <Card className="h-full hover:shadow-2xl transition-shadow border border-gray-100">
      <CardHeader>
        <div className="w-16 h-16 bg-light-green rounded-xl flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl font-semibold dark-green">{name}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <Check className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          onClick={onApply}
          className="w-full bg-brand-green hover:bg-dark-green text-white font-semibold"
        >
          Apply Now
        </Button>
      </CardContent>
    </Card>
  );
}
