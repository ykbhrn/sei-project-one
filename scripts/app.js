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
  let isPlaying = false

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
    if ( (parseInt(event.target.textContent) % width === 0) || ((parseInt(event.target.textContent) + 1) % width === 0) || (event.target.className === 'ships-positions') || (event.target.nextSibling.className === 'ships-positions') || (event.target.previousSibling.className === 'ships-positions')) {
      return
    } else {

      const shipPosition = customerCells[parseInt(event.target.textContent)]
      const secondPosition = customerCells[parseInt(event.target.textContent) + 1]
      const thirdPosition = customerCells[parseInt(event.target.textContent) - 1]
      if (customerShipPositionsArray.length === 9){
        btn.style.display = 'inline'
      }
      if (customerShipPositionsArray.length <= 9) {
        customerShipPositionsArray.push(shipPosition, (shipPosition + 1), (shipPosition - 1))
        shipPosition.classList.add('ships-positions') 
        secondPosition.classList.add('ships-positions')
        thirdPosition.classList.add('ships-positions')
      }
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
    // let customerPositions
    // customerShipPositionsArray.forEach(position => {
    //   customerPositions = customerCells[parseInt(position)]
    //   customerPositions.classList.add('ships-positions')
    // })

    // COMPUTER SHIP POSITIONS
    let computerFirstPosition = Math.floor(Math.random() * computerCells.length)
    let computerSecondPosition = Math.floor(Math.random() * computerCells.length)
    let computerThirdPosition = Math.floor(Math.random() * computerCells.length)
    let computerFourthPosition = Math.floor(Math.random() * computerCells.length)
  
    // Determining First Computer Ship Position
    if ( computerCells[computerFirstPosition].className === 'ships-positions'){
      computerFirstPosition = computerFirstPosition + width
    }
    if (computerFirstPosition % width === 0){
      computerFirstPosition = computerFirstPosition + 1
    } else if ((computerFirstPosition + 1) % width === 0){
      computerFirstPosition = computerFirstPosition - 1
    } 
    computerCells[computerFirstPosition].classList.add('ships-positions')
    computerCells[computerFirstPosition + 1].classList.add('ships-positions')
    computerCells[computerFirstPosition - 1].classList.add('ships-positions')
    computerShipPositionsArray.push(computerCells[computerFirstPosition], computerCells[computerFirstPosition + 1], computerCells[computerFirstPosition - 1])
    // Determining Second Computer Ship Position
    if ( computerCells[computerSecondPosition].className === 'ships-positions'){
      computerSecondPosition = computerSecondPosition + width
    }
    if (computerSecondPosition % width === 0){
      computerSecondPosition = computerSecondPosition + 1
    } else if ((computerSecondPosition + 1) % width === 0){
      computerSecondPosition = computerSecondPosition - 1
    } 
    computerCells[computerSecondPosition].classList.add('ships-positions')
    computerCells[computerSecondPosition + 1].classList.add('ships-positions')
    computerCells[computerSecondPosition - 1].classList.add('ships-positions')
    computerShipPositionsArray.push(computerCells[computerSecondPosition], computerCells[computerSecondPosition + 1], computerCells[computerSecondPosition - 1])   
    // Determining Third Computer Ship Position
    if ( computerCells[computerThirdPosition].className === 'ships-positions'){
      computerThirdPosition = computerThirdPosition + width
    }
    if (computerThirdPosition % width === 0){
      computerThirdPosition = computerThirdPosition + 1
    } else if ((computerThirdPosition + 1) % width === 0){
      computerThirdPosition = computerThirdPosition - 1
    } 
    computerCells[computerThirdPosition].classList.add('ships-positions')
    computerCells[computerThirdPosition + 1].classList.add('ships-positions')
    computerCells[computerThirdPosition - 1].classList.add('ships-positions')
    computerShipPositionsArray.push(computerCells[computerThirdPosition], computerCells[computerThirdPosition + 1], computerCells[computerThirdPosition - 1])
    // Determining Fourth Computer Ship Position
    if ( computerCells[computerFourthPosition].className === 'ships-positions'){
      computerFourthPosition = computerFourthPosition + width
    }
    if (computerFourthPosition % width === 0){
      computerFourthPosition = computerFourthPosition + 1
    } else if ((computerFourthPosition + 1) % width === 0){
      computerFourthPosition = computerFourthPosition - 1
    } 
    computerCells[computerFourthPosition].classList.add('ships-positions')
    computerCells[computerFourthPosition + 1].classList.add('ships-positions')
    computerCells[computerFourthPosition - 1].classList.add('ships-positions')
    computerShipPositionsArray.push(computerCells[computerFourthPosition], computerCells[computerFourthPosition + 1], computerCells[computerFourthPosition - 1])
    
    
    
    // Customer Move
    computerCells.forEach( cell => {
      cell.addEventListener('click', customerMove)
    })
    function customerMove(event) {
      if (isPlaying) return
      event.target.classList.add('missed-hit')
      if (event.target.className === 'ships-positions missed-hit'){
        event.target.classList.add('ship-hit')
        customerScoreArray.push(event.target)
      }

      // Counting Computer Score
      const displayCustomerScore = customerScoreArray.length
      customerScore.textContent = displayCustomerScore
      
      // Computer Move
      isPlaying = true
      setTimeout(() => {
      
        computerMoveCell = customerCells[Math.floor(Math.random() * customerCells.length)]
        if (computerMoveCell.classList.contains('missed-hit')) {
          
          console.log('it happens')
          
        }
        // Add class ship-hit to the attacked cell which contains customer ship and also pushing this cell to the array of attacked ships
        if (computerMoveCell.classList.contains('ships-positions')){
          computerMoveCell.classList.add('ship-hit') 
          computerScoreArray.push(computerMoveCell)   
        }
        // Add missed-hit class to a cell which was already attacked
        computerMoveCell.classList.add('missed-hit')
        console.log(computerMoveCell)
      
        // Counting Computer Score
        const displayComputerScore = computerScoreArray.length

        //Displaying Computer Score
        computerScore.textContent = displayComputerScore
      
        if (parseInt(computerScore.textContent) >= 12){
          result = 'Your Opponent Win'
        } else if (parseInt(customerScore.textContent) >= 12){
          result = 'You Win'
        }
        resultDisplay.textContent = result
        isPlaying = false
      }, 7000)
  
      
      

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