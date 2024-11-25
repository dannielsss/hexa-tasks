import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../../domain/UserModel';
import { database } from '../../../../database/postgres';
import idGenerator from '../../../../utils/id-generator';

// TODO: Implement the hexagonal architecture.
// TODO: Encriptar la contrasenia.
// TODO: Make the User-Tables relationship.

passport.serializeUser(async (user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user: User, done) => {
  const userFind = await database.query('SELECT * FROM account WHERE id = $1', [
    user.id,
  ]);

  return done(null, userFind.rows[0]);
});

passport.use(
  new Strategy(async (username, password, done) => {
    const user = await database.query(
      'SELECT * FROM account WHERE username = $1',
      [username]
    );

    if (!user.rows[0] && password) {
      const newUser = await database.query(
        'INSERT INTO account(id, username, password) VALUES ($1, $2, $3) RETURNING *',
        [idGenerator(), username, password]
      );
      return done(null, newUser.rows[0]);
    }

    if (user.rows[0] && user.rows[0].password !== password)
      return done(null, false, { message: 'Incorrect pasword' });

    return done(null, user.rows[0]);
  })
);
