let express =require('express');
let bodyParser =require( 'body-parser');
const peopleRoutes =require('./routes/people.js');
let cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express();
const PORT =process.env.PORT|| 5000;


app.use(bodyParser.json());
app.use(cors())

app.use('/api', peopleRoutes);

app.get("/", (req,res) => {
    res.send('Hello from homepage')
});


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))
