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

export default expensesReducer;
