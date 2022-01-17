
// Write your JavaScript code here!

window.addEventListener("load", function () {

  
  const button = document.getElementById("formSubmit");
  let faultyItemsList = document.getElementById("faultyItems");
  faultyItemsList.style.visibility = "hidden";

  // Set listedPlanetsResponse equal to the value returned by calling myFetch()
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse.then(function (json) {
    let planet = pickPlanet(json);
    addDestinationInfo(
      document,
      planet.name,
      planet.diameter,
      planet.star,
      planet.distance,
      planet.moons,
      planet.image
    );
  });

  //
  button.addEventListener("click", function (e) {
    e.preventDefault();
    let formData = Array.from(document.getElementsByTagName("input"));
    formSubmission(
      document,
      faultyItemsList,
      formData[0].value,
      formData[1].value,
      formData[2].value,
      formData[3].value
    );
  });
});
