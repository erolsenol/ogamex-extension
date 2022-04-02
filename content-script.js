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
function MenuClick(index) {
  const left_menu = getIdItem('left-menu-1');
  if (left_menu) left_menu.children[index].children[0].click();
  else return false;
  return true;
}

const gameEnum = {
  DISCOVERY: 'DISCOVERY',
  BUILDINGS: 'BUILDINGS',
  GALAXYSPY: 'GALAXYSPY',
  MESSAGE: 'MESSAGE',
  ATTACK: 'ATTACK',
  RESEARCH: 'RESEARCH',
  UNDERATTACK: 'UNDERATTACK',
  // SLEEP = "SLEEP",
  NONE: 'NONE',
};

class clssGameTimer {
  constructor() {
    this.discovery = 0;
    this.buildings = 0;
    this.galaxySpy = 0;
    this.message = 0;
    this.attack = 0;
    this.reSearch = 0;
    this.underAttack = 0;
    this.shipProduced;
  }
}

let gameStatusBefore = StorageGetInitialize(
  'gameStatusBefore',
  'NONE',
);
let gameStatus = StorageGetInitialize('gameStatus', 'NONE');
let gameTimer = StorageGetInitialize(
  'gameTimer',
  new clssGameTimer(),
);
let totalResource = StorageGetInitialize('totalResource', 0);
let attackCoordinate = StorageGetInitialize(
  'attackCoordinate',
  [0, 0, 0],
);
let attacked = StorageGetInitialize('attacked', false);

const lightCargoCapacity = parseInt(
  StorageGetInitialize('lightCargoCapacity', 0),
);
const heavyCargoCapacity = parseInt(
  StorageGetInitialize('heavyCargoCapacity', 0),
);

// console.log("gameTimer", gameTimer);
// console.log("gameStatus", gameStatus);

class clssGameRoute {
  constructor() {
    this.discovery = false;
    this.buildings = false;
    this.galaxySpy = false;
    this.message = false;
    this.attack = false;
    this.reSearch = false;
    this.underAttack = false;
    this.sleep = false;
  }
}
let gameRoute = StorageGetInitialize(
  'gameRoute',
  new clssGameRoute(),
);
// console.log("gameRoute", gameRoute);

function galaxyRouteInitialize() {
  let galaxySpyStartVal = 0,
    systemSpyStartVal = 0,
    direction = 0;
  // direction = getRndInteger(0, 1);
  direction = 1;
  if (parseInt(direction) < 1) {
    galaxySpyStartVal = 1;
    systemSpyStartVal = getRndInteger(1, 60);
  } else {
    galaxySpyStartVal = 6;
    systemSpyStartVal = getRndInteger(440, 499);
  }

  storageSet('galaxySpy', {
    galaxy: galaxySpyStartVal,
    system: systemSpyStartVal,
    direction,
    start: true,
  });
}
if (!storageGet('galaxySpy')) galaxyRouteInitialize();

function pageRefresh() {
  const left_menu = getIdItem('left-menu-1');
  if (left_menu) left_menu.children[0].children[0].click();
}

let labelGalaxySpyValue = document.createElement('label');
labelGalaxySpyValue.innerText = 'Galaxy spy start value';
labelGalaxySpyValue.setAttribute(
  'style',
  `
position: relative; 
top: 3px;
`,
);

let inputSpyGalaxyValue = document.createElement('input');
inputSpyGalaxyValue.placeholder = 'Spy Targeted Galaxy';
inputSpyGalaxyValue.setAttribute(
  'style',
  `
position: relative; 
top: 6px;
`,
);

let inputSpySystemValue = document.createElement('input');
inputSpySystemValue.placeholder = 'Spy Targeted System';
inputSpySystemValue.setAttribute(
  'style',
  `
position: relative; 
top: 9px;
`,
);

let btngalaxyLeft = document.createElement('button');
btngalaxyLeft.innerText = 'Galaxy Left';
btngalaxyLeft.setAttribute(
  'style',
  `
position: relative; 
top: 12px;
`,
);
btngalaxyLeft.addEventListener('click', () => {
  galaxyStart(
    JSON.stringify({
      galaxy: 'left',
      direction: true,
      stop: getRndInteger(10, 30),
    }),
  );
});

let btngalaxyRight = document.createElement('button');
btngalaxyRight.innerText = 'Galaxy Start';
btngalaxyRight.setAttribute(
  'style',
  `
position: relative; 
top: 15px;
`,
);
btngalaxyRight.addEventListener('click', () => {
  const galaxySpy = storageGet('galaxySpy');
  if (galaxySpy === null) galaxyRouteInitialize();
  console.log('gameStatus GALAYSPY Set');
  gameStatus = 'GALAXYSPY';
  storageSet('gameStatus', gameStatus);
  galaxyStart(storageGet('galaxySpy'));
});

let btngalaxyStop = document.createElement('button');
btngalaxyStop.innerText = 'Game Stop';
btngalaxyStop.setAttribute(
  'style',
  `
position: relative; 
top: 18px;
`,
);
btngalaxyStop.addEventListener('click', () => {
  const direction = storageGet('galaxySpy');
  if (direction) {
    direction.start = false;
    gameStatus = 'NONE';
    storageSet('galaxySpy', direction);
    storageSet('gameStatus', gameStatus);
    storageSet('attacked', false);
    storageSet('attackCoordinate', [0, 0, 0]);
    storageSet('enemyFleetPoint', 0);
    storageSet('enemyDefencePoint', 0);

    const left_menu = getIdItem('left-menu-1');
    if (left_menu) left_menu.children[0].children[0].click();
  }
});

let btnMessageClear = document.createElement('button');
btnMessageClear.innerText = 'Message Clear';
btnMessageClear.setAttribute(
  'style',
  `
position: relative; 
top: 18px;
`,
);
btnMessageClear.addEventListener('click', () => {
  gameStatus = 'MESSAGE';
  storageSet('gameStatus', gameStatus);
  storageSet('attacked', false);
  storageSet('attackCoordinate', [0, 0, 0]);
  const header = getIdItem('header');
  if (header) header.children[2].children[0].click();
  else MenuClick(0);
  // messageClear();
});

let btnDiscoveryStart = document.createElement('button');
btnDiscoveryStart.innerText = 'Discovery Start';
btnDiscoveryStart.setAttribute(
  'style',
  `
position: relative; 
top: 18px;
`,
);
btnDiscoveryStart.addEventListener('click', () => {
  gameStatus = 'DISCOVERY';
  gameRoute.discovery = true;
  storageSet('gameStatus', gameStatus);
  storageSet('gameRoute', gameRoute);
  MenuClick(7);
});

let intervalSpyReportAttack;
// let btnspyReportsAttack = document.createElement("button");
// btnspyReportsAttack.innerText = "Spy Reports Clear";
// btnspyReportsAttack.setAttribute(
//   "style",
//   `
// width: 100px;
// position: relative;
// top: 21px;
// `
// );
// btnspyReportsAttack.removeEventListener("click", spyReportsClear);
// btnspyReportsAttack.addEventListener("click", () => {
//   intervalSpyReportAttack = setInterval(
//     spyReportsClear,
//     getRndInteger(1000, 2000)
//   );
// });

