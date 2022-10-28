'use strict';

const express = require('express');
const controllers = require('../controllers/controllers');
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

router.get('/cats', (req, res) => {
  res.status(200).send(controller.listCats());
});

router.post('/cats', (req, res) => {
  const { name } = req.body;
  try {
    const cat = controllers.addCat(name);
    res.status(201).json({
      msg: 'Exito',
      data: { accessories: [], age: '1 year', color: [], name: name },
    });
  } catch (error) {
    res.status(400).json({ error: `${name} already exists` });
  }
});

router.get('/accessories', (req, res) => {
  const { type, color } = req.query;
  res.status(200).send(controller.getAccessories(type, color));
});

router.put('/accessories', (req, res) => {
  const { id } = req.query;
  const { obj } = req.body;

  try {
    res.status(200).json(controller.modifyAccessory(obj));
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/accessories', (req, res) => {
  const { id, color, type, description } = req.body;
  try {
    res.status(201).json({
      message: controller.addAccessory({ id, color, type, description }),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/accessories/:id', (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).json({ message: controller.deleteAccessory(parseInt(id)) });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/cats/accessories', (req, res) => {
  const { catName, catAccessoryId } = req.body;

  try {
    controller.addCatAccessory(catName, catAccessoryId);
    res.status(200).json({ msg: 'Exito' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
