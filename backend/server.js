const express = require('express');
const dotenv = require('dotenv');
const connectToMongoDB = require('./db/connectToMongoDB.js');
const app = express();
const appPort = process.env.APP_PORT || 3001;

dotenv.config();

app.use(express.json());

// MARK : Middlewares
const auth = require('./middleware/auth.js');

// MARK : Routings
const authRouter = require('./routes/auth.routes.js');
const messageRouter = require('./routes/message.routes.js');
const userRouter = require('./routes/user.routes.js');

app.use('/api/auth', authRouter);
app.use('/api/message', auth, messageRouter);
app.use('/api/users', auth, userRouter);

app.listen(appPort, async () => {
    await connectToMongoDB();
    console.log('Server is running on port : ' + appPort);
})