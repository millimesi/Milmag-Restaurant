import express from 'express';
const router = express.Router();

import { stripePayment } from '../controllers/paymentController.js';
import { authenticate } from "../middlewares/authenticate.js";

router.post("/paymentSession", authenticate, stripePayment);

export default router;
