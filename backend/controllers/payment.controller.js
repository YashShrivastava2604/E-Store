import Order from "../models/order.model.js";
import { stripe } from "../lib/stripe.js";

// export const createCheckoutSession = async (req, res) => {
// 	try {
// 		const { products } = req.body;

// 		if (!Array.isArray(products) || products.length === 0) {
// 			return res.status(400).json({ error: "Invalid or empty products array" });
// 		}

// 		const lineItems = products.map((product) => {
// 			const amount = Math.round(product.price * 100); // Stripe needs cents
// 			return {
// 				price_data: {
// 					currency: "usd",
// 					product_data: {
// 						name: product.name,
// 						images: [product.image],
// 					},
// 					unit_amount: amount,
// 				},
// 				quantity: product.quantity || 1,
// 			};
// 		});

// 		const session = await stripe.checkout.sessions.create({
// 			payment_method_types: ["card"],
// 			line_items: lineItems,
// 			mode: "payment",
// 			success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
// 			cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
// 			metadata: {
// 				userId: req.user._id.toString(),
// 				products: JSON.stringify(
// 					products.map((p) => ({
// 						id: p._id,
// 						quantity: p.quantity,
// 						price: p.price,
// 					}))
// 				),
// 			},
// 		});

// 		res.status(200).json({ id: session.id });
// 	} catch (error) {
// 		console.error("Error processing checkout:", error);
// 		res.status(500).json({ message: "Error processing checkout", error: error.message });
// 	}
// };

export const createCheckoutSession = async (req, res) => {
  try {
    console.log("=== createCheckoutSession called ===");
    console.log("ENV Stripe key prefix:", (process.env.Stripe_Secret_Key || process.env.STRIPE_SECRET_KEY || "").slice(0,8));
    // If you prefer to check for sk_test_:
    console.log("Stripe key looks like test?", (process.env.Stripe_Secret_Key || process.env.STRIPE_SECRET_KEY || "").startsWith("sk_test_"));

    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      metadata: {
        userId: req.user?._id?.toString() || "unknown",
        products: JSON.stringify(
          products.map((p) => ({ id: p._id, quantity: p.quantity, price: p.price }))
        ),
      },
    });

    console.log("Stripe session created:", { id: session.id, livemode: session.livemode });

    // For debugging only: return livemode to the client so you can inspect it in browser devtools
    res.status(200).json({ id: session.id, livemode: session.livemode });
  } catch (error) {
    console.error("Error processing checkout:", error);
    res.status(500).json({ message: "Error processing checkout", error: error.message });
  }
};


export const checkoutSuccess = async (req, res) => {
	try {
		const { sessionId } = req.body;
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		if (session.payment_status === "paid") {
			// create a new Order
			const products = JSON.parse(session.metadata.products);
			const newOrder = new Order({
				user: session.metadata.userId,
				products: products.map((product) => ({
					product: product.id,
					quantity: product.quantity,
					price: product.price,
				})),
				totalAmount: session.amount_total / 100, // convert from cents to dollars
				stripeSessionId: sessionId,
			});

			await newOrder.save();

      await User.findByIdAndUpdate(userId, { $set: { cartItems: [] } });

			res.status(200).json({
				success: true,
				message: "Payment successful and order created.",
				orderId: newOrder._id,
			});
		}
	} catch (error) {
		console.error("Error processing successful checkout:", error);
		res.status(500).json({ message: "Error processing successful checkout", error: error.message });
	}
};