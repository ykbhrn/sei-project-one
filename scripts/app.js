function init() {

  // ELEMENTS
  const playImage = document.querySelector('.welcome-screen img')
  const welcomeScreen = document.querySelector('.welcome-screen')
  const btn = document.querySelector('button')


  //Grid variables
  const grid = document.querySelector('.grid')
  const computerGrid = document.createElement('div')
  const customerCells = []
  const computerCells = []
  const gridWrapper = document.querySelector('.grid-wrapper')
  const width = 14
  const cellCounts = width * width

  // Game Variables

  const customerShipPositionsArray = []
  const computerShipPositionsArray = []

  // FUNCTIONS

  // Create a Grid Function
  function createCells(element, array) {
    for (let i = 0; i < cellCounts; i++) {
      const cell = document.createElement('div')
      element.appendChild(cell)
      cell.textContent = i
      array.push(cell)
    }
  }

  // Invoking Grid Function
  createCells(grid, customerCells)

  // Remove Welcome Screen
  function removeWelcomeScreen() {
    welcomeScreen.remove()
    playImage.remove()
  }

  // Storing Customer Ship Position in customerShipPositionArray
  function customerShipPositions(event) {
    customerShipPositionsArray.push(event.target.textContent)
    event.target.classList.add('ships-positions')
    if (customerShipPositionsArray.length >= 4) {
      return btn.style.display = 'inline'
    }

  }

  // Transferring Customer to Battlefield and Storing Computer and Customer Positions

  function transferToBattlefield() {
    // Removing Strategy Panel
    btn.remove()
    grid.classList.remove('grid')

    // Editing Grid to make it Customer Grid...so Grid is Customer Grid Now
    grid.classList.add('customer-grid')

    // Creating Computer Grid
    computerGrid.classList.add('computer-grid')
    gridWrapper.appendChild(computerGrid)
    createCells(computerGrid, computerCells)

    // Storing Customer Ship Positions
    let customerPositions
    customerShipPositionsArray.forEach(position => {
      customerPositions = customerCells[parseInt(position)]
      customerPositions.classList.add('ships-positions')
    })

    // Storing Computer Ship Positions
    const computerFirstPosition = Math.floor(Math.random() * computerCells.length)
    const computerSecondPosition = Math.floor(Math.random() * computerCells.length)
    const computerThirdPosition = Math.floor(Math.random() * computerCells.length)
    const computerFourthPosition = Math.floor(Math.random() * computerCells.length)

    computerCells[computerFirstPosition].classList.add('ships-positions')
    computerCells[computerSecondPosition].classList.add('ships-positions')
    computerCells[computerThirdPosition].classList.add('ships-positions')
    computerCells[computerFourthPosition].classList.add('ships-positions')
    computerShipPositionsArray.push(computerCells[computerFirstPosition], computerCells[computerSecondPosition], computerCells[computerThirdPosition], computerCells[computerFourthPosition])   
  }

  // Hit Ship Position
  function hitShipPosition() {
    comput
   
  }


  // EVENTS

  // Transferring customer from welcome screen to Strategy Panel 
  playImage.addEventListener('click', removeWelcomeScreen)


  //Storing Customer Positions
  customerCells.forEach(cell => {
    cell.addEventListener('click', customerShipPositions)
  })

  // Click on a Next Button Which transfer Customer to a Battlefield
  btn.addEventListener('click', transferToBattlefield)

  // Click on a Ship Position
  computerShipPositionsArray.forEach(cell => {
    cell.addEventListener('click', hitShipPosition)
  })


}

window.addEventListener('DOMContentLoaded', init)