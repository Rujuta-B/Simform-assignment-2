"use strict";
let lightTheme = "/style.css";
let darkTheme = "/dark.css";
const display = document.querySelector(".display-screen");
const s_display = document.getElementById("sub_display");
const buttons = document.querySelectorAll("button");
const btnMC = document.querySelector("#mc");
const btnMR = document.querySelector("#mr");
const bfr = document.querySelectorAll(".bfr");
const afr = document.querySelectorAll(".afr");
const btn2nd = document.querySelector("#btn2nd");
const btnDeg = document.querySelector(".deg");
const btnRad = document.querySelector(".rad");
getComputedStyle(document.documentElement) // Get css variables 
    .getPropertyValue('--color-blue','--color-grey-deactive','--color-white-button','--color-black');


const Review = () => {
        display.value = s_display.value;
}


//Functions

//Factorial
function func_fact(){ 
    let fact=1,i;
    for(i = 1;i<=display.value;i++){
        fact = fact * i;
    }
    if(display.value <= 0) 
        throw new Error("Invalid input!");
    return fact; 
}

//x-power-y
function func_xraisey() { 
    let dvalue,a,b;
    dvalue = display.value;
    a = dvalue.slice(0,dvalue.indexOf("^")); //Return 1st value 
    b = dvalue.slice(dvalue.indexOf("^") + 1); //RTeturn 2nd value
    return Math.pow(a,b);
}

let arr_ms = [] , i = 0;
function func_ms() { // Memory store
        if(arr_ms.length === 0)
            alert("Nothing is stored in the memory");
        else {
            display.value = arr_ms[i]; 
            i++;
            if(i === arr_ms.length){
                i = 0;
            }
        }
}
// M+
function func_mplus() { 
    arr_ms.push(+display.value);
    s_display.value = `M+(${display.value})`;
    display.value = '';
    btnMR.style.color = "var(--color-black)";
    btnMC.style.color = "var(--color-black)";
}
 //M-
function func_mminus(){ 
    arr_ms.push(-display.value);
    s_display.value = `M-(${display.value})`;
    display.value = '';
    btnMR.style.color = "var(--color-black)";
    btnMC.style.color = "var(--color-black)";
}
// MR
function func_mr(){ 
    let result = arr_ms.reduce(function (acc, cur) {
        return acc + cur;
      }, 0);
      s_display.value = `Mr(${display.value})`;
      display.value = result;
}
// MC
function func_mc() { 
    arr_ms = [];
    s_display.value = `MC`;
    display.value = '';
    btnMR.style.color = "var(--color-grey-deactive)";
    btnMC.style.color = "var(--color-grey-deactive)";
}
// yrootx
function func_yrootx() { 
    let dvalue,a,b;
    dvalue = display.value;
    a = dvalue.slice(0,dvalue.indexOf("y")); 
    b = dvalue.slice(dvalue.indexOf("t") + 1);
    return Math.pow(a,1/b);
}
// log
function func_logbase() {
    let dvalue,a,b;
    dvalue = display.value;
    a = dvalue.slice(0,dvalue.indexOf("l")); 
    b = dvalue.slice(dvalue.indexOf("e") + 1);
    return Math.log(a)/Math.log(b);
}

//degree to radian
function degtorad() {
    if ($(".degrees").text() == "DEG") {
    s_display.value = `Deg (${display.value})`;
      display.value = display.value * (180 / Math.PI);
      
      $(".degrees").text("RAD");
    } else {
        s_display.value = `Rad (${display.value})`;
      display.value = display.value * (Math.PI / 180);
      $(".degrees").text("DEG");
    }
  }


// 2nd calc operations
function second_calc(){ 
    bfr.forEach((el) => el.classList.toggle('active'));
    afr.forEach((el) => el.classList.toggle('active'));
    afr.forEach((el) => {
        if(el.classList.contains("active"))
            btn2nd.style.backgroundColor = "var(--color-blue)";
        else
            btn2nd.style.backgroundColor = "var(--color-white-button)";
    })
}

