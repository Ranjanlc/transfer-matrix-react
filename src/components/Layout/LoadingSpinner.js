import classes from './LoadingSpinner.module.css';
const LoadingSpinner = () => {
  return (
    <div className={classes.spinner}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