// let btnenemyLootAttack = document.createElement("button");
// btnenemyLootAttack.innerText = "Enemy Loot Attack";
// btnenemyLootAttack.setAttribute(
//   "style",
//   `
// width: 100px;
// position: relative;
// top: 24px;
// `
// );
// btnenemyLootAttack.addEventListener("click", enemyLootAttack);

let labelSpyReportDefence = document.createElement('label');
labelSpyReportDefence.innerText = 'Savunma var ise sil';
labelSpyReportDefence.setAttribute(
  'style',
  `
display: block;
position: relative; 
top: 30px;
`,
);

let cbSpyReportDefence = document.createElement('input');
cbSpyReportDefence.setAttribute('id', 'cbSpyReportDefence');
cbSpyReportDefence.setAttribute('type', 'checkbox');
cbSpyReportDefence.checked =
  storageGet('cbSpyReportDefence') === 'true';
cbSpyReportDefence.setAttribute(
  'style',
  `
position: relative; 
top: 14px;
right: 27px;
`,
);
cbSpyReportDefence.addEventListener('click', () => {
  console.log(
    cbSpyReportDefence.checked,
    'cbSpyReportDefence.checked',
  );
  storageSet('cbSpyReportDefence', cbSpyReportDefence.checked);
  console.log(
    'Storage : cbSpyReportDefence',
    storageGet('cbSpyReportDefence'),
  );
});

let labelSpyReportFleet = document.createElement('label');
labelSpyReportFleet.innerText = 'Filo var ise sil';
labelSpyReportFleet.setAttribute(
  'style',
  `
display: block;
position: relative; 
top: 18px;
`,
);

let cbSpyReportFleet = document.createElement('input');
cbSpyReportFleet.setAttribute('id', 'cbSpyReportFleet');
cbSpyReportFleet.setAttribute('type', 'checkbox');
cbSpyReportFleet.checked = storageGet('cbSpyReportFleet') === 'true';
cbSpyReportFleet.setAttribute(
  'style',
  `
position: relative; 
top: 2px;
right: 27px;
`,
);
cbSpyReportFleet.addEventListener('click', () => {
  console.log(cbSpyReportFleet.checked, 'cbSpyReportFleet.checked');
  storageSet('cbSpyReportFleet', cbSpyReportFleet.checked);
  console.log(
    'Storage : cbSpyReportFleet',
    storageGet('cbSpyReportFleet'),
  );
});

let labelBuildings = document.createElement('label');
labelBuildings.innerText = 'Kaynakları Yükselt';
labelBuildings.setAttribute(
  'style',
  `
display: block;
position: relative; 
top: 18px;
`,
);

let cbBuildings = document.createElement('input');
cbBuildings.setAttribute('id', 'cbBuildings');
cbBuildings.setAttribute('type', 'checkbox');
cbBuildings.checked = gameRoute.buildings;
cbBuildings.setAttribute(
  'style',
  `
position: relative; 
top: 2px;
right: 27px;
`,
);
cbBuildings.addEventListener('click', () => {
  storageSet('cbBuildings', cbBuildings.checked);
  gameRoute.buildings = cbBuildings.checked;
  storageSet('gameRoute', gameRoute);
});
cbBuildings.checked = gameRoute.buildings;

let labelGalaxySpy = document.createElement('label');
labelGalaxySpy.innerText = 'Galaxy Spy';
labelGalaxySpy.setAttribute(
  'style',
  `
display: block;
position: relative; 
top: 18px;
`,
);

let cbGalaxySpy = document.createElement('input');
cbGalaxySpy.setAttribute('id', 'cbGalaxySpy');
cbGalaxySpy.setAttribute('type', 'checkbox');
cbGalaxySpy.checked = gameRoute.galaxySpy;
cbGalaxySpy.setAttribute(
  'style',
  `
position: relative; 
top: 2px;
right: 27px;
`,
);
cbGalaxySpy.addEventListener('click', () => {
  storageSet('cbGalaxySpy', cbGalaxySpy.checked);
  gameRoute.galaxySpy = cbGalaxySpy.checked;
  storageSet('gameRoute', gameRoute);
  pageRefresh();
});
cbGalaxySpy.checked = gameRoute.galaxySpy;

let labelDiscovery = document.createElement('label');
labelDiscovery.innerText = 'Keşif Yap';
labelDiscovery.setAttribute(
  'style',
  `
display: block;
position: relative; 
top: 18px;
`,
);

let cbDiscovery = document.createElement('input');
cbDiscovery.setAttribute('id', 'cbDiscovery');
cbDiscovery.setAttribute('type', 'checkbox');
cbDiscovery.checked = gameRoute.discovery;
cbDiscovery.setAttribute(
  'style',
  `
position: relative; 
top: 2px;
right: 27px;
`,
);
cbDiscovery.addEventListener('click', () => {
  storageSet('cbDiscovery', cbDiscovery.checked);
  gameRoute.discovery = cbDiscovery.checked;

  gameStatus = 'DISCOVERY';
  storageSet('gameStatus', gameStatus);
  storageSet('gameRoute', gameRoute);
  MenuClick(7);
});

let btnTest = document.createElement('button');
btnTest.innerText = 'Test';
btnTest.setAttribute(
  'style',
  `
  width: 80px;
position: relative; 
right: 20px;
top: 23px;
`,
);
btnTest.addEventListener('click', () => {
  liftShips();
});

// let myDiv = document.createElement("div");
// myDiv.setAttribute('id', 'myDiv');

//document.getElementById("pageContent").append(myDiv);
document.getElementById('left-menu-1').append(labelGalaxySpyValue);
document.getElementById('left-menu-1').append(inputSpyGalaxyValue);
document.getElementById('left-menu-1').append(inputSpySystemValue);
// document.getElementById("left-menu-1").append(btngalaxyLeft);
document.getElementById('left-menu-1').append(btngalaxyRight);
document.getElementById('left-menu-1').append(btnMessageClear);
document.getElementById('left-menu-1').append(btnDiscoveryStart);
document.getElementById('left-menu-1').append(btngalaxyStop);
// document.getElementById("left-menu-1").append(btnspyReportsAttack);
// document.getElementById("left-menu-1").append(btnenemyLootAttack);
document.getElementById('left-menu-1').append(labelSpyReportDefence);
document.getElementById('left-menu-1').append(cbSpyReportDefence);

document.getElementById('left-menu-1').append(labelSpyReportFleet);
document.getElementById('left-menu-1').append(cbSpyReportFleet);
document.getElementById('left-menu-1').append(labelBuildings);
document.getElementById('left-menu-1').append(cbBuildings);
document.getElementById('left-menu-1').append(labelGalaxySpy);
document.getElementById('left-menu-1').append(cbGalaxySpy);
document.getElementById('left-menu-1').append(labelDiscovery);
document.getElementById('left-menu-1').append(cbDiscovery);
document.getElementById('left-menu-1').append(btnTest);

