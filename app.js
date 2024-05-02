#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//initialize user balance and pin code
let myBalace = 5000;
let myPin = 1234;
//print wellcome messeage
console.log(chalk.blue('\n \tWELLCOME TO MY ATM MECHINE\n'));
let pinanwer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow(" \tEnter your pin code !")
    }
]);
if (pinanwer.pin === myPin) {
    console.log(chalk.greenBright('\n \tPin is correct, Login succesfully!\n'));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation",
            choices: ['withdraw amount', 'check balance']
        }
    ]);
    if (operationAns.operation === "withdraw amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "Withdrawmethod",
                type: "list",
                message: "Select a withdraw method",
                choices: ['Fast cash', 'Enter amount']
            }
        ]);
        if (withdrawAns.Withdrawmethod === 'Fast cash') {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastcash",
                    type: "list",
                    message: "Select Amount",
                    choices: ['1000', '2000', '5000', '10000', '20000', '50000']
                }
            ]);
            if (fastCashAns.fastcash > myBalace) {
                console.log(chalk.red('\n \tInsufficient Balance'));
            }
            else {
                myBalace -= fastCashAns.fastcash;
                console.log(`${fastCashAns.fastcash} With Succesfully !`);
                console.log(`your remaining Balance is ${myBalace}`);
            }
        }
        else if (withdrawAns.Withdrawmethod === 'Enter amount') {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter a amount to withdraw:"
                }
            ]);
            if (amountAns.amount > myBalace) {
                console.log(chalk.red('\ninsufficeint balance\n'));
            }
            else {
                myBalace -= amountAns.amount;
                console.log(`${amountAns.amount} withdraw succesfully `);
                console.log(`your remaing balance is ${myBalace}`);
            }
        }
    }
    else if (operationAns.operation === "check balance") {
        console.log(`you Account balance is ${myBalace}`);
    }
}
else {
    console.log(chalk.red('\n \tPin is incoorect try again'));
}
