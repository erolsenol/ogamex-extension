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

const myHeading = document.getElementById('myi-heading');
if (myHeading) {
  let myButton = document.createElement('button');
  myButton.innerText = 'Bana Bas';
  myButton.setAttribute(
    'style',
    `
  position: relative; 
  left: 50px;
  color:red;
  `,
  );
  myButton.addEventListener('click', buttonClick);
  myHeading.append(myButton);
}

function buttonClick() {
  const nowTime = Date.now();
  console.log('nowTime', nowTime);
  localStorage.setItem('lastTime', nowTime);
  localStorage.setItem('start', true);
  Action();
}

function Action() {
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
  }, 2500);

  setTimeout(() => {
    const saveAllButton = document.getElementById(
      'a-autoid-4-announce',
    );
    if (saveAllButton) {
      saveAllButton.click();
    }
  }, 5000);

  setTimeout(() => {
    const disableNext = document.querySelector(
      'li[class="a-disabled a-last"]',
    );
    if (disableNext) {
      const paginationEl = document.querySelector('.a-pagination');
      if (paginationEl) {
        paginationEl.children[1].children[0].click();
        localStorage.setItem('start', false);
        window.location.reload();
      }
    } else {
      const lastButton = document.querySelector('li[class="a-last"]');
      console.log('lastButton', lastButton);
      if (lastButton) {
        lastButton.children[0].click();
      }
    }
  }, 10000);
}

setInterval(() => {
  const isStart = localStorage.getItem('start');
  if (isStart == 'true') {
    console.log('is started');
    Action();
  } else {
    console.log('is Stopped');
  }
}, 60000);

setInterval(() => {
  const lastStartTimer = localStorage.getItem('lastTime');
  const nowTime = Date.now();
  console.log('lastStartTimer', lastStartTimer);

  if (lastStartTimer + 15000000 < nowTime) {
    buttonClick();
  }
}, 30000);
