const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const app = express();

const pageRouter = require('./routes/pageRouter');
const furnituresRouter = require('./routes/furnituresRoute');
const categoryRouter = require('./routes/categoryRouter');
const userRouter = require('./routes/userRouter');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
dotenv.config();
//template engine
app.set('view engine', 'ejs');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connection successfull'));

//middleware
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  session({
    secret: 'my_keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(methodOverride('_method', { methods: ['GET', 'POST'] }));

//global variable
global.userIN = null;
//routes

app.use('/', pageRouter);
app.use('/users', userRouter);
app.use('/furnitures', furnituresRouter);
app.use('/categories', categoryRouter);
app.use('*', (req, res, next) => {
  //bu kısma daha sonra bak
  userIN = req.session.userID;
  next();
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
