import React from 'react';
import { MdCancel } from "react-icons/md";
import { FaPizzaSlice,FaGift  } from "react-icons/fa";
import { MdEdit,MdCardTravel  } from "react-icons/md";
const categoryIcons = {
  Food: <FaPizzaSlice />,         // Icon for Food
  Entertainment: <FaGift />,    // Icon for Entertainment
  Travel: <MdCardTravel />,          // Icon for Travel
};
const Transaction = ({ expenseList, setExpenseList, setBalance, setCurrentTransaction }) => {
  const cancelTransaction = (id) => {
    const deletedExpense = expenseList[id];
    const updatedList = expenseList.filter((_, index) => index !== id);
    setExpenseList(updatedList);
    setBalance((prev) => prev + deletedExpense.amount);
  };

  const editTransaction = (transaction) => {
    setCurrentTransaction(transaction);
  };

  return (
    <div className='each-transaction-wrap'>
     {expenseList.length > 0 ? 
     <div>
      <h3 className='color-white'>Recent Transaction</h3> 
      <div className='each-transaction-wrapper'>
      {expenseList.map((val, id) => (
          <div className="each-transaction" key={id}>
            <div className="transaction">
              <div className='transaction-title'> 
              <div className="transaction-category-icon">
                {categoryIcons[val.category] || null} {/* Display the icon based on the category */}
              </div>
              <h3>{val.title}</h3>
              </div>
            
              <div className="transaction-edit">
                <div className='trans-amount'>
                  ₹ {val.amount}
                </div>
                <div className='trans-cancel'>
                  <MdCancel onClick={() => cancelTransaction(id)} size={37}/>
                </div>
                <div className='trans-edit'>
                  <MdEdit onClick={() => editTransaction(val)} size={37}/>
                </div>
              </div>
            </div>
            <h3 className='trans-date'>{val.date}</h3>
          </div>
        ))}
      </div>
     </div>
      : null} 
    </div>
  );
};

export default Transaction;
