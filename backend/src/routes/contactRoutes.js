import express from 'express';
import {
    createContactSubmission,
    getAllContactSubmissions,
    getContactSubmission,
    updateContactStatus,
    deleteContactSubmission
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route - Anyone can submit contact form
router.post('/', createContactSubmission);

// Protected routes - Admin only
router.use(protect);
router.use(authorize('admin'));

router.get('/', getAllContactSubmissions);
router.get('/:id', getContactSubmission);
router.put('/:id', updateContactStatus);
router.delete('/:id', deleteContactSubmission);

export default router;