import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Head = () => (
  <ul className="navigation">
    <li><Link to="/">Home</Link></li>
    <li><Link to="/record">Record</Link></li>
    <li><Link to="/create">Create</Link></li>
    <li><a href="http://54.244.38.56/tpt">TpT Page</a></li>
  </ul>
)

export default Head;
