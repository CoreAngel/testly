import { createSlice } from '@reduxjs/toolkit';
import { loaderItems } from 'static/loader';

const addedListReducer = createSlice({
    name: 'addedList',
    initialState: {
        items: loaderItems,
        index: loaderItems.length,
    },
    reducers: {
        addList: (state, { payload }) => {
            const item = {
                ...payload,
                id: state.index,
            };

            const isAddedBefore = state.items.find(({ key }) => key === payload.key);
            if (isAddedBefore) {
                return state;
            }

            return {
                ...state,
                items: [...state.items, item],
                index: state.index + 1,
            };
        },
        deleteList: (state, { payload }) => ({
            ...state,
            items: state.items.filter(({ key }) => key !== payload),
        }),
    },
});

const { actions, reducer } = addedListReducer;
const { addList, deleteList } = actions;
export { addList, deleteList };
export default reducer;
