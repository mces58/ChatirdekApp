import express from 'express';

import adminRoute from 'src/routes/admin.route';
import userRoute from 'src/routes/user.route';

const app = express();

app.use('/admin', adminRoute);

app.use('/user', userRoute);

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
