const submitBtn = document.querySelector('.btn-submit');
submitBtn.addEventListener("click", getIPAddress);


// Setting up the map
var map = L.map('mapid').setView([51.505, -0.09], 16);
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=JXZcJEvrrHAGuMvPU8me',
            {
              attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
            }).addTo(map);

function getIPAddress(e){
  // constructing the url
  let userInput = document.querySelector('.user-address').value;
  const url = 'https://geo.ipify.org/api/v2/country?apiKey=';
  const apiKey = 'at_k6EO4BJ2k2gheBCBmOFBC6z1kLrZB';

  // if input does not end in a number it is a domain
  if (!isNaN(userInput.slice(-1))){
    // if contains valid number
    var domainOrIP = '&ipAddress=';
  }
  else{
    var domainOrIP = '&domain=';
  }

  let fullURL = 'https://geo.ipify.org/api/v2/country,city?apiKey=' + apiKey + domainOrIP + userInput;
  let ipAddressText = document.querySelector('#ip-address-text');
  let locationText = document.querySelector('#location-text');
  let timezoneText = document.querySelector('#timezone-text');
  let ispText = document.querySelector('#isp-text');

  fetch(fullURL)
  .then(res => {
    if (res.ok){
      return res.json();
    } else{
      throw new Error("Invalid input.");
    }
  })
  .then(data => {
    ipAddressText.innerHTML = data.ip;
    ispText.innerHTML = data.isp;
    timezoneText.innerHTML = 'UTC ' + data.location.timezone;
    locationText.innerHTML = data.location.city + ', ' + data.location.region + ' ' + data.location.postalCode;

    // changing map location and setting marker
    map.panTo(new L.LatLng(data.location.lat, data.location.lng));
    var marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
  })
  .catch((error) => {
    console.log(error);
    inputError(error);
  });
}

function inputError(error){
  let inputBox = document.querySelector('.user-address');
  let errorMessage = document.querySelector('.error-msg');
  inputBox.classList.add('error-input');
  errorMessage.innerHTML = error;
  setTimeout(removeErrorInput, 3000);
}

function removeErrorInput(){
  let inputBox = document.querySelector('.user-address');
  let errorMessage = document.querySelector('.error-msg');
  inputBox.classList.remove('error-input');
  errorMessage.innerHTML = '';
}
