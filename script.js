// script.js

const img = new Image(); // used to load image from <input> and draw to canvas
var imageInput = document.getElementById("image-input");
var c = document.getElementById("user-image");
var ctx = c.getContext('2d');
const clear = document.querySelector("[type='reset']");
const read = document.querySelector("[type='button']");
const submit = document.querySelector("[type='submit']");
const voices = document.querySelector("voice-selection");
const submitButton = document.getElementById('generate-meme');
const volSlider = document.getElementById('volume-group');
imageInput.addEventListener('input', () => {
  img.src = URL.createObjectURL(imageInput.files[0]);
});
// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  
  ctx.fillStyle='black';
  ctx.fillRect(0,0,c.width,c.height);

  //clear

  document.getElementById('generate-meme').reset();

  var d = getDimmensions(c.width, c.height, img.width, img.height);

  ctx.drawImage(img, d.startX, d.startY, d.width, d.height);
  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
});

submitButton.addEventListener('submit', (event) => {
  event.preventDefault();
  var topText = document.getElementById('text-top');
  var botText = document.getElementById('text-bottom');
  ctx.font = "30px Arial";
  ctx.fillStyle = 'white';
  ctx.fillText(topText.value, c.width/2, 50);
  ctx.fillText(botText.value, c.width/2, 375);
  submit.disabled = true;
  clear.disabled = false;
  read.disabled = false;
  voices.disabled = false;

  var speechList = SpeechSynthesis.getVoices();
  for (var i = 0; i < speechList.length; i++) {

  }
});

clear.addEventListener('click', () => {
  ctx.clearRect(0,0, c.width, c.height);
  submit.disabled = false;
  clear.disabled = true;
  read.disabled = true;
  voices.disabled = true;
});

read.addEventListener('click', () => {

});

/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