let _resources_metal = 0,
  _resources_crystal = 0,
  _resources_deuterium = 0,
  _resources_darkmatter = 0,
  _resources_energy = 0;

let _metalMine = 0,
  _crystalMine = 0,
  _deuteriumMine = 0,
  _solarPlant = 0,
  _metalStorage = 0,
  _crystalStorage = 0,
  _deuteriumStorage = 0;

let _roboticsFactory = 0,
  _shipyard = 0,
  _researchLaboratory = 0,
  _naniteFactory = 0,
  _lastRefleshTime = '',
  _producers = false;

let _fighterLight = 0,
  _fighterHeavy = 0,
  _cruiser = 0,
  _battleship = 0,
  _interceptor = 0,
  _bomber = 0,
  _destroyer = 0,
  _deathstar = 0,
  _reaper = 0,
  _explorer = 0,
  _transporterSmall = 0,
  _transporterLarge = 0,
  _colonyShip = 0,
  _recycler = 0,
  _espionageProbe = 0,
  _solarSatellite = 0,
  _resbuggy = 0;

let _currentGalaxy = 0,
  _currentSystem = 0,
  _probes = 0;

function getIdItem(itemId = '') {
  const domElement = document.getElementById(itemId);
  if (domElement !== null) return domElement;
  else return false;
}

function getDOMItem(itemName = '.', attribute, searchValue) {
  const domElement = document.querySelector(
    `${itemName}[${attribute}='${searchValue}']`,
  );
  if (domElement !== null) return domElement;
  else return false;
}
function getDOMItems(itemName = '.', attribute, searchValue) {
  const domElement = document.querySelectorAll(
    `${itemName}[${attribute}='${searchValue}']`,
  );
  if (domElement !== null) return domElement;
  else return false;
}
function getSearchInItem(
  htmlItem = document,
  itemName = '.',
  attribute,
  searchValue,
) {
  const domElement = htmlItem.querySelector(
    `${itemName}[${attribute}='${searchValue}']`,
  );
  if (domElement !== null) return domElement;
  else return false;
}
function getSearchInItems(
  htmlItem = document,
  itemName = '.',
  attribute,
  searchValue,
) {
  const domElement = htmlItem.querySelectorAll(
    `${itemName}[${attribute}='${searchValue}']`,
  );
  if (domElement !== null) return domElement;
  else return false;
}

class PlanetBuildingsSerie {
  constructor() {
    this.metal = 0;
    this.kri = 0;
    this.deu = 0;
    this.solar = 0;

    this.metalEnergyRequirement = 0;
    this.kriEnergyRequirement = 0;
    this.deuEnergyRequirement = 0;
    this.solarEnergyRequirement = 0;

    this.metalProduction = 0;
    this.kriProduction = 0;
    this.deuProduction = 0;
    this.solarProduction = 0;
  }
}

const btn_online_bonus = getIdItem('btn-online-bonus');
if (btn_online_bonus) btn_online_bonus.click();

let _totalPlanetCount = 0,
  _currentPlanet = 0,
  _currentPlanetGalaxy = 0,
  _currentPlanetSysyem = 0;
function dataInitialize() {
  //Düşman Saldırıyor Mu
  const header = getIdItem('header');
  if (header) {
    if (
      header.children[3].getAttribute('class').search('hostile') > -1
    ) {
      const other_planets = getIdItem('other-planets');
      if (other_planets) {
        for (let i = 0; i < other_planets.children.length; i++) {
          if (
            other_planets.children[i]
              .getAttribute('class')
              .search('underAttack') > -1
          ) {
            const myPlanetUnderAttackArr = other_planets.children[
              i
            ].children[0].children[2].innerText
              .replaceAll('[', '')
              .replaceAll(']', '')
              .split(':');
            storageSet(
              'myPlanetUnderAttackArr',
              myPlanetUnderAttackArr,
            );
            console.log(
              'myPlanetUnderAttackArr',
              storageGet('myPlanetUnderAttackArr'),
            );
            break;
          }
        }
      }
      storageSet('attacked', false);
      // gameStatusBefore = gameStatus;
      // gameStatus = "UNDERATTACK";
      // storageSet("gameStatusBefore", gameStatusBefore);
      // storageSet("gameStatus", gameStatus);
    } else {
      // if (storageGet("gameStatusBefore") !== "NONE") {
      //   gameStatus = storageGet("gameStatusBefore");
      //   gameStatusBefore = "NONE";
      //   storageSet("gameStatus", gameStatus);
      //   storageSet("gameStatusBefore", gameStatusBefore);
      // } else if (gameStatus === "UNDERATTACK") {
      //   gameStatus = "NONE";
      //   storageSet("gameStatus", gameStatus);
      // }
      // storageSet("myPlanetUnderAttackArr", [0, 0, 0]);
    }
  }
  //Madenleri Al
  const metal_amount = getIdItem('metal-amount');
  if (metal_amount) {
    _resources_metal = metal_amount.innerText.replaceAll('.', '');
    _resources_crystal = getIdItem(
      'crystal-amount',
    ).innerText.replaceAll('.', '');
    _resources_deuterium = getIdItem(
      'deuterium-amount',
    ).innerText.replaceAll('.', '');

    storageSet('resourcesMetal', _resources_metal);
    storageSet('resourcesCrystal', _resources_crystal);
    storageSet('resourcesDeuterium', _resources_deuterium);

    // _resources_energy = getDOMItems(
    //   'span',
    //   'class',
    //   'resource-amount',
    // )[3].innerText.replaceAll('.', '');

    // _resources_metal = _resources_metal.replaceAll('.','')
    // _resources_crystal = _resources_crystal.replaceAll('.','')
    // _resources_deuterium = _resources_deuterium.replaceAll('.','')
    // _resources_energy = _resources_energy.replaceAll('.','')
  }

  //Kaynaklar Bölümündeki Binaları Al
  const buildings_container = getIdItem('buildings-container');
  if (buildings_container) {
    const content = getDOMItem('div', 'class', 'content');
    if (content) {
      for (
        i = 0;
        i <
        buildings_container.children[1].children[1].children.length;
        i++
      ) {
        if (i === 0)
          _metalMine =
            buildings_container.children[1].children[1].children[i]
              .children[0].children[0].innerText;
        else if (i === 1)
          _crystalMine =
            buildings_container.children[1].children[1].children[i]
              .children[0].children[0].innerText;
        else if (i === 2)
          _deuteriumMine =
            buildings_container.children[1].children[1].children[i]
              .children[0].children[0].innerText;
        else if (i === 3)
          _solarPlant =
            buildings_container.children[1].children[1].children[i]
              .children[0].children[0].innerText;
      }
    }
  }

  //Araştırmaları Al
  const research_container = getIdItem('research-container');
  if (research_container) {
    for (
      i = 30;
      i < research_container.children[1].children[1].children.length;
      i++
    ) {}
  }

  //Galaxi Bilgilerini Al
  const galaxyInput = getIdItem('galaxyInput');
  const systemInput = getIdItem('systemInput');
  if (galaxyInput) {
    _currentGalaxy = parseInt(galaxyInput.value);
    _currentSystem = parseInt(systemInput.value);
  }

  //Gezegen Bilgilerini Al
  const other_planets = getIdItem('other-planets');
  if (other_planets) {
    _totalPlanetCount = parseInt(other_planets.children.length);

    for (let i = 0; i < other_planets.children.length; i++) {
      if (
        other_planets.children[i].getAttribute('class') ===
        'planet-item  selected'
      ) {
        _currentPlanet = i;
        break;
      }
    }
  }

  //Filo Bilgilerini Al
  const fleet_content = getIdItem('fleet-content');
  if (fleet_content) {
    let fleetTextArr =
      fleet_content.children[0].children[0].children[0].children[1].innerText
        .substring(9)
        .split('/');
    storageSet('currentFleet', fleetTextArr[0]);
    storageSet('totalFleet', fleetTextArr[1]);

    let discoveryTextArr =
      fleet_content.children[0].children[0].children[0].children[2].innerText
        .substring(10)
        .split('/');
    storageSet('currentDiscovery', discoveryTextArr[0]);
    storageSet('totalDiscovery', discoveryTextArr[1]);
  }
}
dataInitialize();

