const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Link = require('../../models/Link');
const Comment = require('../../models/Comment');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const keys = require('../../config/keys.js')
const passport = require('passport');

const validateCommentInput = require('../../validation/comment');

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
// @access  Private
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

// @route   DELETE api/links/dashboard
// @desc    delete a link
// @access  Private
router.delete('/dashboard/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  User.findOne({ _id: req.user._id }).then(user => {
    Link.findById(req.params.id).then(link => { // check if the link is already exists
      // Check for post owner
      if (link.user.toString() !== req.user.id) { // post.user is an id and not string, so we used toString()
        // user is << user: req.user.id >> 
        return res.status(404).json({ notauthorized: 'User not authorized' });
      }

      // Delete
      link.delete().then(() => res.json({ success: true }));
    });
  });
});

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

// @route   POST api/links/unshare/:id
// @desc    unShare a link
// @access  Private
router.delete('/unshare/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  User.findOne({ _id: req.user._id }).then(user => {
    Link.findById(req.params.id).then(link => { // check if the link is already exists
      // if (!link) {
      //   errors.notExist = 'we have no such this link to share'
      //   res.status(404).json(errors)
      // }
      console.log(link);
      link.shared = false;

      link.save().then(link => res.json(link)).catch(err => res.json(err));
    });
  });
});

// @route   Get api/links/sharedlinks
// @desc    Show the shared links
// @access  Private - we made it private so anyone who has user, like,dislike,comment it
router.get('/sharedlinks', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Link.find({shared: true}).then(links => {
    if (links.length === 0) {
      errors.sharedLink = 'There is no shared links yet.';
      res.status(404).json(errors);
    } else {
      res.json(links);
    }
  });
});

// @route   POST api/links/like/:id
// @desc    like a link
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findOne({_id: req.user._id}).then(user => {
    Link.findById(req.params.id).then(link => {
      if (link.likes.filter(like => like.user.toString() === req.user.id).length > 0) { // check if likes array has the id of this user
        return res.status(400).json(alreadyliked = 'User already liked this link');
      }

      // Add user id to likes array - likes array is an array of users (who liked the post).
      link.likes.unshift({ user: req.user.id }); // each like has it's own _id and user(id)
      link.save().then(post => res.json(post));
    })
      .catch(err => res.status(404).json(err));
  });
});

// @route   DELETE api/links/unlike/:id
// @desc    unlike a link
// @access  Private
router.delete('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findOne({ _id: req.user._id }).then(user => {
    Link.findById(req.params.id).then(link => {
      if (link.likes.filter(like => like.user.toString() === req.user.id).length === 0) { // check if likes array has the id of this user
        return res.status(400).json(alreadyliked = 'You have not yet liked this post.');
      }

      // Get remove index -> which link we want to unlike
      const removeIndex = link.likes.map(item => item.user.toString()).indexOf(req.user.id);
      // Splice out of array
      link.likes.splice(removeIndex, 1);
      // save to DB
      link.save().then(link => res.json(link));
    })
      .catch(err => res.status(404).json(err));
  });
});

// @route   POST api/links/comments/:id'
// @desc    add comment to a link
// @access  Private
router.post('/comments/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body); // we pass all the req.body into validation file
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.find({ _id: req.user._id }).then(user => {
    Link.findOne({_id: req.params.id}).then(link => {
      const newComment = new Comment({
        user: req.user.id,
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar,
        photo: req.user.photo
      });

      // add to comments array
      link.comments.unshift(newComment);

      link.save()
        .then(link => res.json(link))
        .catch(err => res.status(400).json(err));
    });
  });
});

// @route   DELETE api/links/comments/:id/:comment_id'
// @desc    delete a comment from a particular link
// @access  Private
router.delete('/comments/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.find().then(users => { // who wants to delete comment
    Link.findById(req.params.id).then(link => { // which link contains this comment
      if (link.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ commentnotexists: 'Comment does not exist' });
      }

      let linkCreator = null;
      let commentOwner = null;
      // users.map(user => { // we don't need to loop through users, 

      // if the user id of this link is equall to id of payload, this user has created this link
      // so he has the accessibility of deleting this comment
      if (link.user.toString() === req.user.id) {
        console.log('linkCreator');
        linkCreator = req.user.id;
      }

      // if the user id of this comment is equall to user id of payload, this user, has created this comment before
      // so he has the accessibility of deleting this comment
      link.comments.map(comment => {
        if (comment.user.toString() === req.user.id && comment._id.toString() === req.params.comment_id) {
          console.log('commentOwner');
          commentOwner = req.user.id;
        }
      });
      // })
      if (commentOwner !== null || linkCreator !== null) {
        const removeIndex = link.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

        link.comments.splice(removeIndex, 1);

        link.save().then(link => res.json(link));
      } else {
        res.status(404).json("you don't have permission to delete this post");
      }
    }).catch(err => res.status(400).json(err));
  });
});

// @route   POST api/links/comments/like/:id/:comment_id
// @desc    like a comment
// @access  Private
router.post('/comments/like/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findOne({ _id: req.user._id }).then(user => {
    Link.findById(req.params.id).then(link => {

      link.comments.map(comment => {
        if (comment._id.toString() === req.params.comment_id) {
          if (comment.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json(alreadyliked = 'User already liked this comment');
          }
          // Add user id to likes array - likes array is an array of users (who liked the post).
          comment.likes.unshift({ user: req.user.id }); // each like has it's own _id and user(id)
          link.save().then(link => res.json(link));
        }
      });
    })
      .catch(err => res.status(404).json(err));
  });
});

// @route   DELETE api/links/comments/unlike/:id/:comment_id
// @desc    unlike a comment
// @access  Private
router.delete('/comments/unlike/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findOne({ _id: req.user._id }).then(user => {
    Link.findById(req.params.id).then(link => {

      link.comments.map(comment => {
        if (comment._id.toString() === req.params.comment_id) {
          if (comment.likes.filter(like => like.user.toString() === req.user.id).length === 0) { // check if likes array has the id of this user
            return res.status(400).json(alreadyliked = 'You have not yet liked this post.');
          }

          // Get remove index -> which link we want to unlike
          const removeIndex = comment.likes.map(item => item.user.toString()).indexOf(req.user.id);
          // Splice out of array
          comment.likes.splice(removeIndex, 1);
          // save to DB
          link.save().then(link => res.json(link));
        }
      });
    })
      .catch(err => res.status(404).json(err));
  });
});

module.exports = router;

// 5c6bf25c3b4b29abd3b6e689 arman
// 5c6bf25c3b4b29abd3b6e689 user
// 5c6bf25c3b4b29abd3b6e689 arman
// 5c6bf24d3b4b29abd3b6e687 hossein
