import { college } from '../../data/college';
import Dropdown from '../Layout/Dropdown';
import classes from './CollegePicker.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const CollegePicker = (props) => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const nextClickHandler = () => {
    console.log('yo execute bho ta??');
    navigate('/pick-course');
  };
  return (
    <div className={classes.container}>
      <div className={classes.step}> Step 1:</div>
      <div className={classes.subscript}>
        Please select the institution that you are transferring from
      </div>
      <Dropdown
        isCollege={true}
        options={college}
        setDisabledHandler={(val) => {
          setIsDisabled(val);
        }}
      />
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

export default CollegePicker;
