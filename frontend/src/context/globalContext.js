import React, { useContext,useEffect , useState } from "react"
// import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
// import { ToastContainer } from 'react-toastify';\
// import Login from '../pages/Login';

const BASE_URL = "http://localhost:8080/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [loggedInUser, setLoggedInUser] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [incomeAmt, setIncomeAmt] = useState(0);
    const [expenseAmt, setExpenseAmt] = useState(0);
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }
   

    useEffect(() => {
        // const income = totalIncome();   // Use the totalIncome function
        const exp = totalExpense();    // Use the totalExpenses function
        // setIncomeAmt(income);           // Set the total income amount
        setExpenseAmt(exp);             // Set the total expense amount
    }, [expenses]);

    useEffect(() => {
        const income = totalIncome();   // Use the totalIncome function
        // const exp = totalExpense();    // Use the totalExpenses function
        setIncomeAmt(income);           // Set the total income amount
        // setExpenseAmt(exp);             // Set the total expense amount
    }, [incomes]);
    
    const addIncome = async (incomeData) => {
        try {
            const url = `${BASE_URL}incomes`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(incomeData)
            };
            
            const response = await fetch(url, headers);
            
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
    
            const result = await response.json();
            // handleSuccess('Income added successfully');
            handleSuccess(result?.message)
            console.log('--result', result.data);
            
            setIncomes(result.data);
            
        } catch (err) {
            
            handleError(err);
        }
    };
    
    
    const getIncomes = async () => {
        try {
            const url = `${BASE_URL}incomes`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            };
            const response = await fetch(url, headers);
            
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
    
            const result = await response.json();
            
            
            setIncomes(result.data);
        } catch (err) {
            
            handleError(err);
        }
    };
    
    
    const deleteIncome = async (id) => {
        try {
            const url = `${BASE_URL}incomes/${id}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    // 'Content-Type': 'application/json'
                },
                method: "DELETE",
                // body: JSON.stringify(incomeData)
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            console.log('--result', result.data);
            setIncomes(result.data);
        } catch (err) {
            handleError(err);
        }
    }
    
    const totalIncome = () => {
        return Array.isArray(incomes) ? incomes.reduce((total, income) => total + income.amount, 0) : 0;
    };
    
    //before addTransaction
    
    const addExpense = async (expense) => {
        try {
            const url = `${BASE_URL}expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(expense)
            };
            
            const response = await fetch(url, headers);
            
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
    
            const result = await response.json();
            // handleSuccess('Income added successfully');
            handleSuccess(result?.message)
            console.log('--result', result.data);
            
            setExpenses(result.data);
            
        } catch (err) {
            
            handleError(err);
        }
    };

    const getExpenses = async () => {
        try {
            const url = `${BASE_URL}expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            };
            const response = await fetch(url, headers);
            
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
    
            const result = await response.json();
            
            
            setExpenses(result.data);
        } catch (err) {
            
            handleError(err);
        }
    };
    

    const deleteExpense = async (id) => {
        try {
            const url = `${BASE_URL}expenses/${id}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    // 'Content-Type': 'application/json'
                },
                method: "DELETE",
                // body: JSON.stringify(incomeData)
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            console.log('--result', result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    const totalExpense = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    const totalBalance = () => {
        return totalIncome() - totalExpense()
    }

    
    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    // useEffect(() => {
    //     getExpenses(),
    //     getIncomes()
    // }, [])


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpense,
            totalBalance,
            transactionHistory,
            error,
            setError,
            incomeAmt,
            expenseAmt
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}