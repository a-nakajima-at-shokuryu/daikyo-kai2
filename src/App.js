import React from 'react';
import Logo from './Logo';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './containers/Main'; 

const App = () => {
  return (
    <Router>
      <Route exact path="/" render={() => <Logo to="/main"/>} />
      <Route path="/main" component={Main} />
    </Router>
  )
}

export default App
