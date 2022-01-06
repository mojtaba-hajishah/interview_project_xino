import { useState } from 'react';
import './index.css';
import Card from './Card';

// list of cards
const list = [
  {
    id: 0,
    label: 'Liking',
    number: 100,
    fromDate: '2020/09/10',
    toDate: '2020/09/10',
  },
  {
    id: 1,
    label: 'Liking',
    number: 100,
    fromDate: '2020/09/10',
    toDate: '2020/09/10',
  },
];

/**
 * Generates a new id based on current list of cards
 * to keep an incremental set of IDs
 *
 * @param {array} list
 * @returns {number}
 */
function generateID(list) {
  try {
    return list[list.length - 1].id + 1;
  } catch (error) {
    return 0;
  }
}

function Cards() {
  // let's assume the cards list is passed down as a prop
  const [data, setData] = useState(list);

  // adds a new card to the list
  function addNewCard() {
    setData((prevState) => {
      // generate a new id
      const newID = generateID(prevState);

      // for testing purposes
      console.log(`A new card (#${newID}) added.`);

      return [
        ...prevState,
        {
          id: newID,
          label: 'Liking',
          number: 100,
          fromDate: '2020/09/10',
          toDate: '2020/09/10',
        },
      ];
    });
  }

  // removes a card by id
  function deleteCard(id) {
    setData((prevState) => {
      return prevState.filter((c) => c.id !== id);
    });
    // for testing purposes
    console.log(`Card #${id} removed.`);
  }

  // if list is empty
  if (data.length === 0) {
    return (
      <div className="empty-list">
        <p>Tap on the create button to add a new card.</p>
        <button onClick={addNewCard}>Create</button>
      </div>
    );
  }
  // otherwise
  return (
    <div className="cards">
      {data.map((c) => (
        <Card key={c.id} data={c} onAdd={addNewCard} onDelete={deleteCard} />
      ))}
    </div>
  );
}

export default Cards;
