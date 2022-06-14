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
  addButtons() {
    this.leftButton = document.createElement("img");
    this.leftButton.setAttribute("src", "./assests/arrow-left-solid.svg");
    this.leftButton.style.height = "100px";
    this.leftButton.style.width = "100px";
    this.leftButton.style.position = "absolute";
    this.leftButton.style.left = "0px";
    this.leftButton.style.top = "50%";
    this.leftButton.style.zIndex = "1";
    this.leftButton.addEventListener("mouseenter", () => {
      this.leftButton.style.filter =
        "invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%)";
    });
    this.leftButton.addEventListener("mouseleave", () => {
      this.leftButton.style.filter =
        "invert(0) sepia(0) saturate(0) hue-rotate(0) brightness(0) contrast(119%)";
    });
    this.leftButton.addEventListener("click", () => {
      this.moveLeft();
    });

    this.rightButton = document.createElement("img");
    this.rightButton.setAttribute("src", "./assests/arrow-right-solid.svg");
    this.rightButton.style.height = "100px";
    this.rightButton.style.width = "100px";
    this.rightButton.style.position = "absolute";
    this.rightButton.style.right = "0px";
    this.rightButton.style.top = "50%";
    this.rightButton.style.zIndex = "1";
    this.rightButton.addEventListener("mouseenter", () => {
      this.rightButton.style.filter =
        "invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%)";
    });
    this.rightButton.addEventListener("mouseleave", () => {
      this.rightButton.style.filter =
        "invert(0) sepia(0) saturate(0) hue-rotate(0) brightness(0) contrast(119%)";
    });
    this.rightButton.addEventListener("click", () => {
      this.moveRight();
    });

    carouselContainer.appendChild(this.leftButton);
    carouselContainer.appendChild(this.rightButton);
  }

  addDots() {
    this.dotContainer = document.createElement("div");
    this.dotContainer.id = "dot-container";
    this.dotContainer.style.position = "absolute";
    this.dotContainer.style.bottom = "0px";
    this.dotContainer.style.left = `calc(50% - ${
      (50 * childrenImages.length) / 2
    }px`;

    for (let i = 0; i < childrenImages.length; i++) {
      this.dot = document.createElement("img");
      this.dot.id = i;
      if (i === 0) {
        this.dot.classList.add("active");
        this.dot.style.filter =
          "invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%)";
      }
      this.dot.setAttribute("src", "./assests/dot-circle-solid.svg");
      this.dot.style.width = "50px";
      this.dot.style.height = "50px";

      this.dot.addEventListener("mouseenter", () => {
        this.dot.style.filter =
          "invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%)";
      });
      this.dot.addEventListener("mouseleave", () => {
        if (!this.dot.classList.contains("active")) {
          this.dot.style.filter =
            "invert(0) sepia(0) saturate(0) hue-rotate(0) brightness(0) contrast(119%)";
        }
      });
      this.dot.addEventListener("click", (event) => {
        carousel.goto(event.target.id);
      });

      this.dotContainer.appendChild(this.dot);
    }

    carouselContainer.appendChild(this.dotContainer);
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
carousel.addButtons();
carousel.addDots();
