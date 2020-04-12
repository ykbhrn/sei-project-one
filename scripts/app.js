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
  let isComputerPlaying = false

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

  // Storing Customer Ships Positions in customerShipPositionArray
  
  function customerShipPositions(event) {
    // First Ship
    if (customerShipPositionsArray.length < 3){
      if ( ((parseInt(event.target.textContent) + 1) % width === 0) || ((parseInt(event.target.textContent) + 2) % width === 0)
    || ((parseInt(event.target.textContent) + 3) % width === 0) ) {
        return 
      } else {
        const shipPosition = customerCells[parseInt(event.target.textContent)]
        const secondPosition = customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent]
        const thirdPosition = customerCells[grid.children[parseInt(event.target.textContent) + 2].textContent]
        const fourthPosition = customerCells[grid.children[parseInt(event.target.textContent) + 3].textContent]
        
        shipPosition.classList.add('ships-positions') 
        secondPosition.classList.add('ships-positions') 
        thirdPosition.classList.add('ships-positions')
        fourthPosition.classList.add('ships-positions') 
        customerShipPositionsArray.push(shipPosition, secondPosition, thirdPosition, fourthPosition) 
      }  // Second Ship
    } else if (customerShipPositionsArray.length > 3 && customerShipPositionsArray.length < 5 ) {
      if ( ((parseInt(event.target.textContent) + 1) % width === 0) || (event.target.classList.contains('ships-positions')) 
    || (customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent].classList.contains('ships-positions'))) {
        return 
      } else {
        const shipPosition = customerCells[parseInt(event.target.textContent)]
        const secondPosition = customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent]

        shipPosition.classList.add('ships-positions') 
        secondPosition.classList.add('ships-positions')      
        customerShipPositionsArray.push(shipPosition, secondPosition) 
      }  // Third Ship
    } else if (customerShipPositionsArray.length > 5 && customerShipPositionsArray.length < 7){
      if ( ((parseInt(event.target.textContent) + 1) % width === 0) || ((parseInt(event.target.textContent) + 2) % width === 0)
    || (event.target.classList.contains('ships-positions')) 
    || (customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent].classList.contains('ships-positions'))
    || (customerCells[grid.children[parseInt(event.target.textContent) + 2].textContent].classList.contains('ships-positions'))) {
        return 
      } else {
        const shipPosition = customerCells[parseInt(event.target.textContent)]
        const secondPosition = customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent]
        const thirdPosition = customerCells[grid.children[parseInt(event.target.textContent) + 2].textContent]

        shipPosition.classList.add('ships-positions') 
        secondPosition.classList.add('ships-positions') 
        thirdPosition.classList.add('ships-positions')
        customerShipPositionsArray.push(shipPosition, secondPosition, thirdPosition)   
      } // Fourth Ship
    } else if (customerShipPositionsArray.length > 8 && customerShipPositionsArray.length < 11){
      if ( ((parseInt(event.target.textContent) + 1) % width === 0) || ((parseInt(event.target.textContent) + 2) % width === 0)
    || ((parseInt(event.target.textContent) + 3) % width === 0) || ((parseInt(event.target.textContent) + 4) % width === 0)
    || (event.target.classList.contains('ships-positions')) 
    || (customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent].classList.contains('ships-positions'))
    || (customerCells[grid.children[parseInt(event.target.textContent) + 2].textContent].classList.contains('ships-positions'))
    || (customerCells[grid.children[parseInt(event.target.textContent) + 3].textContent].classList.contains('ships-positions'))
    || (customerCells[grid.children[parseInt(event.target.textContent) + 4].textContent].classList.contains('ships-positions'))) {
        return 
      } else {
        const shipPosition = customerCells[parseInt(event.target.textContent)]
        const secondPosition = customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent]
        const thirdPosition = customerCells[grid.children[parseInt(event.target.textContent) + 2].textContent]
        const fourthPosition = customerCells[grid.children[parseInt(event.target.textContent) + 3].textContent]
        const fifthPosition = customerCells[grid.children[parseInt(event.target.textContent) + 4].textContent]
 
        shipPosition.classList.add('ships-positions') 
        secondPosition.classList.add('ships-positions') 
        thirdPosition.classList.add('ships-positions')
        fourthPosition.classList.add('ships-positions') 
        fifthPosition.classList.add('ships-positions')
        customerShipPositionsArray.push(shipPosition, secondPosition, thirdPosition, fourthPosition, fifthPosition)
        btn.style.display = 'inline'
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
    // Storing Computer Ship Positions
    // First Ship
    const firstComputerShip = setInterval(() => {
      const computerFirstPosition = Math.floor(Math.random() * computerCells.length)
      if ( ((computerFirstPosition + 1) % width === 0) || ((computerFirstPosition + 2) % width === 0)
      || ((computerFirstPosition + 3) % width === 0) ) return
      else {
        computerCells[computerFirstPosition].classList.add('ships-positions')
        computerCells[computerFirstPosition + 1].classList.add('ships-positions')
        computerCells[computerFirstPosition + 2].classList.add('ships-positions')
        computerCells[computerFirstPosition + 3].classList.add('ships-positions')
        computerShipPositionsArray.push(computerCells[computerFirstPosition], computerCells[computerFirstPosition + 1], computerCells[computerFirstPosition + 2], computerCells[computerFirstPosition + 3])
        clearInterval(firstComputerShip)
      }
    }, 1)
    // Second Ship
    const secondComputerShip = setInterval(() => {
      const computerSecondPosition = Math.floor(Math.random() * computerCells.length)
      if ( ((computerSecondPosition + 1) % width === 0) || (computerCells[computerSecondPosition].classList.contains('ships-positions')) 
    || (computerCells[computerSecondPosition + 1].classList.contains('ships-positions')) ) return 
      else {
        computerCells[computerSecondPosition].classList.add('ships-positions')
        computerCells[computerSecondPosition + 1].classList.add('ships-positions')
        computerShipPositionsArray.push(computerCells[computerSecondPosition], computerCells[computerSecondPosition + 1])
        clearInterval(secondComputerShip)
      }   
    }, 2)
    // Third Ship
    const thirdComputerShip = setInterval(() => {
      const computerThirdPosition = Math.floor(Math.random() * computerCells.length)
      if ( ((computerThirdPosition + 1) % width === 0) || ((computerThirdPosition + 2) % width === 0)
      || (computerCells[computerThirdPosition].classList.contains('ships-positions')) 
      || (computerCells[computerThirdPosition + 1].classList.contains('ships-positions'))
      || (computerCells[computerThirdPosition + 2].classList.contains('ships-positions'))) return
      else {
        computerCells[computerThirdPosition].classList.add('ships-positions')
        computerCells[computerThirdPosition + 1].classList.add('ships-positions')
        computerCells[computerThirdPosition + 2].classList.add('ships-positions')
        computerShipPositionsArray.push(computerCells[computerThirdPosition], computerCells[computerThirdPosition + 1], computerCells[computerThirdPosition + 2])
        clearInterval(thirdComputerShip)
      }
    }, 3)
    // Fourth Ship
    const fourthComputerShip = setInterval(() => {
      const computerFourthPosition = Math.floor(Math.random() * computerCells.length)
      if ( ( computerFourthPosition + 1) % width === 0 || (computerFourthPosition + 2) % width === 0
      || (computerFourthPosition + 3) % width === 0 || (computerFourthPosition + 4) % width === 0
      || computerCells[computerFourthPosition].classList.contains('ships-positions') 
      || computerCells[computerFourthPosition + 1].classList.contains('ships-positions')
      || computerCells[computerFourthPosition + 2].classList.contains('ships-positions')
      || computerCells[computerFourthPosition + 3].classList.contains('ships-positions')
      || computerCells[computerFourthPosition + 4].classList.contains('ships-positions')) return
      else {
        computerCells[computerFourthPosition].classList.add('ships-positions')
        computerCells[computerFourthPosition + 1].classList.add('ships-positions')
        computerCells[computerFourthPosition + 2].classList.add('ships-positions')
        computerCells[computerFourthPosition + 3].classList.add('ships-positions')
        computerCells[computerFourthPosition + 4].classList.add('ships-positions')
        computerShipPositionsArray.push(computerCells[computerFourthPosition], computerCells[computerFourthPosition + 1], computerCells[computerFourthPosition + 2], computerCells[computerFourthPosition + 3], computerCells[computerFourthPosition + 4])
        clearInterval(fourthComputerShip)
      }
    }, 4)


    

    // Determining Second Computer Ship Position
    // if ( computerCells[computerSecondPosition].classList.contains('ships-positions')){
    //   computerSecondPosition = computerSecondPosition + width
    // }
    // if (computerSecondPosition % width === 0){
    //   computerSecondPosition = computerSecondPosition + 1
    // } else if ((computerSecondPosition + 1) % width === 0){
    //   computerSecondPosition = computerSecondPosition - 1
    // } 
    // computerCells[computerSecondPosition].classList.add('ships-positions')
    // computerCells[computerSecondPosition + 1].classList.add('ships-positions')
    // computerCells[computerSecondPosition - 1].classList.add('ships-positions')
    // computerShipPositionsArray.push(computerCells[computerSecondPosition], computerCells[computerSecondPosition + 1], computerCells[computerSecondPosition - 1])   
    // // Determining Third Computer Ship Position
    
    // if ( computerCells[computerThirdPosition].classList.contains('ships-positions')){
    //   computerThirdPosition = computerThirdPosition + width
    // }
    // if (computerThirdPosition % width === 0){
    //   computerThirdPosition = computerThirdPosition + 1
    // } else if ((computerThirdPosition + 1) % width === 0){
    //   computerThirdPosition = computerThirdPosition - 1
    // } 
    // computerCells[computerThirdPosition].classList.add('ships-positions')
    // computerCells[computerThirdPosition + 1].classList.add('ships-positions')
    // computerCells[computerThirdPosition - 1].classList.add('ships-positions')
    // computerShipPositionsArray.push(computerCells[computerThirdPosition], computerCells[computerThirdPosition + 1], computerCells[computerThirdPosition - 1])
    // // Determining Fourth Computer Ship Position
    // if ( computerCells[computerFourthPosition].classList.contains('ships-positions')){
    //   computerFourthPosition = computerFourthPosition + width
    // }
    // if (computerFourthPosition % width === 0){
    //   computerFourthPosition = computerFourthPosition + 1
    // } else if ((computerFourthPosition + 1) % width === 0){
    //   computerFourthPosition = computerFourthPosition - 1
    // } 
    // computerCells[computerFourthPosition].classList.add('ships-positions')
    // computerCells[computerFourthPosition + 1].classList.add('ships-positions')
    // computerCells[computerFourthPosition - 1].classList.add('ships-positions')
    // computerShipPositionsArray.push(computerCells[computerFourthPosition], computerCells[computerFourthPosition + 1], computerCells[computerFourthPosition - 1])
    
    
    
    // Customer Move
    computerCells.forEach( cell => {
      cell.addEventListener('click', customerMove)
    })
    function customerMove(event) {
      if (isComputerPlaying) return
      if (event.target.classList.contains('missed-hit')) return
      event.target.classList.add('missed-hit')
      if (event.target.classList.contains('ships-positions')){
        event.target.classList.add('ship-hit')
        customerScoreArray.push(event.target)
      }

      // Counting Customer Score
      const displayCustomerScore = customerScoreArray.length
      customerScore.textContent = displayCustomerScore
      
      // Computer Move
      isComputerPlaying = true
      setTimeout(() => {
        const computerMoveInterval = setInterval(() => {
          computerMoveCell = customerCells[Math.floor(Math.random() * customerCells.length)]
          if (computerMoveCell.classList.contains('missed-hit')) return 
          // Add class ship-hit to the attacked cell which contains customer ship and also pushing this cell to the array of attacked ships
          else {
            if (computerMoveCell.classList.contains('ships-positions')){
              computerMoveCell.classList.add('ship-hit') 
              computerScoreArray.push(computerMoveCell)   
            }
            // Add missed-hit class to a cell which was already attacked
            computerMoveCell.classList.add('missed-hit')
            console.log(computerMoveCell)
            clearInterval(computerMoveInterval)
            
          }
        }, 1)
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
        isComputerPlaying = false
      }, 5000)
  
      
      

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