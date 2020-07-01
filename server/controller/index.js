const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Services = require('../services'); 

router.get('/sellers', Services.getSellers);

router.get('/appointments', Services.getAppointments);

module.exports = router;
