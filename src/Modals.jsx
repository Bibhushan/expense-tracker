import Modal from 'react-modal';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

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
  
    const [expense, setExpense] = useState({title:null, price:null, category:null, date:null});
    // console.log(expense);
    const [inputType, setInputType] = useState(null);
  
    const handleInputType = (type)=>{
      setInputType(type);
    }

    useEffect(()=>{
        setExpense(newExpense);
    }, [newExpense]);

    useEffect(()=>{        
        return ()=>setExpense({title:null, price:null, category:null, date:null});
    }, []);
    
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
        <SnackbarProvider />
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
  
  export { AddBalanceModal, AddExpenseModal };