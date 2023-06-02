import { createSelector } from "reselect";

import { RootState } from "../store";

import { CategoriesState } from "./category.reducer";

import { CategoryMap } from "./category.types";
//Taking out the categories value from state
const selectCategoryReducer = (state: RootState): CategoriesState =>
  state.categories;

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
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

//Changes made because reduce always returns a new object so it triggers rerender

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
