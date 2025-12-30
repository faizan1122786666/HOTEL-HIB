// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import Room from './src/models/Room.js';
// import connectDB from './src/config/db.js';

// dotenv.config();
// connectDB();

// const rooms = [
//     {
//         name: "Deluxe Ocean View Suite",
//         type: "suite",
//         price: 299,
//         discountPrice: 249,
//         maxOccupancy: 4,
//         size: 450,
//         description: "Experience luxury in our Deluxe Ocean View Suite. Featuring a king-sized bed, private balcony with breathtaking ocean views, and a spacious living area.",
//         amenities: ["WiFi", "Air Conditioning", "Mini Bar", "Jacuzzi", "Balcony", "Room Service", "Smart TV"],
//         images: [
//             "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop&q=60",
//             "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=60"
//         ],
//         status: "available",
//         rating: 4.8,
//         reviews: 124
//     },
//     {
//         name: "Standard Double Room",
//         type: "standard",
//         price: 149,
//         maxOccupancy: 2,
//         size: 300,
//         description: "Comfortable and affordable, our Standard Double Room is perfect for couples or solo travelers. Includes all essential amenities.",
//         amenities: ["WiFi", "Air Conditioning", "Coffee Maker", "Work Desk"],
//         images: [
//             "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop&q=60",
//             "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=60"
//         ],
//         status: "available",
//         rating: 4.5,
//         reviews: 89
//     },
//     {
//         name: "Family Penthouse",
//         type: "penthouse",
//         price: 599,
//         discountPrice: 499,
//         maxOccupancy: 6,
//         size: 1200,
//         description: "The ultimate luxury experience for the whole family. Two bedrooms, full kitchen, panoramic city views, and premium service.",
//         amenities: ["WiFi", "Kitchen", "Living Room", "2 Bathrooms", "Concierge Service", "Private Terrace"],
//         images: [
//             "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60",
//             "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60"
//         ],
//         status: "available",
//         rating: 5.0,
//         reviews: 42
//     },
//     {
//         name: "Executive Suite",
//         type: "suite",
//         price: 350,
//         maxOccupancy: 3,
//         size: 550,
//         description: "Designed for business travelers, featuring a dedicated workspace, high-speed internet, and access to the executive lounge.",
//         amenities: ["WiFi", "Work Station", "Executive Lounge Access", "Ironing Facilities", "Mini Bar"],
//         images: [
//             "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&auto=format&fit=crop&q=60"
//         ],
//         status: "available",
//         rating: 4.7,
//         reviews: 65
//     },
//     {
//         name: "Cozy Single Room",
//         type: "standard",
//         price: 99,
//         maxOccupancy: 1,
//         size: 200,
//         description: "Perfect for solo travelers on a budget. Cozy, clean, and equipped with everything you need for a restful stay.",
//         amenities: ["WiFi", "Air Conditioning", "TV"],
//         images: [
//             "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=60"
//         ],
//         status: "available",
//         rating: 4.3,
//         reviews: 210
//     }
// ];

// const importData = async () => {
//     try {
//         await Room.deleteMany(); // Clear existing rooms
//         await Room.insertMany(rooms);
//         console.log('✅ Data Imported Successfully!');
//         process.exit();
//     } catch (error) {
//         console.error(`❌ Error: ${error.message}`);
//         process.exit(1);
//     }
// };

// importData();















import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './src/models/Room.js';
import connectDB from './src/config/db.js';

dotenv.config();
connectDB();

