import express from 'express';
import connectDB from './config/db.js';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';

const app = express();

connectDB();

app.use('/api/users', userRouter);

app.use('/api/products', productRouter);

app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
