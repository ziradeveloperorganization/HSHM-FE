// Mock data for the Hyperlocal Second-Hand Marketplace App

export const mockUsers = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    password: "password123", // For demo purposes
    fullName: "John Doe",
    role: "user",
    avatar: "https://i.pravatar.cc/150?img=1",
    phone: "+1234567890",
    location: {
      address: "123 Main St, Downtown",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      city: "New York",
      state: "NY"
    },
    joinedDate: "2024-01-15",
    rating: 4.8,
    totalListings: 12,
    completedDeals: 8
  },
  {
    id: 2,
    username: "sarah_wilson",
    email: "sarah@example.com",
    password: "password123",
    fullName: "Sarah Wilson",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=2",
    phone: "+1234567891",
    location: {
      address: "456 Oak Ave, Midtown",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      city: "New York",
      state: "NY"
    },
    joinedDate: "2024-02-20",
    rating: 4.9,
    totalListings: 8,
    completedDeals: 6
  },
  {
    id: 3,
    username: "admin_mike",
    email: "admin@example.com",
    password: "admin123",
    fullName: "Mike Admin",
    role: "superadmin",
    avatar: "https://i.pravatar.cc/150?img=3",
    phone: "+1234567892",
    location: {
      address: "789 Admin St, Uptown",
      coordinates: { lat: 40.7831, lng: -73.9712 },
      city: "New York",
      state: "NY"
    },
    joinedDate: "2024-01-01",
    rating: 5.0,
    totalListings: 0,
    completedDeals: 0
  }
];

export const mockCategories = [
  { id: 1, name: "Electronics", icon: "📱", color: "#3498db" },
  { id: 2, name: "Furniture", icon: "🪑", color: "#e74c3c" },
  { id: 3, name: "Sports", icon: "⚽", color: "#2ecc71" },
  { id: 4, name: "Appliances", icon: "🏠", color: "#f39c12" },
  { id: 5, name: "Baby Products", icon: "👶", color: "#9b59b6" },
  { id: 6, name: "Musical Instruments", icon: "🎸", color: "#1abc9c" },
  { id: 7, name: "Clothing", icon: "👕", color: "#34495e" },
  { id: 8, name: "Books", icon: "📚", color: "#e67e22" },
  { id: 9, name: "Accessories", icon: "👜", color: "#95a5a6" },
  { id: 10, name: "Other", icon: "📦", color: "#7f8c8d" }
];

export const mockListings = [
  {
    id: 1,
    title: "Wooden Coffee Table",
    description: "Solid wood coffee table in excellent condition. Perfect for living room. Dimensions: 120cm x 60cm x 45cm. No scratches or damage.",
    price: 45,
    currency: "$",
    category: "Furniture",
    categoryId: 2,
    condition: "Like New",
    images: [
      "https://images.unsplash.com/photo-1582582494700-c5e7b7c3535a?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
    ],
    seller: mockUsers[0],
    location: {
      address: "Downtown Area",
      distance: "2.3 km away",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    postedDate: "2024-12-20T10:30:00Z",
    views: 45,
    likes: 8,
    isActive: true,
    isFeatured: false,
    tags: ["wooden", "furniture", "living room", "coffee table"]
  },
  {
    id: 2,
    title: "Samsung 32\" LED TV",
    description: "Samsung 32-inch LED TV in good working condition. Includes remote control and power cable. Great for bedroom or small living room.",
    price: 120,
    currency: "$",
    category: "Electronics",
    categoryId: 1,
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1593784991095-8b46e3d38767?w=800",
      "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=800"
    ],
    seller: mockUsers[1],
    location: {
      address: "Midtown Area",
      distance: "1.5 km away",
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    postedDate: "2024-12-19T14:20:00Z",
    views: 67,
    likes: 12,
    isActive: true,
    isFeatured: true,
    tags: ["samsung", "tv", "electronics", "32 inch"]
  },
  {
    id: 3,
    title: "Mountain Bike - Trek",
    description: "Trek mountain bike in great condition. 21-speed gear system, front suspension. Perfect for trails and city riding. Recently serviced.",
    price: 90,
    currency: "$",
    category: "Sports",
    categoryId: 3,
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1618160708751-d5e8038eac62?w=800",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800"
    ],
    seller: mockUsers[0],
    location: {
      address: "Park Area",
      distance: "3.1 km away",
      coordinates: { lat: 40.7831, lng: -73.9712 }
    },
    postedDate: "2024-12-18T09:15:00Z",
    views: 89,
    likes: 15,
    isActive: true,
    isFeatured: false,
    tags: ["trek", "mountain bike", "sports", "cycling"]
  }
];

export const mockMessages = [
  {
    id: 1,
    conversationId: 1,
    senderId: 2,
    receiverId: 1,
    listingId: 1,
    message: "Hi! Is the coffee table still available?",
    timestamp: "2024-12-20T15:30:00Z",
    isRead: true,
    messageType: "text"
  },
  {
    id: 2,
    conversationId: 1,
    senderId: 1,
    receiverId: 2,
    listingId: 1,
    message: "Yes, it's still available! Would you like to see it?",
    timestamp: "2024-12-20T15:35:00Z",
    isRead: true,
    messageType: "text"
  },
  {
    id: 3,
    conversationId: 1,
    senderId: 2,
    receiverId: 1,
    listingId: 1,
    message: "Great! When would be a good time to meet?",
    timestamp: "2024-12-20T15:40:00Z",
    isRead: false,
    messageType: "text"
  }
];

export const mockConversations = [
  {
    id: 1,
    participants: [mockUsers[0], mockUsers[1]],
    listing: mockListings[0],
    lastMessage: mockMessages[2],
    unreadCount: 1,
    updatedAt: "2024-12-20T15:40:00Z"
  }
];

export const mockFavorites = [
  {
    id: 1,
    userId: 1,
    listingId: 2,
    listing: mockListings[1],
    addedDate: "2024-12-19T16:00:00Z"
  },
  {
    id: 2,
    userId: 1,
    listingId: 3,
    listing: mockListings[2],
    addedDate: "2024-12-18T12:00:00Z"
  }
];

export const mockNotifications = [
  {
    id: 1,
    userId: 1,
    type: "message",
    title: "New Message",
    message: "Sarah Wilson sent you a message about Wooden Coffee Table",
    isRead: false,
    timestamp: "2024-12-20T15:40:00Z",
    data: { conversationId: 1, listingId: 1 }
  },
  {
    id: 2,
    userId: 1,
    type: "like",
    title: "Someone liked your item",
    message: "Your Mountain Bike listing received a new like",
    isRead: true,
    timestamp: "2024-12-20T10:20:00Z",
    data: { listingId: 3 }
  }
];