import { createSlice } from '@reduxjs/toolkit';

const localListSlice = createSlice({
    name: 'localLists',
    initialState: {
        lists: [],
    },
    reducers: {
        addList: (state, { payload }) => ({
            ...state,
            lists: [
                ...state.lists,
                {
                    ...payload,
                    protected: false,
                },
            ],
        }),
        deleteList: (state, { payload }) => {
            const newList = state.lists.filter(({ key }) => key !== payload);
            return {
                lists: newList,
            };
        },
    },
});

const { actions, reducer } = localListSlice;
const { addList, deleteList } = actions;
export { addList, deleteList };
export default reducer;
