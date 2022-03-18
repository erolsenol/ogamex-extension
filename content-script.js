console.log('content run');
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

function storageSet(fieldName, value) {
  localStorage.setItem(fieldName, JSON.stringify(value));
}
function storageGet(fieldName) {
  return JSON.parse(localStorage.getItem(fieldName));
}
function StorageGetInitialize(name, value) {
  let item = storageGet(name);
  if (!item) item = value;
  return item;
}

setTimeout(() => {
  const mainTable = document.getElementById('head-row');
  const tableTR = mainTable.parentElement.children;

  for (let i = 1; i < tableTR.length; i++) {
    if (
      tableTR[i].children[10].children[0].children[9].children
        .length > 0
    ) {
      tableTR[
        i
      ].children[10].children[0].children[9].children[0].children[0].children[0].click();
    }
  }
}, 13000);

setTimeout(() => {
  const mainTable = document.getElementById('head-row');
  const tableTR = mainTable.parentElement.children;

  for (let i = 1; i < tableTR.length; i++) {
    if (
      tableTR[i].children[10].children[0].children[9].children
        .length > 0
    ) {
      let itemSellPrice = parseFloat(
        tableTR[i].children[10].children[0].children[0].children[0]
          .children[0].children[1].value,
      );

      tableTR[
        i
      ].children[10].children[0].children[0].children[0].children[0].children[1].value =
        (itemSellPrice - 0.01).toFixed(2);
    }
  }
}, 16000);
