
let displayPrice = document.querySelectorAll('#totalPrice')
let basePrice = +document.querySelector('#type').value
let toppingsPrice = 0;
let deliveryCost = 0;
let pancake = {pancakeBase: 'Classic', toppings: [], extras: []}
const savedOrders = []
const reply = document.querySelector('.reply')





/* Listening for changes in customization */
document.addEventListener('change', (e) => {
    if (e.target.id === 'type') {
        basePrice = +e.target.value
        pancake.pancakeBase = e.target.selectedOptions[0].textContent.match(/[a-z]/gi).join('')
    } else if (e.target.name === 'topping') {
        if (e.target.checked) {
            toppingsPrice++
            pancake.toppings.push(e.target.id)
        } else {
            toppingsPrice--
            pancake.toppings.filter((a) => a !== e.target.id)
        }
    } else if (e.target.name === 'extra') {
        if (e.target.checked) {
            toppingsPrice += +e.target.value
            pancake.extras.push(e.target.id)
        } else {
            toppingsPrice -= e.target.value
            pancake.extras.filter((a) => a !== e.target.id)
        }
    } else if (e.target.name === 'delivery') {
        e.target.id === 'delivery' ? deliveryCost = 5 : deliveryCost = 0
    } 
    updatePrice()
})




/* Update Price */
function updatePrice() {
    for (let element of displayPrice) {
        element.textContent = `$${basePrice + toppingsPrice + deliveryCost}`
        element.classList.add('bounce')
        setTimeout(() => element.classList.remove('bounce'), 500)
    }
}





//Show order
const seeOrderBtn = document.querySelector('#seeOrder')
const summaryDetails = document.querySelectorAll('.summary p')

seeOrderBtn.addEventListener('click', () => {
    let customerName = document.querySelector('#customerName').value
    document.querySelector('.summary').classList.toggle('hidden')
    document.querySelector('.customize').classList.toggle('hidden')
    document.querySelector('#nameDisplay').textContent = `Name: ${customerName}`

    
    let formattedExtras = []
    for (let extra of pancake.extras) {
        extra += ' Cream'
        formattedExtras.push(extra)
    }


    document.querySelector('#orderDisplay').textContent = `${pancake.pancakeBase} pancake, Toppings: ${pancake.toppings.length > 0 ? pancake.toppings.join(', ') : 'None'}, Extras: ${pancake.extras.length > 0 ? formattedExtras.join(', ') : 'None'}`
 

    if (deliveryCost === 5) {
        document.querySelector('#deliveryCost').textContent = `, including a $5 delivery fee`
    }
})


//Return to pancake customization
const returnBtn = document.querySelector('#return')
returnBtn.addEventListener('click', () => toggleSummary())

function toggleSummary() {
    document.querySelector('.summary').classList.toggle('hidden')
    document.querySelector('.customize').classList.toggle('hidden')
}

//Saving order functionality
const saveOrderBtn = document.querySelector('#saveOrder')
saveOrderBtn.addEventListener('click', () => {
    let customerName = document.querySelector('#customerName').value

    //Customer has to enter a name for their order
    if (!customerName) {
        reply.children[1].textContent = ''
        reply.firstChild.textContent = 'Please enter a name for your order!'
        reply.classList.toggle('hidden')
    } else {
        let order = {customerName: customerName.value,
            pancake: pancake,
            deliveryMethod: document.querySelector('input[name="delivery"]:checked').id,
            cost: `${basePrice + toppingsPrice + deliveryCost}`
            }

    
        console.log(order)
        savedOrders.push(order)

        //Update 'reply' message on success
        reply.firstChild.textContent = `Your order was successful! 🥳`
        reply.children[1].textContent = `Thank you for supporting our local business!`
        reply.classList.toggle('hidden')

        //Removing current pancake/customer info
        toppingsPrice = 0; deliveryCost = 0; basePrice = 5;
        document.querySelector('#type').value = 5;
        document.querySelectorAll('input[name="topping"], input[name="extra"]').forEach((topping) => {
            topping.checked = false
        })
        document.querySelector('#eatIn').checked = true;
        document.querySelector('#customerName').value = ''
        pancake = {pancakeBase: 'Classic', toppings: [], extras: []}
    }
    
    setTimeout(() => {
        updatePrice()
        reply.classList.toggle('hidden')
        toggleSummary()
    }, 3000)
})

