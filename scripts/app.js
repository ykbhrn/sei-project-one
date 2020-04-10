function init() {

  // ELEMENTS
  const playImage = document.querySelector('.welcome-screen img')
  const welcomeScreen = document.querySelector('.welcome-screen')
  const btn = document.querySelector('button')


  //Grid variables
  const grid = document.querySelector('.grid')
  const customerGrid = document.createElement('div')
  const cells = []
  const gridWrapper = document.querySelector('.grid-wrapper')
  const width = 14
  const cellCounts = width * width

  // Game Variables

  const customerShipPositionsArray = []
  const computerShipPositionsArray = []

  // FUNCTIONS

  // Create a Grid Function
  function createCells(element) {
    for (let i = 0; i < cellCounts; i++) {
      const cell = document.createElement('div')
      element.appendChild(cell)
      cell.textContent = i
      cells.push(cell)
    }
  }

  // Invoking Grid Function
  createCells(grid)

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

    // Creating Computer Grid
    grid.classList.add('computer-grid')

    // Creating Customer Grid
    customerGrid.classList.add('customer-grid')
    gridWrapper.appendChild(customerGrid)
    createCells(customerGrid)

    // Storing Customer Ship Positions
    let customerPositions
    customerShipPositionsArray.forEach(position => {
      customerPositions = cells[parseInt(position)]
      customerPositions.classList.add('ships-positions')
    })

    // Storing Computer Ship Positions
    const computerFirstPosition = Math.floor((Math.random() * cells.length / 2) + 196)
    const computerSecondPosition = Math.floor((Math.random() * cells.length / 2) + 196)
    const computerThirdPosition = Math.floor((Math.random() * cells.length / 2) + 196)
    const computerFourthPosition = Math.floor((Math.random() * cells.length / 2) + 196)

    cells[computerFirstPosition].classList.add('ships-positions')
    cells[computerSecondPosition].classList.add('ships-positions')
    cells[computerThirdPosition].classList.add('ships-positions')
    cells[computerFourthPosition].classList.add('ships-positions')
    computerShipPositionsArray.push(cells[computerFirstPosition], cells[computerSecondPosition], cells[computerThirdPosition], cells[computerFourthPosition])
    console.log(computerShipPositionsArray)
    
  }

  // Hit Ship Position
  function hitShipPosition() {
    console.log('jej')
   
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

  // Click on a Ship Position
  computerShipPositionsArray.forEach(cell => {
    cell.addEventListener('click', hitShipPosition)
  })


}

window.addEventListener('DOMContentLoaded', init)