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
  let computerMoveCell
  const computerScoreArray = []
  const customerScoreArray = []
  const customerScore = document.querySelector('.customer-score')
  const computerScore = document.querySelector('.computer-score')
  const resultDisplay = document.querySelector('.result')
  let result
  

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
  const ind = 0
  function customerShipPositions(event) {
  
    if (customerShipPositionsArray.length === 4){
      btn.style.display = 'inline'
    }
    if (customerShipPositionsArray.length <= 3) {
      customerShipPositionsArray.push(event.target.textContent)
      event.target.classList.add('ships-positions') 
    }
    
  }
  // BATTLEFIELD

  // Transferring Customer to Battlefield

  function Battlefield() {
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
    
    // Hit Ship Position
    computerCells.forEach( cell => {
      cell.addEventListener('click', hitShipPosition)
    })
    function hitShipPosition(event) {
      if (event.target.className === 'ships-positions'){
        event.target.classList.add('ship-hit')
        customerScoreArray.push(event.target)
      }

      // Counting Computer Score
      const displayCustomerScore = customerScoreArray.length
      customerScore.textContent = displayCustomerScore
      


      // Computer Move

      setTimeout(() => {
        
        computerMoveCell = customerCells[Math.floor(Math.random() * customerCells.length)]
        // computerMoveCell.classList.add('missed-hit')
        if (computerMoveCell.className === 'ships-positions'){
          computerScoreArray.push(computerMoveCell)
          
        }
        
      }, 1000)

      // Counting Computer Score
      const displayComputerScore = computerScoreArray.length

      //Displaying Computer Score
      computerScore.textContent = displayComputerScore
      
      if (parseInt(computerScore.textContent) >= 4){
        result = 'Your Opponent Win'
      } else if (parseInt(customerScore.textContent) >= 4){
        result = 'You Win'
      }
      resultDisplay.textContent = result
      console.log(customerScore.textContent)
      
      
      
      
      

    }
  }
  // End of BATTLEFIELD
  
  


  // EVENTS

  // Transferring customer from welcome screen to Strategy Panel 
  playImage.addEventListener('click', removeWelcomeScreen)


  //Storing Customer Positions
  customerCells.forEach(cell => {
    cell.addEventListener('click', customerShipPositions)
  })

  // Click on a Next Button Which transfer Customer to a Battlefield
  btn.addEventListener('click', Battlefield)

  
  
  

}

window.addEventListener('DOMContentLoaded', init)