import React from 'react';
import { connect } from 'react-redux';
import {DateRangePicker} from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';


/*
    1. The purpose of this component is to: 
        a. provide an input field to change filter state
    2. This file will be imported by ExpenseDashBoardPage
    3. The props for this component are: 
        a. provided by mapStateToProps
        b. an object with one member where name = an object containing all filters
        b. The default state of filters is set up in the filter reducer
    **Note 1: The value={props.filters.text} was a teaching fail and unnecessary 
    **Note 2: onChange passes the typed input as argument automatically; we supply parameter

*/
class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };
    onDatesChange = ({startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };
    onFocusChange = (calendarFocused) => {
        this.setState(()=>({ calendarFocused}));
    }
    render(){
        return(
                <div>
                    <input 
                        type="text"  
                        value={this.props.filters.text} 
                        onChange={(e)=>{
                            this.props.dispatch(setTextFilter(e.target.value))
                        
                    }}/>
                    <select 
                        value={this.props.filters.sortBy}
                        onChange={(e)=>{
                            if(e.target.value==='date'){
                                this.props.dispatch(sortByDate())                   
                            }
                            if(e.target.value==='amount'){
                                this.props.dispatch(sortByAmount())
                            }
                        }
                    }>
                        <option value="date">Date</option>
                        <option value="amount">Amount</option>
                    </select>
                    <DateRangePicker
                        startDate = {this.props.filters.startDate}
                        endDate={this.props.filters.endDate}
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        showClearDates={true}
                        numberOfMonths={1}
                        isOutsideRange={()=>false}
                        
                    />
                </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

export default connect(mapStateToProps)(ExpenseListFilters);