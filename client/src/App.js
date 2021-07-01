import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Components and Screens
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './components/user/Register'
import Login from './components/user/Login'
import Profile from './components/user/Profile'

import Index from './screens/Index'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Route exact path="/" component={Index} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
