import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Building, Users, Award, History } from "lucide-react";

interface AboutSection {
  id: number;
  sectionType: string;
  title: string;
  content: string;
  imageUrl?: string;
  metadata?: string;
  isActive: boolean;
  sortOrder: number;
}

export default function About() {
  // Fetch about sections from database
  const { data: dbSections = [], isLoading } = useQuery({
    queryKey: ['/api/about-sections'],
  });

  // Group sections by type
  const groupedSections = (dbSections as AboutSection[]).reduce((acc: Record<string, AboutSection[]>, section: AboutSection) => {
    if (section.isActive) {
      if (!acc[section.sectionType]) acc[section.sectionType] = [];
      acc[section.sectionType].push(section);
    }
    return acc;
  }, {});

  // Sort sections within each type by sortOrder
  Object.keys(groupedSections).forEach(type => {
    groupedSections[type].sort((a, b) => a.sortOrder - b.sortOrder);
  });

  const getSectionsByType = (type: string) => {
    return groupedSections[type] || [];
  };

  const parseMetadata = (metadata?: string) => {
    if (!metadata) return {};
    try {
      return JSON.parse(metadata);
    } catch {
      return {};
    }
  };

  const overviewSection = getSectionsByType('overview')[0];
  const missionSections = getSectionsByType('mission');
  const visionSections = getSectionsByType('vision');
  const valuesSections = getSectionsByType('values');
  const historySections = getSectionsByType('history');
  const teamSections = getSectionsByType('team');
  const achievementSections = getSectionsByType('achievement');
  const cultureSections = getSectionsByType('culture');

  if (isLoading) {
    return <div className="pt-16 flex items-center justify-center h-64">Loading about information...</div>;
  }

  return (
    <div className="pt-16">
      {/* About Hero Section */}
      <section className="py-20 bg-gradient-to-br from-light-green to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold dark-green mb-6">
              {overviewSection?.title || "About Lead City Microfinance Bank"}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {overviewSection?.content || "Established within Lead City University, Ibadan, we are a licensed microfinance bank committed to providing accessible financial services to staff, businesses, and individuals."}
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
                {/* Mission Section */}
                {missionSections.length > 0 ? (
                  missionSections.map((section) => (
                    <div key={section.id}>
                      <h3 className="text-2xl font-semibold dark-green mb-4">{section.title}</h3>
                      <p className="text-gray-600">{section.content}</p>
                    </div>
                  ))
                ) : (
                  <div>
                    <h3 className="text-2xl font-semibold dark-green mb-4">Our Mission</h3>
                    <p className="text-gray-600">
                      To provide accessible, reliable, and innovative microfinance services that empower individuals and small businesses to achieve their financial goals through technology-driven solutions and customer-centric approaches.
                    </p>
                  </div>
                )}

                {/* Vision Section */}
                {visionSections.length > 0 ? (
                  visionSections.map((section) => (
                    <div key={section.id}>
                      <h3 className="text-2xl font-semibold dark-green mb-4">{section.title}</h3>
                      <p className="text-gray-600">{section.content}</p>
                    </div>
                  ))
                ) : (
                  <div>
                    <h3 className="text-2xl font-semibold dark-green mb-4">Our Vision</h3>
                    <p className="text-gray-600">
                      To become the leading microfinance bank in Nigeria, driving financial inclusion and economic growth through innovative technology and customer-centric services that transform lives and businesses.
                    </p>
                  </div>
                )}

                {/* Values Section */}
                {valuesSections.length > 0 ? (
                  <div>
                    <h3 className="text-2xl font-semibold dark-green mb-4">
                      {valuesSections[0]?.title || "Our Values"}
                    </h3>
                    <div className="space-y-3">
                      {valuesSections.map((section) => (
                        <div key={section.id} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-brand-green mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-gray-800">{section.title}</h4>
                            <p className="text-sm text-gray-600">{section.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
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
                )}
              </div>
            </div>

            <div>
              <img 
                src="/attached_assets/image_1753192332443.png" 
                alt="Lead City University Campus - Home of Lead City Microfinance Bank" 
                className="rounded-2xl shadow-2xl w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Sections from Database */}
      {(historySections.length > 0 || teamSections.length > 0 || achievementSections.length > 0 || cultureSections.length > 0) && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* History Section */}
              {historySections.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center mb-6">
                    <History className="w-8 h-8 text-brand-green mr-3" />
                    <h2 className="text-3xl font-bold dark-green">Our History</h2>
                  </div>
                  {historySections.map((section) => (
                    <Card key={section.id}>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold dark-green mb-3">{section.title}</h3>
                        <p className="text-gray-600">{section.content}</p>
                        {section.imageUrl && (
                          <img 
                            src={section.imageUrl} 
                            alt={section.title}
                            className="mt-4 w-full h-48 object-cover rounded-lg"
                          />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Team Section */}
              {teamSections.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center mb-6">
                    <Users className="w-8 h-8 text-brand-green mr-3" />
                    <h2 className="text-3xl font-bold dark-green">Our Team</h2>
                  </div>
                  {teamSections.map((section) => (
                    <Card key={section.id}>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold dark-green mb-3">{section.title}</h3>
                        <p className="text-gray-600">{section.content}</p>
                        {section.imageUrl && (
                          <img 
                            src={section.imageUrl} 
                            alt={section.title}
                            className="mt-4 w-24 h-24 object-cover rounded-full mx-auto"
                          />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

            </div>

            {/* Achievements Section */}
            {achievementSections.length > 0 && (
              <div className="mt-16">
                <div className="flex items-center justify-center mb-8">
                  <Award className="w-8 h-8 text-brand-green mr-3" />
                  <h2 className="text-3xl font-bold dark-green">Our Achievements</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievementSections.map((section) => (
                    <Card key={section.id} className="text-center">
                      <CardContent className="p-6">
                        <Award className="w-12 h-12 text-brand-green mx-auto mb-4" />
                        <h3 className="text-lg font-semibold dark-green mb-2">{section.title}</h3>
                        <p className="text-gray-600 text-sm">{section.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Culture Section */}
            {cultureSections.length > 0 && (
              <div className="mt-16">
                <div className="flex items-center justify-center mb-8">
                  <Building className="w-8 h-8 text-brand-green mr-3" />
                  <h2 className="text-3xl font-bold dark-green">Our Culture</h2>
                </div>
                <div className="space-y-6">
                  {cultureSections.map((section) => (
                    <Card key={section.id}>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold dark-green mb-3">{section.title}</h3>
                        <p className="text-gray-600">{section.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

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
