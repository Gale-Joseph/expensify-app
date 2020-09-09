import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

/*
    1. The purpose of this component is to: 
        a. Print the list of expenses one at a time
    2. This file will be imported and dipslayed by ExpenseListDashboardPage
    3. The props for this component are: 
        a. provided by mapStateToProps()
        b. an object with one member where name=expenses and the value is a filtered array of expenses
    **Note 1: When returning components, you need to provide a key
    **Note 2: the {...expense} means an object containing all the members 
        or key-value pairs of current expense on map routine. 
        Each event is just {id: value,description:value, etc}
 */

const ExpenseList = (props) => (    
    <div>
        <h1>Expense List</h1>       
        {props.expenses.map((expense)=>{
            return <ExpenseListItem key={expense.id} {...expense}/>            
        })}
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);
