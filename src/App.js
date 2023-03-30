import { useState, useRef, Fragment } from 'react';
import CollegePicker from './components/College/CollegePicker';
import { Navigate, Route, Routes } from 'react-router-dom';
import logo from './assets/ecu-logo.png';
import classes from './App.module.css';
import CoursePicker from './components/College/CoursePicker';
import EquivCourse from './components/Result/EquivCourse';
function App() {
  return (
    <Fragment>
      <header className={classes.header}>
        <img src={logo} className={classes.logo} />
        <span className={classes.title}>ECU Transfer Matrix</span>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/pick-college" />} />
        <Route path="/pick-college" element={<CollegePicker />} />
        <Route path="/pick-course" element={<CoursePicker />} />
        <Route path="/equivalent-course" element={<EquivCourse />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
