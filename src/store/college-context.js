import { useState } from 'react';
import React from 'react';
const CollegeContext = React.createContext({
  college: { value: '' },
  course: { value: '' },
  valueChangeHandler: (value, id, isCollege) => {},
  courseMap: new Map(),
  setCourseMapHandler: (courseMapContainer) => {},
});

export const CollegeContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [courseMap, setCourseMap] = useState(null);
  // const existingCollegeContainer = localStorage.getItem('college');
  // const existingCollege = existingCollegeContainer
  //   ? JSON.parse(localStorage.getItem('college'))
  //   : { value: 'Select college...', id: 369 };
  // const existingCourseContainer = localStorage.getItem('college');
  // const existingCourse = existingCourseContainer
  //   ? JSON.parse(localStorage.getItem('course'))
  //   : { value: 'Select course...', id: 369 };
  const [college, setCollege] = useState({ value: 'Select' });
  // WE did this to avoid unnecesary api calls to the server.
  const [course, setCourse] = useState({ value: 'Select' });
  const valueChangeHandler = (value, id, isCollege) => {
    const set = { value, id };
    if (isCollege) {
      localStorage.setItem('college', JSON.stringify(set));
      setCollege(set);
    } else {
      console.log('ekchoti ta run bhayo');
      localStorage.setItem('course', JSON.stringify(set));
      setCourse(set);
    }
  };
  const setCourseMapHandler = (courseMapContainer) => {
    setCourseMap(courseMapContainer);
  };

  return (
    <CollegeContext.Provider
      value={{
        valueChangeHandler,
        course,
        college,
        courseMap,
        setCourseMapHandler,
      }}
    >
      {props.children}
    </CollegeContext.Provider>
  );
};
export default CollegeContext;
