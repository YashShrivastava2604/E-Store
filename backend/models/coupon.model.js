import mongoose, { mongo } from 'mongoose';

const couponSchema = new mongoose.Schema({
    
});

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;