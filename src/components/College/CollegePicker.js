import { college } from '../../data/college';
import Dropdown from '../Layout/Dropdown';
import classes from './CollegePicker.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const CollegePicker = (props) => {
  const [showButton, setShowButton] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const buttonShowHandler = (val) => {
    setShowButton(val);
  };
  const nextClickHandler = () => {
    navigate('/pick-course');
  };
  return (
    <div className={classes.container}>
      <div className={classes.step}>
        Step <span className={classes['cur-page']}>1</span>/2 :
      </div>
      <div className={classes.subscript}>
        Please select the institution that you are transferring from
      </div>
      <Dropdown
        isCollege={true}
        options={college}
        setButtonShow={buttonShowHandler}
        showNextPage={nextClickHandler}
        setDisabledHandler={(val) => {
          setIsDisabled(val);
        }}
      />
      {showButton && (
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

export default CollegePicker;
