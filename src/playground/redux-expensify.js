import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

//################# ACTION GENERATORS ##################
//these become dispatch arguments
//ADD_EXPENSE
const addExpense = (
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
const removeExpense = ({id}={}) => ({
    type: 'REMOVE_EXPENSE',
    id
});
//EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})
//SET_TEXT_FILTER
const setTextFilter = (text='')=>({
    type: 'SET_TEXT_FILTER',
    text
})
//SORT_BY_DATE
const sortByDate = () =>({
    type: 'SORT_BY_DATE',
    
})
//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
    
})
//SET_START_DATE
const setStartDate = (startDate = undefined)=>({
    type: 'SET_START_DATE',
    startDate
})
//SET_END_DATE
const setEndDate = (endDate = undefined)=>({
    type: 'SET_END_DATE',
    endDate
})

//################## REDUCERS ##################
//Reducers are functions that take arguments(action generators) from dispatch and return a value for state
const expsensesReducerDefaultState = [];

//add a state default for the first time it's called, otherwise, use current state
const expensesReducer = (state = expsensesReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({id})=>(
                id !==action.id
            ));
        case 'EDIT_EXPENSE':
            return state.map((expense)=>{
                if(expense.id===action.id){
                    return { 
                        ...expense,
                        ...action.updates
                    }
                }else{
                    return expense;
                }
            }) 
        default:
            return state;
    }

};

//filters reducer
const filterReducersDefaultState = {text:'',sortBy:'date',startDate:undefined,endDate:undefined};
const filtersReducer = (state=filterReducersDefaultState,action)=>{
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text            
            };
        case 'SORT_BY_DATE':
            return{
                ...state,
                sortBy: 'date'
            };
        case 'SORT_BY_AMOUNT':
            return{
                ...state,
                sortBy: 'amount'
            };
        case 'SET_START_DATE':
            return{
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return{
                ...state,
                endDate: action.endDate
            }      
        default:
            return state;
    }
}

//############### STORE CREATION #######################
//This is the mother object whose state gets modified
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);
//track changes/filter
//get visible expenses: 
const getVisibleExpenses = (expenses, {text,sortBy,startDate,endDate}) => {
    return expenses.filter((expense)=>{
        const startDateMatch = typeof startDate!=='number'||expense.createdAt>=startDate;
        const endDateMatch = typeof endDate !=='number'||expense.createdAt <=endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b)=>{
        if(sortBy==='date'){
            return a.createdAt < b.createdAt ? 1: -1;
        }
        if(sortBy=='amount'){
            return a.amount < b.amount ? 1: -1
        }
    })
}
store.subscribe(()=>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses,state.filters)
    console.log(visibleExpenses);
    console.log('new object: ', store.getState())
});

//############## DISPATCH FUNCTIONS ####################
//Dispatch functions are a method of the store object that takes in action generators
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 66, createdAt: -1000}));
const expenseTwo = store.dispatch(addExpense({ description: 'Groceries', amount: 666, createdAt: -21000}));

// store.dispatch(removeExpense({ id: expenseOne.expense.id}))
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500}))

// store.dispatch(setTextFilter('gro'))
// store.dispatch(setTextFilter(''))
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(-2000));
// store.dispatch(setStartDate())

// store.dispatch(setEndDate(1250));


//################## Demo STATE (never used, just reference) ######################
const demoState = {
    expenses: [{
        id: 'adf;jk',
        description: 'January Rent',
        note:'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters:{
        text: 'rent',
        sortBy: 'date', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};
