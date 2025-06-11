
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { mockProperties } from '@/data/mockProperties';
import { useNavigate } from 'react-router-dom';

const ExploreProperties = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [roiFilter, setRoiFilter] = useState('all');

  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'all' || property.location === locationFilter;
    const matchesROI = roiFilter === 'all' || 
                      (roiFilter === 'high' && property.roi >= 10) ||
                      (roiFilter === 'medium' && property.roi >= 7 && property.roi < 10) ||
                      (roiFilter === 'low' && property.roi < 7);
    
    return matchesSearch && matchesLocation && matchesROI;
  });

  const locations = [...new Set(mockProperties.map(p => p.location))];

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Explore Properties</h1>
            <p className="text-gray-400">Discover premium properties for fractional ownership</p>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border-slate-700 text-white"
            />
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={roiFilter} onValueChange={setRoiFilter}>
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                <SelectValue placeholder="ROI" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="all">All ROI</SelectItem>
                <SelectItem value="high">High (10%+)</SelectItem>
                <SelectItem value="medium">Medium (7-10%)</SelectItem>
                <SelectItem value="low">Conservative (5-7%)</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              className="bg-gradient-to-r from-purple-600 to-blue-600"
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('all');
                setRoiFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>

          {/* Properties Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="bg-slate-900 border-slate-800 overflow-hidden hover:bg-slate-800 transition-all duration-300 cursor-pointer group">
                <div 
                  className="relative aspect-video overflow-hidden"
                  onClick={() => navigate(`/property/${property.id}`)}
                >
                  <img 
                    src={property.images[0]} 
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {property.roi}% YoY
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-slate-900">
                      {property.availableShares}/{property.totalShares} shares available
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {property.name}
                      </h3>
                      <p className="text-gray-400">{property.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">
                        ₹{(property.value / 10000000).toFixed(1)} Cr
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-2">
                  <p className="text-gray-300 text-sm mb-4">{property.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-sm text-gray-400">Min Investment</div>
                      <div className="font-semibold text-purple-400">
                        ₹{property.minInvestment.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Property Type</div>
                      <div className="font-semibold text-white">{property.propertyType}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={() => navigate(`/property/${property.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No properties found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters to see more properties</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('all');
                  setRoiFilter('all');
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreProperties;
