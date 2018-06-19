// Ce fichier définit quels sont les events
// que nous allons envoyer, et avec quelles données

const increment = (by = 1) => ({
  type: 'INCREMENT',
  by,
});

const decrement = (by = 1) => ({
  type: 'DECREMENT',
  by,
});

module.exports = {
  increment,
  decrement,
};
