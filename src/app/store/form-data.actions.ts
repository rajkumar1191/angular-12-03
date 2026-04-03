import { createAction, props } from '@ngrx/store';
import { FormDataItem } from './form-data.model';

export const addFormData = createAction('[Form] Add Data', props<{ item: FormDataItem }>());
export const clearFormData = createAction('[Form] Clear Data');
