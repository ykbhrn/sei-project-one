function init() {

  // ELEMENTS
  const playImage = document.querySelector('.welcome-screen img')
  const welcomeScreen = document.querySelector('.welcome-screen')
  const btn = document.querySelector('button')
  const choiceWrapper = document.querySelector('.side-choice-wrapper')
  const main = document.querySelector('main')
  const superpower = document.querySelector('.superpower')
  const enemy = document.querySelector('.enemy')
  let anthem
  let wavingFlagGif
  let chosenCountryName
  const countries = [
    {
      name: 'EU',
      src: './audios/euanthem.mp3',
      imgSrc: 'url(./images/euflag.gif)',
      wavingFlag: './images/eu.gif'
    },
    {
      name: 'USA',
      src: './audios/usaanthem.mp3',
      imgSrc: 'url(./images/usaflag.gif)',
      wavingFlag: './images/usa.gif'
    },
    {
      name: 'China',
      src: './audios/chinaanthem.mp3',
      imgSrc: 'url(./images/chinaflag.gif)',
      wavingFlag: './images/china.gif'
    },
    {
      name: 'UK',
      src: './audios/ukanthem.mp3',
      imgSrc: 'url(./images/ukflag.gif)',
      wavingFlag: './images/uk.gif'
    },
    {
      name: 'Russia',
      src: './audios/russiananthem.mp3',
      imgSrc: 'url(./images/russiaflag.gif)',
      wavingFlag: './images/russia.gif'
    }
  ]
  const countriesDivs = []

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
  let displayComputerScore
  let displayCustomerScore
  const resultDisplay = document.querySelector('.result')
  const score = document.querySelector('.score')
  let result
  let isComputerPlaying = false
  const anthemArray = []
  const chosenCountryNameArray = []
  const wavingFlagArray = []
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

  // Remove Welcome Screen and Creating Country Divs
  function removeWelcomeScreen() {
    setTimeout(() => {
      welcomeScreen.remove()
      playImage.remove()
      choiceWrapper.style.display = 'flex'
      superpower.style.display = 'block'
      for (let i = 0; i < countries.length; i++){
        const country = document.createElement('div')
        choiceWrapper.appendChild(country)
        country.textContent = countries[i].name
        country.style.background = countries[i].imgSrc
        country.src = countries[i].src
        country.id = countries[i].wavingFlag
        country.classList.add('side-choice')
        countriesDivs.push(country)
      }

      // Storing Customer Side Choice and remove it
      function superPowerChoice(event) {
        setTimeout(() => {
          superpower.style.display = 'none'
          enemy.style.display = 'block'
          const customerChoice = document.createElement('audio')
          customerChoice.src = event.target.src
          event.target.appendChild(customerChoice)
          anthem = customerChoice
          wavingFlagGif = event.target.id
          chosenCountryName = event.target.textContent
          anthemArray.push(anthem)
          chosenCountryNameArray.push(chosenCountryName)
          wavingFlagArray.push(wavingFlagGif)
        }, 200)
    

        // Storing Enemy Side Choice and Transferring to Strategy Panel
        function enemyChoice(eventTwo) {
          setTimeout(() => {
            gridWrapper.style.display = 'flex'
            superpower.style.display = 'none'
            choiceWrapper.style.display = 'none'
            enemy.style.display = 'none'
            choiceWrapper.style.display = 'none'
            const enemyChoice = document.createElement('audio')
            enemyChoice.src = eventTwo.target.src
            eventTwo.target.appendChild(enemyChoice)
          }, 200)
        }
        // Event --- Transferring customer from Enemy Side Choice to Strategy Panel
        countriesDivs.forEach( country => {
          country.addEventListener('click', enemyChoice)
        })
      
      }
      // Event --- Transferring customer from his SuperPower choice to Enemy SuperPower choice
      countriesDivs.forEach( country => {
        country.addEventListener('click', superPowerChoice)
      })
    }, 200)
  }

  
  // Storing Customer Ships Positions in customerShipPositionArray

  function customerShipPositions(event) {
    // First Ship
    if (customerShipPositionsArray.length < 3) {
      if (((parseInt(event.target.textContent) + 1) % width === 0) || ((parseInt(event.target.textContent) + 2) % width === 0)
        || ((parseInt(event.target.textContent) + 3) % width === 0)) {
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
    } else if (customerShipPositionsArray.length > 3 && customerShipPositionsArray.length < 5) {
      if (((parseInt(event.target.textContent) + 1) % width === 0) || (event.target.classList.contains('ships-positions'))
        || (customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent].classList.contains('ships-positions'))) {
        return
      } else {
        const shipPosition = customerCells[parseInt(event.target.textContent)]
        const secondPosition = customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent]

        shipPosition.classList.add('ships-positions')
        secondPosition.classList.add('ships-positions')
        customerShipPositionsArray.push(shipPosition, secondPosition)
      }  // Third Ship
    } else if (customerShipPositionsArray.length > 5 && customerShipPositionsArray.length < 7) {
      if (((parseInt(event.target.textContent) + 1) % width === 0) || ((parseInt(event.target.textContent) + 2) % width === 0)
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
    } else if (customerShipPositionsArray.length > 8 && customerShipPositionsArray.length < 11) {
      if (((parseInt(event.target.textContent) + 1) % width === 0) || ((parseInt(event.target.textContent) + 2) % width === 0)
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
    // Showing score
    score.style.display = 'block'

    // Creating Computer Grid
    computerGrid.classList.add('computer-grid')
    gridWrapper.appendChild(computerGrid)
    createCells(computerGrid, computerCells)
    // Storing Computer Ship Positions
    // First Ship
    const firstComputerShip = setInterval(() => {
      const computerFirstPosition = Math.floor(Math.random() * computerCells.length)
      if (((computerFirstPosition + 1) % width === 0) || ((computerFirstPosition + 2) % width === 0)
        || ((computerFirstPosition + 3) % width === 0)) return
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
      if (((computerSecondPosition + 1) % width === 0) || (computerCells[computerSecondPosition].classList.contains('ships-positions'))
        || (computerCells[computerSecondPosition + 1].classList.contains('ships-positions'))) return
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
      if (((computerThirdPosition + 1) % width === 0) || ((computerThirdPosition + 2) % width === 0)
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
    }, 6)
    // Fourth Ship
    const fourthComputerShip = setInterval(() => {
      const computerFourthPosition = Math.floor(Math.random() * computerCells.length)
      if ((computerFourthPosition + 1) % width === 0 || (computerFourthPosition + 2) % width === 0
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
    }, 50)

    // Customer Move
    // Event --- Click on the Computer Grid
    computerCells.forEach(cell => {
      cell.addEventListener('click', customerMove)
    })
    function customerMove(event) {
      if (isComputerPlaying) return
      if (event.target.classList.contains('missed-hit')) return
      event.target.classList.add('missed-hit')
      if (event.target.classList.contains('ships-positions')) {
        event.target.classList.add('ship-hit')
        customerScoreArray.push(event.target)
      }

      // Counting Customer Score
      displayCustomerScore = customerScoreArray.length
      // Displaying Customer Score
      customerScore.textContent = chosenCountryNameArray[0] + ' Score Is: ' +  displayCustomerScore
      

      // Computer Move
      isComputerPlaying = true
      setTimeout(() => {
        const computerMoveInterval = setInterval(() => {
          computerMoveCell = customerCells[Math.floor(Math.random() * customerCells.length)]
          if (computerMoveCell.classList.contains('missed-hit')) return
          // Add class ship-hit to the attacked cell which contains customer ship and also pushing this cell to the array of attacked ships
          else {
            if (computerMoveCell.classList.contains('ships-positions')) {
              computerMoveCell.classList.add('ship-hit')
              computerScoreArray.push(computerMoveCell)
            }
            // Add missed-hit class to a cell which was already attacked
            computerMoveCell.classList.add('missed-hit')
            console.log(computerMoveCell)
            clearInterval(computerMoveInterval)

            // Counting Computer Score
            displayComputerScore = computerScoreArray.length

            //Displaying Computer Score
            computerScore.textContent = chosenCountryNameArray[1] + ' Score Is: ' +  displayComputerScore

          }
        }, 1)
        // Customer Win
        if (displayCustomerScore >= 14) {
          const flag = document.createElement('img')
          flag.classList.add('flag')
          const winnerFlag = wavingFlagArray[0]
          flag.src = winnerFlag
          main.appendChild(flag)
          const winnerAnthem = anthemArray[0]
          winnerAnthem.play()
          console.log(winnerAnthem)
          console.log(winnerFlag)
          result = chosenCountryNameArray[0] + ' Win'
          //Displaying The Winner
          resultDisplay.textContent = result
          return // Computer Win
        } else if (displayComputerScore >= 14) {
          const flag = document.createElement('img')
          flag.classList.add('flag')
          flag.src = wavingFlagArray[1]
          main.appendChild(flag)
          anthemArray[1].play()
          result = chosenCountryNameArray[1] + ' Win'
          //Displaying The Winner
          resultDisplay.textContent = result
          return
        } 
      
        isComputerPlaying = false
      }, 5)
    }
  }
  // End of BATTLEFIELD

  // EVENTS

  // Transferring customer from welcome screen to Side Choice
  playImage.addEventListener('click', removeWelcomeScreen)

  

  //Storing Customer Positions
  customerCells.forEach(cell => {
    cell.addEventListener('click', customerShipPositions)
  })

  // Click on a Next Button Which transfer Customer to a Battlefield
  btn.addEventListener('click', Battlefield)





}

window.addEventListener('DOMContentLoaded', init)