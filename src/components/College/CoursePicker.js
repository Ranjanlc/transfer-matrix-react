import { useContext, useEffect, useState } from 'react';
import CollegeContext from '../../store/college-context';
import classes from './CollegePicker.module.css';
import Dropdown from '../Layout/Dropdown';
import LoadingSpinner from '../Layout/LoadingSpinner';
const CoursePicker = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const {
    college: { value: collegeName, id: collegeId },
    course,
    setCourseMapHandler,
  } = useContext(CollegeContext);
  const [courseContainer, setCourseContainer] = useState(
    course.id ? course.value : []
  );
  const { value: finalCollegeName, id: finalCollegeId } = collegeId
    ? { value: collegeName, id: collegeId }
    : JSON.parse(localStorage.getItem('college'));
  console.log(finalCollegeId, finalCollegeName);
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
    const courseMap = new Map();
    const courses = [];
    for (let i = 0; i < collegeCourses.length; i++) {
      courseMap.set(collegeCourses[i], {
        eqvtCourse: eqvtCourses[i],
        startDate: startDateContainer[i],
        endDate: endDateContainer[i],
        level: levels[i],
      });
      courses.push({ id, name: collegeCourses[i] });
    }
    setCourseContainer(courses);
    // console.log(setCourseMapHandler);
    setCourseMapHandler(courseMap);
    setIsLoading(false);
  };
  useEffect(() => {
    if (courseContainer.length === 0) {
      fetchCourseContent();
    }
  }, []);
  const nextClickHandler = () => {};
  return (
    <div className={classes.container}>
      <div className={classes.step}> Step 2:</div>
      <div className={classes.subscript}>Select a course from :</div>
      <div className={classes.uni}>{finalCollegeName.split('-')[0]}</div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Dropdown
          isCollege={false}
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
