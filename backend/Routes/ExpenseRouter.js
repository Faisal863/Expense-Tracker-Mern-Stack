// const express = require('express');
// const { addIncome,
//     addExpense,
//     getExpenses,
//     getIncomes,
//     delExpense,
//     delIncome }
//     = require('../Controllers/ExpenseController');
// const router = express.Router();

// router.get('/', getAllTransactions);
// router.post('/', addTransaction);
// router.delete('/:expenseId', deleteTransaction);

// module.exports = router;

const express = require('express');
const { 
    addIncome,
    addExpense,
    getExpenses,
    getIncomes,
    delExpense,
    delIncome 
} = require('../Controllers/ExpenseController');
const router = express.Router();

// Expense Routes
router.get('/expenses', getExpenses); // Get all expenses
router.post('/expenses', addExpense); // Add an expense
router.delete('/expenses/:expenseId', delExpense); // Delete an expense

// Income Routes
router.get('/incomes', getIncomes); // Get all incomes
router.post('/incomes', addIncome); // Add an income
router.delete('/incomes/:incomeId', delIncome); // Delete an income

module.exports = router;
