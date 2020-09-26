// OUTSOURCE IMPORT
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
// LOCAL IMPORT
import { Header } from './cmps/Header';
import { Player } from './cmps/Player';
import { BoxApp } from './pages/BoxApp';
import { BoxDetails } from './pages/BoxDetails';
import { BoxAdd } from './pages/BoxAdd';
import { Home } from './pages/Home';
// import { UserDetails } from './pages/UserDetails';

class _App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route component={BoxAdd} path="/box/add" />
            <Route component={BoxDetails} path="/box/details/:boxId" />
            {/* <Route component={UserDetails} path="/user/:id" /> */}
            {/* <Route component={Signup} path="/login" /> */}
            <Route component={BoxApp} path="/box" />
            <Route component={Home} path="/" />
          </Switch>
        </main>
        <Player />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
  }
}
const mapDispatchToProps = {
}
export const App = connect(mapStateToProps, mapDispatchToProps)(_App);