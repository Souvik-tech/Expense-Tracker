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
      <h3>Recent Transaction</h3>
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
              <div>
                ₹ {val.amount} <MdCancel onClick={() => cancelTransaction(id)} />
              </div>
              <div>
                <MdEdit onClick={() => editTransaction(val)} />
              </div>
            </div>
          </div>
          <h3>{val.date}</h3>
        </div>
      ))}
    </div>
  );
};

export default Transaction;
