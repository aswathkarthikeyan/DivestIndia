
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { mockProperties } from '@/data/mockProperties';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Building2, TrendingUp, Search } from 'lucide-react';

const ExploreProperties = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

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
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Explore Properties</h1>
          <p className="text-gray-400">Discover and invest in premium real estate opportunities</p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-900 border-slate-700 text-white"
            />
          </div>
          
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
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
            <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
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

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="bg-slate-900 border-slate-700 hover:bg-slate-800 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img 
                  src={property.images[0]} 
                  alt={property.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                    {property.roi}% ROI
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-white">{property.name}</CardTitle>
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
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
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Property Value:</span>
                    <span className="text-white font-semibold">₹{(property.value / 10000000).toFixed(1)}Cr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Min Investment:</span>
                    <span className="text-white font-semibold">₹{property.minInvestment.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Available Shares:</span>
                    <span className="text-blue-400 font-semibold">{property.availableShares}/{property.totalShares}</span>
                  </div>
                </div>

                <Button 
                  onClick={() => navigate(`/property/${property.id}`)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300"
                >
                  View Details & Invest
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Properties Found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreProperties;
