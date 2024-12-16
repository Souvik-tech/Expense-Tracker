import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { FaPlus } from "react-icons/fa";
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
const AddIncome = ({expense, setBalance,balance}) => {
  
  const [addBalance,setAddBalance] = useState(0);
   const [incomeModal,setIncomeModal] = useState(false);
   const openModel = () =>{
    return setIncomeModal(true)
   }
   const closeModal = () =>{
    return setIncomeModal(false)
   }
   const addBalanceFunc = () => {
    setBalance((prevBalance) => {
      const updatedBalance = prevBalance + addBalance;
      localStorage.setItem("balance", updatedBalance); // Update localStorage here
      closeModal();
      return updatedBalance;
    });
  };
  
  //  console.log(addBalance);
   
   
  return (
    <div className='boxWrapInner'>
        <h3>Wallet Balance: <span>₹{balance}</span></h3>
        <button className='common-btn income-btn' onClick={openModel}><FaPlus /> Add Income</button>
        <ReactModal
        isOpen={incomeModal}
        // onAfterOpen={afterOpenModal}
        style={customStyles}
        onRequestClose={closeModal}
        
        contentLabel="Example Modal"
      >
        <div className='addBalanceBox'>
          <h2>Add Balance</h2>
          <div>
            <input className='input-field' type='number' placeholder='income Amount' onChange={(e) => setAddBalance(Number(e.target.value))}/><button onClick={addBalanceFunc}>Add Balance</button><button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </ReactModal>
    </div>
  )
}

export default AddIncome