/*Constantes de distâncias*/
const mCpeso = 4966.67;
const d2 = 4;
const d3 = 9.5;
const d4 = 12.5; 

let cargaOut = document.getElementById("carga-massa");
let cargaIn = document.getElementById("massa-carga");
let d1Input = document.getElementById("distancia-cpeso");
let d1Out = document.getElementById("distancia-cpeso-out");
let contraPesoBox = document.getElementById("contrapeso");
let massaBCIn = document.getElementById("massa-bc-in");
let massaBCOut = document.getElementById("massa-bc-out");
let massaBDIn = document.getElementById("massa-bd-in");
let massaBDOut = document.getElementById("massa-bd-out"); 

cargaOut.textContent = cargaIn.value + " kg";
d1Out.textContent = calculaDistanciaCpeso(cargaOut.value).toFixed(2) + " m";
d1Input.value = calculaDistanciaCpeso(cargaOut.value);
massaBCOut.textContent = massaBCIn.value + " kg";
massaBDOut.textContent = massaBDIn.value + " kg";


function calculaPosicao(distancia) {
  return (40 + (Number(d1Input.value))/(10)*(-22.5));
}

function calculaDistanciaCpeso(carga) {
  return (1500*d3 + parseFloat(cargaIn.value)*d4 - 500*d2)/mCpeso;
}

function calculaCarga(d1) {
  return (mCpeso*d1 - 1500*d3 + 500*d2)/d4;
}

cargaIn.addEventListener("input", () => {
  let cPesoDistancia = calculaDistanciaCpeso(cargaIn.value);
  cargaOut.textContent = cargaIn.value + " kg";    
  if(cPesoDistancia >= 0) {
    d1Out.textContent = cPesoDistancia.toFixed(2) + " m";
    d1Input.value = cPesoDistancia;
    contraPesoBox.style.left = calculaPosicao(d1Input.value) + "%";
  }
})

d1Input.addEventListener("input", () => {
  let cargaPeso = calculaCarga(d1Input.value);
  d1Out.textContent = d1Input.value + " m";
  if(cargaPeso < 0) {
    cargaPeso = 0;
  }
  cargaOut.textContent = cargaPeso.toFixed(2) + " kg"; 
  cargaIn.value = cargaPeso;
  contraPesoBox.style.left = calculaPosicao(d1Input.value) + "%";
})


massaBCIn.addEventListener("input", () => {
  massaBCOut.textContent = massaBCIn.value + " kg";
})

massaBDIn.addEventListener("input", () => {
  massaBDOut.textContent = massaBDIn.value + " kg";
})

