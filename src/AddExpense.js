import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { FaPlus } from "react-icons/fa";
import { useSnackbar } from 'notistack'; // Import useSnackbar from notistack

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const AddExpense = ({ setExpenseList, expense, balance, setBalance, currentTransaction, setCurrentTransaction }) => {
  const [openExpense, setOpenExpense] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const { enqueueSnackbar } = useSnackbar(); // Initialize notistack

  const openExpenseModel = () => setOpenExpense(true);
  const closeExpense = () => {
    setOpenExpense(false);
    setCurrentTransaction(null); // Clear currentTransaction when closing
  };

  useEffect(() => {
    if (currentTransaction) {
      setTitle(currentTransaction.title);
      setAmount(currentTransaction.amount);
      setCategory(currentTransaction.category);
      setDate(currentTransaction.date);
      openExpenseModel();
    }
  }, [currentTransaction]);

  const addExpenseFunc = () => {
    
    if (amount > balance) {
      enqueueSnackbar('You do not have enough balance!', { variant: 'error' }); // Show error alert
      return;
    }
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const newExpense = {
      title,
      amount: Number(amount),
      category,
      date: new Date(date).toLocaleDateString('en-US', options),
    };
    setBalance((prevBalance) => prevBalance - amount);
    setExpenseList((prevExpense) => [...prevExpense, newExpense]);
    closeExpense();
    
  };

  const saveChanges = () => {
    const updatedExpense = {
      ...currentTransaction,
      title,
      amount: Number(amount),
      category,
      date,
    };

    setExpenseList((prevExpenseList) =>
      prevExpenseList.map((expense) =>
        expense === currentTransaction ? updatedExpense : expense
      )
    );

    setBalance((prevBalance) =>
      prevBalance + currentTransaction.amount - updatedExpense.amount
    );

    closeExpense();
  };

  return (
    <div className="boxWrapInner">
      <h3>Expense: <span>₹{expense}</span></h3>
      <button className="common-btn expense-btn" onClick={openExpenseModel}>
        <FaPlus /> Add Expense
      </button>
      <ReactModal
        isOpen={openExpense}
        style={customStyles}
        onRequestClose={closeExpense}
        contentLabel="Expense Modal"
      >
        <div className="addBalanceBox">
          <h2>{currentTransaction ? 'Edit Expense' : 'Add Expense'}</h2>
          <div>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <br /><br />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option>Food</option>
              <option>Entertainment</option>
              <option>Travel</option>
            </select>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <br /><br />
            {currentTransaction ? (
              <button onClick={saveChanges}>Save Changes</button>
            ) : (
              <button onClick={addExpenseFunc}>Add Expense</button>
            )}
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default AddExpense;
