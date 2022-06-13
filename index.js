const carouselContainerWidth = 600;
const carouselContainerHeight = 400;

function toPixel(number) {
  return `${number}px`;
}

const body = document.body;
const carouselContainer = document.getElementById("carousel-container");
const carouselImageWrapper = document.getElementById("carousel-image-wrapper");

// carouselContainer styling
carouselContainer.style.width = toPixel(carouselContainerWidth);
carouselContainer.style.height = toPixel(carouselContainerHeight);
carouselContainer.style.margin = "auto";
carouselContainer.style.position = "relative";
carouselContainer.style.overflowY = "hidden";

// carouselImageWrapper styling
carouselImageWrapper.style.position = "absolute";
carouselImageWrapper.style.top = "0px";

carouselImageWrapper.style.height = toPixel(carouselContainerHeight);
carouselImageWrapper.style.width = "100%";

// images styling
const childrenImagesNodes = carouselImageWrapper.children;
const childrenImages = [...childrenImagesNodes];
childrenImages.forEach((image, index) => {
  image.id = index;
  image.style.position = "absolute";
  image.style.top = "0px";
  image.style.left = toPixel(index * carouselContainerWidth);
});

let currentIndex = 0;
function moveImage(previousIndex, currentIndex, speed) {
  if (previousIndex < currentIndex) {
    let previousPosition = -previousIndex * carouselContainerWidth;
    let currentPosition = previousPosition;
    let nextPosition = -currentIndex * carouselContainerWidth;
    function play() {
      window.requestAnimationFrame(() => {
        currentPosition -= speed;
        carouselImageWrapper.style.left = toPixel(currentPosition);
        if (!(currentPosition <= nextPosition)) {
          play();
        }
      });
    }
    play();
  } else {
    let previousPosition = -previousIndex * carouselContainerWidth;
    let currentPosition = previousPosition;
    let nextPosition = -currentIndex * carouselContainerWidth;
    function play() {
      window.requestAnimationFrame(() => {
        currentPosition += speed;
        carouselImageWrapper.style.left = toPixel(currentPosition);
        if (!(currentPosition >= nextPosition)) {
          play();
        }
      });
    }
    play();
  }
}

class Carousel {
  constructor(speed = 10) {
    this.speed = speed;
  }
  currentIndex = 0;
  moveRight() {
    moveImage(currentIndex, currentIndex + 1, this.speed);
    currentIndex += 1;
  }
  moveLeft() {
    moveImage(currentIndex, currentIndex - 1, this.speed);
    currentIndex -= 1;
  }
}

let carousel = new Carousel();

carousel.moveRight();
