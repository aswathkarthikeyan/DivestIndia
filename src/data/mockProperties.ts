
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
  stayPerShare: string;
  rentalYield: string;
  occupancyRate: string;
  neighborhood: string;
  nearbyAttractions: string[];
  currentPrice: number;
  priceChange: number;
  priceChangePercent: number;
  isLimited: boolean;
}

export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'The White Villa',
    location: 'North Goa, Goa',
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
    managementFee: '2% of rental income',
    stayPerShare: '1 day per share',
    rentalYield: '6.8%',
    occupancyRate: '85%',
    neighborhood: 'Candolim Beach Area',
    nearbyAttractions: ['Candolim Beach', 'Fort Aguada', 'Saturday Night Market'],
    currentPrice: 100000,
    priceChange: 2500,
    priceChangePercent: 2.56,
    isLimited: true
  },
  {
    id: '2',
    name: 'Urban Nest',
    location: 'Whitefield, Bangalore',
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
    managementFee: '3% of rental income',
    stayPerShare: '2 days per share',
    rentalYield: '8.2%',
    occupancyRate: '92%',
    neighborhood: 'ITPL Tech Park Zone',
    nearbyAttractions: ['ITPL', 'Phoenix MarketCity', 'VR Bengaluru'],
    currentPrice: 100000,
    priceChange: -1200,
    priceChangePercent: -1.18,
    isLimited: false
  },
  {
    id: '3',
    name: 'Skyline Heights',
    location: 'Bandra West, Mumbai',
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
    managementFee: '2.5% of rental income',
    stayPerShare: '1.5 days per share',
    rentalYield: '5.5%',
    occupancyRate: '78%',
    neighborhood: 'Bandra Financial District',
    nearbyAttractions: ['Linking Road', 'Bandstand Promenade', 'Bandra-Worli Sea Link'],
    currentPrice: 100000,
    priceChange: 3800,
    priceChangePercent: 3.94,
    isLimited: true
  },
  {
    id: '4',
    name: 'Mountain View Resort',
    location: 'Manali, Himachal Pradesh',
    value: 35000000,
    roi: 15,
    minInvestment: 125000,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945'
    ],
    description: 'Scenic mountain resort perfect for adventure tourism and wellness retreats. High seasonal demand.',
    totalShares: 350,
    availableShares: 98,
    amenities: ['Spa', 'Adventure Sports', 'Restaurant', 'Bonfire Area', 'Trekking Guides'],
    highlights: ['Mountain Views', 'Adventure Tourism Hub', 'Seasonal High Demand'],
    propertyType: 'Resort',
    area: '15 acres',
    yearBuilt: 2018,
    expectedReturns: '12-18% annually',
    managementFee: '4% of rental income',
    stayPerShare: '3 days per share',
    rentalYield: '9.5%',
    occupancyRate: '65%',
    neighborhood: 'Old Manali',
    nearbyAttractions: ['Rohtang Pass', 'Solang Valley', 'Hadimba Temple'],
    currentPrice: 100000,
    priceChange: 5200,
    priceChangePercent: 5.48,
    isLimited: true
  },
  {
    id: '5',
    name: 'Heritage Haveli',
    location: 'Udaipur, Rajasthan',
    value: 28000000,
    roi: 11,
    minInvestment: 110000,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be'
    ],
    description: 'Restored heritage property offering authentic Rajasthani experience. Popular for destination weddings.',
    totalShares: 280,
    availableShares: 124,
    amenities: ['Heritage Architecture', 'Courtyard', 'Traditional Dining', 'Event Spaces', 'Cultural Shows'],
    highlights: ['Heritage Property', 'Wedding Destination', 'Cultural Tourism'],
    propertyType: 'Heritage Hotel',
    area: '25,000 sq ft',
    yearBuilt: 1850,
    expectedReturns: '9-14% annually',
    managementFee: '3.5% of rental income',
    stayPerShare: '2.5 days per share',
    rentalYield: '7.8%',
    occupancyRate: '72%',
    neighborhood: 'City Palace Area',
    nearbyAttractions: ['City Palace', 'Lake Pichola', 'Jagdish Temple'],
    currentPrice: 100000,
    priceChange: 1800,
    priceChangePercent: 1.83,
    isLimited: false
  },
  {
    id: '6',
    name: 'Coastal Paradise',
    location: 'Varkala, Kerala',
    value: 18000000,
    roi: 13,
    minInvestment: 95000,
    images: [
      'https://images.unsplash.com/photo-1520637836862-4d197d17c50a',
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f'
    ],
    description: 'Clifftop property overlooking the Arabian Sea. Perfect for yoga retreats and wellness tourism.',
    totalShares: 180,
    availableShares: 45,
    amenities: ['Yoga Studio', 'Ayurveda Center', 'Cliff Views', 'Organic Garden', 'Beach Access'],
    highlights: ['Cliff Location', 'Wellness Tourism', 'Ayurveda Center'],
    propertyType: 'Wellness Resort',
    area: '8 acres',
    yearBuilt: 2019,
    expectedReturns: '11-16% annually',
    managementFee: '3% of rental income',
    stayPerShare: '4 days per share',
    rentalYield: '8.9%',
    occupancyRate: '68%',
    neighborhood: 'North Cliff',
    nearbyAttractions: ['Varkala Beach', 'Janardanaswamy Temple', 'Sivagiri Mutt'],
    currentPrice: 100000,
    priceChange: 4100,
    priceChangePercent: 4.28,
    isLimited: true
  },
  {
    id: '7',
    name: 'Tech Hub Apartments',
    location: 'Cyber City, Gurgaon',
    value: 55000000,
    roi: 9,
    minInvestment: 175000,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf'
    ],
    description: 'Premium apartments in Gurgaon\'s business district. High demand from corporate professionals.',
    totalShares: 550,
    availableShares: 187,
    amenities: ['Business Center', 'Rooftop Pool', 'Gym', 'Metro Connectivity', 'Shopping Mall'],
    highlights: ['Business District', 'Metro Access', 'Corporate Hub'],
    propertyType: 'Apartment Complex',
    area: '1,500-2,500 sq ft units',
    yearBuilt: 2020,
    expectedReturns: '7-11% annually',
    managementFee: '2.8% of rental income',
    stayPerShare: '1.5 days per share',
    rentalYield: '6.2%',
    occupancyRate: '88%',
    neighborhood: 'DLF Cyber City',
    nearbyAttractions: ['Cyber Hub', 'Ambience Mall', 'Kingdom of Dreams'],
    currentPrice: 100000,
    priceChange: -800,
    priceChangePercent: -0.79,
    isLimited: false
  },
  {
    id: '8',
    name: 'Lake View Cottages',
    location: 'Kumarakom, Kerala',
    value: 22000000,
    roi: 14,
    minInvestment: 105000,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945'
    ],
    description: 'Traditional Kerala cottages on Vembanad Lake. Popular for backwater tourism and houseboat experiences.',
    totalShares: 220,
    availableShares: 78,
    amenities: ['Lake Access', 'Traditional Architecture', 'Boat Rides', 'Fishing', 'Bird Watching'],
    highlights: ['Backwater Location', 'Eco Tourism', 'Traditional Kerala Style'],
    propertyType: 'Cottage Resort',
    area: '12 acres',
    yearBuilt: 2017,
    expectedReturns: '12-17% annually',
    managementFee: '3.2% of rental income',
    stayPerShare: '5 days per share',
    rentalYield: '9.8%',
    occupancyRate: '75%',
    neighborhood: 'Vembanad Lake Shore',
    nearbyAttractions: ['Kumarakom Bird Sanctuary', 'Vembanad Lake', 'Pathiramanal Island'],
    currentPrice: 100000,
    priceChange: 6200,
    priceChangePercent: 6.61,
    isLimited: true
  }
];