function gameClockInitialize() {
  const system_clock = getIdItem('system-clock');
  if (system_clock) {
    const gameTime = system_clock.innerText.substr(11, 2);
    if (gameTime === '00') {
    }
    console.log('gameTime', typeof gameTime);
  }
}
gameClockInitialize();

let arrPlanetBuildings = [];

function buildingsStart() {
  const buildings_container = getIdItem('buildings-container');
  if (buildings_container) {
    const buildings =
      buildings_container.children[1].children[1].children;
    let buildingsSerie = new PlanetBuildingsSerie();
    for (let i = 0; i < 4; i++) {
      const buildingVal =
        buildings[i].children[0].children[0].innerText;
      if (i === 0) {
        buildingsSerie.metal = buildingVal;
      }
      if (i === 1) {
        buildingsSerie.kri = buildingVal;
      }
      if (i === 2) {
        buildingsSerie.deu = buildingVal;
      }
      if (i === 3) {
        buildingsSerie.solar = buildingVal;
      }
    }
    arrPlanetBuildings = storageGet('arrPlanetBuildings');
    if (!arrPlanetBuildings) arrPlanetBuildings = [];
    arrPlanetBuildings[_currentPlanet] = buildingsSerie;
    console.log('arrPlanetBuildings', arrPlanetBuildings);
    storageSet('arrPlanetBuildings', arrPlanetBuildings);
    console.log(storageGet('arrPlanetBuildings'));
  } else {
    const left_menu = getIdItem('left-menu-1');
    if (left_menu) left_menu.children[1].children[0].click();
  }
}

let clickEvent = new MouseEvent('click', {
  view: window,
  bubbles: true,
  cancelable: false,
});

function liftShips() {
  const knownCargoCapacity = cargoCapacity();
  if (knownCargoCapacity) {
    if (StorageGetInitialize('requiredHeavyCargo', 0) < 1) {
      const fleet_content = getIdItem('fleet-content');
      if (fleet_content) {
        const fleets =
          fleet_content.children[1].children[1].children[0];
        for (let i = 0; i < fleets.children.length; i++) {
          if (
            fleets.children[i].children[0].getAttribute(
              'data-ship-type',
            ) === 'LIGHT_CARGO'
          ) {
            const LIGHT_CARGO = fleets.children[
              i
            ].children[0].children[0].innerText.replaceAll('.', '');
            storageSet('lift_light_cargo_count', LIGHT_CARGO);
          } else if (
            fleets.children[i].children[0].getAttribute(
              'data-ship-type',
            ) === 'HEAVY_CARGO'
          ) {
            const HEAVY_CARGO = fleets.children[
              i
            ].children[0].children[0].innerText.replaceAll('.', '');
            storageSet('lift_heavy_cargo_count', HEAVY_CARGO);
          }
        }

        const lightCargoCapacity = parseInt(
          storageGet('lightCargoCapacity'),
        );
        const heavyCargoCapacity = parseInt(
          storageGet('heavyCargoCapacity'),
        );

        const totalResource =
          parseInt(storageGet('resourcesMetal')) +
          parseInt(storageGet('resourcesCrystal')) +
          parseInt(storageGet('resourcesDeuterium'));

        const availableResource =
          parseInt(storageGet('lift_light_cargo_count')) *
            lightCargoCapacity +
          parseInt(storageGet('lift_heavy_cargo_count')) *
            heavyCargoCapacity;

        if (totalResource > availableResource) {
          const requiredHeavyCargo =
            (totalResource - availableResource) / heavyCargoCapacity +
            getRndInteger(500, 1000);
          storageSet('requiredHeavyCargo', requiredHeavyCargo);
          console.log('requiredHeavyCargo', requiredHeavyCargo);
        }

        console.log('totalResource', totalResource);
        console.log('availableResource', availableResource);
      } else {
        MenuClick(7);
      }
    } else {
      const hangar_container = getIdItem('hangar-container');
      if (hangar_container) {
        const hangarFleets = hangar_container.children[2].children[1];
        for (let i = 0; i < hangarFleets.children.length; i++) {
          if (
            hangarFleets.children[i].children[0].getAttribute(
              'data-ship-type',
            ) === 'HEAVY_CARGO'
          ) {
            hangarFleets.children[i].children[0].click();
            const detail_HEAVY_CARGO = getIdItem(
              'detail-HEAVY_CARGO',
            );
            if (detail_HEAVY_CARGO) {
              setTimeout(() => {
                detail_HEAVY_CARGO.children[1].children[2].children[3].children[3].children[0].children[2].value =
                  parseInt(storageGet('requiredHeavyCargo')) +
                  getRndInteger(500, 1000);
              }, 500);
              setTimeout(() => {
                detail_HEAVY_CARGO.children[1].children[2].children[3].children[3].children[1].click();
                const currentTimeSpan = mathStabileRound(
                  Date.now() / 1000,
                );
                gameTimer.shipProduced = currentTimeSpan + 1000 * 180;
                storageSet('gameTimer', gameTimer);
                //kaldik
              }, 1150);
            }
          }
        }
      } else {
        MenuClick(4);
      }
    }
  }
}

