import { useState } from 'react';
import React from 'react';
const CollegeContext = React.createContext({
  college: { name: '' },
  courses: [{ name: '' }],
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
  const exisintgCourseContainer = localStorage.getItem('course');
  const existingCourses = exisintgCourseContainer
    ? JSON.parse(exisintgCourseContainer)
    : [{ name: 'Select' }];
  const [courses, setCourses] = useState(existingCourses);
  const valueChangeHandler = (value, id, isCollege) => {
    // To make sure that all ids are int
    const set = { name: value, id: parseInt(id) };
    if (isCollege) {
      localStorage.setItem('college', JSON.stringify(set));
      /// On changing college,we clear up previous course.
      if (set.name !== college.name) {
        localStorage.removeItem('course');
        localStorage.removeItem('courseMap');
        setCourseMap(new Map());
        setCourses([{ name: 'Select' }]);
      }
      ///
      setCollege(set);
    } else {
      // console.log(set);
      if (value.includes('Select')) return;
      setCourses((prevCourse) => {
        // console.log(prevCourse[0].name.includes('Select'), id);
        // To avoid pushing select in the array and creating new array on the fly.
        if (prevCourse[0].name.includes('Select')) {
          localStorage.setItem('course', JSON.stringify([set]));
          return [set];
        }
        // To prevent user select same course twice.
        if (prevCourse.some((el) => el.name === set.name)) {
          localStorage.setItem('course', JSON.stringify(prevCourse));
          return prevCourse;
        }
        localStorage.setItem('course', JSON.stringify([set, ...prevCourse]));
        return [set, ...prevCourse];
      });
    }
  };
  const setCourseMapHandler = (courseMapContainer) => {
    setCourseMap(courseMapContainer);
    const mapJSON = JSON.stringify(Array.from(courseMapContainer.entries()));
    localStorage.setItem('courseMap', mapJSON);
  };
  const coursesChangeHandler = (courseSet) => {
    // courseSet is checked for empty array and set it to with name attribute coz without it,it would cause error.
    const finalCourseSet =
      courseSet.length === 0 ? [{ name: 'Select' }] : courseSet;
    localStorage.setItem('course', JSON.stringify(finalCourseSet));
    setCourses(finalCourseSet);
  };

  return (
    <CollegeContext.Provider
      value={{
        valueChangeHandler,
        courses,
        college,
        courseMap,
        setCourseMapHandler,
        coursesChangeHandler,
      }}
    >
      {props.children}
    </CollegeContext.Provider>
  );
};
export default CollegeContext;
