function init() {
  // ELEMENTS
  const htmlElement = document.querySelector('html')
  const screen = document.querySelector('.full-screen')
  const reset = document.querySelector('.reset')
  const allTheAudios = document.querySelectorAll('audio')
  const battlefieldSounds = document.querySelector('.battlefield-sounds')
  const russianBattleFieldSounds = document.querySelector('.russian-battlefield-sounds')
  let isAudioPlaying = true
  let muteClicker = 0
  let screenCounter = 0
  let tanksChoiceClicker = 0
  const tankChoicer = document.querySelector('.tank-choicer')
  const tankChoicerWrapper = document.querySelector('.tank-choicer-wrapper')
  const tankChoicerHeader = document.querySelector('.tank-choicer-header')
  const tankChoicerText = document.querySelector('.tank-choicer-text')
  const coveringReminder = document.querySelector('.covering-reminder')
  const playImage = document.querySelector('.welcome-screen img')
  const welcomeScreen = document.querySelector('.welcome-screen')
  const introSounds = document.querySelector('.military-march')
  const mute = document.querySelector('.mute')
  const btn = document.querySelector('.next')
  const choiceWrapper = document.querySelector('.side-choice-wrapper')
  const superpower = document.querySelector('.superpower')
  const enemy = document.querySelector('.enemy')
  const computerImg = document.querySelector('.computer-score img')
  const customerImg = document.querySelector('.customer-score img')
  let anthem
  let wavingFlagGif
  let chosenCountryName
  let clickCounter = 0
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
  const width = 10
  const cellCounts = width * width

  // Game Variables
  const customerShipPositionsArray = []
  const computerShipPositionsArray = []
  let computerMoveCell
  const bomb = document.querySelector('.bomb-sound')
  const bombTwo = document.querySelector('.bomb-two')
  const computerScoreArray = []
  const customerScoreArray = []
  const customerScore = document.querySelector('.customer-score')
  const computerScore = document.querySelector('.computer-score')
  const compScoreText = document.querySelector('.computer-score-text')
  const custScoreText = document.querySelector('.customer-score-text')
  let displayComputerScore
  let displayCustomerScore
  const resultDisplay = document.querySelector('.result')
  const resultWrapper = document.querySelector('.result-wrapper')
  const score = document.querySelector('.score')
  // Computer Ships Separatly
  const compShipOne = document.querySelectorAll('.computer-grid-wrapper div.comp-first-ship')
  const compShipOneArray = []
  const compShipTwo = document.querySelectorAll('.comp-second-ship')
  const compShipTwoArray = []
  const compShipThree = document.querySelectorAll('.comp-third-ship')
  const compShipThreeArray = []
  const compShipFour = document.querySelectorAll('.comp-fourth-ship')
  const compShipFourArray = []
  const compShipFive = document.querySelectorAll('.comp-fifth-ship')
  const compShipFiveArray = []
  let result
  let flag
  let isComputerPlaying = false
  const anthemArray = []
  const chosenCountryNameArray = []
  const wavingFlagArray = []

  // Separate array for Every Ship
  const firstShipArray = []
  const secondShipArray = []
  const thirdShipArray = []
  const fourthShipArray = []
  const fifthShipArray = []
  // Array for all the computer shots try
  const computerShotsArray = [playImage]

  // FUNCTIONS

  // Reset Function
  function resetGame() {
    location.reload()  
  }

  // Screen Mode Function
  function screenMode() {
    screenCounter++
    if (screenCounter % 2 === 0){
      document.exitFullscreen()
      screen.style.background = 'url(./images/fullscreen.png)no-repeat'
    } else {
      htmlElement.requestFullscreen()
      screen.style.background = 'url(./images/smallscreen.png)no-repeat'
    }
  }
  // Mute Sounds Function
  function muteSounds() {
    allTheAudios.forEach( audio => {
      if (muteClicker % 2 === 0){  
        audio.muted = true
        isAudioPlaying = false
        mute.style.background = 'url(./images/mute.png)no-repeat'
      } else {
        audio.muted = false
        isAudioPlaying = true
        mute.style.background = 'url(./images/volume.png)no-repeat'
      }
    })
    muteClicker++
  }

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
      reset.style.display = 'block'
      welcomeScreen.remove()
      playImage.remove()
      mute.style.display = 'block'
      introSounds.play()
      introSounds.loop = true
      introSounds.volume = 0.5
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
          clickCounter++
          if (clickCounter === 1){
            const customerChoice = document.createElement('audio')
            customerChoice.src = event.target.src
            event.target.appendChild(customerChoice)
            anthem = customerChoice
            wavingFlagGif = event.target.id
            chosenCountryName = event.target.textContent
            anthemArray.push(anthem)
            chosenCountryNameArray.push(chosenCountryName)
            wavingFlagArray.push(wavingFlagGif)
          }
          if (clickCounter < 2 ){
            event.target.classList.add('customer-country')
          }
          if (clickCounter > 1 && !event.target.classList.contains('customer-country')){
            const customerChoice = document.createElement('audio')
            customerChoice.src = event.target.src
            event.target.appendChild(customerChoice)
            anthem = customerChoice
            wavingFlagGif = event.target.id
            chosenCountryName = event.target.textContent
            anthemArray.push(anthem)
            chosenCountryNameArray.push(chosenCountryName)
            wavingFlagArray.push(wavingFlagGif)
          } else {
            return
          }
          
          
        }, 200)

        // Storing Enemy Side Choice and Transferring to Strategy Panel
        function enemyChoice(ev) {
          setTimeout(() => {
            if (ev.target.classList.contains('customer-country')) {
              return 
            } else {
              gridWrapper.style.display = 'flex'
              superpower.style.display = 'none'
              choiceWrapper.style.display = 'none'
              enemy.classList.remove('enemy')
              enemy.classList.add('strategy-panel')
              enemy.innerHTML = '<h2>Strategy Panel</h2>'
              choiceWrapper.style.display = 'none'
              tankChoicer.style.display = 'block'
              tankChoicerWrapper.style.display = 'flex'
            }
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
    coveringReminder.style.display = 'none'
    
    customerCells.forEach( cell => {
      if (cell.classList.contains('not-allowed')) {
        cell.classList.remove('not-allowed')
      }
    })
    

    // First Ship
    if (customerShipPositionsArray.length < 3) {
      if (((parseInt(event.target.textContent) + 1) % width === 0) || ((parseInt(event.target.textContent) + 2) % width === 0)
        || ((parseInt(event.target.textContent) + 3) % width === 0) 
        || ((parseInt(event.target.textContent) + width) > cellCounts - 1) ) {
        customerCells.forEach( cell => {
          if (parseInt(cell.textContent) < 99) {
            if ( (parseInt(cell.textContent) + 1) % width === 0 || (parseInt(cell.textContent) + 2) % width === 0 || (parseInt(cell.textContent) + 3) % width === 0
            || (parseInt(cell.textContent) + width) > cellCounts - 1 ){
              cell.classList.add('not-allowed')
              grid.children[99].classList.add('not-allowed')
            }
          }    
        })
        
        return coveringReminder.style.display = 'block' 
      } else {
        const shipPosition = customerCells[parseInt(event.target.textContent)]
        const secondPosition = customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent]
        const thirdPosition = customerCells[grid.children[parseInt(event.target.textContent) + 2].textContent]
        const fourthPosition = customerCells[grid.children[parseInt(event.target.textContent) + 3].textContent]
        const fifthPosition = customerCells[grid.children[parseInt(event.target.textContent) + width].textContent]
        const sixthPosition = customerCells[grid.children[parseInt(event.target.textContent) + 1 + width].textContent]
        const seventhPosition = customerCells[grid.children[parseInt(event.target.textContent) + 2 + width].textContent]
        const eighthPosition = customerCells[grid.children[parseInt(event.target.textContent) + 3 + width].textContent]

        shipPosition.classList.add('ships-positions')
        secondPosition.classList.add('ships-positions')
        thirdPosition.classList.add('ships-positions')
        fourthPosition.classList.add('ships-positions')
        fifthPosition.classList.add('ships-positions')
        sixthPosition.classList.add('ships-positions')
        seventhPosition.classList.add('ships-positions')
        eighthPosition.classList.add('ships-positions')
        // Storing Ships as a Class in the Grid Cells
        customerShipPositionsArray.push(shipPosition, secondPosition, thirdPosition, fourthPosition, fifthPosition, sixthPosition, seventhPosition, eighthPosition)
        //Assigning Class to Every Ship Specifically
        shipPosition.classList.add('first-ship')
        shipPosition.classList.add('first-ship-one')
        secondPosition.classList.add('first-ship')
        secondPosition.classList.add('first-ship-two')
        thirdPosition.classList.add('first-ship')
        thirdPosition.classList.add('first-ship-three')
        fourthPosition.classList.add('first-ship')
        fourthPosition.classList.add('first-ship-four')
        fifthPosition.classList.add('first-ship')
        fifthPosition.classList.add('first-ship-five')
        sixthPosition.classList.add('first-ship')
        sixthPosition.classList.add('first-ship-six')
        seventhPosition.classList.add('first-ship')
        seventhPosition.classList.add('first-ship-seven')
        eighthPosition.classList.add('first-ship')
        eighthPosition.classList.add('first-ship-eight')
        firstShipArray.push(shipPosition, secondPosition, thirdPosition, fourthPosition, fifthPosition, sixthPosition, seventhPosition, eighthPosition)
        if(!event.target.classList.contains('not-allowed')){
          tanksChoiceClicker++
        } 
    
        if (tanksChoiceClicker === 1) {
          tankChoicerHeader.textContent = 'Place Your Artillery'
          tankChoicerText.textContent = 'It Contains 2 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank2.png)no-repeat'
        } else if (tanksChoiceClicker === 2) {
          tankChoicerHeader.textContent = 'Place Your Artillery'
          tankChoicerText.textContent = 'It Contains 3 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank3.png)no-repeat'
        } else if (tanksChoiceClicker === 3) {
          tankChoicerHeader.textContent = 'Place Your Himars'
          tankChoicerText.textContent = 'It Contains 6 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank4.png)no-repeat'
        } else if (tanksChoiceClicker === 4) {
          tankChoicerHeader.textContent = 'Place Your Artillery'
          tankChoicerText.textContent = 'It Contains 4 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank5.png)no-repeat'
        } 
      }  // Second Ship
    } else if (customerShipPositionsArray.length > 7 && customerShipPositionsArray.length < 9) {
      if (((parseInt(event.target.textContent) + 1) % width === 0) || (event.target.classList.contains('ships-positions'))
          || (customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent].classList.contains('ships-positions'))) {
        customerCells.forEach( cell => {
          if (parseInt(cell.textContent) < 99) {
            if ((parseInt(cell.textContent) + 1) % width === 0 || grid.children[parseInt(cell.textContent) + 1].classList.contains('ships-positions'))
              cell.classList.add('not-allowed')
            grid.children[99].classList.add('not-allowed')
          }
            
        })
        return coveringReminder.style.display = 'block' 
      } else {
        const shipPosition = customerCells[parseInt(event.target.textContent)]
        const secondPosition = customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent]
        // Storing Ships as a Class in the Grid Cells
        shipPosition.classList.add('ships-positions')
        secondPosition.classList.add('ships-positions')
        customerShipPositionsArray.push(shipPosition, secondPosition)
        //Assigning Class to Every Ship Specifically
        shipPosition.classList.add('second-ship')
        shipPosition.classList.add('second-ship-one')
        secondPosition.classList.add('second-ship')
        secondPosition.classList.add('second-ship-two')
        secondShipArray.push(shipPosition, secondPosition)
        if(!event.target.classList.contains('not-allowed')){
          tanksChoiceClicker++
        } 
    
        if (tanksChoiceClicker === 1) {
          tankChoicerHeader.textContent = 'Place Your Artillery'
          tankChoicerText.textContent = 'It Contains 2 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank2.png)no-repeat'
        } else if (tanksChoiceClicker === 2) {
          tankChoicerHeader.textContent = 'Place Your Artillery'
          tankChoicerText.textContent = 'It Contains 3 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank3.png)no-repeat'
        } else if (tanksChoiceClicker === 3) {
          tankChoicerHeader.textContent = 'Place Your Himars'
          tankChoicerText.textContent = 'It Contains 6 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank4.png)no-repeat'
        } else if (tanksChoiceClicker === 4) {
          tankChoicerHeader.textContent = 'Place Your Artillery'
          tankChoicerText.textContent = 'It Contains 4 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank5.png)no-repeat'
        } 
      }  // Third Ship
    } else if (customerShipPositionsArray.length > 9 && customerShipPositionsArray.length < 11) {
      if (((parseInt(event.target.textContent) + 1) % width === 0) || ((parseInt(event.target.textContent) + 2) % width === 0)
        || (event.target.classList.contains('ships-positions'))
        || (customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent].classList.contains('ships-positions'))
        || (customerCells[grid.children[parseInt(event.target.textContent) + 2].textContent].classList.contains('ships-positions'))) {
        customerCells.forEach( cell => {
          if (parseInt(cell.textContent) < 99) {
            if ( (parseInt(cell.textContent) + 1) % width === 0 || (parseInt(cell.textContent) + 2) % width === 0 
            || grid.children[parseInt(cell.textContent) + 1].classList.contains('ships-positions') 
            || grid.children[parseInt(cell.textContent) + 2].classList.contains('ships-positions')
            ){
              cell.classList.add('not-allowed')
              grid.children[99].classList.add('not-allowed')
            }
          }    
        })
        return coveringReminder.style.display = 'block'
      } else {
        const shipPosition = customerCells[parseInt(event.target.textContent)]
        const secondPosition = customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent]
        const thirdPosition = customerCells[grid.children[parseInt(event.target.textContent) + 2].textContent]
        // Storing Ships as a Class in the Grid Cells
        shipPosition.classList.add('ships-positions')
        secondPosition.classList.add('ships-positions')
        thirdPosition.classList.add('ships-positions')
        customerShipPositionsArray.push(shipPosition, secondPosition, thirdPosition)
        
        //Assigning Class to Every Ship Specifically
        shipPosition.classList.add('third-ship')
        shipPosition.classList.add('third-ship-one')
        secondPosition.classList.add('third-ship')
        secondPosition.classList.add('third-ship-two')
        thirdPosition.classList.add('third-ship')
        thirdPosition.classList.add('third-ship-three')
        thirdShipArray.push(shipPosition, secondPosition, thirdPosition)
        if(!event.target.classList.contains('not-allowed')){
          tanksChoiceClicker++
        } 
    
        if (tanksChoiceClicker === 1) {
          tankChoicerHeader.textContent = 'Place Your Artillery'
          tankChoicerText.textContent = 'It Contains 2 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank2.png)no-repeat'
        } else if (tanksChoiceClicker === 2) {
          tankChoicerHeader.textContent = 'Place Your Artillery'
          tankChoicerText.textContent = 'It Contains 3 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank3.png)no-repeat'
        } else if (tanksChoiceClicker === 3) {
          tankChoicerHeader.textContent = 'Place Your Himars'
          tankChoicerText.textContent = 'It Contains 6 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank4.png)no-repeat'
        } else if (tanksChoiceClicker === 4) {
          tankChoicerHeader.textContent = 'Place Your Artillery'
          tankChoicerText.textContent = 'It Contains 4 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank5.png)no-repeat'
        } 
      } // Fourth Ship
    } else if (customerShipPositionsArray.length > 12 && customerShipPositionsArray.length < 15) {
      if (((parseInt(event.target.textContent) + 1) % width === 0) || ((parseInt(event.target.textContent) + 2) % width === 0)
        || ((parseInt(event.target.textContent) + 3) % width === 0) || ((parseInt(event.target.textContent) + 4) % width === 0)
        || ((parseInt(event.target.textContent) + 5) % width === 0)
        || (event.target.classList.contains('ships-positions'))
        || (customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent].classList.contains('ships-positions'))
        || (customerCells[grid.children[parseInt(event.target.textContent) + 2].textContent].classList.contains('ships-positions'))
        || (customerCells[grid.children[parseInt(event.target.textContent) + 3].textContent].classList.contains('ships-positions'))
        || (customerCells[grid.children[parseInt(event.target.textContent) + 4].textContent].classList.contains('ships-positions')) 
        || (customerCells[grid.children[parseInt(event.target.textContent) + 5].textContent].classList.contains('ships-positions'))) {
        customerCells.forEach( cell => {
          if (parseInt(cell.textContent) < 99) {
            if ( (parseInt(cell.textContent) + 1) % width === 0 || (parseInt(cell.textContent) + 2) % width === 0 
              || (parseInt(cell.textContent) + 3) % width === 0 || (parseInt(cell.textContent) + 4) % width === 0 
              || (parseInt(cell.textContent) + 5) % width === 0 
              || grid.children[parseInt(cell.textContent) + 1].classList.contains('ships-positions') 
              || grid.children[parseInt(cell.textContent) + 2].classList.contains('ships-positions')
              || grid.children[parseInt(cell.textContent) + 3].classList.contains('ships-positions') 
              || grid.children[parseInt(cell.textContent) + 4].classList.contains('ships-positions')
              || grid.children[parseInt(cell.textContent) + 5].classList.contains('ships-positions')
            ){
              cell.classList.add('not-allowed')
              grid.children[99].classList.add('not-allowed')
            }
          }    
        })
        return coveringReminder.style.display = 'block'
      } else {
        const shipPosition = customerCells[parseInt(event.target.textContent)]
        const secondPosition = customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent]
        const thirdPosition = customerCells[grid.children[parseInt(event.target.textContent) + 2].textContent]
        const fourthPosition = customerCells[grid.children[parseInt(event.target.textContent) + 3].textContent]
        const fifthPosition = customerCells[grid.children[parseInt(event.target.textContent) + 4].textContent]
        const sixthPosition = customerCells[grid.children[parseInt(event.target.textContent) + 5].textContent]
        // Storing Ships as a Class in the Grid Cells
        shipPosition.classList.add('ships-positions')
        secondPosition.classList.add('ships-positions')
        thirdPosition.classList.add('ships-positions')
        fourthPosition.classList.add('ships-positions')
        fifthPosition.classList.add('ships-positions')
        sixthPosition.classList.add('ships-positions')
        customerShipPositionsArray.push(shipPosition, secondPosition, thirdPosition, fourthPosition, fifthPosition, sixthPosition)
        
        //Assigning Class to Every Ship Specifically
        shipPosition.classList.add('fourth-ship')
        shipPosition.classList.add('fourth-ship-one')
        secondPosition.classList.add('fourth-ship')
        secondPosition.classList.add('fourth-ship-two')
        thirdPosition.classList.add('fourth-ship')
        thirdPosition.classList.add('fourth-ship-three')
        fourthPosition.classList.add('fourth-ship')
        fourthPosition.classList.add('fourth-ship-four')
        fifthPosition.classList.add('fourth-ship')
        fifthPosition.classList.add('fourth-ship-five')
        sixthPosition.classList.add('fourth-ship')
        sixthPosition.classList.add('fourth-ship-six')
        fourthShipArray.push(shipPosition, secondPosition, thirdPosition, fourthPosition, fifthPosition, sixthPosition)
        if(!event.target.classList.contains('not-allowed')){
          tanksChoiceClicker++
        } 
    
        if (tanksChoiceClicker === 1) {
          tankChoicerHeader.textContent = 'Place Your Artillery'
          tankChoicerText.textContent = 'It Contains 2 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank2.png)no-repeat'
        } else if (tanksChoiceClicker === 2) {
          tankChoicerHeader.textContent = 'Place Your Artillery'
          tankChoicerText.textContent = 'It Contains 3 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank3.png)no-repeat'
        } else if (tanksChoiceClicker === 3) {
          tankChoicerHeader.textContent = 'Place Your Himars'
          tankChoicerText.textContent = 'It Contains 6 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank4.png)no-repeat'
        } else if (tanksChoiceClicker === 4) {
          tankChoicerHeader.textContent = 'Place Your Artillery'
          tankChoicerText.textContent = 'It Contains 4 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank5.png)no-repeat'
        } 
      } // Fifth Ship
    } else if (customerShipPositionsArray.length > 16 && customerShipPositionsArray.length < 21) {
      if (((parseInt(event.target.textContent) + 1) % width === 0) || ((parseInt(event.target.textContent) + 2) % width === 0)
      || ((parseInt(event.target.textContent) + 3) % width === 0) || (event.target.classList.contains('ships-positions'))
        || (customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent].classList.contains('ships-positions'))
        || (customerCells[grid.children[parseInt(event.target.textContent) + 2].textContent].classList.contains('ships-positions'))
        || (customerCells[grid.children[parseInt(event.target.textContent) + 3].textContent].classList.contains('ships-positions')) ) {
        customerCells.forEach( cell => {
          if (parseInt(cell.textContent) < 99) {
            if ( (parseInt(cell.textContent) + 1) % width === 0 || (parseInt(cell.textContent) + 2) % width === 0 
            || (parseInt(cell.textContent) + 3) % width === 0 
            || grid.children[parseInt(cell.textContent) + 1].classList.contains('ships-positions') 
            || grid.children[parseInt(cell.textContent) + 2].classList.contains('ships-positions')
            || grid.children[parseInt(cell.textContent) + 3].classList.contains('ships-positions')
            ){
              cell.classList.add('not-allowed')
              grid.children[99].classList.add('not-allowed')
            }
          }    
        })
        return coveringReminder.style.display = 'block'
      } else {
        const shipPosition = customerCells[parseInt(event.target.textContent)]
        const secondPosition = customerCells[grid.children[parseInt(event.target.textContent) + 1].textContent]
        const thirdPosition = customerCells[grid.children[parseInt(event.target.textContent) + 2].textContent]
        const fourthPosition = customerCells[grid.children[parseInt(event.target.textContent) + 3].textContent]
        // Storing Ships as a Class in the Grid Cells
        shipPosition.classList.add('ships-positions')
        secondPosition.classList.add('ships-positions')
        thirdPosition.classList.add('ships-positions')
        fourthPosition.classList.add('ships-positions')
        customerShipPositionsArray.push(shipPosition, secondPosition, thirdPosition, fourthPosition)
        
        //Assigning Class to Every Ship Specifically
        shipPosition.classList.add('fifth-ship')
        shipPosition.classList.add('fifth-ship-one')
        secondPosition.classList.add('fifth-ship')
        secondPosition.classList.add('fifth-ship-two')
        thirdPosition.classList.add('fifth-ship')
        thirdPosition.classList.add('fifth-ship-three')
        fourthPosition.classList.add('fifth-ship')
        fourthPosition.classList.add('fifth-ship-four')
        fifthShipArray.push(shipPosition, secondPosition, thirdPosition, fourthPosition)
        btn.style.display = 'inline'
        tankChoicer.style.display = 'none'
        tankChoicerWrapper.style.display = 'none'
        if(!event.target.classList.contains('not-allowed')){
          tanksChoiceClicker++
        } 
    
        if (tanksChoiceClicker === 1) {
          tankChoicerHeader.textContent = 'Place Your Artillery'
          tankChoicerText.textContent = 'It Contains 2 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank2.png)no-repeat'
        } else if (tanksChoiceClicker === 2) {
          tankChoicerHeader.textContent = 'Place Your Artillery'
          tankChoicerText.textContent = 'It Contains 3 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank3.png)no-repeat'
        } else if (tanksChoiceClicker === 3) {
          tankChoicerHeader.textContent = 'Place Your Himars'
          tankChoicerText.textContent = 'It Contains 6 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank4.png)no-repeat'
        } else if (tanksChoiceClicker === 4) {
          tankChoicerHeader.textContent = 'Place Your Artillery'
          tankChoicerText.textContent = 'It Contains 4 Cells on Strategy Panel'
          tankChoicer.style.background = 'url(./images/tank5.png)no-repeat'
        } 
      } 
    }
  }
  // BATTLEFIELD

  // Transferring Customer to Battlefield

  function Battlefield() {
    // Remove Intro Sounds and play Battlefield Sounds
    if (chosenCountryNameArray[0] === 'Russia'){
      russianBattleFieldSounds.volume = 0.5
      russianBattleFieldSounds.play()
      russianBattleFieldSounds.loop = true
    } else {
      battlefieldSounds.volume = 0.5
      battlefieldSounds.play()
      battlefieldSounds.loop = true
    }
    enemy.style.display = 'none'
    introSounds.remove()
    // Removing Strategy Panel
    btn.remove()
    grid.classList.remove('grid')
    // Editing Grid to make it Customer Grid...so Grid is Customer Grid Now
    grid.classList.add('customer-grid')
    // Showing score
    resultDisplay.style.display = 'flex'
    score.style.display = 'flex'
    // Displaying Customer Score
    custScoreText.textContent = chosenCountryNameArray[0]
    
    //Displaying Computer Score
    compScoreText.textContent = chosenCountryNameArray[1]

    

    // Creating Computer Grid
    computerGrid.classList.add('computer-grid')
    gridWrapper.appendChild(computerGrid)
    createCells(computerGrid, computerCells)
    // Storing Computer Ship Positions
    // First Ship
    const firstComputerShip = setInterval(() => {
      const computerFirstPosition = Math.floor(Math.random() * computerCells.length)
      if (((computerFirstPosition + 1) % width === 0) || ((computerFirstPosition + 2) % width === 0)
        || ((computerFirstPosition + 3) % width === 0) || ((computerFirstPosition + width) > cellCounts - 1) 
        || computerCells[computerFirstPosition].classList.contains('ships-positions')
        || computerCells[computerFirstPosition + 1].classList.contains('ships-positions')
        || computerCells[computerFirstPosition + 2].classList.contains('ships-positions')
        || computerCells[computerFirstPosition + 3].classList.contains('ships-positions')
        || computerCells[computerFirstPosition + width ].classList.contains('ships-positions')
        || computerCells[computerFirstPosition + width + 1 ].classList.contains('ships-positions')
        || computerCells[computerFirstPosition + + width + 2].classList.contains('ships-positions')
        || computerCells[computerFirstPosition + width + 3].classList.contains('ships-positions') ) return
      else {
        computerCells[computerFirstPosition].classList.add('ships-positions')
        computerCells[computerFirstPosition + 1].classList.add('ships-positions')
        computerCells[computerFirstPosition + 2].classList.add('ships-positions')
        computerCells[computerFirstPosition + 3].classList.add('ships-positions')
        computerCells[computerFirstPosition + width].classList.add('ships-positions')
        computerCells[computerFirstPosition + 1 + width].classList.add('ships-positions')
        computerCells[computerFirstPosition + 2 + width].classList.add('ships-positions')
        computerCells[computerFirstPosition + 3 + width].classList.add('ships-positions')
        //Assigning Class to Every Ship Specifically
        computerCells[computerFirstPosition].classList.add('comp-first-ship')   
        computerCells[computerFirstPosition + 1].classList.add('comp-first-ship')        
        computerCells[computerFirstPosition + 2].classList.add('comp-first-ship')       
        computerCells[computerFirstPosition + 3].classList.add('comp-first-ship')     
        computerCells[computerFirstPosition + width].classList.add('comp-first-ship')  
        computerCells[computerFirstPosition + 1 + width].classList.add('comp-first-ship')    
        computerCells[computerFirstPosition + 2 + width].classList.add('comp-first-ship')
        computerCells[computerFirstPosition + 3 + width].classList.add('comp-first-ship')
        computerShipPositionsArray.push(computerCells[computerFirstPosition], computerCells[computerFirstPosition + 1], computerCells[computerFirstPosition + 2], computerCells[computerFirstPosition + 3], computerCells[computerFirstPosition + width], computerCells[computerFirstPosition + 1 + width], computerCells[computerFirstPosition + 2 + width], computerCells[computerFirstPosition + 3 + width])
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
        //Assigning Class to Every Ship Specifically
        computerCells[computerSecondPosition].classList.add('comp-second-ship')
        computerCells[computerSecondPosition + 1].classList.add('comp-second-ship')
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
        //Assigning Class to Every Ship Specifically
        computerCells[computerThirdPosition].classList.add('comp-third-ship')
        computerCells[computerThirdPosition + 1].classList.add('comp-third-ship')
        computerCells[computerThirdPosition + 2].classList.add('comp-third-ship')
        computerShipPositionsArray.push(computerCells[computerThirdPosition], computerCells[computerThirdPosition + 1], computerCells[computerThirdPosition + 2])
        clearInterval(thirdComputerShip)
      }
    }, 6)
    // Fourth Ship
    const fourthComputerShip = setInterval(() => {
      const computerFourthPosition = Math.floor(Math.random() * computerCells.length)
      if ((computerFourthPosition + 1) % width === 0 || (computerFourthPosition + 2) % width === 0
        || (computerFourthPosition + 3) % width === 0 || (computerFourthPosition + 4) % width === 0
        || (computerFourthPosition + 5) % width === 0
        || computerCells[computerFourthPosition].classList.contains('ships-positions')
        || computerCells[computerFourthPosition + 1].classList.contains('ships-positions')
        || computerCells[computerFourthPosition + 2].classList.contains('ships-positions')
        || computerCells[computerFourthPosition + 3].classList.contains('ships-positions')
        || computerCells[computerFourthPosition + 4].classList.contains('ships-positions')
        || computerCells[computerFourthPosition + 5].classList.contains('ships-positions') ) return
      else {
        computerCells[computerFourthPosition].classList.add('ships-positions')
        computerCells[computerFourthPosition + 1].classList.add('ships-positions')
        computerCells[computerFourthPosition + 2].classList.add('ships-positions')
        computerCells[computerFourthPosition + 3].classList.add('ships-positions')
        computerCells[computerFourthPosition + 4].classList.add('ships-positions')
        computerCells[computerFourthPosition + 5].classList.add('ships-positions')
        //Assigning Class to Every Ship Specifically
        computerCells[computerFourthPosition].classList.add('comp-fourth-ship')
        computerCells[computerFourthPosition + 1].classList.add('comp-fourth-ship')
        computerCells[computerFourthPosition + 2].classList.add('comp-fourth-ship')
        computerCells[computerFourthPosition + 3].classList.add('comp-fourth-ship')
        computerCells[computerFourthPosition + 4].classList.add('comp-fourth-ship')
        computerCells[computerFourthPosition + 5].classList.add('comp-fourth-ship')
        computerShipPositionsArray.push(computerCells[computerFourthPosition], computerCells[computerFourthPosition + 1], computerCells[computerFourthPosition + 2], computerCells[computerFourthPosition + 3], computerCells[computerFourthPosition + 4], computerCells[computerFourthPosition + 5])
        clearInterval(fourthComputerShip)
      }
    }, 10)
    // Fifth Ship
    const fifthComputerShip = setInterval(() => {
      const computerFifthPosition = Math.floor(Math.random() * computerCells.length)
      if ((computerFifthPosition + 1) % width === 0 || (computerFifthPosition + 2) % width === 0
        || (computerFifthPosition + 3) % width === 0 || computerCells[computerFifthPosition].classList.contains('ships-positions')
        || computerCells[computerFifthPosition + 1].classList.contains('ships-positions')
        || computerCells[computerFifthPosition + 2].classList.contains('ships-positions')
        || computerCells[computerFifthPosition + 3].classList.contains('ships-positions') ) return
      else {
        computerCells[computerFifthPosition].classList.add('ships-positions')
        computerCells[computerFifthPosition + 1].classList.add('ships-positions')
        computerCells[computerFifthPosition + 2].classList.add('ships-positions')
        computerCells[computerFifthPosition + 3].classList.add('ships-positions')
        //Assigning Class to Every Ship Specifically
        computerCells[computerFifthPosition].classList.add('comp-fifth-ship')
        computerCells[computerFifthPosition + 1].classList.add('comp-fifth-ship')
        computerCells[computerFifthPosition + 2].classList.add('comp-fifth-ship')
        computerCells[computerFifthPosition + 3].classList.add('comp-fifth-ship')
        computerShipPositionsArray.push(computerCells[computerFifthPosition], computerCells[computerFifthPosition + 1], computerCells[computerFifthPosition + 2], computerCells[computerFifthPosition + 3])
        clearInterval(fifthComputerShip)
      }
    }, 20)

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
      event.target.classList.add('shot')
      if (event.target.classList.contains('ships-positions')){
        bomb.volume = 1
        bomb.play()
      } else {
        bomb.volume = 0.4
        bomb.play()
      }

      // Counting Customer Score
      displayCustomerScore = customerScoreArray.length
      // Displaying Customer Score
      custScoreText.textContent = chosenCountryNameArray[0]

      computerCells.forEach( cell => {
        // Displaying First Ship Destroyed
        if(cell.classList.contains('ship-hit') && cell.classList.contains('comp-first-ship')) {
          compShipOneArray.push(cell)
          cell.classList.remove('comp-first-ship')
        }
        if(compShipOneArray.length >= 8) {
          computerScore.children[1].src = './images/compscore2.png'
        }
        // Displaying Second Ship Destroyed
        if(cell.classList.contains('ship-hit') && cell.classList.contains('comp-second-ship')) {
          compShipTwoArray.push(cell)
          cell.classList.remove('comp-second-ship')
        }
        if(compShipTwoArray.length >= 2) {
          computerScore.children[2].src = './images/compscore2.png'
        }
        // Displaying Third Ship Destroyed
        if(cell.classList.contains('ship-hit') && cell.classList.contains('comp-third-ship')) {
          compShipThreeArray.push(cell)
          cell.classList.remove('comp-third-ship')
        }
        if(compShipThreeArray.length >= 3) {
          computerScore.children[3].src = './images/compscore2.png'
        }
        // Displaying Fourth Ship Destroyed
        if(cell.classList.contains('ship-hit') && cell.classList.contains('comp-fourth-ship')) {
          compShipFourArray.push(cell)
          cell.classList.remove('comp-fourth-ship')
        }
        if(compShipFourArray.length >= 6) {
          computerScore.children[4].src = './images/compscore2.png'
        }
        // Displaying Fifth Ship Destroyed
        if(cell.classList.contains('ship-hit') && cell.classList.contains('comp-fifth-ship')) {
          compShipFiveArray.push(cell)
          cell.classList.remove('comp-fifth-ship')
        }
        if(compShipFiveArray.length >= 4) {
          computerScore.children[5].src = './images/compscore2.png'
        }
      })
      console.log(computerScore)
      
      
      // Computer Move
      isComputerPlaying = true
      
      setTimeout(() => {       
        // Keep Attacking First Ship
        if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('first-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 3].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 4].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 5].classList.contains('first-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 6].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 7].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 8].classList.contains('first-ship') ) {
          computerMoveCell = firstShipArray[0]
          computerMoveCell.classList.remove('first-ship')
          computerMoveCell.classList.add('compt-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }

          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          // Displaying Destroyed Customer Ship
          customerScore.children[1].src = './images/score2.png'

        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('first-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 3].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 4].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 5].classList.contains('first-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 6].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 7].classList.contains('first-ship') )  {
          computerMoveCell = firstShipArray[1]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('first-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 3].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 4].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 5].classList.contains('first-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 6].classList.contains('first-ship') )  {
          computerMoveCell = firstShipArray[2]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('first-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 3].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 4].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 5].classList.contains('first-ship') )  {
          computerMoveCell = firstShipArray[3]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('first-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 3].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 4].classList.contains('first-ship') )  {
          computerMoveCell = firstShipArray[4]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('first-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('first-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 3].classList.contains('first-ship') )  {
          computerMoveCell = firstShipArray[5]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('first-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('first-ship') )  {
          computerMoveCell = firstShipArray[6]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('first-ship') )  {
          computerMoveCell = firstShipArray[7]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
            bombTwo.volume = 1
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          
          // Keep Attacking Second Ship
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('second-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('second-ship') )  {
          computerMoveCell = secondShipArray[0]
          computerMoveCell.classList.add('comp-shot')
          computerMoveCell.classList.remove('second-ship')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          // Displaying Destroyed Customer Ship
          customerScore.children[2].src = './images/score2.png'

        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('second-ship') )  {
          computerMoveCell = secondShipArray[1]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          
          // Keep Attacking Third Ship
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('third-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('third-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 3].classList.contains('third-ship') )  {
          computerMoveCell = thirdShipArray[0]
          computerMoveCell.classList.add('comp-shot')
          computerMoveCell.classList.remove('third-ship')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          // Displaying Destroyed Customer Ship
          customerScore.children[3].src = './images/score2.png'
          
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('third-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('third-ship') )  {
          computerMoveCell = thirdShipArray[1]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('third-ship') )  {
          computerMoveCell = thirdShipArray[2]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          
          // Keep Attacking Fourth Ship
        }  else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('fourth-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('fourth-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 3].classList.contains('fourth-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 4].classList.contains('fourth-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 5].classList.contains('fourth-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 6].classList.contains('fourth-ship')) {
          computerMoveCell = fourthShipArray[0]
          computerMoveCell.classList.add('comp-shot')
          computerMoveCell.classList.remove('fourth-ship')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          // Displaying Destroyed Customer Ship
          customerScore.children[4].src = './images/score2.png'
          
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('fourth-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('fourth-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 3].classList.contains('fourth-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 4].classList.contains('fourth-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 5].classList.contains('fourth-ship')) {
          computerMoveCell = fourthShipArray[1]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('fourth-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('fourth-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 3].classList.contains('fourth-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 4].classList.contains('fourth-ship') )  {
          computerMoveCell = fourthShipArray[2]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('fourth-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('fourth-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 3].classList.contains('fourth-ship'))  {
          computerMoveCell = fourthShipArray[3]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('fourth-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('fourth-ship'))  {
          computerMoveCell = fourthShipArray[4]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('fourth-ship') )  {
          computerMoveCell = fourthShipArray[5]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          // Keep Attacking Fifth Ship
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('fifth-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('fifth-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 3].classList.contains('fifth-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 4].classList.contains('fifth-ship') )  {
          computerMoveCell = fifthShipArray[0]
          computerMoveCell.classList.add('comp-shot')
          computerMoveCell.classList.remove('fifth-ship')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          // Displaying Destroyed Customer Ship
          customerScore.children[5].src = './images/score2.png'
          
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('fifth-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('fifth-ship')
        && computerShotsArray[parseInt(computerShotsArray.length) - 3].classList.contains('fifth-ship') )  {
          computerMoveCell = fifthShipArray[1]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('fifth-ship') 
        && computerShotsArray[parseInt(computerShotsArray.length) - 2].classList.contains('fifth-ship') )  {
          computerMoveCell = fifthShipArray[2]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
          
        } else if (computerShotsArray[parseInt(computerShotsArray.length) - 1].classList.contains('fifth-ship') )  {
          computerMoveCell = fifthShipArray[3]
          computerMoveCell.classList.add('comp-shot')
          computerShotsArray.push(computerMoveCell)
          if (computerMoveCell.classList.contains('ships-positions')){
            bombTwo.volume = 1
            bombTwo.play()
          } else {
            bombTwo.volume = 0.4
            bombTwo.play()
          }
          if (!computerMoveCell.classList.contains('ship-hit')){
            computerMoveCell.classList.add('ship-hit')
            computerScoreArray.push(computerMoveCell)
          }
          // Counting Computer Score
          displayComputerScore = computerScoreArray.length
          //Displaying Computer Score
          compScoreText.textContent = chosenCountryNameArray[1]
        } else {
          const computerMoveInterval = setInterval(() => {
            computerMoveCell = customerCells[Math.floor(Math.random() * customerCells.length)]
            if (computerMoveCell.classList.contains('missed-hit')) return
            if (computerMoveCell.classList.contains('ship-hit')) return
            // Add class ship-hit to the attacked cell which contains customer ship and also pushing this cell to the array of attacked ships
            else {
              if (computerMoveCell.classList.contains('ships-positions')) {
                computerMoveCell.classList.add('ship-hit')
                computerScoreArray.push(computerMoveCell)
              }
              if (computerMoveCell.classList.contains('ships-positions')){
                bombTwo.volume = 1
                bombTwo.play()
              } else {
                bombTwo.volume = 0.4
                bombTwo.play()
              }
              // Add missed-hit class to a cell which was already attacked
              computerMoveCell.classList.add('missed-hit')
              computerMoveCell.classList.add('comp-shot')
              computerShotsArray.push(computerMoveCell)
              clearInterval(computerMoveInterval)

              // Counting Computer Score
              displayComputerScore = computerScoreArray.length
              //Displaying Computer Score
              compScoreText.textContent = chosenCountryNameArray[1]
            }
          }, 1)
        }
        // Customer Win
        if (displayCustomerScore >= 23) {
          computerGrid.style.display = 'none'
          grid.style.display = 'none'
          computerScore.style.display = 'none'
          customerScore.style.display = 'none'
          resultWrapper.style.display = 'flex'
          battlefieldSounds.remove()
          russianBattleFieldSounds.remove()
          flag = document.createElement('img')
          resultDisplay.style.color = '#41FF00'
          flag.classList.add('flag')
          flag.src = wavingFlagArray[0]
          resultWrapper.appendChild(flag)
          if (isAudioPlaying === true) {
            anthemArray[0].play()
          }
          result = chosenCountryNameArray[0] + ' Win'
          //Displaying The Winner
          resultDisplay.textContent = result
          return // Computer Win
        } else if (displayComputerScore >= 23) {
          computerGrid.style.display = 'none'
          grid.style.display = 'none'
          computerScore.style.display = 'none'
          customerScore.style.display = 'none'
          resultWrapper.style.display = 'flex'
          battlefieldSounds.remove()
          russianBattleFieldSounds.remove()
          flag = document.createElement('img')
          resultDisplay.style.color = 'red'
          flag.classList.add('flag')
          flag.src = wavingFlagArray[1]
          resultWrapper.appendChild(flag)
          if (isAudioPlaying === true) {
            anthemArray[1].play()
          }
          result = chosenCountryNameArray[1] + ' Win'
          //Displaying The Winner
          resultDisplay.textContent = result
          return
        } 
        isComputerPlaying = false
      }, 3500)
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

  // Mute and Unmute Sounds Event
  mute.addEventListener('click', muteSounds)

  // Reset Game
  reset.addEventListener('click', resetGame)

  // Screen Mode
  screen.addEventListener('click', screenMode)
 

}

window.addEventListener('DOMContentLoaded', init)