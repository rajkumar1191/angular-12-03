import { createReducer, on } from '@ngrx/store';
import { addFormData, clearFormData } from './form-data.actions';
import { FormDataItem } from './form-data.model';

export interface FormDataState {
  items: FormDataItem[];
}

export const initialFormDataState: FormDataState = {
  items: [],
};

export const formDataReducer = createReducer(
  initialFormDataState,
  on(addFormData, (state, { item }) => ({ ...state, items: [...state.items, item] })), 
  on(clearFormData, () => initialFormDataState)
);

/*

{
   items: [1,2,3,4,5]
}

on(addFormData, ({ items: [1,2,3,4,5]}, { 6 }) => ({items: [1,2,3,4,5, 6] }))


*/