function galaxyStart(direction) {
  if (!direction.start) return;
  const galaxyContainer = getIdItem('galaxy-container');
  if (galaxyContainer) {
    const galaxyInput =
      galaxyContainer.children[0].children[0].children[0].children[2];
    const systemInput =
      galaxyContainer.children[0].children[0].children[1].children[2];

    if (
      _currentGalaxy !== direction.galaxy ||
      _currentSystem !== direction.system
    ) {
      galaxyInput.value = direction.galaxy;
      systemInput.value = direction.system;
      galaxyContainer.children[0].children[0].children[2].children[0].dispatchEvent(
        clickEvent,
      );
      return;
    }

    let isSpySend = false;

    const maxFleetErr = getDOMItem(
      'button',
      'class',
      'swal2-confirm swal2-styled',
    );
    if (maxFleetErr) {
      maxFleetErr.click();
      const decreaseSpySkip = parseInt(storageGet('intSpySkip')) - 1;
      if (decreaseSpySkip > -1)
        storageSet('intSpySkip', decreaseSpySkip);
      else storageSet('intSpySkip', 0);
    } else {
      let intSpySkip = StorageGetInitialize('intSpySkip', 0);
      let spySkip = 0;
      const galaxyRows =
        galaxyContainer.children[0].children[1].children[0].children;
      for (let i = 1; i < galaxyRows.length - 1; i++) {
        const currentRowClass = galaxyRows[i].getAttribute('class');
        const planetIsSend = galaxyRows[i].children[0].children;
        if (
          currentRowClass.search('filterInactive') > -1 &&
          currentRowClass.search('filterVacation') < 0
          // && planetIsSend.length < 2
        ) {
          if (intSpySkip <= spySkip) {
            galaxyRows[i].children[6].children[0].dispatchEvent(
              clickEvent,
            );
            isSpySend = true;

            storageSet('intSpySkip', (intSpySkip += 1));
            break;
          } else spySkip += 1;
        }
      }

      if (isSpySend) return;
      storageSet('intSpySkip', 0);
      if (direction.direction === 1) {
        direction.system = direction.system - 1;
        const stopSystemVal = getRndInteger(1, 30);
        if (stopSystemVal > direction.system) {
          direction.galaxy = direction.galaxy - 1;
          direction.system = getRndInteger(450, 499);

          if (direction.galaxy < 3) {
            direction.start = false;
            gameStatus = 'MESSAGE';
            storageSet('gameStatus', gameStatus);
            const header = getIdItem('header');
            if (header) header.children[2].children[0].click();
            // MenuClick(0);
          } else {
            // getIdItem("btnSystemLeft").dispatchEvent(clickEvent);
            // getIdItem("btnSystemLeft").click();
            // galaxyContainer.children[0].children[0].children[2].children[0].dispatchEvent(clickEvent);
          }
        } else {
          galaxyInput.value = direction.galaxy;
          systemInput.value = direction.system;
          galaxyContainer.children[0].children[0].children[2].children[0].dispatchEvent(
            clickEvent,
          );
        }
      } else if (direction.direction === 0) {
        direction.system = direction.system + 1;
        const stopSystemVal = getRndInteger(470, 499);
        if (stopSystemVal < direction.system) {
          direction.galaxy = direction.galaxy + 1;
          direction.system = getRndInteger(1, 49);

          if (direction.galaxy > 3) {
            direction.start = false;
            console.log('gameStatus message');
            gameStatus = 'MESSAGE';
            storageSet('gameStatus', gameStatus);
            if (header) header.children[2].children[0].click();
            // MenuClick(0);
          } else {
            // getIdItem("btnSystemRight").dispatchEvent(clickEvent);
            // getIdItem("btnSystemRight").click();
            // galaxyContainer.children[0].children[0].children[2].children[0].dispatchEvent(clickEvent);
          }
        } else {
          galaxyInput.value = direction.galaxy;
          systemInput.value = direction.system;
          galaxyContainer.children[0].children[0].children[2].children[0].dispatchEvent(
            clickEvent,
          );
        }
      }

      storageSet('galaxySpy', {
        galaxy: direction.galaxy,
        system: direction.system,
        direction: direction.direction,
        start: direction.start,
      });
    }
  } else {
    const left_Menu = getIdItem('left-menu-1');
    if (left_Menu) left_Menu.children[7].children[0].click();
  }
}

function cargoCapacity() {
  let returnVal = false;
  if (
    parseInt(StorageGetInitialize('lightCargoCapacity', 0)) < 1 ||
    parseInt(StorageGetInitialize('heavyCargoCapacity', 0)) < 1
  ) {
    const hangar_container = getIdItem('hangar-container');
    if (hangar_container) {
      const ajax_modal_container = getIdItem('ajax-modal-container');
      if (ajax_modal_container) {
        setTimeout(() => {
          ajax_modal_container.children[0].children[1].click();
        }, 500);
      }

      if (
        parseInt(StorageGetInitialize('lightCargoCapacity', 0)) < 1
      ) {
        const ship_info_modal = getIdItem('ship-info-modal');
        const detail_LIGHT_CARGO = getIdItem('detail-LIGHT_CARGO');
        if (
          ship_info_modal &&
          ship_info_modal.children[0].children[0].getAttribute(
            'src',
          ) === '../../assets/images/V2/hangar/LIGHT_CARGO.gif'
        ) {
          const lightCargoCap =
            ship_info_modal.children[1].children[2].children[0].children[1].children[5].children[2].innerText.replaceAll(
              '.',
              '',
            );
          storageSet('lightCargoCapacity', lightCargoCap);
        } else if (detail_LIGHT_CARGO) {
          detail_LIGHT_CARGO.children[1].children[1].click();
        } else {
          hangar_container.children[2].children[1].children[3].children[0].click();
        }
      } else if (
        parseInt(StorageGetInitialize('heavyCargoCapacity', 0)) < 1
      ) {
        const ship_info_modal = getIdItem('ship-info-modal');
        const detail_HEAVY_CARGO = getIdItem('detail-HEAVY_CARGO');
        if (
          ship_info_modal &&
          ship_info_modal.children[0].children[0].getAttribute(
            'src',
          ) === '../../assets/images/V2/hangar/HEAVY_CARGO.gif'
        ) {
          const heavyCargoCap =
            ship_info_modal.children[1].children[2].children[0].children[1].children[5].children[2].innerText.replaceAll(
              '.',
              '',
            );
          storageSet('heavyCargoCapacity', heavyCargoCap);
        } else if (detail_HEAVY_CARGO) {
          detail_HEAVY_CARGO.children[1].children[1].click();
        } else {
          hangar_container.children[2].children[1].children[4].children[0].click();
        }
      }
    } else {
      const left_menu = getIdItem('left-menu-1');
      if (left_menu) left_menu.children[4].children[0].click();
    }
  } else {
    returnVal = true;
    // MenuClick(7);
  }
  return returnVal;
}

class Helper extends String {
  static resourceTextClear(val) {
    return val
      .replaceAll(' ', '')
      .replaceAll(':', '')
      .replaceAll('.', '');
  }
}

