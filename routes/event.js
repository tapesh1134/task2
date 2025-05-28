const express =require('express');
const router =express.Router();
const eventcontroller =require('../controllers/eventController');
const { authenticattoken, authorized } =require('../middleware/authMiddleware');
router.get('/', eventcontroller.getallevent);

router.get('/:id',eventcontroller.geteventid);

router.post('/',authenticattoken,authorized('admin'),eventcontroller.createevent);

router.put('/:id',authenticattoken,authorized('admin'),eventcontroller.updateevent);

router.delete('/:id',authenticattoken,authorized('admin'), eventcontroller.deleteevent);
module.exports = router;
