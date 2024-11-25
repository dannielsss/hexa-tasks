import express from 'express';
import passport from 'passport';

const authRoutes = express.Router();

authRoutes.post('/password', passport.authenticate('local'), (_req, res) => {
  res.json({ message: 'Login ✅' });
});

authRoutes.post('/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    res.json({ message: 'Logout ✅' });
  });
});

authRoutes.get('/profile', (req, res) => {
  res.json({ profile: req.user });
});

export default authRoutes;
