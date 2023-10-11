/*Constantes de distâncias*/
const d1 = 7.5;
const d2 = 4;
const d3 = 9.5;
const d4 = 12.5;

let cargaOut = document.getElementById("carga-massa");
let cargaIn = document.getElementById("massa-carga");
let contraPesoIn = document.getElementById("massa-cpeso");
let contraPesoOut = document.getElementById("contra-peso");

cargaOut.textContent = cargaIn.value;
contraPesoOut.textContent = calculaContraPeso(cargaOut.value).toFixed(2);
contraPesoIn.value = calculaContraPeso(cargaOut.value);

function calculaContraPeso(carga) {
  return (1500*d3 + parseFloat(cargaIn.value)*d4 - 500*d2)/d1;
}

function calculaCarga(contraPeso) {
  return (contraPeso*d1 - 1500*d3 + 500*d2)/d4;
}

cargaIn.addEventListener("input", () => {
  let cPeso = calculaContraPeso(cargaIn.value);
  if(cPeso >= 0) {
    cargaOut.textContent = cargaIn.value;
    contraPesoOut.textContent = cPeso.toFixed(2);
    contraPesoIn.value = cPeso;
  }
})

contraPesoIn.addEventListener("input", () => {
  let cargaPeso = calculaCarga(contraPesoIn.value);
  contraPesoOut.textContent = contraPesoIn.value;
  if(cargaPeso < 0) {
    cargaPeso = 0;
  }
  cargaOut.textContent = cargaPeso.toFixed(2);
  cargaIn.value = cargaPeso;

})
