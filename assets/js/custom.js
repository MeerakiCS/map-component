
"use strict";
function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: -33.8688,
      lng: 151.2195
    },
    zoom: 13,
    mapTypeId: "roadmap"
  }); // Create the search box and link it to the UI element.

  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);
  
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input); // Bias the SearchBox results towards current map's viewport.

//   address field
const addressinput = document.getElementById("addAddressInput");
const autocomplete = new google.maps.places.SearchBox(addressinput);
// map.controls[google.maps.ControlPosition.TOP_LEFT].push(addressinput); // Bias the SearchBox results towards current map's viewport.


  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
    autocomplete.setBounds(map.getBounds());
  });
  let markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  autocomplete.addListener("places_changed", () => {
    const places = autocomplete.getPlaces();
	document.getElementById("success_msg").style.display = 'block';
	setTimeout(function () {
        document.getElementById('success_msg').style.display='none';
    }, 6000);
	document.getElementById("myForm").reset();
	
	 
    // if (places.length == 0) {
      // return;
    // } // Clear out the old markers.

    // markers.forEach(marker => {
      // marker.setMap(null);
    // });
    markers = []; // For each place, get the icon, name and location.

    const bounds = new google.maps.LatLngBounds();
	
    places.forEach(place => {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      markers.push(
        new google.maps.Marker({
          map,
          title: place.name,
          position: place.geometry.location,
          draggable:true
        })
        
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  
//   search box
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();	
	
    if (places.length == 0) {
      return;
    } // Clear out the old markers.

    markers.forEach(marker => {
      marker.setMap(null);
    });
    markers = []; // For each place, get the icon, name and location.

    const bounds = new google.maps.LatLngBounds();
    places.forEach(place => {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      markers.push(
        new google.maps.Marker({
          map,
          title: place.name,
          position: place.geometry.location,
          draggable:true
        })
        
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

