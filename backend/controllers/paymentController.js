import Stripe from 'stripe';

export const stripePayment = async(req, res) => {
  try {
    const stripe = new Stripe(process.env.REACT_STRIPE_SECRET_KEY);
    const { products } = req.body;
    // console.log("CartItems in paymentControllerBackend", products);

    const lineItems = products.map((product) => {
      // const imageInStripe = `${process.env.BACKEND_URL}/images/${product.imagePath}.jpeg`;
      // console.log("Image for product:", product.name, "is:", imageInStripe);

      return {
        price_data: {
          currency:"usd",
          product_data:{
            name: product.name,
            // images: [imageInStripe]
          },
          unit_amount: Math.round(product.price*100),
        },
        quantity: product.quantity,
      }; 
    });

    // console.log("LineItems in paymentControllerBackend", lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/paymentSuccess`,
      cancel_url: `${process.env.FRONTEND_URL}/paymentError`,
    });

    res.json({id: session.id});
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};
