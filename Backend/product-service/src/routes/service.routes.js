const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/service.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const uploadMiddleware = require('../middlewares/upload.middleware');


// ==================== PUBLIC ROUTES ====================

// ==================== PUBLIC ROUTES ====================

// List services
router.get('/', serviceController.listServices);

// Search nearby services
router.get('/search/nearby', serviceController.searchNearbyServices);

// Get service slots
router.get('/:serviceId/slots', serviceController.getServiceSlots);

// Get single service
router.get('/:serviceId', serviceController.getService);

// ==================== PROVIDER ROUTES ====================

// Create service
router.post(
  '/',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['provider', 'admin']),
  uploadMiddleware.array('images', 5),
  serviceController.createService
);

// Update service
router.put(
  '/:serviceId',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['provider', 'admin']),
  uploadMiddleware.array('images', 5),
  serviceController.updateService
);

// Delete service
router.delete(
  '/:serviceId',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['provider', 'admin']),
  serviceController.deleteService
);


// ==================== PROVIDER DASHBOARD ====================

// My services
router.get(
  '/provider/my-services',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['provider', 'admin']),
  serviceController.getMyServices
);

// Provider stats
router.get(
  '/provider/stats',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['provider', 'admin']),
  serviceController.getProviderStats
);



// ==================== SLOT MANAGEMENT ====================

// Create slot
router.post(
  '/:serviceId/slots',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['provider', 'admin']),
  serviceController.createSlot
);

// Bulk create slots
router.post(
  '/:serviceId/slots/bulk',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['provider', 'admin']),
  serviceController.bulkCreateSlots
);

// Update slot
router.put(
  '/slots/:slotId',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['provider', 'admin']),
  serviceController.updateSlot
);

// Delete slot
router.delete(
  '/slots/:slotId',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['provider', 'admin']),
  serviceController.deleteSlot
);



// ==================== ADMIN MODERATION ====================

// Pending services
router.get(
  '/admin/pending',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['admin']),
  serviceController.getPendingServices
);

// Approve
router.post(
  '/admin/:serviceId/approve',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['admin']),
  serviceController.approveService
);

// Reject
router.post(
  '/admin/:serviceId/reject',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['admin']),
  serviceController.rejectService
);

// Suspend
router.post(
  '/admin/:serviceId/suspend',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['admin']),
  serviceController.suspendService
);

module.exports = router;