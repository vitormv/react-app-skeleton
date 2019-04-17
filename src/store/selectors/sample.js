import { createSelector } from 'reselect';

const simpleItemsSelector = state => state.sample.items;

const complexItemsSelector = createSelector(
    simpleItemsSelector,
    (...args) => Object.keys(...args),
);

export {
    simpleItemsSelector,
    complexItemsSelector,
};
