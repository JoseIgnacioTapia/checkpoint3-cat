'use strict';

const express = require('express');
const {
  addCat,
  addAccessory,
  deleteAccessory,
  modifyAccessory,
  addCatAccessory,
} = require('../controllers/controllers');
const controller = require('../controllers/controllers');
const router = express.Router();

// Escriban sus rutas acá
// Siéntanse libres de dividir entre archivos si lo necesitan

// Hint:  investigá las propiedades del objeto Error en JS para acceder al mensaje en el mismo.
module.exports = router;
