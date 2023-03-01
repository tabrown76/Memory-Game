const game = document.querySelector('.game-container');
game.disabled = true;

const goBtn = document.querySelector('.go');
goBtn.addEventListener('click', function(){
  game.disabled = false;
  goBtn.disabled = true;

  let isPlaying = true;

  // fastest.textContent = `Fastest time: ${localStorage.getItem('fastest') || 'N/A'}`;

  const gameContainer = document.getElementById("game");

  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ];

  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you   want ot research more
  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let shuffledColors = shuffle(COLORS);

  // this function loops over the array of colors
  // it creates a new div and gives it a class with the   value of the color
  // it also adds an event listener for a click for each  card
  function createDivsForColors(colorArray) {
    let num = 0;
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");

      // give it a class attribute for the value we are   looping over
      newDiv.classList.add(color);
      newDiv.setAttribute('id', 'game-tile');
      newDiv.dataset.id = num;
      num ++;

      // call a function handleCardClick when a div is  clicked on
      newDiv.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  };

  // const timer = document.getElementById('timer');
  // const time = document.getElementById('time');
  // const fastest = document.getElementById('fastest');
    
  let seconds = 0;
  let minutes = 0;  

  function updateTime(){
    if(!isPlaying) return;
      seconds++;
      if(seconds === 60){
        minutes ++;
        seconds = 0;
      };    

      const currentTime = `${minutes < 10 ? '0' + minutes :   minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

      // const fastestTime = localStorage.getItem ('fastest');
      // const newFastest = fastestTime !== null ?  timeToSeconds(fastestTime) : Infinity;

      // function timeToSeconds(timeString){
      //   const [minutesStr, secondsStr] = timeString. split (':');
      //   const minutes = parseInt(minutesStr, 10);
      //   const seconds = parseInt(secondsStr, 10);
      //   return minutes * 60 + seconds;
      // };

      // if (timeToSeconds(currentTime) < newFastest &&   timeToSeconds(currentTime) < 3600){
      //   localStorage.setItem('fastest', currentTime);

      //   const previousFastest = localStorage.getItem ('fastest');
      //   if(previousFastest === null || timeToSeconds (currentTime) < timeToSeconds(previousFastest)){
      //     localStorage.setItem('fastest', currentTime);
      //     fastest.textContent = `Fastest time: $ {localStorage.getItem('fastest')}`;
      //   }
      // };
      timer.textContent = currentTime;
      time.textContent = `Your time: ${currentTime}`;
  };
  setInterval(updateTime, 1000);

  const resetBtn = document.querySelector('.reset')
  resetBtn.addEventListener('click', function(){
    goBtn.disabled = false;
    const cards = document.querySelectorAll('#game-tile');
    timer.textContent = '00:00';
    cards.forEach(card => card.remove());
    isPlaying = false;
  });

  let temp = [];
  function flip(){
    const tempCards = [temp[0], temp[1]];
    tempCards.forEach(card => card.classList.remove ('flipped'));
    tempCards.forEach(card => card.style.backgroundColor =  '');
  };

  // TODO: Implement this function!
  function handleCardClick(event) {
    const clickedCard = event.target;
    const colorClass = clickedCard.classList.value;
    clickedCard.style.backgroundColor = colorClass;
    clickedCard.classList.add('flipped');
    const cards = document.querySelectorAll('.flipped');
    temp.push(clickedCard); 
    gameContainer.classList.add('no-click');
  
    setTimeout(function(){
      gameContainer.classList.remove('no-click')
      if(temp.length === 2){
        const classList1 = temp[0].classList;
        const classList2 = temp[1].classList;
        if(classList1.value === classList2.value){
          if(temp[0].dataset.id != temp[1].dataset.id){
            console.log("Match!");
            cards.forEach(card => card.classList.add  ('no-click'));
          }else{
            console.log("Pick 2 different cards.");
            flip();
          };      
        }else{ 
          console.log("Not a match.");
          flip();
        };
        temp.length = 0;
      };
    }, 1000);

    if(cards.length === COLORS.length){
      win();
    }
    function win(){
      alert('You Win!');
    }
  };

  // when the DOM loads
  createDivsForColors(shuffledColors);
});