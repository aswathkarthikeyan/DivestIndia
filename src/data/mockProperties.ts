
export interface Property {
  id: string;
  name: string;
  location: string;
  value: number;
  roi: number;
  minInvestment: number;
  images: string[];
  description: string;
  totalShares: number;
  availableShares: number;
  amenities: string[];
  highlights: string[];
  propertyType: string;
  area: string;
  yearBuilt: number;
  expectedReturns: string;
  managementFee: string;
}

export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'The White Villa',
    location: 'Goa',
    value: 20000000,
    roi: 8,
    minInvestment: 100000,
    images: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    description: 'A stunning beachfront villa with panoramic ocean views. Perfect for vacation rentals and personal getaways.',
    totalShares: 200,
    availableShares: 67,
    amenities: ['Private Beach Access', 'Swimming Pool', 'Garden', 'Parking', 'WiFi'],
    highlights: ['Beachfront Location', 'High Rental Demand', 'Premium Finishing'],
    propertyType: 'Villa',
    area: '3,500 sq ft',
    yearBuilt: 2020,
    expectedReturns: '8-12% annually',
    managementFee: '2% of rental income'
  },
  {
    id: '2',
    name: 'Urban Nest',
    location: 'Bangalore',
    value: 42000000,
    roi: 12,
    minInvestment: 150000,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc'
    ],
    description: 'Modern apartment complex in the heart of Bangalore\'s tech corridor. High rental yield from IT professionals.',
    totalShares: 420,
    availableShares: 156,
    amenities: ['Gym', 'Swimming Pool', 'Club House', 'Security', 'Parking'],
    highlights: ['Tech Corridor Location', 'High Rental Yield', 'Modern Amenities'],
    propertyType: 'Apartment Complex',
    area: '1,200-1,800 sq ft units',
    yearBuilt: 2019,
    expectedReturns: '10-15% annually',
    managementFee: '3% of rental income'
  },
  {
    id: '3',
    name: 'Skyline Heights',
    location: 'Mumbai',
    value: 70000000,
    roi: 10,
    minInvestment: 200000,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'
    ],
    description: 'Luxurious high-rise apartments with stunning city views. Premium location in Mumbai\'s financial district.',
    totalShares: 700,
    availableShares: 203,
    amenities: ['Infinity Pool', 'Spa', 'Gym', 'Concierge', 'Valet Parking'],
    highlights: ['City Center Location', 'Luxury Amenities', 'Capital Appreciation'],
    propertyType: 'High-rise Apartment',
    area: '2,000-3,000 sq ft',
    yearBuilt: 2021,
    expectedReturns: '8-12% annually',
    managementFee: '2.5% of rental income'
  }
];
