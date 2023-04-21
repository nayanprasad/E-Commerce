const mongoose  = require('mongoose');


const orderSchema = new mongoose.Schema({
    shippingAddress: {
        address: {
            type: string,
            require: true
        },
        city: {
            type: string,
            require: true
        },
        country: {
            type: string,
            require: true
        },
        pinCond : {
            type: Number,
            required: true
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    orderItems: [
        {
            name: {
                type: string,
                require: true,
            },
            image: {
                type: string,
                require: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: "Product"
            }
        }
    ],
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: {
            type: String,
        },
        status: {
            type: String,
        },
    },
    itemPrice: {
        type: Number,
        required: true,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    paidAt: {
        type: Date,
    },
    orderStatus: {
        type: string,
        require: true,
        default: "Processing",
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now()
    },

});

module.exports = mongoose.models("Order", orderSchema);
