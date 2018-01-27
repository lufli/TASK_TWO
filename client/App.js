import React from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Form from './components/Form';
import Question from './components/Question';
import Record from './components/Record';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Question} />
          <Route path="/record" component={Record} />
          <Route path="/create" component={Form} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;