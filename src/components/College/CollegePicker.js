import { college } from '../../data/college';
// import Dropdown from '../Layout/Dropdown';
// import classes from './CollegePicker.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PickerLayout from '../Layout/PickerLayout';
const CollegePicker = (props) => {
  const navigate = useNavigate();
  const nextClickHandler = () => {
    navigate('/pick-course');
  };
  return (
    <PickerLayout
      page={1}
      subscript="Please select the institution that you are transferring from"
      isCollege={true}
      options={college}
      nextClickHandler={nextClickHandler}
    />
  );
};

export default CollegePicker;
