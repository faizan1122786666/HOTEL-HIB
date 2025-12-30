// "use client"

// import { useState, useEffect, useMemo } from "react"
// import { Link } from "react-router-dom"
// import Header from "../../components/layout/Header"
// import Footer from "../../components/layout/Footer"
// import Card from "../../components/common/Card"
// import Button from "../../components/common/Button"
// import ChromaGrid from "../../components/room/ChromaGrid"
// import * as roomService from "../../services/roomService"

// const RoomsPage = () => {
//   const [rooms, setRooms] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filters, setFilters] = useState({
//     type: "",
//     maxPrice: 600,
//     minOccupancy: 1,
//   })

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         setLoading(true)
//         const data = await roomService.getAllRooms(filters)
//         setRooms(data)
//       } catch (error) {
//         console.error("Failed to fetch rooms:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchRooms()
//   }, [filters])

//   const roomTypes = ["standard", "suite", "family", "penthouse"]

//   // Helper functions for colors (must be before useMemo)
//   const getBorderColor = (type) => {
//     const colors = {
//       standard: '#3B82F6',      // Blue
//       suite: '#8B5CF6',         // Purple
//       family: '#06B6D4',        // Cyan
//       penthouse: '#6366F1'      // Indigo
//     };
//     return colors[type] || '#3B82F6';
//   };

//   const getGradient = (type) => {
//     const gradients = {
//       standard: 'linear-gradient(135deg, #1E3A8A 0%, #000000 100%)',     // Dark Blue to Black
//       suite: 'linear-gradient(135deg, #6B21A8 0%, #000000 100%)',        // Purple to Black
//       family: 'linear-gradient(135deg, #0E7490 0%, #000000 100%)',       // Cyan to Black
//       penthouse: 'linear-gradient(135deg, #4338CA 0%, #000000 100%)'     // Indigo to Black
//     };
//     return gradients[type] || 'linear-gradient(135deg, #1E3A8A 0%, #000000 100%)';
//   };

//   // Transform rooms data for ChromaGrid
//   const chromaItems = useMemo(() => {
//     return rooms.map((room) => ({
//       image: room.images?.[0] || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
//       title: room.name,
//       subtitle: `$${room.discountPrice || room.price}/night`,
//       handle: `${room.maxOccupancy} guests • ${room.size} sqft`,
//       location: room.type?.charAt(0).toUpperCase() + room.type?.slice(1),
//       borderColor: getBorderColor(room.type),
//       gradient: getGradient(room.type),
//       url: `/rooms/${room._id || room.id}`
//     }));
//   }, [rooms]);


//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Header />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         {/* Hero Section */}
//         <div className="mb-16 text-center opacity-0 animate-fade-in-up">
//           <h1 className="text-5xl font-bold text-slate-900 mb-4">Discover Our Rooms</h1>
//           <p className="text-xl text-slate-600">Find the perfect accommodation for your stay</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Filters Sidebar */}
//           <div className="lg:col-span-1">
//             <Card className="p-6 sticky top-24 rounded-2xl border border-slate-200 backdrop-blur-sm bg-white/95 opacity-0 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
//               <h2 className="text-lg font-semibold mb-6 text-slate-900">Filter Rooms</h2>

//               <div className="space-y-6">
//                 {/* Room Type */}
//                 <div>
//                   <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Room Type</label>
//                   <select
//                     value={filters.type}
//                     onChange={(e) => setFilters({ ...filters, type: e.target.value })}
//                     className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-slate-900 text-sm"
//                   >
//                     <option value="">All Types</option>
//                     {roomTypes.map((type) => (
//                       <option key={type} value={type}>
//                         {type.charAt(0).toUpperCase() + type.slice(1)}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Price Range */}
//                 <div>
//                   <div className="flex justify-between items-center mb-3">
//                     <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Max Price</label>
//                     <span className="text-lg font-bold text-blue-600">${filters.maxPrice}</span>
//                   </div>
//                   <input
//                     type="range"
//                     min="50"
//                     max="600"
//                     value={filters.maxPrice}
//                     onChange={(e) =>
//                       setFilters({
//                         ...filters,
//                         maxPrice: parseInt(e.target.value),
//                       })
//                     }
//                     className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
//                   />
//                   <div className="flex justify-between text-xs text-slate-500 mt-2">
//                     <span>$50</span>
//                     <span>$600</span>
//                   </div>
//                 </div>

