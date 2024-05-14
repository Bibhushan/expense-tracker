// import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { Grid } from '@mui/material';
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr"
import { AddBalanceModal, AddExpenseModal } from './Modals';
import { ExpenseBarChart, ExpensesPieChart } from './ExpenseCharts';
import ExpenseItem from './ExpenseItem';

function App() {

  const [balance, setBalance] = useState(5000);
  const [expenses, setExpenses] = useState([
                                    {title:'Initial Movie', price:300, category:'Entertainment', date:'2024-01-01'},
                                    {title:'Initial Hotel', price:125, category:'Food', date:'2024-01-01'},
                                    {title:'Initial Taxi', price:75, category:'Travel', date:'2024-01-01'}
                                  ]);

  const [editExpense, setEditExpense] = useState({id:null, expense:{title:null, price:null, category:null, date:null}});
  // const [editExpenseID, setEditExpenseID] = useState(null);

  const [addBalance, setAddBalance] = useState(false);
  const [addExpense, setAddExpense]= useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentExpenses, setCurrentExpenses] = useState([...expenses]);

  const lastPage = Math.ceil(expenses.length/3);

  const getItemIndex = (indexOnPage)=>{
    return (currentPage-1)*3 + indexOnPage;
  }

  const openAddExpense =()=>{
    if (balance > 0){
      setAddExpense(true);
    }
    else {
      enqueueSnackbar('Cannot add expense as there is no balance left.')
    }    
  }
  
  const closeAddExpense = ()=>{
    setAddExpense(false);
    setEditExpense({id:null, expense:{title:null, price:null, category:null, date:null}});
  }

  const addNewExpense = (newExpense)=>{
    let tempExps = [...expenses];
    console.log('edit id is ', editExpense);
    
    if (editExpense.id !== null){
      setBalance(balance + editExpense.expense.price)
      tempExps.splice(editExpense.id,1)
    }

    tempExps.push(newExpense);
    tempExps.sort((first, second)=>first.date>second.date ? -1 : 1);
    setExpenses(tempExps);
    closeAddExpense();
    setBalance(balance-newExpense.price);
  }

  const openAddBalance = ()=>{
    console.log('edit expense is ', editExpense);
    setAddBalance(true);
  }

  const closeAddBalance = ()=>{
    setAddBalance(false);
  }

  const addNewIncome = (amount)=>{
    setBalance(balance+amount);
    closeAddBalance();
  }

  const handlePageChange = (newPage)=>{
    setCurrentPage(newPage);    
  }

  useEffect(()=>{
    const startItem=(currentPage-1)*3;
    setCurrentExpenses(expenses.slice(startItem, startItem+3));
  }, [expenses, currentPage])

  const handleExpenseDelete = (index)=>{
    // if (editExpenseID){
      console.log('editing item index ', index);
      let currExpenses = [...expenses];
      setBalance(balance+currExpenses[index].price);
      currExpenses.splice(index, 1);
      setExpenses(currExpenses);
    // }
    // else {
    //   (console.log('Cannot delete as edit index is not set'));
    // }
  } 

  const handleExpenseEdit = (index)=>{       
    setEditExpense({id:index, expense:expenses[index]});
    // setEditExpense(expenses[editExpenseID]);
    // openAddExpense();
  }

  useEffect(()=>{
    console.log('edit index set to ', editExpense);    
    setAddExpense(editExpense.id !== null);
  }, [editExpense])

  return (
    <div className="App">
      <SnackbarProvider />
      <>
        <h1 padding='2rem'>Expense Tracker</h1>        
        <Grid container spacing={1} className='top-box' justify='space-between'>        
          <Grid item xs={4} >
            <div className='top-box-item'>
              <p 
                style={{fontSize:30, padding:'0.5rem', margin:0}}
              > 
                Wallet Balance:
                  <span 
                    style={{color:'#9DFF5B', fontWeight:'bold'}}>{" ₹" + balance}
                  </span>
              </p>
              <button 
                className='round-button' 
                style={{backgroundImage:'linear-gradient(to right, #B5DC52, #89E148)', margin:0}}
                onClick={openAddBalance}
              >
                +Add Balance
              </button>
            </div>
          </Grid>
          <Grid item xs={4} >
            <div className='top-box-item'>
              <p 
                style={{fontSize:30, padding:'0.5rem', margin:0}}
              >
                Expenses:
                  <span 
                    style={{color:'#F4BB4A', fontWeight:'bold'}}>{" ₹" + expenses.reduce((expSum, exp)=>(expSum+Number(exp.price)),0)}
                  </span>
              </p>
              <button 
                className='round-button' 
                style={{backgroundImage:'linear-gradient(to right, #FF9595, #FF3838)', margin:0}}
                onClick = {openAddExpense}
              >
                +Add Balance
              </button>
            </div>
          </Grid>
          <Grid item xs={4} minHeight={250}>
            <ExpensesPieChart expenseData={expenses}/>
          </Grid>
        </Grid>
        <Grid container spacing={2} marginTop='1rem'>
          <Grid item xs={7}>
            <h2 style={{fontStyle:'italic', padding:'1rem'}}>Recent Transactions</h2>
            <div className='summary-box'>
              {currentExpenses.map((expense, id)=><ExpenseItem 
                                                    expense={expense} 
                                                    // onSelect={()=>setEditExpenseID(getItemIndex(id))}
                                                    handleDelete={()=>handleExpenseDelete(getItemIndex(id))}
                                                    handleEdit={()=>handleExpenseEdit(getItemIndex(id))}                                                    
                                                  />)}
              {lastPage > 1 && 
                <div className='page-controls'>
                  <button 
                    className='grey-circle' 
                    onClick={()=>handlePageChange(currentPage-1)}
                    disabled = {currentPage === 1}
                    style={{boxShadow:'0px 4px 4px #626262'}}
                  >
                    <GrLinkPrevious size={16}/>
                  </button>
                  <div 
                    className='page-number'
                  >
                    {currentPage}
                  </div>
                  <button 
                    className='grey-circle'
                    onClick={()=>handlePageChange(currentPage+1)}
                    disabled = {currentPage === lastPage}                  
                    style={{boxShadow:'0px 4px 4px #626262'}}
                  >
                    <GrLinkNext size={16}/>
                  </button>
                </div>
              }
            </div>            
          </Grid>
          <Grid item xs={5}>
            <h2 style={{fontStyle:'italic', padding:'1rem'}}>Top Expenses</h2>
            <Grid container>
              <Grid item xs={12} className='summary-box'>
                <ExpenseBarChart expenseData={expenses}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid> 
      </>
      <AddBalanceModal isOpen={addBalance} handleAdd={addNewIncome} handleCancel={closeAddBalance}/>
      <AddExpenseModal 
        isOpen={addExpense} 
        handleAdd={addNewExpense} 
        handleCancel={closeAddExpense}
        currBalance={balance}
        newExpense={editExpense.expense}
        isEdit={editExpense.id !== null}
      />
    </div>
  );
}

export default App;
