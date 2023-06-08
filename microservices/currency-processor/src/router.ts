import { Router } from 'express';
import { pingController, currencyExchangeController } from './controllers';
const router = Router();

router.use('/api', Router().get('/ping', pingController));
router.use('/api', Router().get('/get-exchange-rate', currencyExchangeController));

export default router;