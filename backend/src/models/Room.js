// import mongoose from 'mongoose';

// const roomSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'Please provide a room name'],
//         trim: true,
//         maxlength: [100, 'Room name cannot be more than 100 characters']
//     },
//     type: {
//         type: String,
//         required: [true, 'Please select a room type'],
//         enum: {
//             values: ['standard', 'deluxe', 'suite', 'penthouse', 'family'],
//             message: 'Please select a valid room type'
//         }
//     },
//     price: {
//         type: Number,
//         required: [true, 'Please provide a price per night'],
//         min: [0, 'Price cannot be negative']
//     },
//     discountPrice: {
//         type: Number,
//         min: [0, 'Discount price cannot be negative'],
//         min: [0, 'Discount price cannot be negative']
//     },
//     maxOccupancy: {
//         type: Number,
//         required: [true, 'Please provide maximum occupancy'],
//         min: [1, 'Occupancy must be at least 1']
//     },
//     size: {
//         type: Number,
//         required: [true, 'Please provide room size in sq ft']
//     },
//     description: {
//         type: String,
//         required: [true, 'Please provide a description']
//     },
//     amenities: {
//         type: [String],
//         default: []
//     },
//     images: {
//         type: [String],
//         default: []
//     },
//     status: {
//         type: String,
//         enum: ['available', 'occupied', 'maintenance', 'reserved'],
//         default: 'available'
//     },
//     rating: {
//         type: Number,
//         default: 0,
//         min: 0,
//         max: 5
//     },
//     reviews: {
//         type: Number,
//         default: 0
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// }, {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
// });

// // Create index for faster queries
// roomSchema.index({ type: 1, price: 1, status: 1 });

// const Room = mongoose.model('Room', roomSchema);

// export default Room;











import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a room name'],
        trim: true,
        maxlength: [100, 'Room name cannot be more than 100 characters']
    },
    type: {
        type: String,
        required: [true, 'Please select a room type'],
        enum: {
            values: ['standard', 'deluxe', 'suite', 'penthouse', 'family'],
            message: 'Please select a valid room type'
        }
    },
    // NEW FIELDS
    hotelName: {
        type: String,
        required: [true, 'Please provide hotel name'],
        trim: true,
        maxlength: [100, 'Hotel name cannot be more than 100 characters']
    },
    city: {
        type: String,
        required: [true, 'Please provide city'],
        trim: true,
        maxlength: [50, 'City name cannot be more than 50 characters']
    },
    floor: {
        type: Number,
        required: [true, 'Please provide floor number'],
        min: [0, 'Floor number cannot be negative']
    },
    // END NEW FIELDS
    price: {
        type: Number,
        required: [true, 'Please provide a price per night'],
        min: [0, 'Price cannot be negative']
    },
    discountPrice: {
        type: Number,
        min: [0, 'Discount price cannot be negative']
    },
    maxOccupancy: {
        type: Number,
        required: [true, 'Please provide maximum occupancy'],
        min: [1, 'Occupancy must be at least 1']
    },
    size: {
        type: Number,
        required: [true, 'Please provide room size in sq ft']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    amenities: {
        type: [String],
        default: []
    },
    images: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ['available', 'occupied', 'maintenance', 'reserved'],
        default: 'available'
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Create indexes for faster queries
roomSchema.index({ type: 1, price: 1, status: 1 });
roomSchema.index({ city: 1 }); // NEW INDEX
roomSchema.index({ hotelName: 1 }); // NEW INDEX
roomSchema.index({ city: 1, hotelName: 1 }); // COMPOUND INDEX

const Room = mongoose.model('Room', roomSchema);

export default Room;