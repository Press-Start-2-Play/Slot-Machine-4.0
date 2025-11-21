// Global Varaibles
const symbols = ["💰", "🍋", "💎", "🍒", "🍒"];
let value1 = document.getElementById("reel1");
let value2 = document.getElementById("reel2");
let value3 = document.getElementById("reel3");
let value10 = document.getElementById("reel10");
let value20 = document.getElementById("reel20");
let value30 = document.getElementById("reel30");
let bet_container = document.getElementById("bet")
let bal_container = document.getElementById("bal_num")

function reel_change(){
    value1.textContent = symbols[Math.floor(Math.random() * symbols.length)]
    value2.textContent = symbols[Math.floor(Math.random() * symbols.length)]
    value3.textContent = symbols[Math.floor(Math.random() * symbols.length)]
}

let spin_Interval = setInterval(reel_change, 1500)

function logic_system(){
  
    let random_No = Math.floor(Math.random() * 1000)
    console.log(random_No)
    if (random_No <= 10){
        return [['💎', '💎', '💎'] , 50 ]}//1.0% chance for jackpot
    else if (random_No <= 70) {
        return [['💎', '💎', '🍒'] , 10] }// 6.0% chance
    else if (random_No <= 130){
        return [['🍒', '🍒', '🍒'] , 7] }// 6.0% chance
    else if (random_No <= 230){
        return [['🍒', '🍒', '🍋'] , 2]} // 10% chance
    else if (random_No <= 330){
        return [['🍋', '🍋', '🍋'] , 1.5] }// 10% chance
    else if (random_No <= 480){
        return [['🍋', '🍋', '🍒'] , 1 ] }// 10% chance
    else if (random_No <= 630){
        return [['💩', '💩', '💩'] , 1] } // 15.0% chance
    else if (random_No <= 815){
        let arr = [['💩', '💩', '🍒'], ['💩', '💩', '🍋']]
        return [arr[Math.floor(Math.random())]  , 0.5 ] //18.5% Chance
       }
    else if (random_No <= 1000){
        let arr2 = [['💩', '🍒', '🍋'], ['💩', '💩', '💎'], ['🍒', '🍒', '💎'], ['🍋', '🍋', '💎']]
        return [arr2[Math.floor(Math.random() * 3)]  , 0.3 ]//18.5% Chance 
    }    
}

function result_display(){
    let result = logic_system()
    let array = result[0]
    let multiplier = result[1]
    value1.textContent = array[0]
    value2.textContent = array[1]
    value3.textContent = array[2]
    console.log(result)
    return [array,multiplier]
}

function bal_calculator(){
    let balance = Number(bal_container.textContent)
    let bet = Number(bet_container.value)
    balance -= bet 
    bal_container.textContent = balance
}

function balance_validaton(){
    let balance = Number(bal_container.textContent)
    let bet = Number(bet_container.value)
    if (balance < bet){
        alert("Innadequate funds")
        return false
    }
    else if (bet == null || bet == 0) {
        alert("Please put in a bet")
    }
    else if (balance >= bet) {
        return true
    }
    else{
        return "Error"
    }
}

function game_mechanics(result){
    let balance = Number(bal_container.textContent)
    let bet = Number(bet_container.value)
    let multiplier = result[1]
    let array = result[0]
    let winnings = bet * multiplier

    if (multiplier == 50){
        bal_container.textContent = balance + winnings
    }
    else if (multiplier == 10){
        bal_container.textContent = balance + winnings
    }
    else if (multiplier == 7){
        bal_container.textContent = balance + winnings
    }
    else if (multiplier == 2){
        bal_container.textContent = balance + winnings
    }
    else if (multiplier == 1.5){
        bal_container.textContent = Math.floor(balance + winnings)
    }
    else if (multiplier == 1){
        if (array = ['💩', '💩', '💩']){
            bal_container.textContent = balance
        }
        else{
            bal_container.textContent = balance + winnings
        }
    }
    else if (multiplier == 0.3){
        bal_container.textContent = Math.floor(balance +  winnings)
    }  
    else if (multiplier == 0.5){
        bal_container.textContent = Math.floor(balance + winnings)
    } 
}

function modal_close() {
    let close = document.getElementById("result_modal")
    close.className = "hidden"
    console.log("Im working")
}

function main_btn_click() {
    proceed = balance_validaton()
    let btn = document.getElementById("button_ID")

    if (proceed){
    bal_calculator()
    btn.textContent = "Spinning..."
    clearInterval(spin_Interval)
    spin_Interval = setInterval(reel_change, 40)

    setTimeout(() => {
        clearInterval(spin_Interval)
        btn.textContent = "Spin Again"
        let result = result_display()
        game_mechanics(result)
        modal_functions(result)
    }, 4000);
    }
    else if (proceed == "Error"){
        alert("Error in main_btn_click function")
    }
    else{
        alert("Insufficent funds")
    }
    
    
}

