const UserModel = require("../Models/User");

// const addTransaction = async (req, res) => {
//     const { _id } = req.user;
//     console.log(_id, req.body)
//     try {
//         const userData = await UserModel.findByIdAndUpdate(
//             _id,
//             { $push: { expenses: req.body } },
//             { new: true } // For Returning the updated documents
//         )
//         res.status(200)
//             .json({
//                 message: "Expense added successfully",
//                 success: true,
//                 data: userData?.expenses
//             })
//     } catch (err) {
//         return res.status(500).json({
//             message: "Something went wrong",
//             error: err,
//             success: false
//         })
//     }
// }


const addIncome = async (req, res) => {
    const { _id } = req.user;
    const { type, ...transactionDetails } = req.body; // Extract type and other transaction details

    // Ensure the transaction is marked as 'income'
    try {
        let updateField = { $push: { incomes: transactionDetails } };

        const userData = await UserModel.findByIdAndUpdate(
            _id,
            updateField,
            { new: true } // Return updated document
        );

        const updatedData = userData?.incomes;

        res.status(200).json({
            message: "Income added successfully",
            success: true,
            data: updatedData
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        });
    }
};




const addExpense = async (req, res) => {
    const { _id } = req.user;
    const { type, ...transactionDetails } = req.body; // Extract type and other transaction details

    // Ensure the transaction is marked as 'expense'
    try {
        let updateField = { $push: { expenses: transactionDetails } };

        const userData = await UserModel.findByIdAndUpdate(
            _id,
            updateField,
            { new: true } // Return updated document
        );

        const updatedData = userData?.expenses;

        res.status(200).json({
            message: "Expense added successfully",
            success: true,
            data: updatedData
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        });
    }
};


// const getAllTransactions = async (req, res) => {
//     const { _id } = req.user;
//     console.log(_id, req.body)
//     try {
//         const userData = await UserModel.findById(_id).select('expenses');
//         res.status(200)
//             .json({
//                 message: "Fetched Expenses successfully",
//                 success: true,
//                 data: userData?.expenses
//             })
//     } catch (err) {
//         return res.status(500).json({
//             message: "Something went wrong",
//             error: err,
//             success: false
//         })
//     }
// }

const getExpenses = async (req, res) => {
    const { _id } = req.user; // Get the user's ID from the request
    try {
        // Find the user by ID and select only the 'expenses' field
        const userData = await UserModel.findById(_id).select('expenses');

        // If no user data is found, handle it
        if (!userData) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Respond with the user's expenses
        res.status(200).json({
            message: "Fetched Expenses successfully",
            success: true,
            data: userData?.expenses
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        });
    }
};

const getIncomes = async (req, res) => {
    const { _id } = req.user; // Get the user's ID from the request
    try {
        // Find the user by ID and select only the 'incomes' field
        const userData = await UserModel.findById(_id).select('incomes');

        // If no user data is found, handle it
        if (!userData) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Respond with the user's incomes
        res.status(200).json({
            message: "Fetched Incomes successfully",
            success: true,
            data: userData?.incomes
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        });
    }
};


// const deleteTransaction = async (req, res) => {
//     const { _id } = req.user;
//     const expenseId = req.params.expenseId;
//     try {
//         const userData = await UserModel.findByIdAndUpdate(
//             _id,
//             { $pull: { expenses: { _id: expenseId } } },
//             { new: true } // For Returning the updated documents
//         )
//         res.status(200)
//             .json({
//                 message: "Expense Deleted successfully",
//                 success: true,
//                 data: userData?.expenses
//             })
//     } catch (err) {
//         return res.status(500).json({
//             message: "Something went wrong",
//             error: err,
//             success: false
//         })
//     }
// }

const delExpense = async (req, res) => {
    const { _id } = req.user; // Get the user's ID
    const expenseId = req.params.expenseId; // Get the expense ID from the URL parameters

    try {
        // Find the user by ID and pull (remove) the expense with the specified ID
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            { $pull: { expenses: { _id: expenseId } } },
            { new: true } // Return the updated document
        );

        // If no user data is found, handle it
        if (!userData) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Respond with the updated list of expenses
        res.status(200).json({
            message: "Expense deleted successfully",
            success: true,
            data: userData?.expenses
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        });
    }
};


const delIncome = async (req, res) => {
    const { _id } = req.user; // Get the user's ID
    const incomeId = req.params.incomeId; // Get the income ID from the URL parameters

    try {
        // Find the user by ID and pull (remove) the income with the specified ID
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            { $pull: { incomes: { _id: incomeId } } },
            { new: true } // Return the updated document
        );

        // If no user data is found, handle it
        if (!userData) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Respond with the updated list of incomes
        res.status(200).json({
            message: "Income deleted successfully",
            success: true,
            data: userData?.incomes
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        });
    }
};


module.exports = {
    // addTransaction,
    // getAllTransactions,
    // deleteTransaction
    addIncome,
    addExpense,
    getExpenses,
    getIncomes,
    delExpense,
    delIncome
}