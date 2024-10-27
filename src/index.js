const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     next()
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// Function to start the server after ensuring indexes are created
const startServer = async () => {
    try {
        // Ensure the unique index on the email field is created
        await User.init();

        // Start the server
        app.listen(port, () => {
            console.log('Server is up on port: ' + port);
        });
    } catch (error) {
        console.error('Error during server startup:', error);
    }
};

const jwt = require('jsonwebtoken')

const myFunc = async () => {
    const token = jwt.sign( {_id : 'abc123'}, 'doingsomething')
    console.log(token)

    const data = jwt.verify(token, 'doingsomething')
    console.log(data)
}

myFunc()

// Start the server
startServer();
