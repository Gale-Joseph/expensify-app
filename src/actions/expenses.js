import uuid from 'uuid';

export const addExpense = (
    //parameters: takes in an object with these values and these defaults if no value
    { 
        description = '', 
        note='',
        amount=0,
        createdAt=0
    }={}
)=>({
    //this is what gets returned
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});
//REMOVE_EXPENSE
export const removeExpense = ({id}={}) => ({
    type: 'REMOVE_EXPENSE',
    id
});
//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})