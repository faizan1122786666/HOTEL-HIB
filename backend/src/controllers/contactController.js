import Contact from '../models/Contact.js';

/**
 * @desc    Create new contact submission
 * @route   POST /api/contact
 * @access  Public
 */
export const createContactSubmission = async (req, res, next) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields (name, email, subject, message)'
            });
        }

        // Create contact submission
        const contact = await Contact.create({
            name,
            email,
            phone,
            subject,
            message,
            status: 'pending'
        });

        res.status(201).json({
            success: true,
            message: 'Your message has been received! We will get back to you soon.',
            data: contact
        });
    } catch (err) {
        // Handle validation errors
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }
        next(err);
    }
};

/**
 * @desc    Get all contact submissions (Admin)
 * @route   GET /api/contact
 * @access  Private (Admin)
 */
export const getAllContactSubmissions = async (req, res, next) => {
    try {
        const contacts = await Contact.find()
            .sort('-createdAt')
            .select('-__v');

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Get single contact submission (Admin)
 * @route   GET /api/contact/:id
 * @access  Private (Admin)
 */
export const getContactSubmission = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact submission not found'
            });
        }

        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Update contact status (Admin)
 * @route   PUT /api/contact/:id
 * @access  Private (Admin)
 */
export const updateContactStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!['pending', 'read', 'replied'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be: pending, read, or replied'
            });
        }

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact submission not found'
            });
        }

        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Delete contact submission (Admin)
 * @route   DELETE /api/contact/:id
 * @access  Private (Admin)
 */
export const deleteContactSubmission = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact submission not found'
            });
        }

        await contact.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Contact submission deleted successfully',
            data: {}
        });
    } catch (err) {
        next(err);
    }
};