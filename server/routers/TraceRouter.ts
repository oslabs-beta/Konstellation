import { TraceController } from "../controllers/TraceController";

const express = require('express')

const router = express.Router();

router.post('*', TraceController.saveData);
router.get('/:traceId', TraceController.getData);