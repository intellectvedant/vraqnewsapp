import logo from './logo.svg';
import './App.css';
import Navbar from '../src/components/Navbar';

import React, { useState} from 'react'
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App = () =>{
  const apikey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0);

    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Routes>
        <Route path="/general" element={<News setProgress={setProgress} apikey={apikey} key="general" pageSize={10} country="in" category="general"/>} />
          <Route path="/business" element={<News setProgress={setProgress} apikey={apikey} key="business" pageSize={10} country="in" category="business" />} />
          <Route path="/health" element={<News setProgress={setProgress} apikey={apikey} key="health" pageSize={10} country="in" category="health" />} />
          <Route path="/technology" element={<News setProgress={setProgress} apikey={apikey} key="technology" pageSize={10} country="in" category="technology" />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key="entertainment" pageSize={10} country="in" category="entertainment" />} />
          <Route path="/sports" element={<News setProgress={setProgress} apikey={apikey} key="sports" pageSize={10} country="in" category="sports" />} />
          <Route path="/politics" element={<News setProgress={setProgress} apikey={apikey} key="politics" pageSize={10} country="in" category="politics" />} />
          <Route path="/science" element={<News setProgress={setProgress} apikey={apikey} key="science" pageSize={10} country="in" category="science" />} />
        </Routes>
        </Router>
      </div>
    )
}

export default App;