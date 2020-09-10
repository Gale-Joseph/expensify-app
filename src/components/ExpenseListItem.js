import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import numeral from 'numeral';

/*
    1. The purpose of this component is to: 
        a. create the html structure for displaying the details of each expense
        b. provide a way to remove an expense from the store
    2. This file will be imported and dipslayed by ExpenseList
    3. The props for this component are: 
        a. provided by <ExpenseList/> when an array of all expenses is mapped
        b. an expenses object from an array of expenses objects
    **Note: dispatch was able to be destructured because the expense object came with it 
        when mapStateProps created the expense {}

 */
const ExpenseListItem = ({ id, description, amount, createdAt}) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>
            {numeral(amount/100).format('$0,0.00')} 
            - 
            {moment(createdAt).format('MMMM Do, YYYY')}
        </p>       
    </div>

);

export default ExpenseListItem;