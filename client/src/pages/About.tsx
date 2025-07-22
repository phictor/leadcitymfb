import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="pt-16">
      {/* About Hero Section */}
      <section className="py-20 bg-gradient-to-br from-light-green to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold dark-green mb-6">
              About Lead City Microfinance Bank
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Established within Lead City University, Ibadan, we are a licensed microfinance bank committed to providing accessible financial services to staff, businesses, and individuals.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold dark-green mb-4">Our Mission</h3>
                  <p className="text-gray-600">
                    To provide accessible, reliable, and innovative microfinance services that empower individuals and small businesses to achieve their financial goals through technology-driven solutions and customer-centric approaches.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold dark-green mb-4">Our Vision</h3>
                  <p className="text-gray-600">
                    To become the leading microfinance bank in Nigeria, driving financial inclusion and economic growth through innovative technology and customer-centric services that transform lives and businesses.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold dark-green mb-4">Our Values</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-brand-green mr-2" />
                      <span className="text-gray-600">Integrity</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-brand-green mr-2" />
                      <span className="text-gray-600">Innovation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-brand-green mr-2" />
                      <span className="text-gray-600">Customer Focus</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-brand-green mr-2" />
                      <span className="text-gray-600">Excellence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <img 
                src="/attached_assets/image_1753191933045.png" 
                alt="Lead City University Campus - Home of Lead City Microfinance Bank" 
                className="rounded-2xl shadow-2xl w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-green-100">
              Building a stronger financial future for our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold dark-green mb-2">5000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold dark-green mb-2">₦2B+</div>
                <div className="text-gray-600">Loans Disbursed</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold dark-green mb-2">1</div>
                <div className="text-gray-600">Branch Location</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold dark-green mb-2">99.5%</div>
                <div className="text-gray-600">Customer Satisfaction</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Management Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold dark-green mb-4">
              Board & Management Team
            </h2>
            <p className="text-xl text-gray-600">
              Meet the experienced professionals leading our organization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Mr. Koyin Owoeye",
                position: "Chairman, Board of Directors",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
              },
              {
                name: "Dr. Adebayo Johnson",
                position: "Managing Director/CEO",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
              },
              {
                name: "Mrs. Folake Adebisi",
                position: "Executive Director, Operations",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
              }
            ].map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold dark-green mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
