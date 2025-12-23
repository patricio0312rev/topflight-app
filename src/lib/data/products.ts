


export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    isBestSeller: boolean;
    stock: number;
    rating: number;
    reviews: number;
  }
  
  export const products: Product[] = [
    {
      id: "1",
      name: "Whey Protein Isolate",
      description: "Premium whey protein isolate with 25g protein per serving. Perfect for muscle recovery and growth.",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&h=500&fit=crop",
      category: "Protein",
      isBestSeller: true,
      stock: 150,
      rating: 4.8,
      reviews: 234
    },
    {
      id: "2",
      name: "Creatine Monohydrate",
      description: "Pure creatine monohydrate for enhanced strength and performance. 5g per serving.",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=500&h=500&fit=crop",
      category: "Performance",
      isBestSeller: true,
      stock: 200,
      rating: 4.9,
      reviews: 456
    },
    {
      id: "3",
      name: "Omega-3 Fish Oil",
      description: "High-quality omega-3 fatty acids for heart and brain health. 1000mg per softgel.",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500&h=500&fit=crop",
      category: "Health",
      isBestSeller: true,
      stock: 300,
      rating: 4.7,
      reviews: 189
    },
    {
      id: "4",
      name: "Pre-Workout Energy",
      description: "Explosive energy and focus for your workouts. Contains caffeine and beta-alanine.",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop",
      category: "Performance",
      isBestSeller: true,
      stock: 120,
      rating: 4.6,
      reviews: 312
    },
    {
      id: "5",
      name: "BCAA Recovery",
      description: "Branch chain amino acids for muscle recovery and reduced soreness. 2:1:1 ratio.",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop",
      category: "Recovery",
      isBestSeller: true,
      stock: 180,
      rating: 4.5,
      reviews: 267
    },
    {
      id: "6",
      name: "Multivitamin Complex",
      description: "Complete daily multivitamin with essential vitamins and minerals.",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop",
      category: "Health",
      isBestSeller: true,
      stock: 250,
      rating: 4.4,
      reviews: 145
    },
    {
      id: "7",
      name: "Casein Protein",
      description: "Slow-digesting protein perfect for overnight muscle recovery. Rich and creamy.",
      price: 44.99,
      image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=500&h=500&fit=crop",
      category: "Protein",
      isBestSeller: false,
      stock: 100,
      rating: 4.6,
      reviews: 178
    },
    {
      id: "8",
      name: "Glutamine Powder",
      description: "Support muscle recovery and immune system health with pure L-Glutamine.",
      price: 27.99,
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=500&h=500&fit=crop",
      category: "Recovery",
      isBestSeller: false,
      stock: 140,
      rating: 4.3,
      reviews: 92
    },
    {
      id: "9",
      name: "Vitamin D3 + K2",
      description: "Optimal bone health and immune support with synergistic vitamin combination.",
      price: 22.99,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop",
      category: "Health",
      isBestSeller: false,
      stock: 220,
      rating: 4.7,
      reviews: 203
    },
    {
      id: "10",
      name: "Beta-Alanine",
      description: "Increase muscular endurance and reduce fatigue during high-intensity training.",
      price: 25.99,
      image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=500&h=500&fit=crop",
      category: "Performance",
      isBestSeller: false,
      stock: 160,
      rating: 4.4,
      reviews: 134
    },
    {
      id: "11",
      name: "ZMA Complex",
      description: "Zinc, magnesium, and vitamin B6 for better sleep and recovery.",
      price: 21.99,
      image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=500&h=500&fit=crop",
      category: "Recovery",
      isBestSeller: false,
      stock: 190,
      rating: 4.5,
      reviews: 167
    },
    {
      id: "12",
      name: "Collagen Peptides",
      description: "Support joint health, skin elasticity, and hair strength with hydrolyzed collagen.",
      price: 32.99,
      image: "https://images.unsplash.com/photo-1556229174-5e42a09e8d79?w=500&h=500&fit=crop",
      category: "Health",
      isBestSeller: false,
      stock: 175,
      rating: 4.6,
      reviews: 221
    },
    {
      id: "13",
      name: "Plant Protein Blend",
      description: "Vegan protein from pea, rice, and hemp. Complete amino acid profile.",
      price: 42.99,
      image: "https://images.unsplash.com/photo-1622484211443-9ea78c86fc9f?w=500&h=500&fit=crop",
      category: "Protein",
      isBestSeller: false,
      stock: 130,
      rating: 4.4,
      reviews: 156
    },
    {
      id: "14",
      name: "L-Carnitine",
      description: "Support fat metabolism and energy production during workouts.",
      price: 28.99,
      image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&h=500&fit=crop",
      category: "Performance",
      isBestSeller: false,
      stock: 145,
      rating: 4.2,
      reviews: 98
    },
    {
      id: "15",
      name: "Probiotics",
      description: "10 billion CFU for digestive health and immune system support.",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop",
      category: "Health",
      isBestSeller: false,
      stock: 200,
      rating: 4.8,
      reviews: 289
    }
  ];
  
  export const getBestSellers = () => products.filter(p => p.isBestSeller);
  
  export const getCategories = (): string[] => {
    const categories = new Set(products.map(p => p.category));
    return Array.from(categories).sort();
  };
  
  export const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };
