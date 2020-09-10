export default (expenses)=>{
  return expenses.map((expense)=>expense.amount/100)
    .reduce((sum,value)=>sum+value,0);
};