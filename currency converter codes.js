const apiKey = "Api key";
const droplist = document.querySelectorAll('.select  select');
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getButton =  document.querySelector(".container button");
for(let i = 0; i < droplist.length; i++){
    for(currency_code in country_code){
        let selected;
        if(i ==0){
            selected = currency_code == "USD" ? "selected" : "";
        }
        else if(i == 1){
            selected = currency_code == "RWF" ? "selected" : "";
        }
        //creating option tag with passing currency code as a text and value 
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        //inserting option tag inside select tag  
        droplist[i].insertAdjacentHTML("beforeend", optionTag);
    }
    droplist[i].addEventListener("change", e =>{
        loadFlag(e.target); //calling loadFlag with passing target element as an argument
    });
}
function loadFlag(element){
    for(code in country_code){
        if(code == element.value){//if currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img");//selecting img tag of particular drop list
            //passing country code of a selected in a img url
            imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`
        }
    }
}

window.addEventListener("load", () =>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault();//preventing form from submitting
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".select .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;//temporary currency code of FROM drop list
    fromCurrency.value = toCurrency.value;//passing to currency code to FROM currency code
    toCurrency.value = tempCode;//passing temporary currency code to TO currency code
    loadFlag(fromCurrency);//calling loadFlag with passing select element (fromCurrency) of FROM
    loadFlag(toCurrency);//calling loadFlag with paassing select element (toCurrency) of TO
    getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".input input");
    const exchangeRateTxt = document.querySelector(".result p");
    let amountVal = amount.value;
    //if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting Exchange Rate . . . .";
    let url = `your exchange website host uniform resiurce locator`;
    //fetching api response and returning it into js object and in another then method receiving that object
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
    .catch(() =>{//if user is offline or any other error occured while fetching data then catch function will run
        exchangeRateTxt.innerText= "You are offline or something went wrong";
    });
}
