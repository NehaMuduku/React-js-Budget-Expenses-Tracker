// FileName: Tracker.js 

import React, { useEffect, useState } from "react"; 
import styled from "styled-components"; 
import AddTransaction from "./AddTransaction"; 
import OverviewComponent from "./OverviewComponent"; 
import TransactionsContainer from "./TransactionsContainer"; 

const Container = styled.div` 
  display: flex; 
  flex-direction: column; 
  width: 80%; 
  max-width: 900px; 
  background: #ffffff; 
  padding: 40px; 
  border-radius: 12px; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); 
  margin: 20px auto; 
  position: relative; 
  overflow: hidden; 
  background: linear-gradient(to bottom right, #ffffff, #f7f7f7); 
`; 

const Heading = styled.h1` 
  font-size: 34px; 
  font-weight: 700; 
  text-align: center; 
  color: #333; 
  margin-bottom: 20px; 
`; 

const TransactionDetails = styled.div` 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  gap: 20px; 
  margin-bottom: 30px; 
  border-top: 1px solid #e0e0e0; 
  padding-top: 15px; 
`; 

const THeading = styled.div` 
  font-size: 34px; 
  font-weight: 700; 
  text-align: center; 
  margin-bottom: 30px; 
  color: #007bff; 
`; 

const Box = styled.div` 
  flex: 1; 
  border: 2px solid; 
  border-radius: 10px; 
  padding: 20px; 
  background-color: #ffffff; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  text-align: center; 
  position: relative; 
  overflow: hidden; 
  &:before { 
    content: ""; 
    position: absolute; 
    top: -20%; 
    left: -20%; 
    width: 140%; 
    height: 140%; 
    background: radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0) 80%); 
    z-index: 0; 
  } 
  & span { 
    font-weight: 700; 
    font-size: 30px; 
    color: ${props => props.isExpense ? "#d9534f" : "#5bc0de"}; 
    position: relative; 
    z-index: 1; 
  } 
`; 

const ExpenseBox = styled(Box)` 
  border-color: #d9534f; 
`; 

const IncomeBox = styled(Box)` 
  border-color: #5bc0de; 
`; 

const Tracker = () => { 
  const [toggle, setToggle] = useState(false); 
  const [transactions, setTransactions] = useState([]); 
  const [expense, setExpense] = useState(0); 
  const [income, setIncome] = useState(0); 

  const AddTransactions = (payload) => { 
    const transactionArray = [...transactions]; 
    transactionArray.push(payload); 
    setTransactions(transactionArray); 
  }; 

  const removeTransaction = (id) => { 
    const updatedTransactions = transactions 
      .filter((transaction) => transaction.id !== id); 
    setTransactions(updatedTransactions); 
  }; 

  const calculateTransactions = () => { 
    let exp = 0; 
    let inc = 0; 

    transactions.forEach((item) => { 
      item.transType === "expense"
        ? (exp += item.amount) 
        : (inc += item.amount); 
    }); 

    setExpense(exp); 
    setIncome(inc); 
  }; 

  useEffect(() => { 
    calculateTransactions(); 
  }, [transactions]); 

  return ( 
    <Container> 
      <THeading>Expense Tracker</THeading> 
      <Heading>Your Personal Finance Manager</Heading> 
      <OverviewComponent 
        toggle={toggle} 
        setToggle={setToggle} 
        expense={expense} 
        income={income} 
      /> 

      {toggle && ( 
        <AddTransaction 
          setToggle={setToggle} 
          AddTransactions={AddTransactions} 
        /> 
      )} 

      <TransactionDetails> 
        <ExpenseBox isExpense> 
          Expense <span>₹{expense}</span> 
        </ExpenseBox> 

        <IncomeBox> 
          Budget <span>₹{income}</span> 
        </IncomeBox> 
      </TransactionDetails> 

      <TransactionsContainer 
        transactions={transactions} 
        removeTransaction={removeTransaction} 
      /> 
    </Container> 
  ); 
}; 

export default Tracker; 
