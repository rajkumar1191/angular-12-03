import { formDataReducer, initialFormDataState } from './form-data.reducer';
import { addFormData, clearFormData } from './form-data.actions';

describe('formDataReducer', () => {
  it('should add item', () => {
    const item = { name: 'Alice', email: 'alice@example.com', age: 30, agree: true };
    const nextState = formDataReducer(initialFormDataState, addFormData({ item }));
    expect(nextState.items.length).toBe(1);
    expect(nextState.items[0]).toEqual(item);
  });

  it('should clear items', () => {
    const state = { items: [{ name: 'Bob', email: 'bob@example.com', age: 40, agree: false }] };
    const nextState = formDataReducer(state, clearFormData());
    expect(nextState.items).toEqual([]);
  });
});
