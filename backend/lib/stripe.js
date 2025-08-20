import Stripe from 'stripe';

export const stripe = new Stripe(process.env.Stripe_Secret_Key);