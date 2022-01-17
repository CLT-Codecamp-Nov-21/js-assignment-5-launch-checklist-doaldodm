
// Write your helper functions here!
try {
  require("isomorphic-fetch");
} catch (error) {
  //nothing to do here
}

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  let target = document.getElementById("missionTarget");
  let targetHtml = `                
  <h2>Mission Destination</h2>
  <ol>
      <li>Name: ${name} </li>
      <li>Diameter: ${diameter}</li>
      <li>Star: ${star}</li>
      <li>Distance from Earth:${distance} </li>
      <li>Number of Moons: ${moons}</li>
  </ol>
  <img src="${imageUrl}">`;
  target.innerHTML = targetHtml;
}

function validateInput(testInput) {
  if (testInput === "") {
    return "Empty";
  } else if (/^[0-9]+$/.test(testInput)) {
    return "Is a Number";
  } else {
    return "Not a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  list[0].innerText = `Pilot ${pilot} is ready for launch`;
  list[1].innerText = ` Co-Pilot ${copilot} is ready for launch`;
  let launchStatus = document.getElementById("launchStatus");

  let isValidPilot = validateInput(pilot);
  let isValidCoPilot = validateInput(copilot);
  let isValidFuelLevel = validateInput(fuelLevel);
  let isValidCargoLevel = validateInput(cargoLevel);

  //validation
  let badData = 0;
  if (
    isValidPilot !== "Empty" &&
    isValidCoPilot !== "Empty" &&
    isValidCargoLevel !== "Empty" &&
    isValidCargoLevel !== "Empty"
  ) {
    if (isValidPilot !== "Not a Number" || isValidCoPilot !== "Not a Number") {
      window.alert("Make sure to enter valid information for each field!");
      badData++;
    } else if (
      isValidCargoLevel !== "Is a Number" ||
      isValidFuelLevel !== "Is a Number"
    ) {
      console.log(validateInput(pilot));
      window.alert("Make sure to enter valid information here for each field!");
      badData++;
    } else {
      fuelLevel = parseInt(fuelLevel);
      cargoLevel = parseInt(cargoLevel);
    }
  } else {
    window.alert("All fields are requiered!");
    badData++;
  }

  if (badData === 0) {
    if (cargoLevel > 10000 && fuelLevel < 10000) {
      launchStatus.innerText = "Shuttle not ready for launch";
      launchStatus.style = "color:rgb(199, 37, 78)";
      list[2].innerText = "Fuel is to low for launch";
      list[3].innerText = "Cargo mass too heavy for launch";
    } else if (fuelLevel < 10000) {
      launchStatus.innerText = "Shuttle not ready for launch";
      launchStatus.style = "color:rgb(199, 37, 78)";
      list[2].innerText = "Fuel is to low for launch";
      list[3].innerText = "Cargo mass low enough for launch";
    } else if (cargoLevel > 10000) {
      launchStatus.innerText = "Shuttle not ready for launch";
      launchStatus.style = "color:rgb(199, 37, 78)";
      list[2].innerText = "Fuel level high enough for launch";
      list[3].innerText = "Cargo mass too heavy for launch";
    } else {
      launchStatus.innerText = "Shuttle is Ready for Launch";
      launchStatus.style = "color:rgb(65, 159, 106)";
      list[2].innerText = "Fuel level high enough for launch";
      list[3].innerText = "Cargo mass low enough for launch";
    }
    document.getElementById("faultyItems").style = "visibility: visible";
  }
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    return response.json();
  });

  return planetsReturned;
}

function pickPlanet(planets) {
  let random = Math.floor(Math.random() * planets.length);
  return planets[random];
}

try {
  module.exports.addDestinationInfo = addDestinationInfo;
  module.exports.validateInput = validateInput;
  module.exports.formSubmission = formSubmission;
  module.exports.pickPlanet = pickPlanet;
  module.exports.myFetch = myFetch;
} catch (error) {}






