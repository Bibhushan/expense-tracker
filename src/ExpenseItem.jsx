import { PiGift, PiPizza, PiSuitcaseRollingLight, PiPencilSimpleThin } from "react-icons/pi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Grid } from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

var options = { year: 'numeric', month: 'long', day: 'numeric' };

const formatDate =(dateString)=>{
  const newDate = new Date(dateString);
  return newDate.toLocaleDateString('en-US', options)
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

export default function ExpenseItem({expense, handleDelete, handleEdit}){
    
  return (
    <Grid container className='expense-item' width='auto' height='auto' margin='1rem'>
      <SnackbarProvider />
      <Grid item xs={1} display='inherit' justifyContent='flex-end'>
        <div className='grey-circle'>
          <ExpenseLogo type={expense.category} style={{justifyContent:'center', alignItems:'center'}}/>
        </div>
      </Grid>
      <Grid item xs={7} style={{color:'black', fontSize:16}}>
        <p style={{color:'black', margin:'4px 1rem'}}>{expense.title}</p>
        <p style={{color:'#9B9B9B', margin:'4px 1rem'}}>{formatDate(expense.date)}</p>
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