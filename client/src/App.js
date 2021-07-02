import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Components and Screens
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './components/user/Register'
import Login from './components/user/Login'
import Profile from './components/user/Profile'
import EditProfile from './components/user/EditProfile'
import EditUser from './components/admin/EditUserFromAdmin'

import Index from './screens/Index'
import Admin from './screens/Admin'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Route exact path="/" component={Index} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/edit" component={EditProfile} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/editFromAdmin/:id" component={EditUser} />

        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
/*

*/