import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';

import Home from './components/home/home.component';
import Header from './components/header/header.component';
import PropertyDetail from './components/propertyDetails/propertyDetail.component';

function App() {
  return (
    <div className="App">
      <Header/>
      {/* <PropertyDetail></PropertyDetail> */}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/:id' component={PropertyDetail}></Route>
    </div>
  );
}

export default App;
