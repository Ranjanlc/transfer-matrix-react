import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import CollegeContext from '../../store/college-context';
import classes from './CollegePicker.module.css';
import particularClasses from './CoursePicker.module.css';
import Dropdown from '../Layout/Dropdown';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import CloseBtn from '../../assets/CloseBtn';
const CoursePicker = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    college: { name: collegeName, id: collegeId },
    courses,
    setCourseMapHandler,
    courseMap,
    coursesChangeHandler,
  } = useContext(CollegeContext);
  const [courseContainer, setCourseContainer] = useState([{ name: '' }]);
  const [selectedCourses, setSelectedCourses] = useState(courses);
  const selectedCoursesRef = useRef(null);
  const { name: finalCollegeName, id: finalCollegeId } = collegeId
    ? { name: collegeName, id: collegeId }
    : JSON.parse(localStorage.getItem('college'));

  const [showButton, setShowButton] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const buttonShowHandler = (val) => {
    setShowButton(val);
  };
  const fetchCourseContent = async () => {
    setIsLoading(true);
    const res = await fetch(
      `https://transfer-matrix.onrender.com/get-course?collegeId=${finalCollegeId}`
    );
    const { course } = await res.json();
    const {
      _id: id,
      collegeCourses,
      eqvtCourses,
      startDateContainer,
      endDateContainer,
      levels,
      creditHours,
    } = course;
    // console.log(id, eqvtCourses, startDateContainer);
    const courseMapContainer = new Map();
    for (let i = 0; i < collegeCourses.length; i++) {
      courseMapContainer.set(collegeCourses[i], {
        eqvtCourse: eqvtCourses[i],
        startDate: startDateContainer[i],
        endDate: endDateContainer[i],
        level: levels[i],
        creditHour: creditHours[i],
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
  useMemo(() => {
    setSelectedCourses(courses);
  }, [courses]);
  useEffect(() => {
    document.title = 'ECU Transfer Matrix | Pick Course';
    const courseContainer = Array.from(courseMap.keys()).map(
      (course, index) => {
        return { name: course, id: index };
      }
    );
    setCourseContainer(courseContainer);
    // We fetch the content every time college changes and courseMap is set to zero in context,when college is changed.
    if (courseMap.size === 0) {
      fetchCourseContent();
    }
  }, [finalCollegeId]);
  const nextClickHandler = () => {
    navigate('/equivalent-course');
  };
  const closeClickHandler = (id) => {
    const newSelectedCourses = selectedCourses.filter((el) => el.id !== id);
    console.log(newSelectedCourses);
    if (newSelectedCourses.length === 0) {
      setIsDisabled(true);
    }
    coursesChangeHandler(newSelectedCourses);
  };
  const selectedCoursesContainer = selectedCourses.map(
    ({ name, id }, index) => {
      if (name.includes('Select')) {
        return (
          <div className={particularClasses.fallback}>
            You haven't selected any course yet{' '}
            {/* The dots to enable animations */}
            <span className={particularClasses.dot}></span>
            <span className={particularClasses.dot}></span>
            <span className={particularClasses.dot}></span>
          </div>
        );
      }
      if (!name.includes('Select')) {
        return (
          <div className={particularClasses.course} key={index}>
            {name}
            <CloseBtn onClick={closeClickHandler.bind(null, id)} />
          </div>
        );
      }
    }
  );
  return (
    <div className={classes.container}>
      <div className={classes.step}>
        Step <span className={classes['cur-page']}>2</span>/2 :
      </div>
      <div className={classes.subscript}>Please pick a course from:</div>
      <div className={particularClasses.uni}>
        {finalCollegeName.split('-')[0]}
      </div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Dropdown
          isCollege={false}
          options={courseContainer}
          setDisabledHandler={(val) => {
            setIsDisabled(val);
          }}
          setButtonShow={buttonShowHandler}
        />
      )}
      {showButton && !isLoading && (
        <article
          className={particularClasses['courses-container']}
          ref={selectedCoursesRef}
        >
          <div className={particularClasses.title}>Your courses</div>
          {selectedCoursesContainer}
        </article>
      )}
      {showButton && !isLoading && (
        <button
          onClick={nextClickHandler}
          disabled={isDisabled}
          className={isDisabled ? classes.disabled : classes.abled}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default CoursePicker;
