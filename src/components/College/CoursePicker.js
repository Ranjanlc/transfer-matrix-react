import { useContext, useEffect, useState } from 'react';
import CollegeContext from '../../store/college-context';
import classes from './CollegePicker.module.css';
import Dropdown from '../Layout/Dropdown';
import LoadingSpinner from '../Layout/LoadingSpinner';
const CoursePicker = (props) => {
  console.log('runned course picker??');
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const {
    college: { name: collegeName, id: collegeId },
    setCourseMapHandler,
    courseMap,
  } = useContext(CollegeContext);
  const [courseContainer, setCourseContainer] = useState([{ name: '' }]);
  // course.id ? { value: course.value, id: course.id } : { value: [] }

  const { name: finalCollegeName, id: finalCollegeId } = collegeId
    ? { name: collegeName, id: collegeId }
    : JSON.parse(localStorage.getItem('college'));
  console.log(finalCollegeId, finalCollegeName, courseMap, courseContainer);
  // useEffect(() => {
  //   console.log('oi run bhayena');

  // }, []);
  const fetchCourseContent = async () => {
    setIsLoading(true);
    const res = await fetch(
      `http://localhost:8080/get-course?collegeId=${finalCollegeId}`
    );
    const { course } = await res.json();
    const {
      _id: id,
      collegeType,
      collegeCourses,
      eqvtCourses,
      startDateContainer,
      endDateContainer,
      levels,
    } = course;
    console.log(id, eqvtCourses, startDateContainer);
    const courseMapContainer = new Map();
    for (let i = 0; i < collegeCourses.length; i++) {
      courseMapContainer.set(collegeCourses[i], {
        eqvtCourse: eqvtCourses[i],
        startDate: startDateContainer[i],
        endDate: endDateContainer[i],
        level: levels[i],
      });
    }
    // console.log(setcourseMapContainerHandler);
    const courses = Array.from(courseMapContainer.keys()).map(
      (course, index) => {
        return { name: course, id: index };
      }
    );
    setCourseContainer(courses);
    setCourseMapHandler(courseMapContainer);
    setIsLoading(false);
  };
  useEffect(() => {
    console.log('run bHOO');
    const courses = Array.from(courseMap.keys()).map((course, index) => {
      return { name: course, id: index };
    });
    console.log(courses);
    setCourseContainer(courses);
    if (courseMap.size === 0) {
      fetchCourseContent();
    }
  }, []);
  const nextClickHandler = () => {
    // console.log('ki yo execute bhoooo');
  };
  return (
    <div className={classes.container}>
      <div className={classes.step}> Step 2:</div>
      <div className={classes.subscript}>Select a course from :</div>
      <div className={classes.uni}>{finalCollegeName.split('-')[0]}</div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Dropdown
          isCollege={false}
          // courseMap.keys return mapIterator,which is converted to array
          options={courseContainer}
          setDisabledHandler={(val) => {
            setIsDisabled(val);
          }}
        />
      )}
      <button
        onClick={nextClickHandler}
        disabled={isDisabled}
        className={isDisabled ? classes.disabled : classes.abled}
      >
        Next
      </button>
    </div>
  );
};

export default CoursePicker;
