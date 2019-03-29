import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import { getLink, addLikeToLink, deleteLikeFromLink, addComment, deleteComment, addLikeToComment, deleteLikeFromComment } from '../../actions/linkActions';

// import classnames from 'classnames'
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

class Comment extends Component {
  constructor () {
    super();
    this.state = {
      like: {},
      comment: '',
      //   userFound: {},
      linkId: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount () {
    const particularLink = this.props.match.params.id;

    // this.setState({userId: this.props.auth.user.id})
    this.setState({linkId: particularLink});
    this.props.getLink(this.props.match.params.id);
  }
  //   componentDidUpdate () {
  //     // if (this.props.link.link) {
  //     //   this.props.getLink(this.props.match.params.id)
  //     // }
  //   }

  componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // id, commentData
  onSubmit (e) {
    e.preventDefault();
    const linkId = this.props.match.params.id;
    const text = { text: this.state.comment };
    this.props.addComment(linkId, text);
    this.setState({comment: ''});
  }
  onChange (e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //   onLike (likes) {
  onLike (link) {
    // we want to see if the user liked the link before or not, if user id was in the link info
    // so we should show the liked button, if it wasn't we should show the like button
    if (link) {
      let userId = this.props.auth.user.id;
      let userFound = link.likes.find(x => x.user === userId);
      if (userFound) {
        // console.log('it found-so liked before and we should delete it');
        this.props.deleteLikeFromLink(link._id);
      } else {
        // console.log("it didnt found-so it's new and we should add it");
        this.props.addLikeToLink(link._id); // here is the problem
      }
    }
    this.props.getLink(this.props.match.params.id);
  }

  onCommentLike (link, comment) {
    if (comment) {
      let userId = this.props.auth.user.id;
      let userFound = comment.likes.find(x => x.user === userId);

      if (userFound) {
        // console.log("it found-so liked before and we should delete it")
        this.props.deleteLikeFromComment(link._id, comment._id);
      } else {
        // console.log("it didnt found-so it's new and we should add it")
        this.props.addLikeToComment(link._id, comment._id); // here is the problem
      }
    }
  }

  onCommentDelete (commentId) {
    const linkId = this.props.match.params.id;
    const comment_id = commentId;
    // console.log(comment_id)
    const commentData = {id: linkId,comment_id: commentId};

    this.props.deleteComment(linkId, comment_id);
  }

  // we want to find out if the user, liked the post or not
  // this function is for implementing classnames package
  findUserLike (likes) {
    // console.log(likes)

    if (likes) {
      const { auth } = this.props;
      if (likes.filter(like => like.user === auth.user.id).length > 0) {
        // if the user was in likes array
        return true;
      } else {
        return false;
      }
    }
  }

  render () {
    const { errors} = this.state;
    const link = this.props.link.link;
    const commentList = this.props.link.link.comments
      ? this.props.link.link.comments
      : null;
    const commentLoop = [];

    if (!errors) {
      this.props.clearErrors();
    }

    if (commentList !== null) {
      for (let i = 0; i < commentList.length; i++) {
        commentLoop[i] = (
          <li className='comment-users-item' key={commentList[i]._id}>
            <span className='comment-second-name'>{commentList[i].name} :</span>
            <p className='comment-second-links-text'>
              {commentList[i].text}
            </p>
            <button className='comment-second-likes' onClick={this.onCommentLike.bind(this, link, commentList[i])}>
              {this.findUserLike(commentList[i].likes) ? (
                 <FaHeart className='comment-like' />
                 ) : (
                 <FaRegHeart className='comment-dislike' />
                 )}
              <p className='comment-like-number'>
                {' ' + commentList[i].likes.length}
                {/* {console.log(linkNumber)} */}
              </p>
            </button>
            {commentList[i].user === this.props.auth.user.id || link.user === this.props.auth.user.id ? (
               <button className='comment-second-delete' onClick={this.onCommentDelete.bind(this, commentList[i]._id)}>
                 <MdClose />
               </button>
               ) : null}
          </li>
        );
      }
    }

    const ShowAllComments = commentLoop.map(comment => {
      return comment;
    });
    //  // console.log(this.props.auth)
    // console.log(link)

    const likeNumber = this.props.link.link.likes
      ? this.props.link.link.likes.length
      : '-';
    return (
      <div>
        <section className='comment-section'>
          <div className='comment-section-inner'>
            <h1 className=''>Comments</h1>
            <div className='comment-container'>
              <div className='comment-box'>
                <ul className='comment-list'>
                  {/* {SharedList} */}
                  <li className='comment-item' key={link._id}>
                    {/* <Avatar className='shared-avatar' size='70' name='Foo Bar' /> */}
                    {/* {picture} */}
                    <div className='comment-name-container'>
                      <span className='comment-name'>{link.name} :</span>
                    </div>
                    <a href={link.textlink} className='comment-links-text'>
                      {link.textlink}
                    </a>
                    <button className='comment-likes' onClick={this.onLike.bind(this, link)}>
                      {this.findUserLike(link.likes) ? (
                         <FaHeart className='comment-like' />
                         ) : (
                         <FaRegHeart className='comment-dislike' />
                         )}
                      <p className='comment-like-number'>
                        {' ' + likeNumber}
                        {/* {console.log(linkNumber)} */}
                      </p>
                    </button>
                  </li>
                  <li className='comment-list-item' key={link._id + 1}>
                    <form action='' onSubmit={this.onSubmit}>
                      <button className='comment-send'>
                        send
                      </button>
                      <TextFieldGroup
                        type='text'
                        name='comment'
                        placeholder='Write a comment here...'
                        className='comment-text'
                        value={this.state.comment}
                        onChange={this.onChange}
                        error={errors.text} />
                    </form>
                  </li>
                </ul>
              </div>
            </div>
            <div className='comment-users-container'>
              <div className='comment-users-box'>
                <ul className='comment-users-list'>
                  {ShowAllComments}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Comment.propTypes = {
  getLink: PropTypes.func.isRequired,
  addLikeToLink: PropTypes.func.isRequired,
  deleteLikeFromLink: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  addLikeToComment: PropTypes.func.isRequired,
  deleteLikeFromComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  link: state.link,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    getLink,
    addLikeToLink,
    deleteLikeFromLink,
    addComment,
    deleteComment,
    addLikeToComment,
  deleteLikeFromComment}
)(withRouter(Comment));

// <div className="comment-users-container">
//     <div className="comment-users-box">
//         <ul className="comment-users-list">
//             {/* {SharedList} */}
//             <li className="comment-users-item">
//                 <span className="comment-second-name">{link.name} :</span>
//                 <p className="comment-second-links-text">
//                     Oh your link is so short !!!
//                     </p>
//                 <button
//                     className="comment-second-likes"
//                     onClick={this.onLike.bind(this, link)}
//                 >
//                     {this.findUserLike(link.likes) ? (
//                         <FaHeart className="comment-like" />
//                     ) : (
//                             <FaRegHeart className="comment-dislike" />
//                         )}
//                     <p className="comment-like-number">
//                         {" " + likeNumber}
//                         {/* {console.log(linkNumber)} */}
//                     </p>
//                 </button>
//             </li>
//         </ul>
//     </div>
//     <div className="comment-second-users-box">
//         <ul className="comment-second-users-list">
//             <li className="comment-second-users-item">
//                 <span className="comment-second-name">{link.name} :</span>
//                 <p className="comment-second-links-text">
//                     Jesus ,What? =))
//                     </p>

//                 <button
//                     className="comment-second-likes"
//                     onClick={this.onLike.bind(this, link)}
//                 >
//                     {this.findUserLike(link.likes) ? (
//                         <FaHeart className="comment-like" />
//                     ) : (
//                             <FaRegHeart className="comment-dislike" />
//                         )}
//                     <p className="comment-like-number">
//                         {" " + likeNumber}
//                         {/* {console.log(linkNumber)} */}
//                     </p>
//                 </button>
//             </li>
//         </ul>
//     </div>
// </div>
