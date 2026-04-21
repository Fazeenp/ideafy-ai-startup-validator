const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../user/user.model");
const Payment = require("../payment/payment.model");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Credit pack config
const CREDIT_PACKS = {
  99:  { credits: 10,  amountPaise: 9900  },
  199: { credits: 25,  amountPaise: 19900 },
  499: { credits: 70,  amountPaise: 49900 },
};

// POST /api/payment/create-order
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // e.g. 99, 199, 499

    const pack = CREDIT_PACKS[amount];
    if (!pack) return res.status(400).json({ message: "Invalid pack selected" });

    const options = {
      amount: pack.amountPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Save pending payment
    await Payment.create({
      userId: req.user.id,
      razorpayOrderId: order.id,
      amount: pack.amountPaise,
      creditsAdded: pack.credits,
      status: "created",
    });

    res.json({
      orderId: order.id,
      amount: pack.amountPaise,
      currency: "INR",
      credits: pack.credits,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: err.message });
  }
};

// POST /api/payment/verify
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // Find the pending payment
    const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
    if (!payment) return res.status(404).json({ message: "Order not found" });

    // Update payment record
    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    payment.status = "paid";
    await payment.save();

    // Add credits to user
    const user = await User.findByIdAndUpdate(
      payment.userId,
      { $inc: { credits: payment.creditsAdded } },
      { new: true }
    );

    res.json({
      message: "Payment verified! Credits added.",
      credits: user.credits,
      creditsAdded: payment.creditsAdded,
    });
  } catch (err) {
    console.error("Verify payment error:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder, verifyPayment };