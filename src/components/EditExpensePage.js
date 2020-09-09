import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense,removeExpense} from '../actions/expenses';

/*  1. The purpose of this component is to: 
        a. render an expense which can then be edited
    2. This component is rendered by ExpenseListItem through a <Link>
    3. Route/AppRouter provide lots of props: 
        a. We will use the props.match.params.id since this info is passed 
*/

const EditExpensePage = (props) => {
    return (
        <div>
           <ExpenseForm 
            expense={props.expense}
            onSubmit={(expense)=>{
                //dispatch and redirect to dashboard page
                props.dispatch(editExpense(props.expense.id,expense));
                props.history.push('/');                
            }}
           />
           <button onClick={()=>{
            props.dispatch(removeExpense({id:props.expense.id}));
            props.history.push('/');
        }}>Remove</button>
        </div>
    );
}

const mapStateToProps = (state, props) => {
    return{
        expense: state.expenses.find((expense) => expense.id===props.match.params.id)
    }
};

export default connect(mapStateToProps)(EditExpensePage);