import { useContext } from 'react';
import CollegeContext from '../../store/college-context';

const EquivCourse = (props) => {
  const { college, course, courseMap } = useContext(CollegeContext);
};

export default EquivCourse;