function asteroidMining() {
  const galaxy_container = getIdItem('galaxy-container');
  if (galaxy_container) {
    const galaxyContent = getIdItem('galaxyContent');
    if (galaxyContent) {
      const galaxyTable = galaxyContent.children[0];
      if (
        galaxyTable.children.length > 16 &&
        StorageGetInitialize('asteroidSend', false)
      ) {
        storageSet('asteroidSend', true);
      } else {
        const system = getIdItem('systemInput').value;
        if (parseInt(system) < 2) {
          system.value = 499;
          const galaxyBtnGo = getSearchInItem(
            galaxy_container,
            'a',
            'class',
            'btn-route x-btn-go',
          );
          if (galaxyBtnGo) galaxyBtnGo.click();
        }
      }
      // for(let i = 1; i < galaxyTable.children.length; i++) {
      //   if()
      //   galaxyTable.children[i]
      // }
    }
  } else {
    MenuClick(7);
  }
}

function messageClear() {
  const knownCargoCapacity = cargoCapacity();

  if (!knownCargoCapacity) return;
  const messages_container = getIdItem('messages-container');
  if (messages_container) {
    if (
      messages_container.children[1].children[0].children[0]
        .getAttribute('class')
        .search('active') > -1
    ) {
      const subnav_espionage = getIdItem('subnav-espionage');
      if (
        subnav_espionage.getAttribute('class').search('active') > -1
      ) {
        const fleet_messages_tab = getIdItem('fleet-messages-tab');
        const messageRow = fleet_messages_tab.children[1].children;

        //Message Yoksa
        // if (messageRow.length < 3 && gameStatus === "MESSAGE") {
        if (messageRow.length < 4) {
          console.log('Message Not Found');
          gameStatus = 'GALAXYSPY';
          storageSet('gameStatus', gameStatus);
          const left_menu = getIdItem('left-menu-1');
          if (left_menu) left_menu.children[0].children[0].click();
          return;
        }

        let isDelete = false;
        for (let i = 1; i < messageRow.length - 2; i++) {
          if (messageRow[i].children[3].children.length > 1) {
            const messageContentTable =
              messageRow[i].children[2].children[0].children[0]
                .children[0];

            //Zayıf mı
            if (
              messageContentTable.children[0].children[0].children[0].children[0]
                .getAttribute('class')
                .indexOf('isNoob') > -1
            ) {
              messageRow[
                i
              ].children[1].children[1].children[1].click();
              isDelete = true;
            } else {
              //Filo veya Savunma Rapor Detayında Varmı
              if (
                messageContentTable.children[1].children[1]
                  .children[0].childElementCount > 0 &&
                messageContentTable.children[2].children[1]
                  .children[0].childElementCount > 0
              ) {
                const fleetPoint = parseInt(
                  messageContentTable.children[1].children[1].children[0].children[0].innerText
                    .substring(6)
                    .replaceAll('.', ''),
                );
                const defencePoint = parseInt(
                  messageContentTable.children[2].children[1].children[0].children[0].innerText
                    .substring(16)
                    .replaceAll('.', ''),
                );
                storageSet('enemyFleetPoint', fleetPoint);
                storageSet('enemyDefencePoint', defencePoint);
                if (fleetPoint < 1 && defencePoint < 1) {
                  totalResource = parseInt(
                    Helper.resourceTextClear(
                      messageContentTable.children[1].children[0]
                        .children[0].innerText,
                    ),
                  );
                  totalResource += parseInt(
                    Helper.resourceTextClear(
                      messageContentTable.children[2].children[0]
                        .children[0].innerText,
                    ),
                  );
                  totalResource += parseInt(
                    Helper.resourceTextClear(
                      messageContentTable.children[3].children[0]
                        .children[0].innerText,
                    ),
                  );
                  if (totalResource > 500000000) {
                    if (!isDelete) {
                      const coordinateText =
                        messageRow[i].children[1].children[0]
                          .children[0].children[0].innerText;

                      const coordinateArr = coordinateText
                        .substring(coordinateText.indexOf('[') + 1)
                        .replaceAll(']', '')
                        .split(':');

                      if (
                        !storageGet('attacked') &&
                        !isArrayEqual(coordinateArr, attackCoordinate)
                      ) {
                        gameStatus = 'ATTACK';
                        storageSet('attackCoordinate', coordinateArr);
                        storageSet('totalResource', totalResource);
                        storageSet('gameStatus', gameStatus);

                        messageRow[i].children[3].children[5].click();
                        break;
                      } else {
                        storageSet('attacked', false);
                        storageSet('attackCoordinate', [0, 0, 0]);
                        messageRow[
                          i
                        ].children[1].children[1].children[1].click();
                        isDelete = true;
                      }
                    }
                  } else {
                    messageRow[
                      i
                    ].children[1].children[1].children[1].click();
                    isDelete = true;
                    // break;
                  }
                } else {
                  messageRow[
                    i
                  ].children[1].children[1].children[1].click();
                  isDelete = true;
                  // break;
                }
              } else {
                messageRow[
                  i
                ].children[1].children[1].children[1].click();
                isDelete = true;
                // break;
              }
            }
          } else {
            messageRow[i].children[1].children[1].children[1].click();
            isDelete = true;
            // break;
          }
        }
      } else {
        subnav_espionage.click();
      }
    } else {
      messages_container.children[1].children[0].children[0].children[0].click();
    }
  } else {
    const header = getIdItem('header');
    if (header) {
      console.log('go messages');
      header.children[2].children[0].click();
    }
  }
}

