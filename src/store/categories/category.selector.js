import { createSelector } from "reselect";

//Taking out the categories value from state
const selectCategoryReducer = (state) => state.categories;

//createSelector is a memoaized selector
//Gets array of input selector [] - what I want from Redux to be used
//Output selector () => - what I want from selector to be memoized
//It runs only if there is a change
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

//Selector keeps value as long as state.categories.categories does not change
//It doesn't rerun reduce method and just simply gives back the previous calculated value
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

//Changes made because reduce always returns a new object so it triggers rerender
