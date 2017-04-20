import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { fetchPost, deletePost } from '../actions/index';


class PostsShow extends Component {
  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }
  render() {
    const { post } = this.props;

    if (!post) {
      return (
        <div className="ajax-spinner" />
      );
    }
    return (
      <div>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
        <Link to="/" className="btn btn-primary">Post List</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={() => {
            this.props.deletePost(this.props.params.id).then(() => {
              browserHistory.replace('/');
            });
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

PostsShow.propTypes = {
  fetchPost: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
  post: React.PropTypes.object,
  deletePost: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
