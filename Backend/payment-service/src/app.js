/**
 * UniKart Payment Service - Main Application
 * Express server with Razorpay integration
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security Middleware
app.use(helmet());

// CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'UniKart Payment Service is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Test route for Razorpay
app.get('/api/payments/test', (req, res) => {
  res.json({
    success: true,
    message: 'Payment API is working',
    razorpayConfigured: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
  });
});

// Simple create order endpoint (without database for now)
app.post('/api/payments/create-order', (req, res) => {
  try {
    const Razorpay = require('razorpay');
    
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'Razorpay credentials not configured'
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount, currency = 'INR' } = req.body;

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `order_${Date.now()}`,
    };

    razorpay.orders.create(options, (err, order) => {
      if (err) {
        console.error('Razorpay error:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to create order',
          error: err.message
        });
      }

      res.json({
        success: true,
        message: 'Order created successfully',
        data: {
          razorpayOrderId: order.id,
          amount: order.amount,
          currency: order.currency,
          key: process.env.RAZORPAY_KEY_ID
        }
      });
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Simple verify payment endpoint
app.post('/api/payments/confirm', (req, res) => {
  try {
    const crypto = require('crypto');
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isValid = expectedSignature === razorpaySignature;

    if (isValid) {
      res.json({
        success: true,
        message: 'Payment verified successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║   🚀 UniKart Payment Service                  ║
║   📡 Server running on port ${PORT}              ║
║   🌍 Environment: ${process.env.NODE_ENV || 'development'}           ║
║   💳 Razorpay: ${process.env.RAZORPAY_KEY_ID ? 'Configured ✅' : 'Not Configured ❌'}      ║
╚════════════════════════════════════════════════╝
  `);
  
  if (!process.env.RAZORPAY_KEY_ID) {
    console.warn('⚠️  WARNING: RAZORPAY_KEY_ID not found in .env file');
  }
  if (!process.env.RAZORPAY_KEY_SECRET) {
    console.warn('⚠️  WARNING: RAZORPAY_KEY_SECRET not found in .env file');
  }
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('⚠️  Received shutdown signal');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

module.exports = app;
