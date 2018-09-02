import express from 'express';
import path from 'path';
import logger from 'morgan';
import mongoose from 'mongoose';

import {} from 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

import todoRoutes from './routes/todo.server.routes';
app.use(express.static(path.join(__dirname, "../client/build")));

const port = process.env.PORT;
const db = process.env.MONGODB_URI;

// allow-cors
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// configure app
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/api', todoRoutes);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname+'../client/build/index.html'));
});

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect(db, { useNewUrlParser: true })
// when connected to database start the server
  .then(() => app.listen(port,() => {
      console.log(`App Server Listening at ${port}`);
    })
  );

// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});
