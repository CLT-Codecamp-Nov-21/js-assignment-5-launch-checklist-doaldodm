

// Write your JavaScript code here!


window.addEventListener("load", function () {
  let listedPlanets;
  // Set listedPlanetsResponse equal to the value returned by calling myFetch()
  let button = document.getElementById("formSubmit");

  
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse.then(function (json) {
       let planet= pickPlanet(json);
       addDestinationInfo(document,planet.name,planet.diameter,planet.star,planet.distance,planet.moons,planet.image);   
       console.log(planet);
      });  
      
      
       

  button.addEventListener("click", function (e) {
    e.preventDefault();

    let formData = {};
    let docData = Array.from(document.getElementsByTagName("input"));

    for (let i = 0; i < docData.length; i++) {
      let isValid = validateInput(docData[i].value);
      let tmp = docData[i];
      if (isValid !== "Empty") {
        if (
          (tmp.name === "cargoMass" || tmp.name === "fuelLevel") &&
          isValid === "Not a Number"
        ) {
          window.alert("Make sure to enter valid information for each field!");
          formData = {};
          return;
        } else if (
          (tmp.name === "copilotName" || tmp.name === "pilotName") &&
          isValid === "Is a Number"
        ) {
          window.alert("Make sure to enter valid information here for each field!");
          formData = {};
          return;
        } else {
          (tmp.name === "cargoMass" || tmp.name === "fuelLevel")?formData[tmp.name] = parseInt(tmp.value):formData[tmp.name] = tmp.value
           
        }
      } else {
        window.alert("All fields are requiered!");
        formData = {};
        return;
      }
    }

    formSubmission(document, document.getElementById("faultyItems").getElementsByTagName("li"), formData.pilotName,formData.copilotName, formData.fuelLevel, formData.cargoMass);
  });





});