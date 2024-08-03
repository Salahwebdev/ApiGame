"use strict";

let mmorpg = document.querySelector("#mmorpg");
let shooter = document.querySelector("#shooter");
let sailing = document.querySelector("#sailing");
let permadeath = document.querySelector("#permadeath");
let superhero = document.querySelector("#superhero");
let pixel = document.querySelector("#pixel");

mmorpg.addEventListener("click", function () {
  getGames("mmorpg");
});

shooter.addEventListener("click", function () {
  getGames("shooter");
});

sailing.addEventListener("click", function () {
  getGames("sailing");
});

permadeath.addEventListener("click", function () {
  getGames("permadeath");
});

superhero.addEventListener("click", function () {
  getGames("superhero");
});

pixel.addEventListener("click", function () {
  getGames("pixel");
});

function getGames(category) {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "aeea1c515cmshaf7871088b73a8cp191c3ejsn655885418b08",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  async function getData() {
    try {
      let data = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
        options
      );
      let games = await data.json();

      localStorage.setItem("gamesList", JSON.stringify(games));

      displayGames(games);
    } catch (error) {
      document.querySelector(".row").innerHTML = `<h1>${error}</h1>`;
    }
  }

  getData();
}
function displayGames(games) {
  let cartona = ``;
  for (let i = 0; i < games.length; i++) {
    cartona += `<div class="col-lg-3">
              <div class="card h-100 p-2">

                  <img src="${games[i].thumbnail}" class="w-100" alt="">
                  <div class="card-body d-flex justify-content-between align-items-center">
                      <h1 class="h6">${games[i].title}</h1>
                      <h1 class="badge text-bg-primary">free</h1>
                  </div>
                  <p class="text-center">${games[i].short_description.split(
                    " ",
                    6
                  )}</p>
                  <div class="card-footer card-body d-flex justify-content-between align-items-center">
                      <h1 class="h6">${games[i].genre}</h1>
                      <h2 class="h6 ">${games[i].platform.split(" ", 2)}</h2>
                  </div>
              </div>
          </div>`;
  }
  // console.log(games);

  document.querySelector(".row").innerHTML = cartona;
  let sayheloo = document.querySelectorAll(".col-lg-3");

  for (let i = 0; i < sayheloo.length; i++) {
    async function getDetails(game) {
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "aeea1c515cmshaf7871088b73a8cp191c3ejsn655885418b08",
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      };
      async function getDescription(_r) {
        let data = await fetch(
          `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${game};`,
          options
        );
        let games = await data.json();

        return games;
      }
      return await getDescription(game);
    }

    sayheloo[i].addEventListener("click", async function () {
      var cuurntId = games[i].id;
      var gameDetails = await getDetails(cuurntId);
      console.log(gameDetails);
      var currndesc = gameDetails.description;
      console.log(currndesc);

      var gameDetailsHTML = `
     <div class=" row-cols-2 d-flex justify-content-between align-items-baseline  ">
            <h1 class=" text-capitalize p-0">details game</h1>
            <i class=" fa-solid fa-x fs-4 p-0  text-center"></i>
        </div>
        <div class="row d-flex justify-content-between align-items-start">
            <div class="col-lg-6 ">

                <img src="${games[i].thumbnail}" alt="">
            </div>
            <div class="col-lg-6  p-2">


                <h1 class="h3">${games[i].title}</h1>
                <h1 class="h3">catogrie</h1>
                <h1 class="h3">${games[i].genre}</h1>
                <h1 class="h3 ">${games[i].platform.split(" ", 2)}</h1>
                <p>${currndesc}</p>
                <button class="btn btn-outline-warning">Show Game</button>
            </div>

        </div>

    
    `;

      document.querySelector(".sec2").innerHTML = gameDetailsHTML;
      document.querySelector(".btn").addEventListener("click", function () {
        window.open(`${games[i].game_url}`, `_blank`);
      });
      document.querySelector(".sec2").classList.remove("d-none");
      document.querySelector("header").classList.add("d-none");
      document.querySelector(".row").classList.add("d-none");
      document.querySelector("i").addEventListener("click", function () {
        console.log("close");
        document.querySelector("header").classList.remove("d-none");
        document.querySelector(".sec2").classList.add("d-none");
        document.querySelector(".row").classList.remove("d-none");
      });
    });
  }
}

if (localStorage.getItem("gamesList")) {
  let storedGames = JSON.parse(localStorage.getItem("gamesList"));
  displayGames(storedGames);
} else {
  getData();
}