function enemyAttack() {
  const knownCargoCapacity = cargoCapacity();
  if (knownCargoCapacity) {
    const fleet_content = getIdItem('fleet-content');
    if (fleet_content) {
      if (totalFleet > currentFleet + 1) {
        const ships =
          fleet_content.children[1].children[1].children[0].children;
        const enemyFleetPoint = StorageGetInitialize(
          'enemyFleetPoint',
          0,
        );
        const enemyDefencePoint = StorageGetInitialize(
          'enemyDefencePoint',
          0,
        );
        for (let i = 0; i < ships.length; i++) {
          if (
            ships[i].children[0].getAttribute('data-ship-type') ===
            'LIGHT_CARGO'
          ) {
            storageSet(
              'LIGHT_CARGO',
              ships[i].children[0].children[0].innerText.replaceAll(
                '.',
                '',
              ),
            );
            const totalResource = parseInt(
              storageGet('totalResource'),
            );

            const lightCargoRequired = mathStabileRound(
              totalResource / lightCargoCapacity +
                getRndInteger(300, 500),
            );

            if (
              lightCargoRequired <=
              parseInt(storageGet('LIGHT_CARGO'))
            ) {
              ships[i].children[1].children[0].value =
                lightCargoRequired;
              break;
            }
          } else if (
            ships[i].children[0].getAttribute('data-ship-type') ===
            'HEAVY_CARGO'
          ) {
            storageSet(
              'HEAVY_CARGO',
              ships[i].children[0].children[0].innerText.replaceAll(
                '.',
                '',
              ),
            );

            const totalResource = parseInt(
              storageGet('totalResource'),
            );
            const heavyCargoRequired = mathStabileRound(
              totalResource / heavyCargoCapacity +
                getRndInteger(50, 100),
            );
            storageSet('heavyCargoRequired', heavyCargoRequired);
            if (
              heavyCargoRequired <=
              parseInt(storageGet('HEAVY_CARGO'))
            ) {
              ships[i].children[1].children[0].value =
                heavyCargoRequired;
              break;
            } else {
              console.log('Yeterli Heavy Kargo Yok ');
              gameStatus = 'NONE';
              storageSet('gameStatus', gameStatus);
            }
          }
        }

        // if (storageGet("attacked")) {
        //   gameStatus = "MESSAGE";
        //   storageSet("gameStatus", gameStatus);
        // }

        setTimeout(() => {
          const btn_next_fleet2 = getIdItem('btn-next-fleet2');
          if (btn_next_fleet2) {
            btn_next_fleet2.click();
          }
        }, 400);
        setTimeout(() => {
          const fleet2_target_coords_container = getIdItem(
            'fleet2_target_coords_container',
          );
          if (fleet2_target_coords_container) {
            const coordinateArr = storageGet('attackCoordinate');
            console.log('coordinateArr', coordinateArr);
            fleet2_target_coords_container.children[0].value =
              coordinateArr[0];
            fleet2_target_coords_container.children[1].value =
              coordinateArr[1];
            fleet2_target_coords_container.children[2].value =
              coordinateArr[2];
            const btn_next_fleet3 = getIdItem('btn-next-fleet3');
            if (btn_next_fleet3) {
              btn_next_fleet3.click();
              // storageSet("attackCoordinate", [0, 0, 0]);
            }
          }
        }, 1200);
        setTimeout(() => {
          const btn_submit_fleet = getIdItem('btn-submit-fleet');
          if (btn_submit_fleet) {
            const fleet3_content_container = getIdItem(
              'fleet3_content_container',
            );
            if (fleet3_content_container)
              fleet3_content_container.children[0].children[7].click();
            btn_submit_fleet.click();
            storageSet('attacked', true);
            gameStatus = 'MESSAGE';
            storageSet('gameStatus', gameStatus);
            storageSet('attackCoordinate', [0, 0, 0]);
          }
        }, 1900);
      } else {
        const fleet_movement_detail_btn = getIdItem(
          'fleet-movement-detail-btn',
        );
        const fleet_movement_table = getIdItem(
          'fleet-movement-table',
        );
        if (fleet_movement_table) {
          const fleetRow = fleet_movement_table.children[0].children;
          let fleetReturnCount = 0;
          for (let i = 0; i < fleetRow.length; i++) {
            if (
              fleetRow[i].children[1].children[0].getAttribute(
                'src',
              ) === '/assets/images/V2/mission/ATTACK.png?v=2' &&
              fleetRow[
                i
              ].children[4].children[0].children[0].getAttribute(
                'src',
              ) ===
                '/assets/images/fleet-movement-icon-reverse.gif?v=2'
            ) {
              fleetReturnCount += 1;
            }
            if (fleetReturnCount >= getRndInteger(2, 3)) {
              const currentTimeSpan = mathStabileRound(
                Date.now() / 1000,
              );
              gameTimer.message =
                currentTimeSpan +
                parseInt(
                  fleetRow[i].children[0].getAttribute(
                    'data-remaining-seconds',
                  ),
                ) +
                5;
              gameStatus = 'NONE';
              storageSet('gameTimer', gameTimer);
              storageSet('gameStatus', gameStatus);
              storageSet('attacked', false);
              storageSet('attackCoordinate', [0, 0, 0]);
              storageSet('totalResource', 0);
              console.log('tikladiii');
              // getIdItem(
              //   'left-menu-1',
              // ).children[7].children[0].click();
              MenuClick(7);
              break;
            }
          }
        } else if (fleet_movement_detail_btn) {
          fleet_movement_detail_btn.click();
        }
      }
    } else {
      const left_menu = getIdItem('left-menu-1');
      if (left_menu) {
        console.log('enemy attack last');
        left_menu.children[7].children[0].click();
      }
    }
  }
}

function missResources() {
  const fleet_content = getIdItem('fleet-content');
  if (fleet_content) {
    fleet_content.children[0].children[1].children[1].click();
  } else {
    const left_menu = getIdItem('left-menu-1');
    if (left_menu) left_menu.children[7].children[0].click();
  }
}

let totalDiscovery = StorageGetInitialize('totalDiscovery', 0);
let currentDiscovery = StorageGetInitialize('currentDiscovery', 0);

let totalFleet = parseInt(StorageGetInitialize('totalFleet', 0));
let currentFleet = parseInt(StorageGetInitialize('currentFleet', 0));

function discoveryStart() {
  const fleetContainer = getIdItem('fleet1_content_container');
  if (fleetContainer) {
    //Keşif Kotasında Yer Var
    if (
      currentDiscovery < totalDiscovery &&
      totalFleet > currentFleet + 1
    ) {
      for (let i = 0; i < fleetContainer.children.length; i++) {
        if (
          fleetContainer.children[i].children[0].getAttribute(
            'data-ship-type',
          ) === 'LIGHT_CARGO'
        ) {
          storageSet(
            'LIGHT_CARGO',
            fleetContainer.children[
              i
            ].children[0].children[0].innerText.replaceAll('.', ''),
          );
          console.log(
            'küçük nakliye sayısı:',
            storageGet('LIGHT_CARGO'),
          );
          const lightCargo = parseInt(storageGet('LIGHT_CARGO'));
        } else if (
          fleetContainer.children[i].children[0].getAttribute(
            'data-ship-type',
          ) === 'HEAVY_CARGO'
        ) {
          storageSet(
            'HEAVY_CARGO',
            fleetContainer.children[
              i
            ].children[0].children[0].innerText.replaceAll('.', ''),
          );
          console.log(
            'büyük nakliye sayısı:',
            storageGet('HEAVY_CARGO'),
          );
          const heavyCargo = parseInt(storageGet('HEAVY_CARGO'));
          if (heavyCargo > 90000)
            fleetContainer.children[i].children[1].children[0].value =
              '50000';
          else
            fleetContainer.children[i].children[1].children[0].value =
              mathStabileRound(heavyCargo / 3);
        } else if (
          fleetContainer.children[i].children[0].getAttribute(
            'data-ship-type',
          ) === 'REAPER'
        ) {
          storageSet(
            'REAPER',
            fleetContainer.children[
              i
            ].children[0].children[0].innerText.replaceAll('.', ''),
          );
          const reaper = parseInt(storageGet('REAPER'));
          if (reaper > 20000)
            fleetContainer.children[i].children[1].children[0].value =
              '10000';
          else
            fleetContainer.children[i].children[1].children[0].value =
              mathStabileRound(reaper / 3);
        }
      }
      setTimeout(() => {
        const btn_next_fleet2 = getIdItem('btn-next-fleet2');
        if (btn_next_fleet2) {
          btn_next_fleet2.click();
        }
      }, 100);

      setTimeout(() => {
        const btn_next_fleet3 = getIdItem('btn-next-fleet3');
        if (btn_next_fleet3) {
          btn_next_fleet3.click();
        }
      }, 850);

      setTimeout(() => {
        const expeditionHoldTime = getIdItem('expeditionHoldTime');
        const btn_submit_fleet = getIdItem('btn-submit-fleet');
        if (btn_submit_fleet) {
          expeditionHoldTime.value = '60';
          const fleet2_target_z = getIdItem('fleet2_target_z');
          fleet2_target_z.value = 16;
          btn_submit_fleet.click();
        }
      }, 1650);
    } else {
      //Keşif Kotası Dolu
      console.log('Keşif Kotası Dolu');

      const fleet_movement_detail_btn = getIdItem(
        'fleet-movement-detail-btn',
      );
      const fleet_movement_table = getIdItem('fleet-movement-table');
      if (fleet_movement_table) {
        let lastDiscoveryRemainingTime = null;
        for (
          let i = 0;
          i < fleet_movement_table.children[0].children.length;
          i++
        ) {
          const fleetRow =
            fleet_movement_table.children[0].children[i];

          if (
            fleetRow.children[4].children[0].children[0].getAttribute(
              'src',
            ) ===
              '/assets/images/fleet-movement-icon-reverse.gif?v=2' &&
            fleetRow.children[1].children[0].getAttribute('src') ===
              '/assets/images/V2/mission/EXPEDITION.png?v=2'
          ) {
            lastDiscoveryRemainingTime =
              fleetRow.children[0].getAttribute(
                'data-remaining-seconds',
              );
            gameTimer.discovery =
              parseInt(lastDiscoveryRemainingTime) +
              mathStabileRound(Date.now() / 1000) +
              5;
            storageSet('gameTimer', gameTimer);
            gameStatus = 'NONE';
            gameRoute.discovery = true;
            storageSet('gameRoute', gameRoute);
            storageSet('gameStatus', gameStatus);
            MenuClick(6);
            return;
          }
        }
      } else if (fleet_movement_detail_btn) {
        fleet_movement_detail_btn.click();
      }
    }
  } else {
    const leftMenu = getIdItem('left-menu-1');
    if (leftMenu) leftMenu.children[7].children[0].click();
  }
}

