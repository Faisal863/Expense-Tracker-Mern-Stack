const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    // expenses: [
    //     {
    //         text: {
    //             type: String,
    //             required: true
    //         },
    //         amount: {
    //             type: Number,
    //             required: true
    //         },
    //         createdAt: {
    //             type: Date,
    //             default: Date.now
    //         }
    //     }
    // ]
    expenses : [
      {
        title: {
          type: String,
          required: true,
          trim: true,
          maxLength: 50,
        },
        amount: {
          type: Number,
          required: true,
          maxLength: 20,
          trim: true,
        },
        type: {
          type: String,
          default: "expense",
        },
        date: {
          type: Date,
          required: true,
          trim: true,
        },
        category: {
          type: String,
          required: true,
          trim: true,
          maxLength: 50,
        },
        // description: {
        //   type: String,
        //   required: true,
        //   trim: true,
        //   maxLength: 50,
        // },
      },
      { timestamps: true }
    ],

    incomes: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
          maxLength: 50,
        },
        amount: {
          type: Number,
          required: true,
          maxLength: 20,
          trim: true,
        },
        type: {
          type: String,
          default: "income",
        },
        date: {
          type: Date,
          required: true,
          trim: true,
        },
        category: {
          type: String,
          required: true,
          trim: true,
          maxLength: 50,
        },
        // description: {
        //   type: String,
        //   required: true,
        //   trim: true,
        //   maxLength: 50,
        // },
      },
      { timestamps: true }
    ]
});


const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
