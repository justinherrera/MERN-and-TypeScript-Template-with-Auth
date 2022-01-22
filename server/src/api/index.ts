import users from './routes/users'

import { Router } from "express"
import employers from './routes/employers'


const router = Router()

router.get('/test', (req, res) => res.send('testing route ....') )

users(router)
employers(router)

// routes here ...
    
export default router