let intervalDiscovery,
  intervalNone,
  galaxySpyInterval,
  messageInterval,
  attackInterval;

function allClearIntervals(val) {
  if (intervalDiscovery && val !== 'intervalDiscovery') {
    console.log('clear discovery');
    clearInterval(intervalDiscovery);
  }
  if (galaxySpyInterval && val !== 'galaxySpyInterval') {
    console.log('clear galaxySpy');
    clearInterval(galaxySpyInterval);
  }
  if (messageInterval && val !== 'messageInterval') {
    console.log('clear message');
    clearInterval(messageInterval);
  }
  if (attackInterval && val !== 'attackInterval') {
    console.log('clear attack');
    clearInterval(attackInterval);
  }
}

(() => {
  const currentTimeSpan = mathStabileRound(Date.now() / 1000);

  console.log('currentTimeSpan', currentTimeSpan);
  console.log('gameTimer', gameTimer);
  console.log('difference', gameTimer.message - currentTimeSpan);
  console.log('gameRoute', gameRoute);
  console.log('gameStatus', gameStatus);

  if (
    gameStatus === 'NONE' &&
    gameRoute.discovery &&
    (gameTimer.discovery === 0 ||
      gameTimer.discovery < currentTimeSpan)
  ) {
    console.log('discovery start');
    gameStatus = gameEnum.DISCOVERY;
    storageSet('gameStatus', gameStatus);
  }
  // else if (
  //   false &&
  //   gameStatus === "NONE" &&
  //   gameRoute.galaxySpy &&
  //   (gameTimer.galaxySpy === 0 || gameTimer.galaxySpy < currentTimeSpan)
  // ) {
  //   gameStatus = gameEnum.GALAXYSPY;
  //   storageSet("gameStatus", gameStatus);
  // }
  else if (
    gameStatus === 'NONE' &&
    gameTimer.message < currentTimeSpan &&
    gameTimer.message !== 0
  ) {
    gameStatus = 'MESSAGE';
    gameTimer.message = 0;
    storageSet('gameStatus', gameStatus);
    storageSet('gameTimer', gameTimer);
    setInterval(() => {
      dataInitialize();
      messageClear();
    }, 1100);
  }

  if (gameStatus === 'DISCOVERY') {
    allClearIntervals('intervalDiscovery');
    if (_currentPlanet !== 0) {
      const other_planets = getIdItem('other-planets');
      if (other_planets) other_planets.children[0].children[0];
    } else if (gameRoute.discovery)
      intervalDiscovery = setInterval(() => {
        dataInitialize();
        discoveryStart();
      }, 2000);
  } else if (gameStatus === 'GALAXYSPY') {
    allClearIntervals('galaxySpyInterval');
    const galaxySpyStatus = storageGet('galaxySpy');
    if (!galaxySpyStatus.start) galaxyRouteInitialize();
    // gameStatus = "GALAXYSPY";
    // storageSet("gameStatus", gameStatus);
    if (gameRoute.galaxySpy || true) {
      galaxySpyInterval = setInterval(() => {
        dataInitialize();
        // const swal2_actions = getDOMItem("div", "class", "swal2-actions");
        // if (swal2_actions) swal2_actions.children[0].click();
        // else
        galaxyStart(storageGet('galaxySpy'));
      }, getRndInteger(430, 550));
    }
  } else if (gameStatus === 'MESSAGE') {
    allClearIntervals('messageInterval');
    messageInterval = setInterval(() => {
      dataInitialize();
      const other_planets = getIdItem('other-planets');
      if (other_planets) {
        if (
          other_planets.children[0]
            .getAttribute('class')
            .indexOf('selected') > -1
        ) {
          messageClear();
        } else {
          other_planets.children[0].children[0].click();
        }
      }
    }, 1000);
  } else if (gameStatus === 'ATTACK') {
    allClearIntervals('attackInterval');
    console.log('enum ATTACK');
    enemyAttack();
    attackInterval = setInterval(() => {
      dataInitialize();
      const other_planets = getIdItem('other-planets');
      if (other_planets) {
        if (
          other_planets.children[0]
            .getAttribute('class')
            .indexOf('selected') > -1
        ) {
          enemyAttack();
        } else {
          other_planets.children[0].children[0].click();
        }
      }
    }, 2500);
  } else if (gameStatus === 'UNDERATTACK') {
  } else if (gameStatus === 'SLEEP') {
  }
  // else if (gameStatus === "NONE") {
  // }
  const pageRefreshTime = getRndInteger(400000, 700000);
  console.log('pageRefreshTime', pageRefreshTime);
  intervalNone = setTimeout(() => {
    MenuClick(7);
  }, pageRefreshTime);
})();

() => {
  const direction = storageGet('galaxySpy');
  if (direction.start) {
    galaxySpyInterval = setInterval(() => {
      dataInitialize();
      const swal2_actions = getDOMItem(
        'div',
        'class',
        'swal2-actions',
      );
      if (swal2_actions) swal2_actions.children[0].click();
      else galaxyStart(direction);
    }, 3000);
  }
};
