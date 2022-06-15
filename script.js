const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const totalMoney = document.getElementById("total-money");
const movie = document.getElementById("movie");
let ticketPrice = +movie.value;

/*on reload retrive the local storage data and populate UI */
populateUI();

/* set the selected movie and movie price in localstorage*/

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

/* set the selected seats index in local storage */

function setSelectedSeats(selectedSeats) {
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selected-Seats", JSON.stringify(seatsIndex));
}

/* Populate UI by getting values from local storage */

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selected-Seats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");

  if (selectedMovieIndex !== null) {
    movie.selectedIndex = selectedMovieIndex;
  }
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  totalMoney.innerText = total.innerText = ticketPrice * selectedSeatsCount;
  setSelectedSeats(selectedSeats);
}

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

movie.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
  setMovieData(e.target.selectedIndex, e.target.value);
});

updateSelectedCount();
