import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

/* 1. The purpose of this component is to: 
        a.render a form for adding an expense and editing expenses
        b. submit the form and update store according to state of Expense form
    2. This file will be imported and dipslayed by AddExpensePage.js
    3. AddExpense page provides a prop: 
        a. The prop is a function belonging to onSubmit prop
        b. The prop submits the argument for dispatch to add expense to store
        c. The prop then changes the route to homepage after form is submitted
    4. This is not a stateless component
*/

class ExpenseForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            description: props.expense? props.expense.description: '',
            note: props.expense ? props.expense.note : '',
            amount:props.expense ? (props.expense.amount/100).toString() :  '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    }

    onDescriptionChange =(e)=>{
        const description = e.target.value;
        this.setState(()=>({description}));
    };
    onNoteChange=(e)=>{
        const note = e.target.value;
        this.setState(()=>({note}));
    };
    onAmountChange=(e)=>{
        const amount = e.target.value;
        if(!amount||amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(()=>({amount}));
        }
    }
    //this only allows returns if a date was picked
    onDateChange = (createdAt) => {
        if(createdAt){
            this.setState(()=>({createdAt}));
        }
       
    }
    onFocusChange = ({focused}) => {
        console.log("focus has changed")
        console.log(focused)
        this.setState(()=>({
            calendarFocused: focused
        }));
    }
    //the "e" argument is provided by JSX onSubmit prop on form
    onSubmit = (e)=>{
        e.preventDefault();//prevents page refresh on submit

        if(!this.state.description || !this.state.amount){
            const error = 'Please provide description and amount'
            this.setState(()=>({error}));
        }else{
            this.setState(()=>({error:''}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount,10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note:this.state.note
            })
        }
    }

    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder="Description"
                        autoFocus 
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date = {this.state.createdAt}
                        onDateChange = {this.onDateChange}
                        focused = {this.state.calendarFocused}
                        onFocusChange = {this.onFocusChange}
                        numberOfMonths = {1}
                        isOutsideRange={()=> false}
                    />
                    <textarea
                        placeholder="This is placeholder text"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}

export default ExpenseForm;