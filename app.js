'use strict';

// product objects go into the timeOut array when they're shown, and held there until their canDisplay counter goes back to zero. I think it's supposed to be after 1 click, but I was having issues setting the number lower than 2.
var timeOut = [];
// all of the product objects go into the imgArr when they can be displayed.
var imgArr = [];

// declare variables for the elements in index.html where I want the pictures to show.
var firstImage = document.getElementById('first-image');
var secondImage = document.getElementById('second-image');
var thirdImage = document.getElementById('third-image');

// this is where the number of times each image is shown and clicked will be displayed.
var results = document.getElementById('results-field');

// I have these as global variables for now because they store the current three images and I need to use them in multiple functions. I'll probably refactor this to be more efficient.
var first;
var second;
var third;

// variable to store the total number of clicks. I need to know when the user gets to 25.
var counter = 0;
var canvas = document.getElementById('chart');
var ctx = canvas.getContext('2d');

// object constructor for the products to be displayed, with properties to track how many times shown, clicks, and the file path to the corresponding image.
function Product(name, path) {
  this.name = name;
  this.path = path;
  this.shown = 0;
  this.clicks = 0;
// canShow is another counter, which is used to keep the same images from displaying twice in a row.
  this.canShow = 0;
}
// instantiation of all the product objects. I will probably refactor this so they're instantiated inside imgArr.
var bag = new Product('Artoo Bag', './images/bag.jpg');
var banana = new Product('Banana Slicer', './images/banana.jpg');
var bathroom = new Product('Bathroom iPad Stand', './images/bathroom.jpg');
var boots = new Product('Boots', './images/boots.jpg');
var breakfast = new Product('All-in-One Breakfast Device', './images/breakfast.jpg');
var bubblegum = new Product('Meatball Bubblegum', './images/bubblegum.jpg');
var chair = new Product('Awkward Chair', './images/chair.jpg');
var cthulhu = new Product('Cthulhu', './images/cthulhu.jpg');
var dogDuck = new Product('Dog Duck Bill', './images/dog-duck.jpg');
var dragon = new Product('Dragon Meat', './images/dragon.jpg');
var pen = new Product('Utensil Pen', './images/pen.jpg');
var petSweep = new Product('Pet Sweeper', './images/pet-sweep.jpg');
var scissors = new Product('Pizza Scissors', './images/scissors.jpg');
var shark = new Product('Shark Sleeping Bag', './images/shark.jpg');
var sweep = new Product('Baby Sweeper', './images/sweep.png');
var tauntaun = new Product('Tauntaun Sleeping Bag', './images/tauntaun.jpg');
var unicorn = new Product('Unicorn Meat', './images/unicorn.jpg');
var usb = new Product('USB Tentacle', './images/usb.gif');
var waterCan = new Product('Self-Watering Can', './images/water-can.jpg');
var wineGlass = new Product('Wine Glass', './images/wine-glass.jpg');

imgArr.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, usb, waterCan, wineGlass);

// event listeners for each of the image slots on the page. They each run an anonymous function when clicked so trackedClicks is called with the global variable holding the corresponding product passed as an argument. Then randomizeImages is called.
firstImage.addEventListener('click', function(){
  trackClicks(first);
  randomizeImages();
});

secondImage.addEventListener('click', function(){
  trackClicks(second);
  randomizeImages();
});

thirdImage.addEventListener('click', function(){
  trackClicks(third);
  randomizeImages();
});

// this function is called by the event listeners so the counter variable is incremented. It also increments the clicks property on the specific product that was clicked.
function trackClicks(image){
  counter++;
  console.log('Total clicks: ', counter);
  image.clicks++;
}

