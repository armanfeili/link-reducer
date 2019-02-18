const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Link = require('../../models/Link');
let Profile = require('../../models/Profile');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'Users works' });
});

// @router  POST api/users/register
// $desc    Register User
// @access  Public
router.post('/register', (req, res) => {
  const errors = {};
  let avatar;
  User.findOne({email: req.body.email}).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    }else {
      avatar = gravatar.url(req.body.email, {
        // options:
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        photo: req.body.photo // optional
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          // newUser.save().then(user => res.json(user)).catch(err => res.json(err))
          newUser.save().then(user => res.json(user)).catch(err => res.json(err));
          console.log(newUser);
        });
      });

      //   // ////////   Creating profile    ///////////
      //   // profiles will contain name,avatar,date and likes not password and email.
      //   // because we want to show them az public
      //   const newProfile = new Profile({
      //     name: req.body.name,
      //     avatar,
      //     user: req.user.id,
      //     photo: req.body.photo // optional
      //   })
      //   console.log(newProfile)

      //   newProfile.save()
      //   // Profile.find().then(profile => {
      //   //   // if (!profile) {
      //   //   //   errors.profile = 'you have already a profile'
      //   //   //   return res.status(400).json(errors)
      //   //   // }else {
      //   //   const newProfile = new Profile({
      //   //     name: req.body.name,
      //   //     avatar,
      //   //     photo: req.body.photo // optional
      //   //   })
      //   //   console.log(newProfile)

    // //   newProfile.save().then(user => res.json(user)).catch(err => res.json(err))
    // // // }
    // // })
    }
  });
});

// // @router  POST api/users/createprofile
// // $desc    Register User
// // @access  Public
// router.post('/createprofile', (req, res) => {
//   const errors = {}
//   Profile.find().then(profile => {
//     // if (!profile) {
//     //   errors.profile = 'you have already a profile'
//     //   return res.status(400).json(errors)
//     // }else {
//     const avatar = gravatar.url(req.body.email, {
//       // options:
//       s: '200', // Size
//       r: 'pg', // Rating
//       d: 'mm' // Default
//     })
//     const newProfile = new Profile({
//       name: req.body.name,
//       avatar,
//       user: req.user.id,
//       photo: req.body.photo // optional
//     })
//     console.log(newProfile)

//     newProfile.save().then(user => res.json(user)).catch(err => res.json(err))
//   // }
//   })
// })

// @router  POST api/users/login
// $desc    Login User
// @access  Public
router.post('/login', (req, res) => {
  const errors = {};
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email}).then(user => {
    if (!user) {
      errors.email = 'user not found';
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // create JWT payload
        jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        });
      }else {
        errors.password = 'password incorrect';
        res.status(400).json(errors);
      }
    });
  });
});

// @router  POST api/users/editprofile
// $desc    Edit profile
// @access  Private
router.post('/editprofile', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  const email = req.body.email;
  const name = req.body.name;
  User.findOne({_id: req.user._id}).then(user => { // at first we find the current user
    Link.find({ user: req.user.id}).then(links => { // then we find all the user's links
      // .find() , returns an array of objects. we map trough them and change the name of each object
      // make sure we use .save() correctly, therefore we prevent unhandled promise rejections

      // *** Using for() ***//
      // for (let i = 0;i < links.length;i++) {
      //   links[i].name = name
      //   links[i].save()
      // }

      // *** Using map() ***//
      links.map((link, index) => {
        // console.log(typeof link)
        link.name = name;
        link.save();
      });

      // Object.keys(links).map(function (key, index) {
      //   links[name] = name
      //   links[0].name=name
      // })

    });
    user.email = email;
    user.name = name;
    user.save().then(user => res.json(user)).catch(err => res.status(400).res.json(err));
  }).catch(err => res.status(400).json(err));
});

// @router  POST api/users/changepassword
// $desc    Change Password
// @access  Private

// tips: after we changed the password , we need to redirect the user into login page (logout the user)
router.post('/changepasswrod', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;

  User.findOne({_id: req.user._id}).then(user => {
    console.log(user);
    console.log(user.password);
    console.log(oldPassword);
    bcrypt.compare(oldPassword, user.password).then(isMatch => {
      if (isMatch) {
        console.log(isMatch);

        if (!(newPassword === confirmNewPassword)) {
          errors.newIsNotMatch = "new password and it's confirmation are not match";
          return res.status(400).json(errors);
        }  else {
          // newPassword
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user.save().then(user => res.json(user)).catch(err => res.json(err));
            });
          });
        }
      } else {
        console.log(isMatch);
        errors.oldPasswordIncorrect = 'old password is incorrect';
        return res.status(404).json(errors);
      }
    });
  });
});

// we can't show our user's data to everyone,
// so we need a profile model to specify what we want to show to all users

// @router  GET api/users/profiles
// $desc    Get all profiles (users)
// @access  Public
router.get('/profiles', (req, res) => {
  const errors = {};
  User.find()
    // .populate('user', ['name', 'avatar'])
    .sort({ date: -1 })
    .then(users => {
      if (!users) {
        errors.noUser = 'there is no user yet';
        res.status(404).json(errors);
      }

      // *******   Removing password and email from profiles   ******** //

      // for (let i = 0; i < users.length;i++) {
      //   delete users[i].password; // it doesn't work! why?
      //   users[i].password = null; // it works, but the property still exists
      //   console.log(users[i].password)
      //   console.log(delete users[i].password)
      // }

      users.map(user => {
        // console.log(user.password)
        delete user.password; // it doesn't work! why?
        user.password = null; // it works, but the property still exists 
        // console.log(delete users[i].password); // but this returns true, it means it deleted sth.
        user.email = null;
      });
      res.json(users);
    });
});

// @router  GET api/users/current
// $desc    Get Current
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar
  });
});

module.exports = router;
