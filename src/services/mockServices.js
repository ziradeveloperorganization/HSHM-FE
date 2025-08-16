// Mock services to simulate API calls with local data

import { 
  mockUsers, 
  mockListings, 
  mockCategories, 
  mockMessages, 
  mockConversations, 
  mockFavorites,
  mockNotifications 
} from '../data/mockData';

// Utility function to simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Listing Service
export const listingService = {
  // Get all listings with optional filters
  async getListings(filters = {}) {
    await delay();
    let filteredListings = [...mockListings];
    
    if (filters.category) {
      filteredListings = filteredListings.filter(listing => 
        listing.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredListings = filteredListings.filter(listing =>
        listing.title.toLowerCase().includes(searchTerm) ||
        listing.description.toLowerCase().includes(searchTerm) ||
        listing.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters.maxPrice) {
      filteredListings = filteredListings.filter(listing => 
        listing.price <= filters.maxPrice
      );
    }
    
    if (filters.condition) {
      filteredListings = filteredListings.filter(listing => 
        listing.condition === filters.condition
      );
    }
    
    return {
      success: true,
      data: filteredListings,
      total: filteredListings.length
    };
  },

  // Get single listing by ID
  async getListingById(id) {
    await delay();
    const listing = mockListings.find(l => l.id === parseInt(id));
    
    if (!listing) {
      return {
        success: false,
        error: 'Listing not found'
      };
    }
    
    return {
      success: true,
      data: listing
    };
  },

  // Get featured listings
  async getFeaturedListings() {
    await delay();
    const featured = mockListings.filter(listing => listing.isFeatured);
    
    return {
      success: true,
      data: featured
    };
  },

  // Create new listing
  async createListing(listingData) {
    await delay();
    const newListing = {
      id: Math.max(...mockListings.map(l => l.id)) + 1,
      ...listingData,
      postedDate: new Date().toISOString(),
      views: 0,
      likes: 0,
      isActive: true,
      isFeatured: false
    };
    
    mockListings.push(newListing);
    
    return {
      success: true,
      data: newListing
    };
  },

  // Update listing
  async updateListing(id, updateData) {
    await delay();
    const index = mockListings.findIndex(l => l.id === parseInt(id));
    
    if (index === -1) {
      return {
        success: false,
        error: 'Listing not found'
      };
    }
    
    mockListings[index] = { ...mockListings[index], ...updateData };
    
    return {
      success: true,
      data: mockListings[index]
    };
  },

  // Delete listing
  async deleteListing(id) {
    await delay();
    const index = mockListings.findIndex(l => l.id === parseInt(id));
    
    if (index === -1) {
      return {
        success: false,
        error: 'Listing not found'
      };
    }
    
    mockListings.splice(index, 1);
    
    return {
      success: true,
      message: 'Listing deleted successfully'
    };
  }
};

// User Service
export const userService = {
  // Get user profile
  async getUserProfile(userId) {
    await delay();
    const user = mockUsers.find(u => u.id === parseInt(userId));
    
    if (!user) {
      return {
        success: false,
        error: 'User not found'
      };
    }
    
    return {
      success: true,
      data: user
    };
  },

  // Update user profile
  async updateUserProfile(userId, updateData) {
    await delay();
    const index = mockUsers.findIndex(u => u.id === parseInt(userId));
    
    if (index === -1) {
      return {
        success: false,
        error: 'User not found'
      };
    }
    
    mockUsers[index] = { ...mockUsers[index], ...updateData };
    
    return {
      success: true,
      data: mockUsers[index]
    };
  },

  // Get user's listings
  async getUserListings(userId) {
    await delay();
    const userListings = mockListings.filter(listing => 
      listing.seller.id === parseInt(userId)
    );
    
    return {
      success: true,
      data: userListings
    };
  }
};

// Category Service
export const categoryService = {
  // Get all categories
  async getCategories() {
    await delay();
    return {
      success: true,
      data: mockCategories
    };
  }
};

// Message Service
export const messageService = {
  // Get conversations for user
  async getConversations(userId) {
    await delay();
    const userConversations = mockConversations.filter(conv =>
      conv.participants.some(p => p.id === parseInt(userId))
    );
    
    return {
      success: true,
      data: userConversations
    };
  },

  // Get messages for conversation
  async getMessages(conversationId) {
    await delay();
    const messages = mockMessages.filter(msg => 
      msg.conversationId === parseInt(conversationId)
    );
    
    return {
      success: true,
      data: messages
    };
  },

  // Send message
  async sendMessage(messageData) {
    await delay();
    const newMessage = {
      id: Math.max(...mockMessages.map(m => m.id)) + 1,
      ...messageData,
      timestamp: new Date().toISOString(),
      isRead: false,
      messageType: 'text'
    };
    
    mockMessages.push(newMessage);
    
    return {
      success: true,
      data: newMessage
    };
  }
};

// Favorites Service
export const favoritesService = {
  // Get user favorites
  async getFavorites(userId) {
    await delay();
    const userFavorites = mockFavorites.filter(fav => 
      fav.userId === parseInt(userId)
    );
    
    return {
      success: true,
      data: userFavorites
    };
  },

  // Add to favorites
  async addToFavorites(userId, listingId) {
    await delay();
    const newFavorite = {
      id: Math.max(...mockFavorites.map(f => f.id)) + 1,
      userId: parseInt(userId),
      listingId: parseInt(listingId),
      listing: mockListings.find(l => l.id === parseInt(listingId)),
      addedDate: new Date().toISOString()
    };
    
    mockFavorites.push(newFavorite);
    
    return {
      success: true,
      data: newFavorite
    };
  },

  // Remove from favorites
  async removeFromFavorites(userId, listingId) {
    await delay();
    const index = mockFavorites.findIndex(fav => 
      fav.userId === parseInt(userId) && fav.listingId === parseInt(listingId)
    );
    
    if (index === -1) {
      return {
        success: false,
        error: 'Favorite not found'
      };
    }
    
    mockFavorites.splice(index, 1);
    
    return {
      success: true,
      message: 'Removed from favorites'
    };
  }
};

// Notification Service
export const notificationService = {
  // Get user notifications
  async getNotifications(userId) {
    await delay();
    const userNotifications = mockNotifications.filter(notif => 
      notif.userId === parseInt(userId)
    );
    
    return {
      success: true,
      data: userNotifications
    };
  },

  // Mark notification as read
  async markAsRead(notificationId) {
    await delay();
    const index = mockNotifications.findIndex(n => n.id === parseInt(notificationId));
    
    if (index !== -1) {
      mockNotifications[index].isRead = true;
    }
    
    return {
      success: true,
      message: 'Notification marked as read'
    };
  }
};

// Auth Service (Mock)
export const authService = {
  // Mock login
  async login(credentials) {
    await delay();
    // Simple mock validation
    if (credentials.email && credentials.password) {
      return {
        success: true,
        data: {
          user: mockUsers[0],
          token: 'mock-jwt-token'
        }
      };
    }
    
    return {
      success: false,
      error: 'Invalid credentials'
    };
  },

  // Mock register
  async register(userData) {
    await delay();
    const newUser = {
      id: Math.max(...mockUsers.map(u => u.id)) + 1,
      ...userData,
      joinedDate: new Date().toISOString(),
      rating: 0,
      totalListings: 0,
      completedDeals: 0
    };
    
    mockUsers.push(newUser);
    
    return {
      success: true,
      data: {
        user: newUser,
        token: 'mock-jwt-token'
      }
    };
  }
};