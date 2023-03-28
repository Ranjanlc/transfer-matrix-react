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
/*
const App = () => {
  const [isListOpen, setIsListOpen] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const handleKeyDown = (event) => {
    // guard clause for ruling out errors
    if (
      !(
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp' ||
        event.key === 'Enter'
      ) ||
      !isListOpen
    )
      return;
    const curListEl = Array.from(listRef.current.children);
    // For initial index,we get 0.
    let activeIndex = curListEl.findIndex((el) => el.className === 'focused');
    if (event.key === 'ArrowDown') {
      console.log(curListEl);
      if (activeIndex < curListEl.length - 1) {
        activeIndex += 1;
        curListEl.forEach((el) => (el.classList = ''));
      }
    }
    if (event.key === 'ArrowUp') {
      if (activeIndex > 0) {
        activeIndex -= 1;
        curListEl.forEach((el) => (el.classList = ''));
      }
    }
    curListEl[activeIndex].classList.add('focused');
    if (event.key === 'Enter') {
      const selectedItem = listRef.current.children[activeIndex];
      console.log(`Selected item: ${selectedItem.innerText}`);
      setIsListOpen(false);
    }
  };

  const handleInputClick = () => {
    setIsListOpen(true);
  };

  return (
    <div>
      <input
        type="text"
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />

      {isListOpen && (
        <div>
          <ul ref={listRef}>
            <li className="focused">List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};
*/
export default App;
