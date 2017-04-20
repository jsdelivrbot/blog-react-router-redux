import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import App from './components/App';
import PostsIndex from './components/PostsIndex';
import PostsNew from './components/PostsNew';
import PostsShow from './components/PostsShow';

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={PostsIndex} />
        <Route path="/posts/new" component={PostsNew} />
        <Route path="/posts/:id" component={PostsShow} />
      </Route>
    </Router>
  );
};

// :id é passado para o component como this.props.params.id
