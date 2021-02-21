  let express = require('express');
let router = express.Router();

const calendarController = require('../controllers/calendar');

router.get('/', calendarController.getCalendar);

module.exports = router;