const rooms = [
    // Lahore - Pearl Continental Hotel
    {
        name: "Executive Suite",
        type: "suite",
        hotelName: "Pearl Continental Lahore",
        city: "Lahore",
        floor: 5,
        price: 350,
        discountPrice: 299,
        maxOccupancy: 4,
        size: 450,
        description: "Luxurious executive suite with panoramic city views in the heart of Lahore.",
        amenities: ["WiFi", "Air Conditioning", "Mini Bar", "Jacuzzi", "City View", "Room Service", "Smart TV"],
        images: [
            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=60"
        ],
        status: "available",
        rating: 4.8,
        reviews: 124
    },
    {
        name: "Deluxe Room",
        type: "deluxe",
        hotelName: "Pearl Continental Lahore",
        city: "Lahore",
        floor: 3,
        price: 200,
        discountPrice: 180,
        maxOccupancy: 2,
        size: 350,
        description: "Elegant deluxe room with modern amenities.",
        amenities: ["WiFi", "Air Conditioning", "TV", "Mini Bar", "Work Desk"],
        images: [
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop&q=60"
        ],
        status: "available",
        rating: 4.6,
        reviews: 89
    },

    // Lahore - Avari Hotel
    {
        name: "Presidential Suite",
        type: "penthouse",
        hotelName: "Avari Hotel Lahore",
        city: "Lahore",
        floor: 10,
        price: 599,
        discountPrice: 499,
        maxOccupancy: 6,
        size: 1200,
        description: "The ultimate luxury experience with breathtaking views of Lahore.",
        amenities: ["WiFi", "Full Kitchen", "Living Room", "3 Bathrooms", "Concierge", "Private Terrace", "Jacuzzi"],
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60"
        ],
        status: "available",
        rating: 5.0,
        reviews: 42
    },

    // Karachi - Marriott Hotel
    {
        name: "Ocean View Suite",
        type: "suite",
        hotelName: "Marriott Hotel Karachi",
        city: "Karachi",
        floor: 8,
        price: 400,
        discountPrice: 350,
        maxOccupancy: 4,
        size: 500,
        description: "Stunning ocean views from this premium suite in Karachi's finest hotel.",
        amenities: ["WiFi", "Ocean View", "Mini Bar", "Work Station", "Balcony", "Premium Bedding"],
        images: [
            "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&auto=format&fit=crop&q=60"
        ],
        status: "available",
        rating: 4.7,
        reviews: 65
    },
    {
        name: "Standard Room",
        type: "standard",
        hotelName: "Marriott Hotel Karachi",
        city: "Karachi",
        floor: 2,
        price: 150,
        discountPrice: 130,
        maxOccupancy: 2,
        size: 300,
        description: "Comfortable standard room with all essential amenities.",
        amenities: ["WiFi", "Air Conditioning", "TV", "Work Desk"],
        images: [
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=60"
        ],
        status: "available",
        rating: 4.3,
        reviews: 210
    },

    // Islamabad - Serena Hotel
    {
        name: "Royal Suite",
        type: "suite",
        hotelName: "Serena Hotel Islamabad",
        city: "Islamabad",
        floor: 6,
        price: 450,
        discountPrice: 400,
        maxOccupancy: 4,
        size: 600,
        description: "Royal treatment in Islamabad's most prestigious hotel.",
        amenities: ["WiFi", "Mountain View", "Sitting Area", "Mini Bar", "Luxury Bathroom", "Butler Service"],
        images: [
            "https://images.unsplash.com/photo-1578654377249-e3b30dcd1d2f?w=800&auto=format&fit=crop&q=60"
        ],
        status: "available",
        rating: 4.9,
        reviews: 156
    },

    // Islamabad - Margalla Hotel
    {
        name: "Family Room",
        type: "family",
        hotelName: "Margalla Hotel Islamabad",
        city: "Islamabad",
        floor: 4,
        price: 280,
        discountPrice: 250,
        maxOccupancy: 5,
        size: 550,
        description: "Spacious family room perfect for your Islamabad vacation.",
        amenities: ["WiFi", "2 Bedrooms", "Kitchenette", "Kids Area", "Family Entertainment"],
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60"
        ],
        status: "available",
        rating: 4.5,
        reviews: 98
    },

    // Multan - Ramada Hotel
    {
        name: "Business Suite",
        type: "suite",
        hotelName: "Ramada Hotel Multan",
        city: "Multan",
        floor: 3,
        price: 220,
        discountPrice: 200,
        maxOccupancy: 2,
        size: 400,
        description: "Perfect for business travelers visiting Multan.",
        amenities: ["WiFi", "Work Station", "Meeting Area", "Mini Bar", "City View"],
        images: [
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=60"
        ],
        status: "available",
        rating: 4.4,
        reviews: 76
    }
];

const importData = async () => {
    try {
        await Room.deleteMany(); // Clear existing rooms
        await Room.insertMany(rooms);
        console.log('✅ Data Imported Successfully!');
        console.log(`✅ Added ${rooms.length} rooms across multiple cities and hotels`);
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

importData();