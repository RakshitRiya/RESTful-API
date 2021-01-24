import express from 'express';
import bodyParser from 'body-parser';
import peopleRoutes from './routes/people.js';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
const PORT = 5000;

dotenv.config();
app.use(bodyParser.json());
app.use(cors())

app.use('/api', peopleRoutes);

app.get("/", (req,res) => {
    res.send('Hello from homepage')
});


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))
