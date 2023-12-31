//Constate g
g = 9.81;

//Definição das variáveis presentes no arquivo .html
let cargaOut = document.getElementById("carga-massa");
let cargaIn = document.getElementById("massa-carga");
let d1Input = document.getElementById("distancia-cpeso");
let d1Out = document.getElementById("distancia-cpeso-out");
let contraPesoBox = document.getElementById("contrapeso");
let massaBCIn = document.getElementById("massa-bc-in");
let massaBCOut = document.getElementById("massa-bc-out");
let massaBDIn = document.getElementById("massa-bd-in");
let massaBDOut = document.getElementById("massa-bd-out"); 
let mCpeso = document.getElementById("contrapeso-in");
let mCpesoOut = document.getElementById("massa-contrapeso");
let distanciaCarga = document.getElementById("distancia-carga");
let distanciaCargaOut = document.getElementById("distancia-carga-out");
let cargaBox = document.getElementById("guincho");
let dLanca = document.getElementById("distancia-lanca");
let dLancaOut = document.getElementById("distancia-lanca-out");
let dClanca = document.getElementById("distancia-clanca");
let dClancaOut = document.getElementById("distancia-clanca-out");
let buttonMode = document.getElementById("mode-btn");
let sliders = document.getElementsByClassName("form-range");
let torqueOut = document.getElementById("torque-output");

//Atribuição de valores iniciais
cargaOut.textContent = cargaIn.value + " kg";
massaBCOut.textContent = massaBCIn.value + " kg";
massaBDOut.textContent = massaBDIn.value + " kg";
mCpesoOut.textContent = mCpeso.value + " kg";
distanciaCargaOut.textContent = distanciaCarga.value + "m";
dClancaOut.textContent = dClanca.value + "m";
dLancaOut.textContent = dLanca.value + "m";
d1Out.textContent = calculaDistanciaCpeso(cargaOut.value).toFixed(2) + " m";
d1Input.value = calculaDistanciaCpeso(cargaOut.value);

//verifica qual modo está
function freeMode() {
  if(buttonMode.textContent == "Modo Livre")
    return true;
  else
    return false;
}

//calcula momento resultante
function momentoResultante() {
  if(!freeMode())
    return g*(-(massaBDIn.value)*(dLanca.value) - (cargaIn.value)*(calculaDistanciaCarga()) + (massaBCIn.value)*(dClanca.value) + (mCpeso.value)*(d1Input.value));
  else
    return g*(-(massaBDIn.value)*(dLanca.value) - (cargaIn.value)*(distanciaCarga.value) + (massaBCIn.value)*(dClanca.value) + (mCpeso.value)*(d1Input.value));
}

//Muda opacidade de texto
function opacityOutput(value) {
  distanciaCargaOut.style.opacity = String(value);
  d1Out.style.opacity = String(value);
}

//Calcula posição dos blocos
function calculaPosicao(distancia, minPer, maxPer, minValue, maxValue, ) {
  return (minPer + (Number(distancia - minValue))/(maxValue - minValue)*(maxPer - minPer));
}

//Calcula a distância do contra-peso
function calculaDistanciaCpeso() {
  return ((massaBDIn.value)*(dLanca.value) + (cargaIn.value)*(distanciaCarga.value) - (massaBCIn.value)*(dClanca.value))/mCpeso.value;
}

//Calcula a distância da carga
function calculaDistanciaCarga() {
  return ((mCpeso.value)*(d1Input.value) - (massaBDIn.value)*(dLanca.value) + parseFloat(massaBCIn.value)*(dClanca.value))/(cargaIn.value);
}

/*Varia distância da carga e calcula distância do contra-peso*/
distanciaCarga.addEventListener("input", () => {  
  distanciaCargaOut.textContent = distanciaCarga.value + "m"
  distanciaCargaOut.style.color = "black";
  cargaBox.style.left = calculaPosicao(distanciaCarga.value,40,70,1,25) + "%";
  if(!freeMode()) {
    opacityOutput(1);
    d1Input.value = calculaDistanciaCpeso();
    d1Out.textContent = calculaDistanciaCpeso() + "m";
    contraPesoBox.style.left = calculaPosicao(d1Input.value, 40.5, 17, 1, 25) + "%";  
    if(calculaDistanciaCpeso() < 0 || calculaDistanciaCpeso() > 25) 
      d1Out.style.color = "red";
    else 
      d1Out.style.color = "black";}
})

/* Varia distância do contra-peso e calcula distância da carga */
d1Input.addEventListener("input", () => {
  d1Out.style.color = "black";
  d1Out.textContent = d1Input.value + " m";
  contraPesoBox.style.left = calculaPosicao(d1Input.value, 40.5, 17, 1, 25) + "%";
  if(!freeMode()) {
    opacityOutput(1);
    distanciaCarga.value = calculaDistanciaCarga();
    distanciaCargaOut.textContent = calculaDistanciaCarga() + "m";
    cargaBox.style.left = calculaPosicao(distanciaCarga.value,40,70,1,25) + "%";
    if(calculaDistanciaCarga() < 0) 
      distanciaCargaOut.style.color = "red";
    else 
    distanciaCargaOut.style.color = "black";}
})

//Carga input
cargaIn.addEventListener("input", () => {
  cargaOut.textContent = cargaIn.value + "kg";
  if(!freeMode())
    opacityOutput(0.2);
})

//Massa contra-lança input
massaBCIn.addEventListener("input", () => {
  massaBCOut.textContent = massaBCIn.value + " kg";
  if(!freeMode())  
    opacityOutput(0.2)
})

//Massa lança input
massaBDIn.addEventListener("input", () => {
  massaBDOut.textContent = massaBDIn.value + " kg";
  if(!freeMode())
    opacityOutput(0.2);
})

//Massa contra peso input
mCpeso.addEventListener("input", () => {
  mCpesoOut.textContent = mCpeso.value + " kg";
  if(!freeMode())
    opacityOutput(0.2);
})

//Massa contra-lança input
dClanca.addEventListener("input", () => {
  dClancaOut.textContent = dClanca.value + "m";
  if(!freeMode())
    opacityOutput(0.2)
})

//Massa lança input
dLanca.addEventListener("input", () => {
  dLancaOut.textContent = dLanca.value + "m";
  if(!freeMode())
    opacityOutput(0.2);
})

//Muda de modo
buttonMode.addEventListener("click", () => {
  if(!freeMode()) {
    buttonMode.textContent = "Modo Livre";
    opacityOutput(1)
  } 
  else
    buttonMode.textContent = "Equilíbrio";
})

for(i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("input",() =>{torqueOut.textContent = "Momento Resultante: " + Math.round(momentoResultante()) + "N.m"});
  }