import { Router } from "express";

const router = Router();

// Review(s)

router.get('/review', (req, res) => {
    res.json({message: "it works!"})
});
 
router.get('/review/:id', () => { });
router.put('/review/:id', () => { });
router.post('/review/', () => { });
router.delete('/review/:id', () => { });

// Comment()

router.get('/comment', () => { });
router.get('/comment/:id', () => { });
router.put('/comment/:id', () => { });
router.post('/comment/', () => { });
router.delete('/comment/:id', () => { });

export default router;