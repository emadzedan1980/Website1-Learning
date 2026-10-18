let timer;
let deleteFirstPhotoDeley;

async function startFetching() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
  } catch (e) {
    console.log("These Was A Problem Fetching The Breed List!");
  }
}
startFetching();
function createBreedList(receivedJSON) {
  document.getElementById("breed").innerHTML = `
    <select onchange="loadImagesByBreed(this.value)">
        <option>Chooes a dog breed</option>
        ${Object.keys(receivedJSON)
          .map(function (breed) {
            return `<option>${breed}</option>`;
          })
          .join("")}
    </select>
    `;
}

async function loadImagesByBreed(breed) {
  if (breed != "Chooes a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    buildSlideShow(data.message);
  }
}

function buildSlideShow(imagesArray) {
  let currentPosition = 0;
  clearInterval(timer);
  clearInterval(deleteFirstPhotoDeley);

  if (imagesArray.length > 1) {
    document.getElementById("slideShow").innerHTML = `
        <div class="slide" style="background-image: url('${imagesArray[0]}');"></div>
        <div class="slide" style="background-image: url('${imagesArray[1]}');"></div>
    `;
    currentPosition += 2;
    if (imagesArray.length == 2) {
      currentPosition = 0;
    }
    timer = setInterval(nextSlide, 3000);
  } else {
    document.getElementById("slideShow").innerHTML = `
        <div class="slide" style="background-image: url('${imagesArray[0]}');"></div>
        <div class="slide"></div>
    `;
  }
  function nextSlide() {
    document
      .getElementById("slideShow")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="slide" style="background-image: url('${imagesArray[currentPosition]}');"></div>`,
      );
    deleteFirstPhotoDeley = setTimeout(function () {
      document.querySelector(".slide").remove();
    }, 1000);
    if (currentPosition + 1 >= imagesArray.lengh) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}
