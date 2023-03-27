import { useState } from 'react';
import React from 'react';
const CollegeContext = React.createContext({
  college: { name: '' },
  course:{name:''},
  valueChangeHandler: (value, id, isCollege) => {},
  courseMap: new Map(),
  setCourseMapHandler: (courseMapContainer) => {},
});

export const CollegeContextProvider = (props) => {
  const existingCourseJSON = localStorage.getItem('courseMap');
  const existingCourseMap = existingCourseJSON
    ? new Map(JSON.parse(existingCourseJSON))
    : new Map();
  const [courseMap, setCourseMap] = useState(existingCourseMap);
  // const existingCollegeContainer = localStorage.getItem('college');
  // const existingCollege = existingCollegeContainer
  //   ? JSON.parse(localStorage.getItem('college'))
  //   : { value: 'Select college...', id: 369 };
  // const existingCourseContainer = localStorage.getItem('college');
  // const existingCourse = existingCourseContainer
  //   ? JSON.parse(localStorage.getItem('course'))
  //   : { value: 'Select course...', id: 369 };
  const [college, setCollege] = useState({ name: 'Select' });
  // WE did this to avoid unnecesary api calls to the server.
  const [course, setCourse] = useState({ name: 'Select' });
  const valueChangeHandler = (value, id, isCollege) => {
    const set = { name: value, id };
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
    const mapJSON = JSON.stringify(Array.from(courseMapContainer.entries()));
    localStorage.setItem('courseMap', mapJSON);
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
