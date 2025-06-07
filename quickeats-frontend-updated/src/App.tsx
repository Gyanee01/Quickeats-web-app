import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, MapPin, Clock, Star, Plus, Minus } from 'lucide-react';

// Main App Component - Entry point for the application
const FoodDeliveryApp = () => {
  // Global state management - easily replaceable with Redux/Context later
  const [user, setUser] = useState(null); // User authentication state
  const [cart, setCart] = useState([]); // Shopping cart items
  const [restaurants, setRestaurants] = useState([]); // Restaurant data
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // Navigation state
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - will be replaced with API calls from backend
  useEffect(() => {
    // Simulate API call - replace with actual backend integration
    const mockRestaurants = [
      {
        id: 1,
        name: "Pappu Italian",
        cuisine: "Italian",
        rating: 4.5,
        deliveryTime: "25-35 min",
        deliveryFee: 20.99,
        image: "🍝",
        menu: [
          { id: 1, name: "Margherita Pizza", price: 100.99, description: "Fresh tomato sauce, mozzarella, basil" },
          { id: 2, name: "Pasta Carbonara", price: 140.99, description: "Creamy sauce, pancetta, parmesan" },
          { id: 3, name: "Caesar Salad", price: 90.99, description: "Romaine lettuce, croutons, parmesan" }
        ]
      },
      {
        id: 2,
        name: "Sahu Hotel",
        cuisine: "Indian",
        rating: 4.8,
        deliveryTime: "30-40 min",
        deliveryFee: 30.99,
        image: "🥔",
        menu: [
          { id: 4, name: "Samosa", price: 80.99, description: "Spiced potato and pea-filled fried pastry like." },
          { id: 5, name: "Dosa", price: 150.99, description: "Thin, savory fermented rice and lentil with potato filling." },
          { id: 6, name: "Pani puri", price: 40.99, description: "Crispy hollow puris filled with spiced potato/chickpeas and tangy, spicy water." }
        ]
      },
      {
        id: 3,
        name: "Burger king",
        cuisine: "Americano",
        rating: 4.3,
        deliveryTime: "20-30 min",
        deliveryFee: 10.99,
        image: "🍔",
        menu: [
          { id: 7, name: "Classic Burger", price: 110.99, description: "Beef patty, lettuce, tomato, cheese" },
          { id: 8, name: "Chicken Wings", price: 90.99, description: "Crispy wings with buffalo sauce" },
          { id: 9, name: "Sweet Potato Fries", price: 50.99, description: "Crispy sweet potato fries" }
        ]
      }
    ];
    setRestaurants(mockRestaurants);
  }, []);

  // Cart management functions - ready for backend integration
  const addToCart = (item, restaurantId) => {
    const cartItem = {
      ...item,
      restaurantId,
      quantity: 1,
      cartId: Date.now() // Temporary ID, replace with proper UUID
    };
    
    const existingItem = cart.find(i => i.id === item.id && i.restaurantId === restaurantId);
    if (existingItem) {
      setCart(cart.map(i => 
        i.id === item.id && i.restaurantId === restaurantId 
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ));
    } else {
      setCart([...cart, cartItem]);
    }
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(cartId);
    } else {
      setCart(cart.map(item => 
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  // Calculate cart totals
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Authentication component - placeholder for backend integration
  const AuthModal = ({ isLogin, onClose, onSwitch }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-96 max-w-sm mx-4 relative">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        {/* Form inputs - ready for backend API integration */}
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          // TODO: Integrate with backend authentication API
          setUser({ name: 'John Doe', email: 'john@example.com' });
          onClose();
        }}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button
            onClick={onSwitch}
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );

  // Header component with navigation and cart
  const Header = () => {
    const [showAuth, setShowAuth] = useState(false);
    const [authMode, setAuthMode] = useState('login');

    return (
      <>
        <header className="bg-white shadow-lg sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => setCurrentView('home')}
              >
                <div className="text-3xl">🍕</div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  QuickEats
                </span>
              </div>

              {/* Search bar */}
              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search restaurants or food..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* User actions */}
              <div className="flex items-center space-x-4">
                {/* Cart button */}
                <button
                  onClick={() => setCurrentView('cart')}
                  className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </button>

                {/* Track Order button */}
                <button 
                  onClick={() => setCurrentView("track")} 
                  className="p-2 text-gray-700 hover:text-orange-500 transition-colors"
                >
                  📦 Track Order
                </button>

                {/* User button */}
                {user ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700">Hi, {user.name.split(' ')[0]}!</span>
                    <button
                      onClick={() => setUser(null)}
                      className="text-orange-500 hover:text-orange-600 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAuth(true)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Authentication Modal */}
        {showAuth && (
          <AuthModal
            isLogin={authMode === 'login'}
            onClose={() => setShowAuth(false)}
            onSwitch={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
          />
        )}
      </>
    );
  };

  // Restaurant card component
  const RestaurantCard = ({ restaurant }) => (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => {
        setSelectedRestaurant(restaurant);
        setCurrentView('restaurant');
      }}
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
          <span className="text-6xl">{restaurant.image}</span>
        </div>
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{restaurant.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{restaurant.name}</h3>
        <p className="text-gray-600 mb-4">{restaurant.cuisine}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>${restaurant.deliveryFee} delivery</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Menu item component
  const MenuItem = ({ item, restaurantId }) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h4 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h4>
          <p className="text-gray-600 text-sm mb-3">{item.description}</p>
          <span className="text-xl font-bold text-orange-500">${item.price}</span>
        </div>
      </div>
      
      <button
        onClick={() => addToCart(item, restaurantId)}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Add to Cart</span>
      </button>
    </div>
  );

  // Cart component
  const CartView = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Add some delicious food to get started!</p>
          <button
            onClick={() => setCurrentView('home')}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
          >
            Browse Restaurants
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.cartId} className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-gray-600 text-sm">${item.price} each</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-semibold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="ml-6 text-right">
                  <p className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order summary */}
          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>$2.99</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(cartTotal + 2.99 + cartTotal * 0.08).toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Restaurant detail view
  const RestaurantView = () => (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => setCurrentView('home')}
        className="mb-6 text-orange-500 hover:text-orange-600 font-medium"
      >
        ← Back to Restaurants
      </button>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="h-64 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
          <span className="text-8xl">{selectedRestaurant.image}</span>
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedRestaurant.name}</h1>
              <p className="text-gray-600 mb-4">{selectedRestaurant.cuisine}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{selectedRestaurant.rating}</span>
              </div>
              <p className="text-gray-600 text-sm">{selectedRestaurant.deliveryTime}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedRestaurant.menu.map((item) => (
            <MenuItem key={item.id} item={item} restaurantId={selectedRestaurant.id} />
          ))}
        </div>
      </div>
    </div>
  );

  // Main home view with restaurant listings
  const HomeView = () => {
    const filteredRestaurants = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div>
        {/* Hero section */}
        <section className="bg-gradient-to-br from-orange-50 to-red-50 py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Delicious food, delivered
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Order from your favorite restaurants and get fresh food delivered to your door
            </p>
            <div className="flex items-center justify-center space-x-4 text-gray-500">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Fast delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Top rated</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Track your order</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Restaurant listings */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              {searchQuery ? `Search results for "${searchQuery}"` : 'Popular Restaurants'}
            </h2>
            
            {filteredRestaurants.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No restaurants found</h3>
                <p className="text-gray-500">Try searching with different keywords</p>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  };

  // Track Order View Component
  const TrackOrderView = () => (
    <div className='max-w-4xl mx-auto py-20 px-6 text-center text-gray-700'>
      <h2 className='text-3xl font-bold mb-4'>Track Your Order</h2>
      <p>We are preparing your delicious food! You can track your order status here.</p>
      <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
          <div className="flex-1 h-2 bg-green-500 rounded"></div>
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
          <div className="flex-1 h-2 bg-gray-200 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">3</div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Order Placed</span>
          <span>Preparing</span>
          <span>On the way</span>
        </div>
        <p className="mt-4 text-orange-600 font-semibold">Your order is being prepared! Estimated delivery: 25-30 minutes</p>
      </div>
    </div>
  );

  // Main render function with conditional views
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Dynamic content based on current view */}
      {currentView === 'home' && <HomeView />}
      {currentView === 'restaurant' && selectedRestaurant && <RestaurantView />}
      {currentView === 'cart' && <CartView />}
      {currentView === 'track' && <TrackOrderView />}
    </div>
  );
};

export default FoodDeliveryApp;