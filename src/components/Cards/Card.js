import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './Card.css';
import { ReactComponent as AddIcon } from '../../images/add.svg';

/**
 * click outside hook
 * listens to clicks outside of the given card,
 * if a click event occurs, it will collapses the card,
 * if it was previously expanded
 *
 * @param {object} ref
 * @param {boolean} expandState
 * @param {function} callback
 */
function useOutsideAlerter(ref, expandState, callback) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && expandState) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, expandState]);
}

function Card({ data, onAdd, onDelete }) {
  const { id, label, number, fromDate, toDate } = data;

  // hover & expand states
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // on mouse enter
  const onMouseEnter = () => {
    if (expanded) return;
    setHovered(true);
  };

  // on mouse leave
  const onMouseLeave = () => {
    if (expanded) return;
    setHovered(false);
  };

  // on add button click
  const onAddButtonClick = () => {
    // do not trigger focus state
    buttonRef.current.blur();
    // expand card
    setExpanded(true);
  };

  // click outside callback
  const onOutsideClick = () => {
    // collapse card
    setExpanded(false);
    // reset hover state
    setHovered(false);
  };

  // click outside listener
  const cardRef = useRef(null);
  useOutsideAlerter(cardRef, expanded, onOutsideClick);

  // add button ref
  const buttonRef = useRef(null);

  // on card face click
  const onCardFaceClick = () => {
    // trigger focus if hovered and not expanded
    if (hovered && !expanded) {
      buttonRef.current.focus();
    }
  };

  // on delete button click
  const onDeleteClick = () => onDelete(id);

  // on add button click
  const onAddClick = () => onAdd();

  return (
    <div
      ref={cardRef}
      className="card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        role="button"
        tabIndex={-1}
        ref={buttonRef}
        className={clsx(
          'card__button',
          hovered && 'card__button--expanded',
          expanded && 'card__button--active'
        )}
        onClick={onAddButtonClick}
      >
        <AddIcon
          className={clsx(
            'card__button__icon',
            expanded && 'card__button__icon--active'
          )}
        />
      </div>
      <div className="card__face" onClick={onCardFaceClick}>
        <div className="card__face__tags">
          <div className="card__face__tag">
            <span>boost</span>
          </div>
        </div>

        <div className="card__face__info">
          <span className="card__face__label">{label}</span>
          <span className="card__face__number">{number}</span>
        </div>
      </div>
      <div
        className={clsx('card__content', expanded && 'card__content--expanded')}
      >
        <button
          onClick={onAddClick}
          className="card__content__button card__content__button--create"
        >
          create boost
        </button>

        <div className="card__content__date">
          <p className="card__content__date__title">
            <span>Date Period</span>
          </p>

          <div className="card__content__date__picker">
            <label>Pick Date Range:</label>
            <div className="card__content__date__picker__dates">
              <input defaultValue={fromDate} />
              <span>TO</span>
              <input defaultValue={toDate} />
            </div>
          </div>
        </div>
        <button
          onClick={onDeleteClick}
          className="card__content__button card__content__button--remove"
        >
          remove
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    fromDate: PropTypes.string.isRequired,
    toDate: PropTypes.string.isRequired,
  }),
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Card;
