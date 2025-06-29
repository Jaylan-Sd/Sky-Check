const apiKey = "bdd430642905e0c0bc03590babc81d45";
const checkButton = document.getElementById("check-weather");
const loading = document.getElementById("loading");


checkButton.addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    const weatherBox = document.getElementById("weather-box");

    if (!city) return alert("Please enter a city name");

    loading.classList.remove("hidden");     
    weatherBox.classList.add("hidden");     

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
    })
    .then(data => {
        document.getElementById("city-name").textContent = data.name;
        document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById("weather-description").textContent = data.weather[0].description;
        document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
        
        weatherBox.classList.remove("hidden");
    })
    .catch(err => {
        alert("Error: " + err.message);
        weatherBox.classList.add("hidden");
    })
    .finally(() => {
        loading.classList.add("hidden");   
    });
});
