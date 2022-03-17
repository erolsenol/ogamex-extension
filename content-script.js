let differentValue = 0;

function mathStabileRound(number) {
  const roundedNumber = Math.round(number + 1);
  if (roundedNumber - 1 > number) return Math.round(number);
  else return roundedNumber;
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isArrayEqual(val1, val2) {
  let isEqual = true;
  if (val2 && val1.length === val2.length) {
    for (i = 0; i < val1.length; i++) {
      if (val1[i] !== val2[i]) isEqual = false;
    }
  } else isEqual = false;
  return isEqual;
}

function storageSet(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
function storageGet(key) {
  return JSON.parse(sessionStorage.getItem(key));
}
function StorageGetInitialize(name, value) {
  let item = storageGet(name);
  if (!item) item = value;
  return item;
}

function setDiffValue(inputSelectValue) {
  if (inputSelectValue === 1) {
    differentValue = 10;
  } else if (inputSelectValue == 2) {
    differentValue = 140;
  } else if (inputSelectValue == 3) {
    differentValue = 6;
  } else if (inputSelectValue == 4) {
    differentValue = 8;
  } else if (inputSelectValue == 10) {
    differentValue = 30;
  } else if (inputSelectValue == 11) {
    differentValue = 10;
  } else if (inputSelectValue == 12) {
    differentValue = 8;
  }
}

const countryComboBox = document.querySelector(
  'select[class="market-switch custom-select"]',
).children;
for (let i = 0; i < countryComboBox.length; i++) {
  if (countryComboBox[i].hasAttribute('selected')) {
    setDiffValue(countryComboBox[i].getAttribute('value'));
  }
}

const tableTr = document.querySelectorAll('table[class="border-0"]');

let salesPrice = [];
let costPrice = [];
let profit = [];
let asinCodes = [];

for (let i = 1; i < tableTr.length; i += 2) {
  let currentSales, currentPrice;

  const salesPriceString =
    tableTr[i].children[0].children[3].children[0].innerText;
  const constPriceString =
    tableTr[i - 1].children[0].children[0].children[0].innerText;

  if (salesPriceString) {
    currentSales = parseFloat(salesPriceString.replace(/ /g, ''));
    salesPrice.push(currentSales);
  }
  if (constPriceString) {
    currentPrice = parseFloat(constPriceString.replace(/ /g, ''));
    costPrice.push(currentPrice);
  }

  const profitResponse = CalcProfit(currentSales, currentPrice);

  if (profitResponse) {
    asinCodes.push(
      tableTr[i - 1].parentElement.parentElement.children[2]
        .children[0].children[0].innerText,
    );

    tableTr[
      i - 1
    ].parentElement.parentElement.children[0].children[0].checked = true;
  }
}

storageSet('foundAsinCodes', asinCodes);

function CalcProfit(sales, cost) {
  const profit = sales - (cost + differentValue);
  if (profit <= 0) {
    return true;
  }
  return false;
}
