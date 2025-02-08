/*
Grandpa has a Christmas wish list to keep track of all the gifts he wants to ask for. But there’s a problem: if he forgets he’s already added something, the list gets clogged up with duplicates. This happened last year, and he ended up with 8 talking picture frames on Christmas Day!

Your task is to complete the `checkDuplicate()` function 👇 to ensure no duplicates are added to the list. But here’s the tricky part: Grandpa sometimes hits the spacebar more than once, making it harder to spot duplicates.

For example, only one of these entries should be added to the list — the others should be flagged as duplicates:

- "talking picture frames"
- "talking  picture frames"
- "talking picture    frames"
- " talking picture frames "

**Your tasks:**
1. Ensure no duplicates can be added to the list.
2. Account for extra spaces at the beginning/end and between words.
 
**Stretch Goals:**
1. Case Sensitivity: Handle cases where capitalization differs. For example:
   - `"Cat Hammock"` should be flagged as a duplicate of `"cat hammock"`.
   - Preserve Grandpa’s original capitalization (e.g., if `"Cat Hammock"` is added first, that should be added to the list). Do not simply convert all entries to lower case - Grandpa might well want to capitalize some words. 

2. Additional Features: Add functionality to delete or edit items on the list.
*/

// Get references to DOM elements
const itemInput = document.getElementById('item-input')
const addItemButton = document.getElementById('add-item-button')
const shoppingList = document.getElementById('shopping-list')
const listArr = []


// Function to check item is not duplicate
function checkDuplicate() {
    
    let duplicate = 0
    for (let i = 0; i < listArr.length; i++) {
        if (listArr[i].replaceAll(" ", "").toLowerCase() === (itemInput.value).replaceAll(" ", "").toLowerCase()) {
            duplicate = 1
            break
        }
    }
    
    /* ⚠️ You need to add code to this function! ⚠️*/ 
    if (!duplicate){
    const itemText = itemInput.value
    listArr.push(itemText)
    renderList()}
    else {
        console.log("duplicate caught!; " + (itemInput.value).replaceAll(" ", ""))
        itemInput.value = ""
    }
}

// Function to add an item to the shopping list
function renderList() {
    shoppingList.innerHTML = ''
    
    listArr.forEach((gift, index) => {
        const listItem = document.createElement('li')
        listItem.innerHTML = `${gift} <button class='del'>Delete</button> <button class='edit'>Edit</button>`
        
        const delBtn = listItem.querySelector('.del')
        delBtn.addEventListener('click', function(){
            listItem.remove()
            listArr.splice(index, 1)
        })
        
        const editBtn = listItem.querySelector('.edit')
        editBtn.addEventListener('click', function(){
            const currentText = listArr[index]
            
            listItem.innerHTML = `<input class='edit-input' type="text" value="${currentText}"> <button class="save">Save</button>`
            
            const saveBtn = listItem.querySelector('.save')
            saveBtn.addEventListener('click', function(){
                const inputValue = listItem.querySelector('input').value
                listArr[index] = inputValue
                renderList()
            })
        })
        
        shoppingList.appendChild(listItem)
    })
    itemInput.value = ''; // Clear the input field
}

// Add event listener to button
addItemButton.addEventListener('click', checkDuplicate)

// Allow adding items by pressing Enter key
itemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkDuplicate()
    }
})
