const inputDes = document.getElementById("description")
const inputAmount = document.getElementById("amount")
const inputCategory = document.getElementById("category")
const inputExIn = document.getElementById("expense-type")
const add = document.getElementById("add")
const expenses = document.getElementById("expenses")
const totalEl = document.getElementById("total")

let arr = JSON.parse(localStorage.getItem("arr")) || []

function renderlist(list = arr) {
    expenses.innerHTML = ""
    let total = 0
    list.forEach((element) => {
        total += parseFloat(element.money)
        expenses.innerHTML += `
         <ul class="jslist">
         <div class = "inner-lists">
             <li>Title: ${element.title}</li>
             <li>Amount: ${element.money} ETB</li>
             <li>Category: ${element.categories}</li>
             <li>Type: ${element.ExorIn}</li>
             <li>Date: ${element.date}</li>
             </div>
             <button onclick="deleteitem(${element.id})" id="delete">🗑️</button>
             </ul>`
    })

    totalEl.textContent = total.toFixed(2)
}
renderlist()

add.addEventListener("click", () => {
    let input = inputDes.value
    let amount = inputAmount.value
    let category = inputCategory.value
    let ExIn = inputExIn.value

    if (input === "") {
        alert("Please enter a title before adding.")
        return
    }
    if (amount === "") {
        alert("Please enter amount before adding.")
        return
    }

    let obj = {
        id: Date.now(), 
        title: input,
        money: amount,
        categories: category,
        ExorIn: ExIn,
        date: new Date().toISOString().split('T')[0]
    }
    arr.push(obj)
    localStorage.setItem("arr", JSON.stringify(arr))
    renderlist()

    inputDes.value = ""
    inputAmount.value = ""
})

function deleteitem(id) {
    const conformation = confirm("Are you sure you want to delete this item?")
    if (conformation) {
        arr = arr.filter(el => el.id !== id)
        localStorage.setItem("arr", JSON.stringify(arr))
        renderlist()
    }
}
const deleteall = document.querySelector(".deleteall")
deleteall.addEventListener("click", ()=>{
           if(arr.length ===0){
            alert("No item to delete")
            return
        }
        const conformation = confirm("Are you sure you want to delete all items?")
            if(conformation){
            arr = []
            localStorage.removeItem("arr")
            renderlist()
           }          
           
})

const sort = document.querySelector(".sort")
sort.addEventListener("change", () => {
    
    if (sort.value === "byamount") {
        arr.sort((a, b) => parseFloat(a.money) - parseFloat(b.money))
    }
    if (sort.value === "bydate") {
        arr.sort((a, b) => new Date(a.date) - new Date(b.date))
    }
    if (sort.value === "byname") {
        arr.sort((a, b) => a.title.localeCompare(b.title))
    }
    localStorage.setItem("arr", JSON.stringify(arr))
    renderlist()
})

const sortcategory = document.querySelector(".sort-category")

sortcategory.addEventListener("change", () => {
    
       const value = sortcategory.value.toLowerCase()
       let filtered = value === "all categories"
       ? arr
       : arr.filter(el => el.categories.toLowerCase(
       ) === value)
         if(filtered.length === 0){
          expenses.innerHTML = `<p class="noitem">No item found!</p>`
    }else{
       renderlist(filtered)
    }
       

})
