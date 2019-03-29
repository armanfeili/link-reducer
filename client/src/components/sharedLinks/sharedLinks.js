import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { getSharedLinks, addLikeToLink, deleteLikeFromLink } from '../../actions/linkActions';

// import classnames from 'classnames'
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';

class SharedLinks extends Component {
  constructor () {
    super();
    this.state = {
      like: {},
      errors: {}
    };

  // this.onChange = this.onChange.bind(this)
  // this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this.props.getSharedLinks();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  //   onLike (likes) {
  onLike (link) {
    // we want to see if the user liked the link before or not, if user id was in the link info
    // so we should show the liked button, if it wasn't we should show the like button

    let userId = this.props.auth.user.id;
    // console.log(userId)
    //   myArray.find(x => x.id === '45')
    // console.log(likes.find(x => x.user === userId))
    let userFound = link.likes.find(x => x.user === userId);
    if (userFound) {
      console.log('it found');
      this.props.deleteLikeFromLink(link._id);
    }else {
      console.log('it didnt found');
      this.props.addLikeToLink(link._id); // here is the problem
    }
    // for (let i = 0;i < likes.length;i++) {
    //   console.log(likes[i].user)
    //   if (userId === likes[i].user) {
    //     console.log('you liked that before')
    //   }else {
    //   }
    // }

    // console.log(typeof id)
    // console.log(id)
    // let x = Object.values(this.state.like).toString()
    // console.log(typeof x)
    // console.log(x)
    // console.log(this.state.like)

    // // if (this.state.like.findOne({like: id})) {

  // if (x === id) {
  //   console.log('it liked before')
  // } else {
  //   console.log('it liked now')
  //   this.setState({like: {id}})
  // }
  }

  // we want to find out if the user, liked the post or not
  // this function is for implementing classnames package
  findUserLike (likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      // if the user was in likes array
      return true;
    } else {
      return false;
    }
  }

  render () {
    const { errors } = this.state;

    const sharedLinks = this.props.link.sharedLinks ? this.props.link.sharedLinks : null;
    const sharedLoop = [];

    //   var x = 'some string'
    //   alert(x.charAt(0)); // alerts 's'

    if (sharedLinks !== null) {
      for (let i = 0; i < sharedLinks.length; i++) {
        // const firstLetter = users[i].name.split(' ')

        // let y = [] // array for first letters
        // let x // a container for getting first letters together
        // for (let i = 0;i < firstLetter.length;i++) {
        //   y[i] = firstLetter[i].charAt(0) // get first letter of words
        //   x = y.join('').toUpperCase() // put them together
        // }

        // // firstLetter.forEach((word, i) => {
        // //   y[i] = word.charAt(0)
        // //   x = y.join('').toUpperCase()
        // // })
        // let picture
        // let oneUser = this.props.auth.profiles[i]
        // if (oneUser.photo) {
        //   picture = (
        //     <div className='shared-avatar'>
        //       <div className='shared-avatar-name'>
        //         <img
        //           className='rounded-circle'
        //           src={`${oneUser.photo}` || `${oneUser.avator}`}
        //           alt={oneUser.name}
        //           style={{ width: '25px', marginRight: '5px' }}
        //           title='You must have a Gravatar connected to your email to display an image' />
        //       </div>
        //     </div>
        //   )
        // } else {
        //   picture = (
        //     <div className='shared-avatar'>
        //       <div className='shared-avatar-name'>
        //         {x}
        //       </div>
        //     </div>
        //   )
        // }

        sharedLoop[i] = (
          <li className='shared-item' key={sharedLinks[i]._id}>
            {/* <Avatar className='shared-avatar' size='70' name='Foo Bar' /> */}
            {/* {picture} */}
            <div className='shared-name-container'>
              <span className='shared-name'>{sharedLinks[i].name} :</span>
            </div>
            <a href={sharedLinks[i].textlink} className='shared-links-text'>
              {sharedLinks[i].textlink}
            </a>
            <button className='shared-likes' onClick={this.onLike.bind(this, sharedLinks[i])}>
              {this.findUserLike(sharedLinks[i].likes) ? < FaHeart className='shared-like' /> : < FaRegHeart className='shared-dislike' />}
              <p className='shared-like-number'>
                {' ' + sharedLinks[i].likes.length}
              </p>
            </button>
            <button className='shared-comments'>
              <Link to={`/comments/${sharedLinks[i]._id}`} className='shared-comments-text'> Comments
              </Link>
            </button>
          </li>
        );
      }
    }

    const SharedList = sharedLoop.map(link => {
      return link;
    });
    // console.log(this.props.auth)

    return (
      <div>
        <section className='shared-section'>
          <div className='shared-section-inner'>
            <h1 className=''>Shared Links</h1>
            <div className='shared-container'>
              <div className='shared-box'>
                <ul className='shared-list'>
                  {SharedList}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

SharedLinks.propTypes = {
  getSharedLinks: PropTypes.func.isRequired,
  addLikeToLink: PropTypes.func.isRequired,
  deleteLikeFromLink: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  link: state.link,
  errors: state.errors
});

export default connect(mapStateToProps, { getSharedLinks, addLikeToLink, deleteLikeFromLink})(withRouter(SharedLinks));
