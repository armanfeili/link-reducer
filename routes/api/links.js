const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Link = require('../../models/Link');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys.js');
const passport = require('passport');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'Users works' });
});

// @route   GET api/users/
// @desc    Reduce a link
// @access  Public
router.post('/', (req, res) => {
  const link = req.body.link;
// reduce the link
});

// @route   POST api/links/dashboard
// @desc    Save a link
// @access  Public
router.post('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  const linkComming = req.body.linkComming; // the link we want to save
  // reduce the link
  // res.json('it works')
  User.findOne({ _id: req.user._id}).then(user => {

    Link.findOne({ user: req.user.id, textlink: linkComming}).then(link => { // check if the link is already exists
      // Link.findOne({ textlink: linkComming}).then(link => { // check if the link is already exists
      if (link) {
        errors.textlink = 'this link is already saved';
        return res.status(400).json(errors);
      }else {
        const newLink = new Link({
          name: req.user.name,
          textlink: linkComming,
          user: req.user.id,
          avatar: req.user.avatar
        });

        // links.map((link, index) => {
        //   console.log(index)
        //   console.log(typeof link)

        user.links += 1;
        user.save();
        newLink.save().then(link => res.json(link)).catch(err => res.json(err));
      }
    });
  });
});

// // @route   POST api/links/dashboard
// // @desc    Save a link
// // @access  Public
// router.post('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
//   const errors = {}
//   const linkComming = req.body.linkComming // the link we want to save
//   // reduce the link
//   // res.json('it works')

//   User.findOne({ _id: req.user._id }).then(user => {
//     // Profile.findOne({ user: req.user.id}).then(profile => {
//     // Profile.findOne({ _id: req.user._id}).then(profile => {

//     Link.findOne({ user: req.user.id, textlink: linkComming }).then(link => { // check if the link is already exists
//       // Link.findOne({ user: req.profile.id, textlink: linkComming}).then(link => { // check if the link is already exists
//       // Link.findOne({ textlink: linkComming}).then(link => { // check if the link is already exists
//       if (link) {
//         errors.textlink = 'this link is already saved'
//         return res.status(400).json(errors)
//       } else {
//         const newLink = new Link({
//           name: req.user.name,
//           textlink: linkComming,
//           user: req.user.id,
//           avatar: req.user.avatar
//         })

//         // links.map((link, index) => {
//         //   console.log(index)
//         //   console.log(typeof link)
//         // console.log(profile)

//         user.links += 1
//         user.save()
//         newLink.save().then(link => res.json(link)).catch(err => res.json(err))
//       }
//     })
//   })
// })
// @route   GET api/links/dashboard
// @desc    show user's links
// @access  Private
router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  User.findOne({ _id: req.user._id}).then(user => {
    console.log(user);

    Link.find({user: req.user.id})
      .sort({ date: -1 })
      // .populate('user', ['name', 'avatar']) // everyone should be able to see just the user's name and user's avatar, not id
      .then(links => {
        if (links.length === 0) {
          errors.noLinks = 'there is no links to show';
          return res.status(404).json(errors);
        }

        res.json(links);
      }).catch((err) => {
      res.status(400).json({links: "can't get the links"});
    });
  });
});

// @route   POST api/links/share/:id
// @desc    Share a link
// @access  Private
router.post('/share/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  User.findOne({ _id: req.user._id }).then(user => {
    Link.findById(req.params.id).then(link => { // check if the link is already exists
      console.log(link);
      link.shared = true;

      link.save().then(link => res.json(link)).catch(err => res.json(err));
    });
  });
});

// @route   Get api/links/sharedlinks
// @desc    Show the shared links
// @access  Private - we made it private so anyone who has user, like,dislike,comment it
router.get('/sharedlinks', passport.authenticate('jwt', { session: false }), (req, res) => {
  // here>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  Link.find({shared: true}).then(links => {
    if (!links) {
      errors.sharedLink = 'There is no shared links yet.';
      res.status(404).json(errors);
    } else {
      res.json(links);
    }
  });
});

// @route   Get api/links/sharedlinks
// @desc    Show the shared links
// @access  Private

module.exports = router;

// 5c6931ad8cd9c3869ef734fb amin
// 5c69318f8cd9c3869ef734fa arman
// 5c6931ad8cd9c3869ef734fb amin 
