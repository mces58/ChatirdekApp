import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import express from 'express';
import path from 'path';

import connectToMongoDB from 'src/db/connect.db';
import authRoute from 'src/routes/auth.route';
import friendshipRoute from 'src/routes/friend.route';
import groupRoute from 'src/routes/group.route';
import messageRoute from 'src/routes/message.route';
import userRoute from 'src/routes/user.route';
import { app, server } from 'src/socket/socket';

dotenvExpand.expand(dotenv.config());

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);
app.use('/api/friendship', friendshipRoute);
app.use('/api/users', userRoute);
app.use('/api/groups', groupRoute);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
