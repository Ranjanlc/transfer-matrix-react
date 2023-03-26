import { useContext, useEffect, useState } from 'react';
import CollegeContext from '../../store/college-context';
import classes from './CollegePicker.module.css';
const CoursePicker = (props) => {
  const [courseContainer, setCourseContainer] = useState(null);
  const {
    college: { value: collegeName, id: collegeId },
  } = useContext(CollegeContext);
  console.log(collegeName, collegeId);
  const fetchCourseContent = async () => {
    const res = await fetch(
      `http://localhost:8080/get-course?collegeId=${collegeId}`
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
    for (const i = 0; i < collegeCourses.length; i++) {
      courseMap.set(collegeCourses[i], {
        eqvtCourse: eqvtCourses[i],
        startDate: startDateContainer[i],
        endDate: endDateContainer[i],
        level: levels[i],
      });
    }
  };
  useEffect(() => {
    fetchCourseContent();
  }, []);
  // return (
  //   <div className={classes.container}>
  //     <div className={classes.step}> Step 1:</div>
  //     <div className={classes.subscript}>
  //       Please select the institution that you are transferring from
  //     </div>
  //     <Dropdown
  //       isCollege={true}
  //       options={college}
  //       setDisabledHandler={(val) => {
  //         setIsDisabled(val);
  //       }}
  //     />
  //     <button
  //       onClick={nextClickHandler}
  //       disabled={isDisabled}
  //       className={isDisabled ? classes.disabled : classes.abled}
  //     >
  //       Next
  //     </button>
  //   </div>
  // );
};

export default CoursePicker;
