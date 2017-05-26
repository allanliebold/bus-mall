'use strict';

// product objects go into the timeOut array when they're shown, and held there until their canDisplay counter goes back to zero. I think it's supposed to be after 1 click, but I was having issues setting the number lower than 2.
var timeOut = [];
// all of the product objects go into the imgArr when they can be displayed.
var imgArr = [];

var saveArr = [];

// declare variables for the elements in index.html where I want the pictures to show.
var firstImage = document.getElementById('first-image');
var secondImage = document.getElementById('second-image');
var thirdImage = document.getElementById('third-image');

// This is where the number of times each image is shown and clicked will be displayed.

var results = document.getElementById('results-field');

// I have these as global variables for now because they store the current three images and I need to use them in multiple functions. I'll probably refactor this to be more efficient.
var first;
var second;
var third;

// variable to store the total number of clicks. I need to know when the user gets to 25.
var counter = 0;

// these are used to create and display a chart using chart.js after the clicks are tallied.
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
  imgArr.push(this);
}

// if there's a counter in localStorage, then the saved data need to be assigned to counter and imgArr.
if(localStorage.counter){
  timeOut = [];
  counter = JSON.parse(localStorage.counter);
  console.log('counter loaded: ', counter);
  imgArr = JSON.parse(localStorage.imgArr);
  console.log('imgArr loaded: ', imgArr.length);
} else {
  // instantiation of all the product objects.
  new Product('Artoo Bag', './images/bag.jpg');
  new Product('Banana Slicer', './images/banana.jpg');
  new Product('Bathroom iPad Stand', './images/bathroom.jpg');
  new Product('Boots', './images/boots.jpg');
  new Product('All-in-One Breakfast Device', './images/breakfast.jpg');
  new Product('Meatball Bubblegum', './images/bubblegum.jpg');
  new Product('Awkward Chair', './images/chair.jpg');
  new Product('Cthulhu', './images/cthulhu.jpg');
  new Product('Dog Duck Bill', './images/dog-duck.jpg');
  new Product('Dragon Meat', './images/dragon.jpg');
  new Product('Utensil Pen', './images/pen.jpg');
  new Product('Pet Sweeper', './images/pet-sweep.jpg');
  new Product('Pizza Scissors', './images/scissors.jpg');
  new Product('Shark Sleeping Bag', './images/shark.jpg');
  new Product('Baby Sweeper', './images/sweep.png');
  new Product('Tauntaun Sleeping Bag', './images/tauntaun.jpg');
  new Product('Unicorn Meat', './images/unicorn.jpg');
  new Product('USB Tentacle', './images/usb.gif');
  new Product('Self-Watering Can', './images/water-can.jpg');
  new Product('Wine Glass', './images/wine-glass.jpg');
}

// this function is called with every click. The contents of both the timeOut array and imgArr are pushed into saveArr so that all 20 product objects and their values can be stringified and saved to localStorage.
function save(){
  saveArr = [];
  console.log('timeOut is ', timeOut.length);
  console.log('imgArr is ', imgArr.length);

  for(var h = 0; h < imgArr.length; h++){
    saveArr.push(imgArr[h]);
  }

  for(var i = 0; i < timeOut.length; i++){
    saveArr.push(timeOut[i]);
  }
  console.log('saveArr is ', saveArr.length);

  localStorage.counter = JSON.stringify(counter);
  localStorage.imgArr = JSON.stringify(saveArr);
}

// event listeners for each of the image slots on the page. They each run an anonymous function when clicked so trackedClicks is called with the global variable holding the corresponding product passed as an argument. Then randomizeImages is called. I really want to refactor this...
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
  save();
}

// this function is called at the start of randomizeImages if the counter variable has reached 25.
function tallyClicks(){
  var nameArr = [];
  var clicksArr = [];
  var shownArr = [];

  results.style.visibility = 'visible';

  imgArr = JSON.parse(localStorage.imgArr);

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
  if(counter === 25){

    tallyClicks();
  } else {

  // gets a random number to use as the index number to select a product object from imgArr
    var randomIndex = getRandNum();
    first = imgArr[randomIndex];
    console.log('first is ', first.name);

  // updates the selected object, incrementing the shown property and setting the canShow counter. Then it's pushed into timeOut and spliced out of imgArr.
    first.shown++;
    first.canShow = 2;

    timeOut.push(first);
    imgArr.splice(randomIndex, 1);

    randomIndex = getRandNum();
    second = imgArr[randomIndex];
    console.log('second is ', second.name);
    second.shown++;
    second.canShow = 2;

    timeOut.push(second);
    imgArr.splice(randomIndex, 1);

    randomIndex = getRandNum();
    third = imgArr[randomIndex];
    console.log('third is ', third.name);
    timeOut.push(third);
    third.shown++;
    third.canShow = 2;

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
