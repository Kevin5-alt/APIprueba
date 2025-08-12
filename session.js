// config/session.js
const session     = require('express-session');
const MongoStore  = require('connect-mongo');

module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,    // Defínelo en tu .env
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 2,           // 2 horas
        sameSite: 'lax'
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,    // Defínelo en tu .env
        collectionName: 'sessions',
        ttl: 60 * 60 * 2                      // 2 horas
      })
    })
  );
};
