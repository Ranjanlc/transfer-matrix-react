import { useContext, useEffect, useRef, useState } from 'react';
import CollegeContext from '../../store/college-context';
import classes from './Dropdown.module.css';
const Dropdown = ({ options, isCollege, setDisabledHandler }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [inputTop, setInputTop] = useState(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const {
    college: { name: collegeName },
    course: { name: courseName },
    valueChangeHandler,
  } = useContext(CollegeContext);
  console.log(options, isCollege);
  const selectedVal = isCollege ? collegeName : courseName;
  useEffect(() => {
    const { top } = inputRef.current.getBoundingClientRect();
    setDisabledHandler(collegeName.includes('Select'));
    setInputTop(top);
    document.addEventListener('click', toggle);
    return () => document.removeEventListener('click', toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => '');
    setDisabledHandler(false);
    valueChangeHandler(option.name, option.id, isCollege);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    if (e.target.className === classes.input) {
      e.target.select();
      // const curListEl = Array.from(listRef.current.children);
      // console.log(
      //   curListEl.findIndex((el) => el.className.includes(classes.selected)) <=
      //     0
      // );
      // curListEl.findIndex((el) => el.className.includes(classes.selected)) <=
      //   0 && curListEl[0].classList.add(classes.focused);
    }
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;
    return '';
  };

  const filter = (options) => {
    console.log(options);
    console.log(query.length);
    if (query.length === 0) return options;
    const filteredOptions = [];
    // THe surrounding brackets coz that is how we showed in the UI.
    const stateFilter =
      query === query.toUpperCase()
        ? options.filter((option) => option.name.endsWith(`(${query})`))
        : [];
    filteredOptions.push(stateFilter);
    const startFilter = options.filter((option) =>
      option.name.toLowerCase().startsWith(query.toLowerCase())
    );
    filteredOptions.push(startFilter);
    const includeFilter = options.filter((option) =>
      option.name.toLowerCase().includes(query.toLowerCase())
    );
    filteredOptions.push(includeFilter);
    const refinedFilteredOption = Array.from(new Set(filteredOptions.flat()));
    console.log(refinedFilteredOption);
    return refinedFilteredOption;
  };
  const arrowClickHandler = (e) => {
    if (e.target.className.includes(classes.open)) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  const keyDownHandler = (e) => {
    if (
      !(e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') ||
      !isOpen
    )
      return;
    const curListEl = Array.from(listRef.current.children);
    // For initial index,we get 0.
    let activeIndex = curListEl.findIndex((el) =>
      el.className.includes(classes.focused)
    );
    if (e.key === 'ArrowDown') {
      if (activeIndex < curListEl.length - 1) {
        activeIndex += 1;
        curListEl.forEach((el) => (el.classList = classes.option));
        const { top: listElTop } =
          curListEl[activeIndex].getBoundingClientRect();
        const heightDiff = Math.round(listElTop - inputTop);
        if (heightDiff > 200) {
          curListEl[activeIndex].scrollIntoView({
            behavior: 'smooth',
          });
        }
      }
    }
    if (e.key === 'ArrowUp') {
      if (activeIndex > 0) {
        activeIndex -= 1;
        curListEl.forEach((el) => (el.classList = classes.option));
        const { top: listElTop } =
          curListEl[activeIndex].getBoundingClientRect();
        const heightDiff = Math.round(listElTop - inputTop);
        // console.log(heightDiff);
        if (heightDiff < 10) {
          // console.log(curListEl[activeIndex]);
          // To address when we do up arrow at top of the list.
          curListEl[activeIndex - 4]
            ? curListEl[activeIndex - 4].scrollIntoView()
            : curListEl[activeIndex].scrollIntoView();
        }
      }
    }
    // To rule out the possibility that user doesnt choose anything from list.
    if (!curListEl[activeIndex]) return;
    valueChangeHandler(
      curListEl[activeIndex].textContent,
      curListEl[activeIndex].value,
      isCollege
    );
    curListEl[activeIndex].classList.add(classes.focused);
    if (e.key === 'Enter') {
      const selectedItem = listRef.current.children[activeIndex];
      // console.log(listRef.current.children[activeIndex].dataset.value);
      setQuery(() => '');
      setDisabledHandler(false);
      valueChangeHandler(
        selectedItem.textContent,
        selectedItem.dataset.value,
        isCollege
      );
      setIsOpen((isOpen) => !isOpen);
      inputRef.current.blur();
    }
  };

  return (
    <div className={classes.dropdown}>
      <div className={classes.control}>
        <div className={classes['selected-value']}>
          <input
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            autoComplete="off"
            className={classes.input}
            onChange={(e) => {
              setQuery(e.target.value);
              // console.log(selectedVal);
              valueChangeHandler(null, null, isCollege);
            }}
            onKeyDown={keyDownHandler}
            onClick={toggle}
          />
        </div>
        <div
          className={`${classes.arrow} ${isOpen ? classes.open : ''}`}
          onClick={arrowClickHandler}
        ></div>
      </div>
      <div
        className={`${classes.options} ${isOpen ? classes.open : ''}`}
        ref={listRef}
      >
        {filter(options).map((option, index) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={`${classes.option} ${
                option.name === selectedVal ? classes.focused : ''
              }`}
              key={`${index}`}
              data-value={option.id}
            >
              {option.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
