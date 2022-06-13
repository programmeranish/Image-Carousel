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
carouselContainer.style.overflow = "hidden";

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

// button styling
const leftButton = document.createElement("img");
leftButton.setAttribute("src", "./assests/arrow-left-solid.svg");
leftButton.style.height = "100px";
leftButton.style.width = "100px";
leftButton.style.position = "absolute";
leftButton.style.left = "0px";
leftButton.style.top = "50%";
leftButton.style.zIndex = "1";
leftButton.addEventListener("mouseenter", () => {
  leftButton.style.filter =
    "invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%)";
});
leftButton.addEventListener("mouseleave", () => {
  leftButton.style.filter =
    "invert(0) sepia(0) saturate(0) hue-rotate(0) brightness(0) contrast(119%)";
});

const rightButton = document.createElement("img");
rightButton.setAttribute("src", "./assests/arrow-right-solid.svg");
rightButton.style.height = "100px";
rightButton.style.width = "100px";
rightButton.style.position = "absolute";
rightButton.style.right = "0px";
rightButton.style.top = "50%";
rightButton.style.zIndex = "1";
rightButton.addEventListener("mouseenter", () => {
  rightButton.style.filter =
    "invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%)";
});
rightButton.addEventListener("mouseleave", () => {
  rightButton.style.filter =
    "invert(0) sepia(0) saturate(0) hue-rotate(0) brightness(0) contrast(119%)";
});

carouselContainer.appendChild(leftButton);
carouselContainer.appendChild(rightButton);

//adding dots for carousel
const dotContainer = document.createElement("div");
dotContainer.id = "dot-container";
dotContainer.style.position = "absolute";
dotContainer.style.bottom = "0px";
dotContainer.style.left = `calc(50% - ${(50 * childrenImages.length) / 2}px`;

for (let i = 0; i < childrenImages.length; i++) {
  const dot = document.createElement("img");
  dot.id = i;
  if (i === 0) {
    dot.classList.add("active");
    dot.style.filter =
      "invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%)";
  }
  dot.setAttribute("src", "./assests/dot-circle-solid.svg");
  dot.style.width = "50px";
  dot.style.height = "50px";

  dot.addEventListener("mouseenter", () => {
    dot.style.filter =
      "invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%)";
  });
  dot.addEventListener("mouseleave", () => {
    if (!dot.classList.contains("active")) {
      dot.style.filter =
        "invert(0) sepia(0) saturate(0) hue-rotate(0) brightness(0) contrast(119%)";
    }
  });
  dot.addEventListener("click", (event) => {
    carousel.goto(event.target.id);
  });

  dotContainer.appendChild(dot);
}

carouselContainer.appendChild(dotContainer);

function moveImage(previousIndex, currentIndex, speed = 10) {
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
  } else if (previousIndex > currentIndex) {
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
function changeActiveDot(currentIndex) {
  let dots = [...document.getElementById("dot-container").children];
  dots.forEach((dot) => {
    if (currentIndex === parseInt(dot.id)) {
      dot.classList.add("active");
      dot.style.filter =
        "invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%)";
    } else {
      dot.classList.remove("active");
      dot.style.filter =
        "invert(0) sepia(0) saturate(0) hue-rotate(0) brightness(0) contrast(119%)";
    }
  });
}

class Carousel {
  constructor(speed = 10) {
    this.speed = speed;
    this.currentIndex = 0;
  }
  moveRight() {
    if (this.currentIndex === childrenImages.length - 1) {
      moveImage(this.currentIndex, 0, 30);
      this.currentIndex = 0;
    } else {
      moveImage(this.currentIndex, this.currentIndex + 1, this.speed);
      this.currentIndex += 1;
    }
    changeActiveDot(this.currentIndex);
  }
  moveLeft() {
    if (this.currentIndex === 0) {
      moveImage(this.currentIndex, childrenImages.length - 1, 30);
      this.currentIndex = childrenImages.length - 1;
    } else {
      moveImage(this.currentIndex, this.currentIndex - 1, this.speed);
      this.currentIndex -= 1;
    }
    changeActiveDot(this.currentIndex);
  }
  goto(currentIndex) {
    moveImage(this.currentIndex, parseInt(currentIndex), 30);
    this.currentIndex = parseInt(currentIndex);
    changeActiveDot(this.currentIndex);
  }
}

let carousel = new Carousel();

leftButton.addEventListener("click", () => {
  carousel.moveLeft();
});
rightButton.addEventListener("click", () => {
  carousel.moveRight();
});
