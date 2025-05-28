const express = require('express');
const router = express.Router();
const bookingcont = require('../controllers/bookingController');
const { authenticattoken } = require('../middleware/authMiddleware');
router.post('/',authenticattoken, bookingcont.bookticket);

router.get('/',authenticattoken, bookingcont.getuserbooking);

router.delete('/:id',authenticattoken, bookingcont.deletebooking);

module.exports = router;
