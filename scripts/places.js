(function() {
  const temperature = 10;      
  const windSpeed = 5;        

  const tempSpan = document.getElementById('tempValue');
  const windSpan = document.getElementById('windValue');
  if (tempSpan) tempSpan.innerText = `${temperature} °C`;
  if (windSpan) windSpan.innerText = `${windSpeed} km/h`;

  function calculateWindChill(tempC, windKmh) {
    const vPow = Math.pow(windKmh, 0.16);
    const windChillMetric = 13.12 + (0.6215 * tempC) - (11.37 * vPow) + (0.3965 * tempC * vPow);
    return `${windChillMetric.toFixed(1)} °C`;
  }

  const isWindChillValid = (temperature <= 10) && (windSpeed > 4.8);

  const windChillElement = document.getElementById('windChillDisplay');
  
  if (isWindChillValid) {
    const windChillResult = calculateWindChill(temperature, windSpeed);
    if (windChillElement) windChillElement.innerText = windChillResult;
  } else {
    if (windChillElement) windChillElement.innerText = "N/A";
  }

  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
  }

  const lastModifiedSpan = document.getElementById('lastModifiedDate');
  if (lastModifiedSpan) {
    let lastMod = document.lastModified;
    if (lastMod && lastMod !== "") {
      const dateObj = new Date(lastMod);
      if (!isNaN(dateObj.getTime())) {
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getSeconds()).padStart(2, '0');
        lastModifiedSpan.innerText = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      } else {
        lastModifiedSpan.innerText = lastMod;
      }
    } else {
      lastModifiedSpan.innerText = "02/08/2024 22:47:47"; 
    }
  }
})();