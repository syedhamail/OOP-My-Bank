#! /usr/bin/env node

import inquirer from "inquirer";

//Bank Account interface
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void

}

//Bank Account class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

// Withdraw money

withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(`You have withdrawn $${amount}. Your new balance is $${this.balance}`);
    } else {
        console.log("Insufficient funds");
    }
}

// Deposit money
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1; // $1 fees charged if more than $100 deposited
    } this.balance += amount;
    console.log(`You have deposited $${amount}. Your new balance is $${this.balance}`);
}

//Check Balance

checkBalance(): void {
    console.log(`Your current balance is $${this.balance}`);
}

}

//Customers class

class Customers{
    FirstName: string;
    LastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(FirstName: string, LastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount){
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}

//Create Bank Accounts
const accounts: BankAccount[]=[
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];

//Create customers
const customers: Customers[]=[
    new Customers("Syed", "Hamail", "Male", 20, 1234567890, accounts[0]),
    new Customers("Ayesha", "Shahid", "Female", 20, 1236547890, accounts[1]),
    new Customers("Shafi", "Khan", "Male", 19, 1234567098, accounts[2]),
]

//Function to interact with Bank Account
async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:",
        })
        const customer = customers.find(customer =>customer.account.accountNumber == accountNumberInput.accountNumber)
        if(customer){
            console.log(`Weclome ${customer.FirstName} ${customer.LastName}!\n`);
            const ans = await inquirer.prompt({
                name: "select",
                type: "list",
                message: "What would you like to do?",
                choices: ["Withdraw","Deposit","Check Balance","Exit"]
            });
            switch(ans.select){
                case "Deposit":
                    const DepositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "How much would you like to deposit?"
                    });
                    customer.account.deposit(DepositAmount.amount);
                    break;

                    case "Withdraw":
                    const WithdrawtAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "How much would you like to Withdraw?"
                    });
                    customer.account.withdraw(WithdrawtAmount.amount);
                    break;

                    case "Check Balance":
                    customer.account.checkBalance();
                    break;
                
                    case "Exit":
                    console.log("\n Thank you for banking with us. Have a nice day!");
                    return;
                    process.exit();
                    break;
            }   
        }
        else{
            console.log("Invalid account number");
        }
    } while(true)
}

service();