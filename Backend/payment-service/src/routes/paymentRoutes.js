const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticateUser } = require('../middleware/auth');
const { 
  validateCreateOrder, 
  validatePaymentConfirmation 
} = require('../middleware/validation');

// Create payment order
router.post('/create-order', 
  authenticateUser, 
  validateCreateOrder, 
  paymentController.createOrder
);

// Confirm payment
router.post('/confirm', 
  authenticateUser, 
  validatePaymentConfirmation, 
  paymentController.confirmPayment
);

// Webhook endpoint (no auth required)
router.post('/webhook', paymentController.handleWebhook);

// Get payment details
router.get('/:paymentId', 
  authenticateUser, 
  paymentController.getPaymentDetails
);

// Get user payments
router.get('/', 
  authenticateUser, 
  paymentController.getUserPayments
);

// Initiate refund
router.post('/:paymentId/refund', 
  authenticateUser, 
  paymentController.initiateRefund
);

module.exports = router;
