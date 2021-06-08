import express from 'express';

const router = express.Router();

// Welcome Page
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to iReporter' });
});

export default router;