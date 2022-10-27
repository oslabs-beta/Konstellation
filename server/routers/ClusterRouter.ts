import { Request, Response, NextFunction } from 'express';
const express = require('express');

const clusterController = require('../controllers/ClusterController');
const router = express.Router();

// Give me everything
module.exports = router.get('/', clusterController.getCluster, (req: Request, res : Response, next : NextFunction) => {
  res.status(200).json(res.locals.elements);
})