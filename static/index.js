function toPixel(number) {
  return `${number}px`;
}

const body = document.body;

//moving image function global
function moveImage(
  previousIndex,
  currentIndex,
  speed = 10,
  carouselContainerWidth,
  carouselContainerHeight,
  carouselImageWrapper
) {
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
function changeActiveDot(currentIndex, dotsContainer) {
  let dots = [...dotsContainer.children];
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
    this.carouselContainerWidth = 600;
    this.carouselContainerHeight = 400;
    this.carouselContainer = document.getElementById("carousel-container");
    this.carouselImageWrapper = document.getElementById(
      "carousel-image-wrapper"
    );
    // carouselContainer styling
    this.carouselContainer.style.width = toPixel(this.carouselContainerWidth);
    this.carouselContainer.style.height = toPixel(this.carouselContainerHeight);
    this.carouselContainer.style.margin = "auto";
    this.carouselContainer.style.position = "relative";
    this.carouselContainer.style.overflow = "hidden";
    // carouselImageWrapper styling
    this.carouselImageWrapper.style.position = "absolute";
    this.carouselImageWrapper.style.top = "0px";

    this.carouselImageWrapper.style.height = toPixel(
      this.carouselContainerHeight
    );
    this.carouselImageWrapper.style.width = "100%";

    // images styling
    this.childrenImagesNodes = this.carouselImageWrapper.children;
    this.childrenImages = [...this.childrenImagesNodes];
    this.childrenImages.forEach((image, index) => {
      image.id = index;
      image.style.position = "absolute";
      image.style.top = "0px";
      image.style.left = toPixel(index * this.carouselContainerWidth);
    });
  }
  styleCarousel() {}
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

    this.carouselContainer.appendChild(this.leftButton);
    this.carouselContainer.appendChild(this.rightButton);
  }

  addDots() {
    this.dotContainer = document.createElement("div");
    this.dotContainer.id = "dot-container";
    this.dotContainer.style.position = "absolute";
    this.dotContainer.style.bottom = "0px";
    this.dotContainer.style.left = `calc(50% - ${
      (50 * this.childrenImages.length) / 2
    }px`;

    for (let i = 0; i < this.childrenImages.length; i++) {
      let dot = document.createElement("img");
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
        this.goto(event.target.id, this.dotContainer);
      });

      this.dotContainer.appendChild(dot);
    }

    this.carouselContainer.appendChild(this.dotContainer);
  }
  moveRight() {
    if (this.currentIndex === this.childrenImages.length - 1) {
      moveImage(
        this.currentIndex,
        0,
        30,
        this.carouselContainerWidth,
        this.carouselContainerHeight,
        this.carouselImageWrapper
      );
      this.currentIndex = 0;
    } else {
      moveImage(
        this.currentIndex,
        this.currentIndex + 1,
        this.speed,
        this.carouselContainerWidth,
        this.carouselContainerHeight,
        this.carouselImageWrapper
      );
      this.currentIndex += 1;
    }
    changeActiveDot(this.currentIndex, this.dotContainer);
  }
  moveLeft() {
    if (this.currentIndex === 0) {
      moveImage(
        this.currentIndex,
        this.childrenImages.length - 1,
        30,
        this.carouselContainerWidth,
        this.carouselContainerHeight,
        this.carouselImageWrapper
      );
      this.currentIndex = this.childrenImages.length - 1;
    } else {
      moveImage(
        this.currentIndex,
        this.currentIndex - 1,
        this.speed,
        this.carouselContainerWidth,
        this.carouselContainerHeight,
        this.carouselImageWrapper
      );
      this.currentIndex -= 1;
    }
    changeActiveDot(this.currentIndex, this.dotContainer);
  }
  goto(currentIndex, dotsContainer) {
    moveImage(
      this.currentIndex,
      parseInt(currentIndex),
      30,
      this.carouselContainerWidth,
      this.carouselContainerHeight,
      this.carouselImageWrapper
    );
    this.currentIndex = parseInt(currentIndex);
    changeActiveDot(this.currentIndex, dotsContainer);
  }
  slideAutomatic() {
    setInterval(() => {
      this.moveRight();
    }, 3000);
  }
}

let carousel = new Carousel();
carousel.addButtons();
carousel.styleCarousel();
carousel.addDots();
carousel.slideAutomatic();
