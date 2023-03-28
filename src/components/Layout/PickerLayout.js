import { Fragment, useEffect, useState } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './PickerLayout.module.css';
import Dropdown from './Dropdown';
const PickerLayout = (props) => {
  const { page, subscript, options, isCollege, nextClickHandler, isLoading } =
    props;
  const [isDisabled, setIsDisabled] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const buttonShowHandler = (val) => {
    setShowButton(val);
  };
  useEffect(() => {
    document.title = 'ECU Transfer Matrix | Pick College';
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.step}>
        Step <span className={classes['cur-page']}>{page}</span>/2 :
      </div>
      <div className={classes.subscript}>{subscript}</div>
      {props.children}
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Dropdown
          isCollege={isCollege}
          options={options}
          setDisabledHandler={(val) => {
            setIsDisabled(val);
          }}
          setButtonShow={buttonShowHandler}
        />
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
export default PickerLayout;
