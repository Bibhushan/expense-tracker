// import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import Modal from 'react-modal';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { Grid } from '@mui/material';
import { PiGift, PiPizza, PiSuitcaseRollingLight, PiPencilSimpleThin } from "react-icons/pi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr"
import { ExpenseBarChart, ExpensesPieChart } from './ExpenseCharts';

const customStyles = {
  content: {
    position:'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function AddExpenseModal({isOpen, handleAdd, handleCancel, currBalance, newExpense, isEdit=false}){

  const [expense, setExpense] = useState({...newExpense});
  // const [expense, setExpense] = useState({title:null, price:null, category:null, date:null})
  const [inputType, setInputType] = useState(null);

  const handleInputType = (type)=>{
    setInputType(type);
  }
  
  const handleExpenseUpdate = (e)=>{
    // console.log('expense: ', expense);    
    // expense = {...expense, [inputType]:e.target.value};
    // console.log('setting input type: ', inputType, ' to ', e.target.value);
    // console.log('changing: ', e);
    if (inputType === 'price'){
      setExpense({...expense, [inputType]:Number(e.target.value)});
    } 
    // // else if (inputType === 'date'){
    // //   const expDate = new Date(e.target.value);
    // //   setExpense({...expense, [inputType]:expDate});
    // // } 
    else {
      setExpense({...expense, [inputType]:e.target.value});
    }    
  }

  const addNewExpense = (e)=>{
    console.log('adding expense:', expense);
    e.preventDefault();
    if (expense.title === null){
      enqueueSnackbar('Expense title needs to be defined.')
      return;
    }

    if (expense.price === null){
      enqueueSnackbar('Expense price needs to be defined.')
      return;
    }

    if (expense.price > currBalance){
      enqueueSnackbar('Expense cannot be added as it is greater than current balance amount.')
      return;
    }

    if (expense.category === null){
      enqueueSnackbar('Expense category needs to be defined.')
      return;
    }

    if (expense.date === null){
      enqueueSnackbar('Expense date needs to be defined.')
      return;
    }

    console.log('Adding new expense: ', expense);

    handleAdd(expense);

  }

  return (
    <Modal 
      isOpen={isOpen} 
      className='modal-form'
      onRequestClose={handleCancel}
      style={customStyles}
      contentLabel="Add New Expenses"
      ariaHideApp={false}
    >
      <form onSubmit={addNewExpense}>
        <h1>Add Expense</h1>
        <input 
          type='text' 
          placeholder='Title' 
          className='modal-input' 
          onSelect={()=>handleInputType('title')} 
          onChange={handleExpenseUpdate}
          value={expense.title}
        />
        <input 
          type='number' 
          min={1} 
          placeholder='Price' 
          className='modal-input' 
          onSelect={()=>handleInputType('price')} 
          onChange={handleExpenseUpdate}
          value={expense.price}
        />
        <select 
          className='modal-input'  
          name='category' 
          placeholder='Category' 
          onClick={()=>handleInputType('category')} 
          onChange={handleExpenseUpdate}
          value={expense.category}
          style={{width:'245px'}}
        >
          <option disabled selected value>Select Expense Category</option>
          <option value='Entertainment'>Entertainment</option>
          <option value='Food'>Food</option>
          <option value='Travel'>Travel</option>
        </select>
        {/* <input type='text' placeholder='Category' className='modal-input' onSelect={()=>handleInputType('category')} onChange={handleExpenseUpdate}/> */}
        <input 
          type='date'  
          placeholder='Date' 
          className='modal-input' 
          onClick={()=>handleInputType('date')} 
          onChange={handleExpenseUpdate}
          value={expense.date}
        />
        <button type='submit' className='modal-input' style={{backgroundColor:'#F4BB4A', color:'white', fontWeight:'bold'}}>{isEdit ? 'Update ' : 'Add '} Expense</button>
        <button onClick={handleCancel} className='modal-input' style={{backgroundColor:'#E3E3E3', color:'black'}}>Cancel</button>
      </form>
    </Modal>
  )
}

const AddBalanceModal = ({isOpen, handleAdd, handleCancel})=>{

  const [newIncome, setNewIncome] = useState(0);

  const handleNewIncome = (e)=>{
    setNewIncome(Number(e.target.value));
  }

  return (
    <Modal 
      isOpen={isOpen} 
      className='modal-form'
      onRequestClose={handleCancel}
      style={customStyles}
      contentLabel="Add New Income"
      ariaHideApp={false}
    >
      <form onSubmit={()=>handleAdd(newIncome)}>
        <h1>Add Balance</h1>
        <input type='number' min={1} placeholder='Income Amount' onChange={handleNewIncome} className='modal-input'/>
        <button type='submit' className='modal-input' style={{backgroundColor:'#F4BB4A', color:'white', fontWeight:'bold'}}>Add Balance</button>
        <button onClick={handleCancel} className='modal-input' style={{backgroundColor:'#E3E3E3', color:'black'}}>Cancel</button>
      </form>
    </Modal>
  )
}

const ExpenseLogo = ({type})=>{
  switch (type){
    case 'Entertainment':
      return <PiGift size={24}/>;
    case 'Food':
      return <PiPizza size={24}/>
    case 'Travel':
      return <PiSuitcaseRollingLight size={24}/>;
    default:
      enqueueSnackbar(`Unknown expense type encountered: ${type}`)
  }
}

const ExpenseItem = ({expense, handleSelect, handleDelete, handleEdit})=>{
    
  return (
    <Grid container className='expense-item' width='auto' height='auto' margin='1rem' onFocus={handleSelect}>
      <Grid item xs={1} display='inherit' justifyContent='flex-end'>
        <div className='grey-circle'>
          <ExpenseLogo type={expense.category} style={{justifyContent:'center', alignItems:'center'}}/>
        </div>
      </Grid>
      <Grid item xs={7} style={{color:'black', fontSize:16}}>
        <p style={{color:'black', margin:'4px 1rem'}}>{expense.title}</p>
        <p style={{color:'#9B9B9B', margin:'4px 1rem'}}>{expense.date}</p>
      </Grid>
      <Grid item xs={2} style={{margin:0}}>
          <p style={{color:'orange', fontWeight:'bold', textAlign:'right', padding:'0.5rem 0.5rem', margin:0}}>₹{expense.price}</p>
      </Grid>
      <Grid item xs={1} display='inherit' justifyContent='center'>
        <button className='square-button' style={{backgroundColor:'red'}} onClick={handleDelete}>
          <AiOutlineCloseCircle size={24}/>
        </button>
      </Grid>
      <Grid item xs={1} display='inherit' justifyContent='center'>
        <button className='square-button' style={{backgroundColor:'orange'}} onClick={handleEdit}>
          <PiPencilSimpleThin size={24}/>
        </button>
      </Grid>
    </Grid>
  )
}

function App() {

  const [balance, setBalance] = useState(5000);
  const [expenses, setExpenses] = useState([
                                    {title:'Initial Movie', price:300, category:'Entertainment', date:'2024-01-01'},
                                    {title:'Initial Hotel', price:125, category:'Food', date:'2024-01-01'},
                                    {title:'Initial Taxi', price:75, category:'Travel', date:'2024-01-01'}
                                  ]);

  // const [editExpense, setEditExpense] = useState({title:null, price:null, category:null, date:null});
  const [editExpenseID, setEditExpenseID] = useState(null);

  const [addBalance, setAddBalance] = useState(false);
  const [addExpense, setAddExpense]= useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentExpenses, setCurrentExpenses] = useState([...expenses]);

  const lastPage = Math.ceil(expenses.length/3);

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
    setEditExpenseID(null);
  }

  const addNewExpense = (newExpense)=>{
    let tempExps = [...expenses];
    console.log('edit id is ', editExpenseID);
    
    if (editExpenseID !== null){
      setBalance(balance + tempExps[editExpenseID.price])
      tempExps.splice(editExpenseID,1)
      setEditExpenseID(null);
    }

    tempExps.push(newExpense);
    tempExps.sort((first, second)=>first.date>second.date ? -1 : 1);
    setExpenses(tempExps);
    closeAddExpense();
    setBalance(balance-newExpense.price);
  }

  const openAddBalance = ()=>{
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
    let currExpenses = [...expenses];
    setBalance(balance+currExpenses[index].price);
    currExpenses.splice(index, 1);
    setExpenses(currExpenses);
  } 

  const handleExpenseEdit = (index)=>{       
    setEditExpenseID((currentPage-1)*3 + index);
    console.log('edit index set to ', editExpenseID);
    // setEditExpense(expenses[editExpenseID]);
    openAddExpense();
  }

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
                                                    onSelect={()=>setEditExpenseID(id)}
                                                    handleDelete={()=>handleExpenseDelete(id)}
                                                    handleEdit={()=>handleExpenseEdit(id)}                                                    
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
        newExpense={editExpenseID === null ? 
                                      {title:null, price:null, category:null, date:null} :
                                      expenses[editExpenseID]}
        isEdit={editExpenseID !== null}
      />
    </div>
  );
}

export default App;
