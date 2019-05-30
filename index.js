class Account {
  constructor(username) {
    //this.username = username; note has this but solution does not
    //this.balance = 0;
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    //this.account.balance += this.value;
    let balance = 0;
    //return balance += this.value;
    // what I was doing above will not work - all that is happening here in hindsight
    // is that we are looping the array that we have built to get the balance
    // it is executed by the console log call - not called in codeline which is 
    // what I thought
    console.log(`jpb-inside balance`);
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }


  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  //this.isAllowed() is taken from solution - it checks to make
  //the balance is above zero - or it will not perform transaction

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}
class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    // deposits always allowed thanks to capitalism.
    return true;
  }
}
// note the use of the minus to create negative amount
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    // note how it has access to this.account b/c of parent
    return (this.account.balance - this.amount >= 0);
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account();

console.log(`jpb-call to balance`);
console.log('Starting Account Balance: ', myAccount.balance);

// console.log('Attempting to withdraw even $1 should fail...');
// const t1 = new Withdrawal(1.00, myAccount);
// console.log('Commit result:', t1.commit());
// console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log(`jpb-call to balance`);
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);

