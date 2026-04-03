import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormDataState } from './form-data.reducer';

const getFormDataState = createFeatureSelector<FormDataState>('formData');

export const selectFormDataItems = createSelector(getFormDataState, (state) => state?.items ?? []);
