const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({

  // Our 'links' model has its user field set to an ObjectId.
  // The ref option is what tells Mongoose which model to use during population, in our case the users model.
  // All _ids we store here must be document _ids from the users model.

  user: {
    type: Schema.Types.ObjectId, // with this, we have the same id for a user in both User object and Links.user object
    ref: 'users' // it means the referance of this object, is 'users' collection
  },
  text: {
    type: String,
    required: true
  },
  // name is not the things that we want user to input, they will come from ObjectID
  name: {
    type: String
  },
  avatar: {
    type: Schema.Types.String,
    ref: 'users'
  },
  photo: {
    type: String, // ????????? or maybe Object?!
  },
  likes: [
    {
      user: { // once they like,their user id (ObjectId) will go into this array
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Comment = mongoose.model('comments', CommentsSchema);
