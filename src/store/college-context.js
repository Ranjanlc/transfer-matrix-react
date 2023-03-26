import { useState } from 'react';
import React from 'react';
const CollegeContext = React.createContext({
  college: '',
  course: '',
  valueChangeHandler: (value, id, isCollege) => {},
});

export const CollegeContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [matchData, setMatchData] = useState([]);
  const existingCollegeContainer = localStorage.getItem('college');
  const existingCollege = existingCollegeContainer
    ? JSON.parse(localStorage.getItem('college'))
    : { value: 'Select college...', id: 369 };
  const existingCourseContainer = localStorage.getItem('college');
  const existingCourse = existingCourseContainer
    ? JSON.parse(localStorage.getItem('course'))
    : { value: 'Select course...', id: 369 };
  const [college, setCollege] = useState(existingCollege);
  // WE did this to avoid unnecesary api calls to the server.
  const [course, setCourse] = useState(existingCourse);
  const valueChangeHandler = (value, id, isCollege) => {
    const set = { value, id };
    if (isCollege) {
      localStorage.setItem('college', JSON.stringify(set));
      setCollege(set);
    } else {
      localStorage.setItem('course', JSON.stringify(set));
      setCourse(set);
    }
  };

  return (
    <CollegeContext.Provider
      value={{
        valueChangeHandler,
        course,
        college,
      }}
    >
      {props.children}
    </CollegeContext.Provider>
  );
};
export default CollegeContext;
