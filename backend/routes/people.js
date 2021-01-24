import express from 'express';
import {getPeople,getUserById,createUser,updateUser ,deleteUser} from '../controllers/people.js';

const router = express.Router();

router.get('/people',getPeople);
router.post('/people',createUser);
router.get('/people/:id',getUserById);
router.put('/people/:id',updateUser);
router.delete('/remove/:id',deleteUser);

export default router;