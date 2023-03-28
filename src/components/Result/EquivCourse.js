import { useContext, useEffect, useRef } from 'react';
import CollegeContext from '../../store/college-context';
import classes from './EquivCourse.module.css';
import { Link } from 'react-router-dom';
const EquivCourse = (props) => {
  const { college, courses, courseMap } = useContext(CollegeContext);
  const { name: collegeName } = college;
  let totalCreditHour = 0;
  useEffect(() => {
    document.title = 'ECU Transfer Matrix | Eqvt Course';
  }, []);
  const displayCollegeName = collegeName.includes('Select')
    ? JSON.parse(localStorage.getItem('college')).name.split('-')[0]
    : collegeName.split('-')[0];
  console.log(displayCollegeName, courseMap);

  const tableContent = courses.map((course) => {
    const { name: courseName } = course;
    const { startDate, endDate, eqvtCourse, level, creditHour } =
      courseMap.get(courseName);
    totalCreditHour += creditHour;
    const refinedStartDate =
      startDate === '' || creditHour === 0
        ? 'TBD'
        : new Date(startDate).toLocaleString('en-US', {
            day: 'numeric',
            month: '2-digit',
            year: 'numeric',
          });
    const refinedEndDate =
      endDate === '' || creditHour === 0
        ? 'TBD'
        : new Date(endDate).toLocaleString('en-US', {
            day: 'numeric',
            month: '2-digit',
            year: 'numeric',
          });
    const refinedEqvtCourse =
      creditHour === 0 ? `No equivalent course` : `${eqvtCourse}(${level})`;
    return (
      <tr className={creditHour === 0 ? classes['no-eqvt-course'] : ''}>
        <td className={classes['first-column']}>{courseName}</td>
        <td>{refinedEqvtCourse}</td>
        <td>{refinedStartDate}</td>
        <td>{refinedEndDate}</td>
        <td className={classes['last-column']}>{creditHour}</td>
      </tr>
    );
  });
  return (
    <div className={classes.container}>
      <header className={classes.header}>If you have taken</header>
      <article className={classes.course}> following courses from</article>
      <article className={classes.college}>{displayCollegeName},</article>
      <div className={classes.offer}>
        ECU offers following equivalent courses for your courses:
      </div>
      <table cellPadding="5" align="center" className={classes.table}>
        <thead>
          <tr className={classes['table-header']}>
            <th className={classes['first-column']}>Your Course</th>
            <th>ECU Course</th>
            <th>Start Semester</th>
            <th>End Semester</th>
            <th className={classes['last-column']}>Credit Hour</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
          {/* <tr>
            <td colSpan={4}>Total Credit Hours</td>
            <td>6</td>
          </tr> */}
        </tbody>
      </table>
      <article className={classes.credit}>
        Your total credit hour adds up to{' '}
        <span className={classes.hour}>{totalCreditHour}</span>.
      </article>
      <Link className={classes.link} to="/pick-course">
        Pick another course from {displayCollegeName}
      </Link>
      <Link className={classes.link} to="/pick-college">
        Pick a different institution
      </Link>
    </div>
  );
};

export default EquivCourse;
