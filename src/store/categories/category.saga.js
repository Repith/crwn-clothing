import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

//call - (method, params) - turns function into effect (fires it as synchronous function)
//put - "dispatch" version for generator - standard async handler
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

//takeLatest (action, generator) - (what triggers, method to call)
//Fires only the latest action and discards all of the previous ones (even if they are not completed)
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

//all - run everything inside and only complete when all of it is done
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
