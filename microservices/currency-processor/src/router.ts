import { Router } from 'express';
import { pingController } from './controllers';
const router = Router();

router.use('/api', Router().get('/ping', pingController));

export default router;