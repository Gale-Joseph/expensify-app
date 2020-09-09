import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {addExpense} from '../actions/expenses.js'

/*  1. The purpose of this component is to: 
        a. render the form created at ExpenseForm on on the "Add Expense" page       
    2. This component is higher on the chain and is rendered by Route and AppRouter
    3. Route/AppRouter provide lots of props: 
        a. dispatch,history,location, match which allows us to set up the onSubmit prop
        b. The onSubmit prop will be used in ExpenseForm when the onSubmit fx in ExpenseForm is called
        c. AddExpense page uses props from Route/AppRouter and uses properties from those props to 
            create props to pass down to ExpenseForm
*/

const AddExpensePage = (props) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm 
            onSubmit={(expense)=>{
                props.dispatch(addExpense(expense));
                props.history.push('/');
            }}
        />
    </div>
);

export default connect()(AddExpensePage);