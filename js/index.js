let cargaOut = document.getElementById("carga-massa");
let cargaIn = document.getElementById("massa-carga");
let contraPeso = document.getElementById("contra-peso");

cargaOut.textContent = cargaIn.value;
cargaIn.addEventListener("input", () => {cargaOut.textContent = cargaIn.value;
contraPeso.textContent = ((1500*9.5 + parseFloat(cargaIn.value)*12.5 - 500*4)/7.5).toFixed(2);})
