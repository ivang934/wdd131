
const currentYearElement = document.querySelector("#currentyear");
const today = new Date();
currentYearElement.textContent = today.getFullYear();

const lastModifiedElement = document.querySelector("#lastModified");
lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;