function modal_functions(result){
    let init_msg = document.getElementById("init_msg")
    let modal_title = document.getElementById("modal-title")
    let modal_msg_container = document.getElementById("modal-msg")
    let modal_payout = document.getElementById("modal-payout")
    let modal_bet = document.getElementById("modal-bet")
    let modal_balance = document.getElementById("modal-balance")
    let bet = bet_container.value
    let balance = bal_container.textContent
    let multiplier = result[1]
    let payout = bet * multiplier
    modal_balance.textContent = balance 
    let array = result[0]
    let close = document.getElementById("result_modal")
    close.className = ""
    modal_payout.textContent = payout
    modal_bet.textContent = bet
    value10.textContent = array[0]
    value20.textContent = array[1]
    value30.textContent = array[2]
    if (multiplier == 50){
        init_msg.textContent = "WIN"
        modal_title.textContent = "!! JACKPOT !!"
        modal_msg_container.textContent = `WTH HOw???!!! Congratulations you actually won the Jackpot. Bruh the odds were literally 1 in a Thousand,..I'd have to check for Cyber fraud. \n You literally won ${balance} points from ${bet} in one Go !!! like wth, I'm losing so much money 😭   `
    }

    else if (multiplier == 10){
        init_msg.style.color = "inherit"
        init_msg.textContent = "WIN"
        modal_title.textContent = "!! HUGE WIN !!"
        modal_msg_container.textContent = `Buddy finally hit something goodddd !!!, Depending on how much you bet you're going home loaded tonight. Who am I kidding you're definitely going home loaded tonight \n Your new balance is ${balance}, Damn from a bet of ${bet} `
    }
    else if (multiplier == 7){
        init_msg.style.color = "inherit"
        init_msg.textContent = "WIN"
        modal_title.textContent = "!! BIG WIN !!"
        modal_msg_container.textContent = `Impressive, Finally making me lose some money 😭😭  Are you happy taking money from a Struggling 17 year old 😭..., buh you won so I gotta pay up \n Your new balance is ${balance}, from a bet of ${bet} `
    }
    else if(multiplier == 2){
        init_msg.style.color = "inherit"
        init_msg.textContent = "WIN"
        modal_title.textContent = "!! WIN !!"
        modal_msg_container.textContent = `Impressive, Finally making me lose some money 😭😭  Are you happy taking money from a Struggling 17 year old 😭..., buh you won so I gotta pay up \n Your new balance is ${balance}, from a bet of ${bet} `
    }
    else if (multiplier == 1.5){
        init_msg.style.color = "inherit"
        init_msg.textContent = "WIN"
        modal_title.textContent = "!! SMALL WIN !!"
        modal_msg_container.textContent = `Well that's a win I guess..... not exactly a super one but a win is a win \n Your new balance is ${balance}, from a bet of ${bet}  At least you won stuff 😅 `
    }

    else if (multiplier == 0.5){
        init_msg.style.color = "red"
        init_msg.textContent = "LOSE"
        modal_title.textContent = "!! SMALL LOSS !!"
        modal_msg_container.textContent = `Oh Shi, Better luck next time I guess \n Guess I'm making some moneyyyy \n Your new balance is ${balance} `
    }
    else if (multiplier == 0.3){
        init_msg.style.color = "red"
        init_msg.textContent = "LOSE"
        modal_title.textContent = "!! TEENY LOSS !!"
        modal_msg_container.textContent = `Oh Shi, Better luck next time I guess \n. Buh I mean, That's not even much of a loss anyways\n Your new balance is ${balance} `
    }
    else if (multiplier == 1){
        if (array = ['💩', '💩', '💩']){
            init_msg.style.color = "red"
            init_msg.textContent = "LOSE"
            modal_title.textContent = "!! NO WIN !!"
            modal_msg_container.textContent = `SIKE, better luck next time lmao \nI'm finally making some money 😭\nYou guys should think about me too do you know how much money I lose everyday`
    }
    else{
        init_msg.style.color = "inherit"
        init_msg.textContent = "WIN"
        modal_title.textContent = "!! WIN !!"
        modal_msg_container.textContent = `A win is a win I guess, Bruh my wallet is literally crying right now 😭😭😭\n Your new balance is ${balance}, from a bet of ${bet} \n... Sighhh `
    }
}
}
