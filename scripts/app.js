function init() {

  // ELEMENTS
  const grid = document.querySelector('.grid')
  const gridWrapper = document.querySelector('.grid-wrapper')
  const cells = []
  const playImage = document.querySelector('.welcome-screen img')
  const welcomeScreen = document.querySelector('.welcome-screen')
  const btn = document.querySelector('button')
  

  //Grid variables
  const width = 14
  const cellCounts = width * width

  // Game Variables

  const customerShipPositionsArray = []

  // FUNCTIONS

  // Create a Grid Function
  function createCells() {
    for ( let i = 0; i < cellCounts; i++){
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cell.textContent = i
      cells.push(cell)
    }  
  }

  // Invoking Grid Function
  createCells()

  // Remove Welcome Screen
  function removeWelcomeScreen() {
    welcomeScreen.classList.remove('welcome-screen')
    playImage.remove()
  }

  //
  function customerShipPositions(event) {
    return customerShipPositionsArray.push(event.target.textContent)
  }
  
  
   
  // EVENTS
  
  // Transferring customer from welcome screen to Strategy Panel 
  playImage.addEventListener('click', removeWelcomeScreen)
 

  //Remembering Customer Positions
  cells.forEach(cell => {
    cell.addEventListener('click', customerShipPositions)
  })

 



}

window.addEventListener('DOMContentLoaded', init)