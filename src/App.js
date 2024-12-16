import logo from './logo.svg';
import './App.css';
import AddIncome from "./AddIncome";
import AddExpense from './AddExpense';
import Transaction from './Transaction';
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import { useEffect, useState } from 'react';
import { SnackbarProvider } from 'notistack';

function App() {
  const [balance, setBalance] = useState(() => {
    const storedBalance = localStorage.getItem('balance');
    return storedBalance ? JSON.parse(storedBalance) : 5000;
  });

  const [expenseList, setExpenseList] = useState(() => {
    const storedExpenses = localStorage.getItem('ExpenseList');
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });

  const [currentTransaction, setCurrentTransaction] = useState(null);

  const getTotalExpense = () => {
    return expenseList.reduce((total, num) => total + num.amount, 0);
  };

  useEffect(() => {
    const tempBalance = parseInt(localStorage.getItem('balance')) || 5000;
    setBalance(tempBalance);
    const tempList = JSON.parse(localStorage.getItem('ExpenseList')) || [];
    setExpenseList(tempList);
  }, []);

  useEffect(() => {
    localStorage.setItem('balance', balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('ExpenseList', JSON.stringify(expenseList));
  }, [expenseList]);

  return (
    <div className="App">
      <div className='expense-wrap'>

        <h2>Expense Tracker</h2>
        <div className="box-upper">
          <AddIncome expense={getTotalExpense()} balance={balance} setBalance={setBalance}/>
          <SnackbarProvider maxSnack={3}>
              <AddExpense
                setExpenseList={setExpenseList}
                balance={balance}
                expense={getTotalExpense()}
                setBalance={setBalance}
                currentTransaction={currentTransaction}
                setCurrentTransaction={setCurrentTransaction}
              />
          </SnackbarProvider>
         
          {expenseList.length > 0 ?  <PieChart expenseList={expenseList} /> : null }
        </div>
       
      </div>
      <div className='flex'>
          <Transaction
            expenseList={expenseList}
            setExpenseList={setExpenseList}
            setBalance={setBalance}
            setCurrentTransaction={setCurrentTransaction}
          />
           <BarChart expenseList={expenseList} />
        </div>
    </div>
  );
}

export default App;

