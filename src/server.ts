import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signIn, getUsernameFromId } from './handlers/user';


const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    console.log('hello from drewery hot chicken')
    res.status(200)
    res.json({ message: 'kluck kluck my fellow hot chicken lovers!' })
});

app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signIn);
app.get('/username', getUsernameFromId)


app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401).json({message: 'unauthorized'})
    } else if (err.type === 'input') {
        res.status(400).json({message: 'invalid input'})
    } else {
        res.status(500).json({message: 'Oops, the heat must be getting to us'})
    }
})

export default app;