function eventList(e){ 
    let btnText = e.target.dataset.sign; 
    switch(btnText){
            case 'C':
                s_display.value = "";
                display.value = '';
                break;
            case '=':
                try{
                    if(display.value.includes("^")){
                        s_display.value = `${display.value}=`;
                        display.value = func_xraisey();
                    }
                    else if(display.value.includes("yroot")){
                        s_display.value = `(${display.value})`;
                        display.value = func_yrootx();
                    }
                    else if(display.value.includes("log base")){
                        display.value = func_logbase();
                    }
                    else{
                        display.value = eval(display.value);
                    }
                } catch {
                    display.value = "Error"
                }
                break;
            case 'dlt':
                if (display.value){
                    s_display.value = "";
                   display.value = display.value.slice(0, -1);
                }
                break;
            case 'sin':
                if(btnDeg.classList.contains("active"))
               { s_display.value = `sin(${display.value})`;   
                display.value = mnjs.sin.deg(+display.value); }
                else 
                    display.value = Math.sin(display.value);
                break;
            case 'cos':
                if(btnDeg.classList.contains("active")){
                    s_display.value = `cos(${display.value})`;
                    display.value = mnjs.cos.deg(+display.value); }
                else 
                    display.value = Math.cos(display.value);
                break;
            case 'tan':
                if(btnDeg.classList.contains("active")){
                    s_display.value = `tan(${display.value})`;
                    display.value = mnjs.tan.deg(+display.value); }
                else 
                    display.value = Math.tan(display.value);
                break;
            case 'sinh':
                if(btnDeg.classList.contains("active")){
                    s_display.value = `asin(${display.value})`;
                    display.value = mnjs.sinh.deg(+display.value);}
                else 
                    display.value = Math.sinh(display.value);
                break;
            case 'cosh':
                if(btnDeg.classList.contains("active")){
                    s_display.value = `acosh(${display.value})`;
                    display.value = mnjs.cosh.deg(+display.value);}
                else 
                    display.value = Math.cosh(display.value);
                break;
            case 'tanh':
                if(btnDeg.classList.contains("active")){
                    s_display.value = `atan(${display.value})`;
                    display.value = mnjs.tanh.deg(+display.value); }
                else 
                    display.value = Math.tanh(display.value);
                break;
            case 'floor':
                s_display.value = `floor(${display.value})`;    
                display.value = Math.floor(display.value);
                break;
            case 'ceil':
                s_display.value = `ceil(${display.value})`;
                display.value = Math.ceil(display.value);
                break;
            case 'round':
                s_display.value = `round(${display.value})`;
                display.value = Math.round(display.value);
                break;
            case 'random':
                s_display.value = `random(${display.value})`;
                display.value = Math.random(display.value);
                break;
            case 'sign':
                s_display.value = `sign(${display.value})`;
                display.value = Math.sign(display.value);
                break;
            case 'trunc':
                s_display.value = `trunc(${display.value})`;
                display.value = Math.trunc(display.value);
                break;
            case 'log':
                s_display.value = `log10(${display.value})`;
                display.value = Math.log10(display.value);
                break;
            case 'ln':
                s_display.value = `ln(${display.value})`;
                display.value = Math.log(display.value); 
                break;
            case 'square':
                s_display.value = `square(${display.value})`;
                display.value = Math.pow(display.value,2);
                break;   
            case '1/x':
                s_display.value = `1/(${display.value})`;
                display.value = Math.pow(display.value,-1);
                break; 
            case '|x|':
                s_display.value = `|(${display.value})|`;
                display.value = Math.abs(display.value);
                break; 
            case 'expression':
                s_display.value = `exp(${display.value})`;
                display.value = Math.exp(display.value);
                break;  
            case 'sqrt':
                s_display.value = `sqrt(${display.value})`;
                display.value = Math.sqrt(display.value);
                break;
            case 'fact':
                try {
                    s_display.value = `factorial(${display.value})`;
                    display.value = func_fact();
                  } catch (err) {
                    display.value = err.message;
                  }
            break; 
            case '10powerx':
                s_display.value = `10power(${display.value})`;
                display.value = Math.pow(10,display.value);
                break;
            case '+/-':
                s_display.value = `+/- of (${display.value})`;
                display.value = display.value*(-1);
                break;
            case 'mc':
                func_mc();
                break;
            case 'mr':
                func_mr(); 
                break;
            case 'mplus':
                func_mplus();
                break;
            case 'mminus':
                func_mminus();
                break;
            case 'ms':
                func_ms();
                break;  
            case '2nd':
                second_calc();
                break;
            case 'cube':
                s_display.value = `cube of (${display.value})`;
                display.value = Math.pow(display.value,3);
                break;
            case '2raisex':
                s_display.value = `2 power (${display.value})`;
                display.value = Math.pow(2,display.value);
                break;      
            case 'cbrt':
                s_display.value = `cube root of(${display.value})`;
                display.value = Math.cbrt(display.value);
                break;
            case 'epowerx':
                s_display.value = `e power (${display.value})`;
                display.value = Math.pow(Math.E,display.value);
                break;
            case 'deg':
                btnDeg.classList.remove("active");
                btnRad.classList.add("active");
                break;
            case 'rad':
                btnRad.classList.remove("active");
                btnDeg.classList.add("active");
                break;
            case 'f-e':
                let num = (+display.value);
                s_display.value = `F-E (${display.value})`;
                display.value = num.toExponential();
                break;
            default:
                display.value += btnText;
        }   
}


// const deg_rad = () => {
//     let val = document.getElementById("deg");
//     let convert = parseInt(display.value);
//     if (display.value !== "0" && display.value !== "") {
//       if (val.innerText == "DEG") {
//         s_display.value = `Deg (${display.value})`;
//         val.innerText = "RAD";
//         display.value = convert * (180 / Math.PI);
//       } else {
//         val.innerText = "DEG";
//         s_display.value = `Rad (${display.value})`;
//         display.value = convert * (Math.PI / 180);
//       }
//     }
//   }
  
//Event Listener
for(const btn of buttons){
    btn.addEventListener('click',eventList)
}

//change themes


function changeTheme() {
    let darkMode = document.getElementById("dark-mode");
    let theme = document.getElementById("theme");
    if (theme.getAttribute("href") == lightTheme) {
      theme.href = darkTheme;
      darkMode.innerHTML = " 🌞";
    } else {
      theme.href = lightTheme;
      darkMode.innerHTML = "🌠";
    }
  }