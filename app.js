'use strict';

var firstImage = document.getElementById('first-image');
var secondImage = document.getElementById('second-image');
var thirdImage = document.getElementById('third-image');

var first;
var second;
var third;

var counter = 0;

function Product(name, path, shown, clicks, canDisplay) {
  this.name = name;
  this.path = path;
  this.shown = shown;
  this.clicks = clicks;
  this.canDisplay = canDisplay;
}

var imgArr = [];
var timeOut = [];

var bag = new Product('bag', './images/bag.jpg', 0, 0, true);
var banana = new Product('banana', './images/banana.jpg', 0, 0, true);
var bathroom = new Product('bathroom', './images/bathroom.jpg', 0, 0, true);
var boots = new Product('boots', './images/boots.jpg', 0, 0, true);
var breakfast = new Product('breakfast', './images/breakfast.jpg', 0, 0, true);
var bubblegum = new Product('bubblegum', './images/bubblegum.jpg', 0, 0, true);
var chair = new Product('chair', './images/chair.jpg', 0, 0, true);
var cthulhu = new Product('cthulhu', './images/cthulhu.jpg', 0, 0, true);
var dogDuck = new Product('dog duck', './images/dog-duck.jpg', 0, 0, true);
var dragon = new Product('dragon', './images/dragon.jpg', 0, 0, true);
var pen = new Product('pen', './images/pen.jpg', 0, 0, true);
var petSweep = new Product('pet sweep', './images/pet-sweep.jpg', 0, 0, true);
var scissors = new Product('scissors', './images/scissors.jpg', 0, 0, true);
var shark = new Product('shark', './images/shark.jpg', 0, 0, true);
var sweep = new Product('sweep', './images/sweep.png', 0, 0, true);
var tauntaun = new Product('tauntaun', './images/tauntaun.jpg', 0, 0, true);
var unicorn = new Product('unicorn', './images/unicorn.jpg', 0, 0, true);

imgArr.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn);

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

function trackClicks(image){
  counter++;
  console.log('Total clicks: ', counter);
  image.clicks = image.clicks + 1;
  console.log('Clicks for ' + image.name + ': ' + image.clicks);
}

function displayImages(firstIndex, secondIndex, thirdIndex){
  var firstPath = document.createElement('img');
  var secondPath = document.createElement('img');
  var thirdPath = document.createElement('img');

  firstPath.src = first.path;
  console.log(firstPath);
  firstImage.removeChild(firstImage.childNodes[0]);
  firstImage.appendChild(firstPath);
  first.shown += 1;
  first.canShow = 3;
  timeOut.push(first);
  imgArr.splice(firstIndex, 1);

  secondImage.removeChild(secondImage.childNodes[0]);
  secondPath.src = second.path;
  secondImage.appendChild(secondPath);
  second.shown += 1;
  second.canShow = 3;
  timeOut.push(second);
  imgArr.splice(secondIndex, 1);

  thirdImage.removeChild(thirdImage.childNodes[0]);
  thirdPath.src = third.path;
  thirdImage.appendChild(thirdPath);
  timeOut.push(third);
  third.shown += 1;
  third.canShow = 3;
  imgArr.splice(thirdIndex, 1);
}

function randomizeImages(){
  console.log('ImgArr is ' + imgArr.length + ' long');
  console.log('timeOut is ' + timeOut.length + ' long');
  var firstIndex = getRandNum();
  console.log('firstIndex is ', firstIndex);
  first = imgArr[firstIndex];
  console.log(first);
  var secondIndex = getRandNum();

  while(secondIndex === firstIndex){
    secondIndex = getRandNum();
  }
  console.log('secondIndex is ', secondIndex);
  second = imgArr[secondIndex];
  console.log(second);

  var thirdIndex = getRandNum();
  while(thirdIndex === firstIndex || thirdIndex === secondIndex){
    thirdIndex = getRandNum();
  }
  console.log('thirdIndex is ', thirdIndex);
  third = imgArr[thirdIndex];
  console.log(third);

  updateTimeOut();
  displayImages(firstIndex, secondIndex, thirdIndex);
}

function updateTimeOut(){
  for(var i = 0; i < timeOut.length; i++){
    if(timeOut[i].canShow > 0){
      console.log(timeOut[i].name + ' is in time out for ' + timeOut[i].canShow + ' click(s).');
      timeOut[i].canShow--;
    } else {
      console.log(timeOut[i].name + ' is coming out of time out.');
      imgArr.push(timeOut[i]);
      timeOut.splice(timeOut[i], 1);
      i = i - 1;
    }
  }
}

function getRandNum(){
  return Math.floor(Math.random() * imgArr.length);
}

randomizeImages();
