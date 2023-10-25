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

function opacityOutput(value) {
  cargaOut.style.opacity = String(value);
  d1Out.style.opacity = String(value);
}

function calculaPosicao(distancia) {
  return (40 + (Number(d1Input.value))/(15)*(-22.5));
}

function calculaDistanciaCpeso(carga) {
  return (parseFloat(massaBDIn.value)*d3 + parseFloat(cargaIn.value)*d4 - parseFloat(massaBCIn.value)*d2)/mCpeso;
}

function calculaCarga(d1) {
  return (mCpeso*d1 - parseFloat(massaBDIn.value)*d3 + parseFloat(massaBCIn.value)*d2)/d4;
}

cargaIn.addEventListener("input", () => {
  let cPesoDistancia = calculaDistanciaCpeso(cargaIn.value);
  cargaOut.textContent = cargaIn.value + " kg";    
  opacityOutput(1);
  d1Out.textContent = cPesoDistancia.toFixed(2) + " m";
  d1Input.value = cPesoDistancia;
  if(cPesoDistancia >= 0) {
    d1Out.style.color = "black";
    contraPesoBox.style.left = calculaPosicao(d1Input.value) + "%";
  } else {
      d1Out.style.color = "red";
  }
})

d1Input.addEventListener("input", () => {
  d1Out.style.color = "black";
  let cargaPeso = calculaCarga(d1Input.value);
  d1Out.textContent = d1Input.value + " m";
  opacityOutput(1);
  cargaOut.style.color = "black";
  if(cargaPeso < 0) {
    cargaOut.style.color = "red";
  }
  cargaOut.textContent = cargaPeso.toFixed(2) + " kg"; 
  cargaIn.value = cargaPeso;
  contraPesoBox.style.left = calculaPosicao(d1Input.value) + "%";
})


massaBCIn.addEventListener("input", () => {
  massaBCOut.textContent = massaBCIn.value + " kg";
  opacityOutput(0.2)
})

massaBDIn.addEventListener("input", () => {
  massaBDOut.textContent = massaBDIn.value + " kg";
  opacityOutput(0.2);
})

