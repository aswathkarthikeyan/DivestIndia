
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { mockProperties } from '@/data/mockProperties';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Building2, TrendingUp, Search, Filter, Users, Clock } from 'lucide-react';

const ExploreProperties = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'all' || property.location.includes(locationFilter);
    const matchesType = typeFilter === 'all' || property.propertyType.toLowerCase().includes(typeFilter.toLowerCase());
    
    return matchesSearch && matchesLocation && matchesType;
  });

  const locations = Array.from(new Set(mockProperties.map(p => p.location.split(',')[1]?.trim()).filter(Boolean)));
  const types = Array.from(new Set(mockProperties.map(p => p.propertyType)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-slate-900/50 backdrop-blur-md border-b border-slate-700 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Explore Properties</h1>
            <p className="text-gray-400 text-sm lg:text-base">Discover and invest in premium real estate opportunities</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-4 lg:p-6 bg-slate-800/30">
          <div className="max-w-7xl mx-auto">
            {/* Mobile Search */}
            <div className="lg:hidden mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-900 border-slate-600 text-white h-12"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="mt-3 w-full border-slate-600 text-white hover:bg-slate-700"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Mobile Filters (Collapsible) */}
            {showFilters && (
              <div className="lg:hidden mb-4 space-y-3 p-4 bg-slate-900 rounded-lg border border-slate-700">
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="all">All Types</SelectItem>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setLocationFilter('all');
                    setTypeFilter('all');
                  }}
                  variant="outline"
                  className="w-full border-slate-600 text-white hover:bg-slate-800"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Desktop Filters */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-900 border-slate-600 text-white"
                />
              </div>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('all');
                  setTypeFilter('all');
                }}
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-800"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {filteredProperties.map((property) => (
                <Card 
                  key={property.id} 
                  className="bg-slate-800/90 border-slate-700 hover:bg-slate-800 transition-all duration-300 hover:scale-[1.02] cursor-pointer group backdrop-blur-sm"
                  onClick={() => navigate(`/property/${property.id}`)}
                >
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                    <img 
                      src={property.images[0]} 
                      alt={property.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-lg">
                        {property.roi}% ROI
                      </span>
                      {property.isLimited && (
                        <span className="bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-lg">
                          Limited
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <div className="flex items-center text-white bg-black/50 px-2 py-1 rounded-lg backdrop-blur-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="text-xs font-medium">{property.stayPerShare}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-lg line-clamp-1">{property.name}</CardTitle>
                    <div className="flex items-center text-gray-400">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="text-sm truncate">{property.location}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-300">
                        <Building2 className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.propertyType}</span>
                      </div>
                      <div className="flex items-center text-purple-400">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm font-semibold">{property.expectedReturns}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-700/50 p-3 rounded-lg">
                        <p className="text-gray-400 text-xs mb-1">Property Value</p>
                        <p className="text-white font-semibold text-sm">₹{(property.value / 10000000).toFixed(1)}Cr</p>
                      </div>
                      <div className="bg-slate-700/50 p-3 rounded-lg">
                        <p className="text-gray-400 text-xs mb-1">Min Investment</p>
                        <p className="text-white font-semibold text-sm">₹{(property.minInvestment / 100000).toFixed(0)}L</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center text-blue-400">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.availableShares}/{property.totalShares} shares</span>
                      </div>
                      <div className="text-orange-400 font-semibold text-sm">
                        {property.rentalYield} yield
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/property/${property.id}`);
                      }}
                    >
                      View Details & Invest
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-16">
                <Building2 className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Properties Found</h3>
                <p className="text-gray-400">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreProperties;
