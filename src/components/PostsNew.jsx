import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link, browserHistory } from 'react-router';
import { createPost } from '../actions/index';


class PostsNew extends Component {
  onSubmit(props) {
    this.props.createPost(props).then(() => {
      browserHistory.push('/')
    })
  }

  render() {
// props passadas pelo redux-form:
    const { fields: { title, categories, content }, handleSubmit } = this.props;
// elas precisam ser inseridas no form e nos inputs/textareas:
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a new Post</h3>
        <div
          className={`form-group ${title.touched && title.invalid ? 'has-danger' : null}`}
        >
          <label htmlFor="Title">Title</label>
          <input id="Title" type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : null}
          </div>
        </div>
        <div
          className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : null}`}
        >
          <label htmlFor="Categories">Categories</label>
          <input id="Categories" type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : null}
          </div>
        </div>
        <div
          className={`form-group ${content.touched && content.invalid ? 'has-danger' : null}`}
        >
          <label htmlFor="Content">Content</label>
          <textarea id="Content" className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : null}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title';
  }
  if (!values.categories) {
    errors.categories = 'Enter a category';
  }
  if (!values.content) {
    errors.content = 'Enter a content';
  }

  return errors
}

PostsNew.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  createPost: React.PropTypes.func.isRequired,
};

// reduxForm define a Application State de acordo com a inserção dos dados pelo
// usuário, por isso que ele é inserido no reducer/index.js como 'form'.
// redux-form é igual ao connect, logo podemos passar os actions creators nele:

// connect: 1º argumento = mapStateToProps; 2º argumento = mapDispatchToProps;
// redux-form: 1º argumento = form config; 2º argumento = mapStateToProps;
// 3º argumento = mapDispatchToProps;

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate,
}, null, { createPost })(PostsNew);
