import React from 'react';
import css from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { filters } from '../../redux/filter/filter.reducer';

const Filter = ({ value }) => {
  const dispatch = useDispatch();
  const changeFilter = event => {
    dispatch(filters(event.target.value));
  };
  return (
    <form className={css.filterContainer}>
      <label className={css.filterLabel}>
        <p className={css.filterLabelText}>Find contacts by name: </p>
        <input
          placeholder="Search contacts"
          type="text"
          className={css.filterInput}
          name="filter"
          value={value}
          onChange={changeFilter}
        ></input>
      </label>
    </form>
  );
};

export default Filter;