//                 {/* Occupancy */}
//                 <div>
//                   <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Min Occupancy</label>
//                   <select
//                     value={filters.minOccupancy}
//                     onChange={(e) =>
//                       setFilters({
//                         ...filters,
//                         minOccupancy: parseInt(e.target.value),
//                       })
//                     }
//                     className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-slate-900 text-sm"
//                   >
//                     {[1, 2, 3, 4, 5, 6].map((num) => (
//                       <option key={num} value={num}>
//                         {num} {num === 1 ? "Guest" : "Guests"}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <Button
//                   variant="outline"
//                   className="w-full"
//                   onClick={() =>
//                     setFilters({
//                       type: "",
//                       maxPrice: 600,
//                       minOccupancy: 1,
//                     })
//                   }
//                 >
//                   Reset Filters
//                 </Button>
//               </div>
//             </Card>
//           </div>

//           {/* Rooms Grid with ChromaGrid */}
//           <div className="lg:col-span-3">
//             {loading ? (
//               <div className="flex items-center justify-center py-20">
//                 <div className="text-center">
//                   <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
//                   <p className="text-slate-600">Loading rooms...</p>
//                 </div>
//               </div>
//             ) : rooms.length === 0 ? (
//               <Card className="p-12 text-center rounded-2xl border border-slate-200">
//                 <div className="text-5xl mb-4">🏨</div>
//                 <p className="text-slate-600 text-lg font-medium">No rooms found matching your filters</p>
//                 <Button
//                   variant="outline"
//                   className="mt-6"
//                   onClick={() =>
//                     setFilters({
//                       type: "",
//                       maxPrice: 600,
//                       minOccupancy: 1,
//                     })
//                   }
//                 >
//                   Clear Filters
//                 </Button>
//               </Card>
//             ) : (
//               <div style={{ minHeight: '800px', position: 'relative' }}>
//                 <ChromaGrid
//                   items={chromaItems}
//                   radius={300}
//                   damping={0.45}
//                   fadeOut={0.6}
//                   ease="power3.out"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <Footer />

//       <style>{`
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 0.5s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default RoomsPage













"use client"

import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import Header from "../../components/layout/Header"
import Footer from "../../components/layout/Footer"
import Card from "../../components/common/Card"
import Button from "../../components/common/Button"
import ChromaGrid from "../../components/room/ChromaGrid"
import * as roomService from "../../services/roomService"

