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
    welcomeScreen.remove()
    playImage.remove()
  }

  // Storing Customer Ship Position in customerShipPositionArray
  function customerShipPositions(event) {
    customerShipPositionsArray.push(event.target.textContent)
    if (customerShipPositionsArray.length - 1 >= 4) {
      return  btn.style.display = 'inline'
    }
  }
  
  // Transferring Customer to Battlefield
  function transferToBattlefield(){
    gridWrapper.remove()
    btn.remove()
  }
  
   
  // EVENTS
  
  // Transferring customer from welcome screen to Strategy Panel 
  playImage.addEventListener('click', removeWelcomeScreen)
 

  //Remembering Customer Positions
  cells.forEach(cell => {
    cell.addEventListener('click', customerShipPositions)
  })

  // Click on a Next Button Which transfer Customer to a Battlefield
  btn.addEventListener('click', transferToBattlefield)



}

window.addEventListener('DOMContentLoaded', init)