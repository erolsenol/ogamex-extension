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
const titleCase = (str) =>
  `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

setTimeout(() => {
  const menuBtn = document.querySelector('.table-quick-menu');

  let autoSit = null;
  if (menuBtn) {
    const strageAutoSitValue = StorageGetInitialize('autoSit', false);
    autoSit = document.createElement('input');
    autoSit.id = 'auto-sit';
    autoSit.type = 'checkbox';
    autoSit.value = strageAutoSitValue === true;
    autoSit.setAttribute(
      'style',
      `width: 50px;
    height: 50px;
    position:absolute;
    right:110px;
    bottom: 50px;
    `,
    );
    menuBtn.appendChild(autoSit);
  }
}, 5000);

setInterval(() => {
  const favouriteGame = document.querySelector(
    '.favourite-game-name',
  );
  if (favouriteGame) {
    favouriteGame.click();
    return;
  }

  const authBtn = document.querySelector('.auth-button');
  if (authBtn) {
    authBtn.click();
  }
  const autoSitCb = document.getElementById('auto-sit');
  if (autoSitCb) {
  }

  const selectPotWindow = document.querySelector(
    '.select-pot-window',
  );
  if (selectPotWindow) {
    const autoTops = document.querySelectorAll('.auto-top');
    if (autoTops.length > 1) {
      autoTops[0].click();
      // setTimeout(() => {
      //   autoTops[1].click();
      // }, 250);

      setTimeout(() => {
        const sitButton = document.querySelector('.sit-button');
        if (sitButton) {
          sitButton.click();
        }
      }, 500);
    }
  }

  const sitbutton = document.querySelector('.seat-sit-button');
  const seatMe = document.querySelector('.seat-me');
  if (sitbutton && !seatMe) {
    sitbutton.click();
    return;
  }

  if (seatMe) {
    const meAction = seatMe.querySelector('.action-tooltip-text');
    if (
      meAction &&
      meAction.innerText &&
      meAction.innerText.trim() === 'Pas'
    ) {
      return;
    }
  }

  const tableCardsContainer = document.querySelector('.table-cards');
  const action = document.querySelectorAll('.action-button');
  const seatMeContainer = document.querySelector('.seat-me');
  const callBtn = document.querySelector('.check-button');
  const foldBtn = document.querySelector('.fold-button');
  const raiseBtn = document.querySelector('.raise-button');

  let myChip,
    myChipMultiplier,
    tableCardsEl,
    myCardsEl,
    fold,
    call,
    raise = null;

  if (seatMeContainer && tableCardsContainer) {
    const myChipStr = seatMeContainer.querySelector(
      '.player-details-user-stack',
    );

    if (myChipStr.innerText) {
      myChip = myChipStr.innerText.match(/\d+/)[0];
      myChipMultiplier = myChipStr.innerText.substr(
        myChipStr.innerText.length - 1,
        1,
      );
      // console.log('myChip', myChip);
      // console.log('myChipMultiplier', myChipMultiplier);
    }

    myCardsEl = seatMeContainer.querySelectorAll('.card-front');

    let myCardsArr = [],
      tableCardsArr = [];

    if (myCardsEl.length > 0) {
      myCardsEl.forEach((el) => {
        const myCardClassArr = el.getAttribute('class').split(' ');
        const trueClass = myCardClassArr.filter(
          (classText) => classText.length < 3,
        );
        if (trueClass.length > 0)
          myCardsArr.push(
            titleCase(trueClass[0].split('').reverse().join('')),
          );
      });
    }
    tableCardsEl =
      tableCardsContainer.querySelectorAll('.card-front');
    if (tableCardsEl.length > 0) {
      tableCardsEl.forEach((el) => {
        const tableCardClassArr = el.getAttribute('class').split(' ');
        const trueClass = tableCardClassArr.filter(
          (classText) => classText.length < 3,
        );

        if (trueClass.length > 0)
          tableCardsArr.push(
            titleCase(trueClass[0].split('').reverse().join('')),
          );
      });
      // console.log('last tableCardsArr', tableCardsArr);
    }

    if (tableCardsArr.length > 2 && myCardsArr.length > 1) {
      console.log('The End Game');
      const myBeforeSolveCards = [...tableCardsArr, ...myCardsArr];

      console.log('myBeforeSolveCards', myBeforeSolveCards);

      const gameSolve = window.Hand.solve(myBeforeSolveCards);
      console.log('gameSolve', gameSolve);

      if (gameSolve) {
        const gameEndSolveName = gameSolve.name;
        console.log('gameEndSolveName', gameEndSolveName);
      }
    } else if (tableCardsArr.length > 0 && myCardsArr.length > 1) {
      console.log('The Contiune Game');
      const myBeforeSolveCards = [...tableCardsArr, ...myCardsArr];

      console.log('myBeforeSolveCards', myBeforeSolveCards);

      const gameSolve = window.Hand.solve(myBeforeSolveCards);
      console.log('gameSolve', gameSolve);

      if (gameSolve) {
        const gameEndSolveName = gameSolve.name;
        console.log('gameEndSolveName', gameEndSolveName);
      }
    }

    const checkFoldAutoBtn = document.querySelector(
      '.auto-action-buttons',
    );
    if (checkFoldAutoBtn && checkFoldAutoBtn.children.length > 0) {
      // checkFoldAutoBtn.children[1].click();
    }
  }

  // console.log('action', action);
}, 3000);

const solver = window;

function getCardsString(cards = []) {
  let cardStr = [];

  if (cards && cards.length > 0) {
    for (let index = 0; index < cards.length; index++) {
      const element = cards[index].getAttribute('class');
      console.log(element);
    }
  }
}

function getchip(nStr) {
  let chipNumber = null;
  if (!nStr) return null;
  console.log('nStr', nStr);
  const containDot = nStr.contains('.');
  console.log('containDot', containDot);
  if (containDot) {
    chipNumber = nStr.split('.');
    console.log('chipArr', chipArr);
  }

  return chipNumber;
}