// this function is called at the start of randomizeImages if the counter variable has reached 25.
function tallyClicks(){
  var nameArr = [];
  var clicksArr = [];
  var shownArr = [];

  results.style.visibility = 'visible';

// a for loop to go through the timeOut array and push everything back into imgArr. There may be an issue here since I seem to have duplicates of some items in the next part.
  for(var i=0; i < timeOut.length; i++){
    imgArr.push(timeOut[i]);
  }

// loop through imgArr, which should contain all of the product objects again. A text string is added to index.html to display how many times each product was shown and clicked as long as it was clicked at least once. I could change that to display all of them though.
  // for(var j=0; j < imgArr.length; j++){
  //   if(imgArr[j].clicks > 0){
  //     var tally = document.createElement('p');
  //     tally.innerHTML = 'Product: ' + imgArr[j].name + ' Shown: ' + imgArr[j].shown + ' Clicked: ' + imgArr[j].clicks;
  //     results.appendChild(tally);

  //   }
  // }

  for(var h=0; h < imgArr.length; h++){
    nameArr.push(imgArr[h].name);
    clicksArr.push(imgArr[h].clicks);
    shownArr.push(imgArr[h].shown);
  }

// creates a bar chart to display clicks and times shown along with the names of each product object.
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nameArr,
      datasets: [
        {
          label: 'Clicks',
          data: clicksArr,
          backgroundColor: '#33a'
        },
        {
          label: 'Shown',
          data: shownArr,
          backgroundColor: '#88a'
        }
      ]
    },
    options: {
      responsive: false
    }
  });
}

// checks if the counter has reached 25, and if it has tallyClicks is called.
function randomizeImages(){
  if(counter >= 25){
    tallyClicks();
  } else {

  // gets a random number to use as the index number to select a product object from imgArr
    var randomIndex = getRandNum();
    first = imgArr[randomIndex];
    console.log('first is ', first.name);

  // updates the selected object, incrementing the shown property and setting the canShow counter. Then it's pushed into timeOut and spliced out of imgArr.
    first.shown += 1;
    first.canShow = 1;
    timeOut.push(first);
    imgArr.splice(randomIndex, 1);

    randomIndex = getRandNum();
    second = imgArr[randomIndex];
    console.log('second is ', second.name);
    second.shown += 1;
    second.canShow = 1;
    timeOut.push(second);
    imgArr.splice(randomIndex, 1);

    randomIndex = getRandNum();
    third = imgArr[randomIndex];
    console.log('third is ', third.name);
    timeOut.push(third);
    third.shown += 1;
    third.canShow = 1;
    imgArr.splice(randomIndex, 1);
    displayImages();
  }
}

// creates HTML elements using the three randomly selected product object file paths and appends them to the three image slots.
function displayImages(){
  var firstPath = document.createElement('img');
  var secondPath = document.createElement('img');
  var thirdPath = document.createElement('img');

  firstPath.src = first.path;
  console.log(firstPath);
// removes the previous image in the slot to make room for the new image
  firstImage.removeChild(firstImage.childNodes[0]);
  firstImage.appendChild(firstPath);

  secondImage.removeChild(secondImage.childNodes[0]);
  secondPath.src = second.path;
  secondImage.appendChild(secondPath);

  thirdImage.removeChild(thirdImage.childNodes[0]);
  thirdPath.src = third.path;
  thirdImage.appendChild(thirdPath);

  updateTimeOut();
}

// this is called in displayImages to cycle through the timeOut array and push any product objects back to imgArr if the canShow property has gone back down to zero.
function updateTimeOut(){
  for(var i = 0; i < timeOut.length; i++){
    if(timeOut[i].canShow > 0){
      console.log(timeOut[i].name + ' is in time out.');
      timeOut[i].canShow--;
    } else {
      console.log(timeOut[i].name + ' is coming out of time out.');
      imgArr.push(timeOut[i]);
      timeOut.splice(timeOut[i], 1);
      i -= 1;
    }
  }
}

// just a function that returns a random integer between 0 and the length of imgArr. Used to select index numbers in the array.
function getRandNum(){
  return Math.floor(Math.random() * imgArr.length);
}

// calls randomizeImages when the page is opened, which starts the whole app by selecting the first three images and then calling displayImages.
randomizeImages();