const RoomsPage = () => {
  const [rooms, setRooms] = useState([])
  const [cities, setCities] = useState([])
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchMode, setSearchMode] = useState("all") // "all", "hotels", "rooms"
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedHotel, setSelectedHotel] = useState("")
  const [filters, setFilters] = useState({
    type: "",
    maxPrice: 20000,
    minOccupancy: 1,
  })

  useEffect(() => {
    fetchInitialData()
  }, [])

  useEffect(() => {
    if (searchMode === "all") {
      fetchAllRooms()
    }
  }, [filters, searchMode])

  const fetchInitialData = async () => {
    try {
      setLoading(true)
      const [citiesData] = await Promise.all([
        roomService.getAllCities(),
      ])
      setCities(citiesData || [])
    } catch (error) {
      console.error("Failed to fetch initial data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAllRooms = async () => {
    try {
      setLoading(true)
      const data = await roomService.getAllRooms(filters)
      setRooms(data)
    } catch (error) {
      console.error("Failed to fetch rooms:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCitySelect = async (city) => {
    setSelectedCity(city)
    setSelectedHotel("")
    setSearchMode("hotels")
    
    try {
      setLoading(true)
      const hotelsData = await roomService.getHotelsByCity(city)
      setHotels(hotelsData)
    } catch (error) {
      console.error("Failed to fetch hotels:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleHotelSelect = async (hotelName) => {
    setSelectedHotel(hotelName)
    setSearchMode("rooms")
    
    try {
      setLoading(true)
      const roomsData = await roomService.getRoomsByHotel(hotelName)
      setRooms(roomsData)
    } catch (error) {
      console.error("Failed to fetch rooms:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleResetSearch = () => {
    setSearchMode("all")
    setSelectedCity("")
    setSelectedHotel("")
    setHotels([])
    fetchAllRooms()
  }

  const roomTypes = ["standard", "suite", "family", "penthouse"]

  // Helper functions for colors
  const getBorderColor = (type) => {
    const colors = {
      standard: '#3B82F6',
      suite: '#8B5CF6',
      family: '#06B6D4',
      penthouse: '#6366F1'
    };
    return colors[type] || '#3B82F6';
  };

  const getGradient = (type) => {
    const gradients = {
      standard: 'linear-gradient(135deg, #1E3A8A 0%, #000000 100%)',
      suite: 'linear-gradient(135deg, #6B21A8 0%, #000000 100%)',
      family: 'linear-gradient(135deg, #0E7490 0%, #000000 100%)',
      penthouse: 'linear-gradient(135deg, #4338CA 0%, #000000 100%)'
    };
    return gradients[type] || 'linear-gradient(135deg, #1E3A8A 0%, #000000 100%)';
  };

  // Transform rooms data for ChromaGrid
  const chromaItems = useMemo(() => {
    return rooms.map((room) => ({
      image: room.images?.[0] || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      title: room.name,
      // subtitle: `$${room.discountPrice || room.price}/night`,
      subtitle: `Rs ${room.discountPrice || room.price}/night`,
      handle: `${room.hotelName} • Floor ${room.floor}`,
      location: `${room.city} • ${room.maxOccupancy} guests`,
      borderColor: getBorderColor(room.type),
      gradient: getGradient(room.type),
      url: `/rooms/${room._id || room.id}`
    }));
  }, [rooms]);

  // Transform hotels for display
  const hotelCards = useMemo(() => {
    return hotels.map((hotel) => ({
      image: hotel.images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      title: hotel.hotelName,
      // subtitle: `From $${hotel.minPrice}/night`,
      subtitle: `From Rs ${hotel.minPrice}/night`,
      handle: `${hotel.totalRooms} rooms available`,
      location: `${hotel.city} • ${hotel.availableRooms} available`,
      borderColor: '#3B82F6',
      gradient: 'linear-gradient(135deg, #1E3A8A 0%, #000000 100%)',
      onClick: () => handleHotelSelect(hotel.hotelName)
    }));
  }, [hotels]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center opacity-0 animate-fade-in-up">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Discover Our Rooms</h1>
          <p className="text-xl text-slate-600">Find the perfect accommodation for your stay</p>
        </div>

        {/* City Search Section */}
        <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <Card className="p-6 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl">🔍</span>
              <h2 className="text-2xl font-bold text-slate-900">Search by City</h2>
              {(selectedCity || selectedHotel) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetSearch}
                  className="ml-auto"
                >
                  ✕ Clear Search
                </Button>
              )}
            </div>

            {/* Breadcrumb */}
            {(selectedCity || selectedHotel) && (
              <div className="mb-4 flex items-center gap-2 text-sm">
                <button
                  onClick={handleResetSearch}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  All Cities
                </button>
                {selectedCity && (
                  <>
                    <span className="text-slate-400">→</span>
                    <button
                      onClick={() => {
                        setSearchMode("hotels")
                        setSelectedHotel("")
                        handleCitySelect(selectedCity)
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {selectedCity}
                    </button>
                  </>
                )}
                {selectedHotel && (
                  <>
                    <span className="text-slate-400">→</span>
                    <span className="text-slate-900 font-semibold">{selectedHotel}</span>
                  </>
                )}
              </div>
            )}

            {/* City Selection */}
            {!selectedCity && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {cities.map((city, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCitySelect(city)}
                    className="px-4 py-3 bg-white hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-500 rounded-xl font-semibold text-slate-900 transition-all hover:scale-105 transform"
                  >
                    📍 {city}
                  </button>
                ))}
                {cities.length === 0 && (
                  <div className="col-span-full text-center py-8 text-slate-600">
                    No cities available. Add rooms to see cities here.
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 rounded-2xl border border-slate-200 backdrop-blur-sm bg-white/95 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <h2 className="text-lg font-semibold mb-6 text-slate-900">Filter Rooms</h2>

              <div className="space-y-6">
                {/* Room Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Room Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-slate-900 text-sm"
                  >
                    <option value="">All Types</option>
                    {roomTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Max Price</label>
                    <span className="text-lg font-bold text-blue-600">Rs {filters.maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="4000"
                    max="20000"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        maxPrice: parseInt(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>4000</span>
                    <span>20000</span>
                  </div>
                </div>

                {/* Occupancy */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Min Occupancy</label>
                  <select
                    value={filters.minOccupancy}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        minOccupancy: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-slate-900 text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    setFilters({
                      type: "",
                      maxPrice: 20000,
                      minOccupancy: 1,
                    })
                  }
                >
                  Reset Filters
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-slate-600">
                    {searchMode === "hotels" ? "Loading hotels..." : "Loading rooms..."}
                  </p>
                </div>
              </div>
            ) : searchMode === "hotels" ? (
              // Hotels View
              hotels.length === 0 ? (
                <Card className="p-12 text-center rounded-2xl border border-slate-200">
                  <div className="text-5xl mb-4">🏨</div>
                  <p className="text-slate-600 text-lg font-medium">No hotels found in {selectedCity}</p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={handleResetSearch}
                  >
                    View All Rooms
                  </Button>
                </Card>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Hotels in {selectedCity} ({hotels.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {hotels.map((hotel, idx) => (
                      <Card
                        key={idx}
                        onClick={() => handleHotelSelect(hotel.hotelName)}
                        className="p-6 rounded-2xl border border-slate-200 hover:shadow-xl transition-all cursor-pointer group hover:scale-105 transform"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={hotel.images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"}
                            alt={hotel.hotelName}
                            className="w-24 h-24 object-cover rounded-xl"
                          />
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition mb-2">
                              {hotel.hotelName}
                            </h3>
                            <div className="space-y-1 text-sm text-slate-600">
                              <p>📍 {hotel.city}</p>
                              <p>🏨 {hotel.totalRooms} total rooms</p>
                              <p>✓ {hotel.availableRooms} available</p>
                              <p className="text-blue-600 font-bold">From Rs {hotel.minPrice}/night</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            ) : rooms.length === 0 ? (
              // No Rooms Found
              <Card className="p-12 text-center rounded-2xl border border-slate-200">
                <div className="text-5xl mb-4">🏨</div>
                <p className="text-slate-600 text-lg font-medium">
                  {selectedHotel 
                    ? `No rooms found in ${selectedHotel}` 
                    : "No rooms found matching your filters"}
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={handleResetSearch}
                >
                  Clear Search
                </Button>
              </Card>
            ) : (
              // Rooms Grid View
              <div>
                {selectedHotel && (
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Rooms in {selectedHotel} ({rooms.length})
                  </h2>
                )}
                <div style={{ minHeight: '800px', position: 'relative' }}>
                  <ChromaGrid
                    items={chromaItems}
                    radius={300}
                    damping={0.45}
                    fadeOut={0.6}
                    ease="power3.out"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default RoomsPage