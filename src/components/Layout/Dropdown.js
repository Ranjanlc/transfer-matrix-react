import { useContext, useEffect, useRef, useState } from 'react';
import CollegeContext from '../../store/college-context';
import classes from './Dropdown.module.css';
const Dropdown = ({
  options,
  isCollege,
  setDisabledHandler,
  setButtonShow,
  showNextPage,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  // To get height diff between input and viewport height
  const [inputTop, setInputTop] = useState(null);

  const inputRef = useRef(null);
  const listRef = useRef(null);
  const {
    college: { name: collegeName },
    courses,
    valueChangeHandler,
  } = useContext(CollegeContext);
  const courseName = courses[0].name;
  const selectedVal = isCollege ? collegeName : courseName;
  useEffect(() => {
    const { top } = inputRef.current.getBoundingClientRect();
    isCollege
      ? setDisabledHandler(collegeName.includes('Select'))
      : setDisabledHandler(courseName.includes('Select'));
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
    if (e.target === inputRef.current) {
      setIsOpen(true);
      e.target.select();
      const curListEl = Array.from(listRef.current.children);

      const containsFocusedEl = curListEl.some((el) =>
        el.className.includes(classes.focused)
      );
      // To remove focused class on first element,which is caused by the side-effect of having focused class on first element while doing keystrokes.
      if (containsFocusedEl) {
        curListEl[0].classList.remove(classes.focused);
      }
    }
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal && isCollege) return selectedVal;
    return 'Select...';
  };

  const filter = (options) => {
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
    if (!isOpen) return;
    const curListEl = Array.from(listRef.current.children);
    // For initial index,we get 0.
    let activeIndex = curListEl.findIndex((el) =>
      el.className.includes(classes.focused)
    );
    if (!(e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter')) {
      //Adding focused class on first element
      if (!curListEl.some((el) => el.className.includes(classes.focused))) {
        curListEl[0]?.classList?.add(classes.focused);
      }
      return;
    }
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
        // if (heightDiff < 4) {
        //   curListEl[activeIndex].scrollIntoView();
        // }
      }
    }
    if (e.key === 'ArrowUp') {
      if (activeIndex > 0) {
        activeIndex -= 1;
        curListEl.forEach((el) => (el.classList = classes.option));
        const { top: listElTop } =
          curListEl[activeIndex].getBoundingClientRect();
        const heightDiff = Math.round(listElTop - inputTop);
        console.log(heightDiff);
        if (heightDiff < 10) {
          // To address when we do up arrow,go back at top of the list.
          curListEl[activeIndex - 4]
            ? curListEl[activeIndex - 4].scrollIntoView()
            : curListEl[activeIndex].scrollIntoView();
        }
      }
    }
    // To rule out the possibility that user doesnt choose anything from list.
    if (!curListEl[activeIndex]) return;
    isCollege &&
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
  useEffect(() => {
    if (isOpen) {
      setButtonShow(false);
    } else {
      setButtonShow(true);
    }
  }, [isOpen]);

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
