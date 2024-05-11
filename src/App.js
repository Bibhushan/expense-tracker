// import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import Modal from 'react-modal';

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

function AddExpenseModal({isOpen, handleAdd, handleCancel}){
  return (
    <Modal 
      isOpen={isOpen} 
      className='modal-form'
      onRequestClose={handleCancel}
      style={customStyles}
      contentLabel="Add New Expenses"
    >
      <h1>Add Expense</h1>
      <input type='text' placeholder='Title' className='modal-input'/>
      <input type='number' placeholder='Price' className='modal-input'/>
      <input type='text' placeholder='Category' className='modal-input'/>
      <input type='date' placeholder='Date' className='modal-input'/>
      <button onClick={handleAdd}>Add Expense</button>
      <button onClick={handleCancel}>Cancel</button>
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
    >
      <h1>Add Balance</h1>
      <input type='number' placeholder='Income Amount' onChange={handleNewIncome} className='modal-input'/>
      <button onClick={()=>handleAdd(newIncome)}>Add Balance</button>
      <button onClick={handleCancel}>Cancel</button>
    </Modal>
  )
}

function App() {

  const [balance, setBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);

  const [addBalance, setAddBalance] = useState(false);
  const [addExpense, setAddExpense]= useState(false);

  const openAddExpense =()=>{
    setAddExpense(true);
  }
  
  const closeAddExpense = ()=>{
    setAddExpense(false);
  }

  const addNewExpense = (newExpense)=>{
    setExpenses([...expenses, newExpense]);
    closeAddExpense();
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

  return (
    <div className="App">
      <>
        <h1>Expense Tracker</h1>
        <div className='top-box'>        
          <div className='top-box-item'>
            <p 
              style={{fontSize:30, padding:'0.5rem', margin:'1rem 0.5rem 0.25rem 0.5rem'}}
            >
              Wallet Balance:
                <span 
                  style={{color:'#9DFF5B', fontWeight:'bold'}}>{" ₹" + balance}
                </span>
            </p>
            <button 
              className='round-button' 
              style={{backgroundImage:'linear-gradient(to right, #B5DC52, #89E148)'}}
              onClick={openAddBalance}
            >
              +Add Balance
            </button>
          </div>
          <div className='top-box-item'>
            <div>
              <p 
                style={{fontSize:30, padding:'0.5rem', margin:'1rem 0.5rem 0.25rem 0.5rem'}}
              >
                Expenses:
                  <span 
                    style={{color:'#F4BB4A', fontWeight:'bold'}}>{" ₹" + expenses}
                  </span>
              </p>
              <button 
                className='round-button' 
                style={{backgroundImage:'linear-gradient(to right, #FF9595, #FF3838)'}}
                onClick = {openAddExpense}
              >
                +Add Balance
              </button>
            </div>
          </div>
          <div className='top-box-item'>
            <div>
              <p 
                style={{fontSize:30, padding:'0.5rem', margin:'1rem 0.5rem 0.25rem 0.5rem'}}
              >
                Expenses:
                  <span 
                    style={{color:'#F4BB4A', fontWeight:'bold'}}>{" ₹" + expenses}
                  </span>
              </p>
              <button 
                className='round-button' 
                style={{backgroundImage:'linear-gradient(to right, #FF9595, #FF3838)'}}
              >
                +Add Balance
              </button>
            </div>
          </div>
        </div>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </>
      <AddBalanceModal isOpen={addBalance} handleAdd={addNewIncome} handleCancel={closeAddBalance}/>
      <AddExpenseModal isOpen={addExpense} handleAdd={addNewExpense} handleCancel={closeAddExpense}/>
    </div>
  );
}

export default App;
