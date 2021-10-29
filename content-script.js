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

const gameEnum = {
  DISCOVERY: "DISCOVERY",
  BUILDINGS: "BUILDINGS",
  GALAXYSPY: "GALAXYSPY",
  MESSAGE: "MESSAGE",
  ATTACK: "ATTACK",
  RESEARCH: "RESEARCH",
  UNDERATTACK: "UNDERATTACK",
  NONE: "NONE",
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
  }
}

let gameStatusBefore = StorageGetInitialize("gameStatusBefore", "NONE");
let gameStatus = StorageGetInitialize("gameStatus", "NONE");
let gameTimer = StorageGetInitialize("gameTimer", new clssGameTimer());
let totalResource = StorageGetInitialize("totalResource", 0);
let attackCoordinate = StorageGetInitialize("attackCoordinate", [0, 0, 0]);

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
  }
}
let gameRoute = StorageGetInitialize("gameRoute", new clssGameRoute());
// console.log("gameRoute", gameRoute);

function galaxyRouteInitialize() {
  let galaxySpyStartVal = 0,
    systemSpyStartVal = 0,
    direction = 0;
  direction = getRndInteger(0, 1);
  if (parseInt(direction) < 1) {
    galaxySpyStartVal = 1;
    systemSpyStartVal = getRndInteger(1, 60);
  } else {
    galaxySpyStartVal = 4;
    systemSpyStartVal = getRndInteger(440, 499);
  }

  storageSet("galaxySpy", {
    galaxy: galaxySpyStartVal,
    system: systemSpyStartVal,
    direction,
    start: true,
  });
}
if (!storageGet("galaxySpy")) galaxyRouteInitialize();

const lightCargoCapacity = parseInt(
  StorageGetInitialize("lightCargoCapacity", 0)
);
const heavyCargoCapacity = parseInt(
  StorageGetInitialize("heavyCargoCapacity", 0)
);

function pageRefresh() {
  const left_menu = getIdItem("left-menu-1");
  if (left_menu) left_menu.children[0].children[0].click();
}

let labelGalaxySpyValue = document.createElement("label");
labelGalaxySpyValue.innerText = "Galaxy spy start value";
labelGalaxySpyValue.setAttribute(
  "style",
  `
position: relative; 
top: 3px;
`
);

let inputSpyGalaxyValue = document.createElement("input");
inputSpyGalaxyValue.placeholder = "Spy Targeted Galaxy";
inputSpyGalaxyValue.setAttribute(
  "style",
  `
position: relative; 
top: 6px;
`
);

let inputSpySystemValue = document.createElement("input");
inputSpySystemValue.placeholder = "Spy Targeted System";
inputSpySystemValue.setAttribute(
  "style",
  `
position: relative; 
top: 9px;
`
);

let btngalaxyLeft = document.createElement("button");
btngalaxyLeft.innerText = "Galaxy Left";
btngalaxyLeft.setAttribute(
  "style",
  `
position: relative; 
top: 12px;
`
);
btngalaxyLeft.addEventListener("click", () => {
  galaxyStart(
    JSON.stringify({
      galaxy: "left",
      direction: true,
      stop: getRndInteger(10, 30),
    })
  );
});

let btngalaxyRight = document.createElement("button");
btngalaxyRight.innerText = "Galaxy Start";
btngalaxyRight.setAttribute(
  "style",
  `
position: relative; 
top: 15px;
`
);
btngalaxyRight.addEventListener("click", () => {
  galaxyRouteInitialize();
  gameStatus = "GALAXYSPY";
  storageSet("gameStatus", gameStatus);
  galaxyStart(storageGet("galaxySpy"));
});

let btngalaxyStop = document.createElement("button");
btngalaxyStop.innerText = "Galaxy Stop";
btngalaxyStop.setAttribute(
  "style",
  `
position: relative; 
top: 18px;
`
);
btngalaxyStop.addEventListener("click", () => {
  const direction = storageGet("galaxySpy");
  if (direction) {
    direction.start = false;
    storageSet("galaxySpy", direction);

    const left_menu = getIdItem("left-menu-1");
    if (left_menu) left_menu.children[0].children[0].click();
  }
});

let btnMessageClear = document.createElement("button");
btnMessageClear.innerText = "Message Clear";
btnMessageClear.setAttribute(
  "style",
  `
position: relative; 
top: 18px;
`
);
btnMessageClear.addEventListener("click", () => {
  messageClear();
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

let labelSpyReportDefence = document.createElement("label");
labelSpyReportDefence.innerText = "Savunma var ise sil";
labelSpyReportDefence.setAttribute(
  "style",
  `
display: block;
position: relative; 
top: 30px;
`
);

let cbSpyReportDefence = document.createElement("input");
cbSpyReportDefence.setAttribute("id", "cbSpyReportDefence");
cbSpyReportDefence.setAttribute("type", "checkbox");
cbSpyReportDefence.checked = storageGet("cbSpyReportDefence") === "true";
cbSpyReportDefence.setAttribute(
  "style",
  `
position: relative; 
top: 14px;
right: 27px;
`
);
cbSpyReportDefence.addEventListener("click", () => {
  console.log(cbSpyReportDefence.checked, "cbSpyReportDefence.checked");
  storageSet("cbSpyReportDefence", cbSpyReportDefence.checked);
  console.log("Storage : cbSpyReportDefence", storageGet("cbSpyReportDefence"));
});

let labelSpyReportFleet = document.createElement("label");
labelSpyReportFleet.innerText = "Filo var ise sil";
labelSpyReportFleet.setAttribute(
  "style",
  `
display: block;
position: relative; 
top: 18px;
`
);

let cbSpyReportFleet = document.createElement("input");
cbSpyReportFleet.setAttribute("id", "cbSpyReportFleet");
cbSpyReportFleet.setAttribute("type", "checkbox");
cbSpyReportFleet.checked = storageGet("cbSpyReportFleet") === "true";
cbSpyReportFleet.setAttribute(
  "style",
  `
position: relative; 
top: 2px;
right: 27px;
`
);
cbSpyReportFleet.addEventListener("click", () => {
  console.log(cbSpyReportFleet.checked, "cbSpyReportFleet.checked");
  storageSet("cbSpyReportFleet", cbSpyReportFleet.checked);
  console.log("Storage : cbSpyReportFleet", storageGet("cbSpyReportFleet"));
});

let labelBuildings = document.createElement("label");
labelBuildings.innerText = "Kaynakları Yükselt";
labelBuildings.setAttribute(
  "style",
  `
display: block;
position: relative; 
top: 18px;
`
);

let cbBuildings = document.createElement("input");
cbBuildings.setAttribute("id", "cbBuildings");
cbBuildings.setAttribute("type", "checkbox");
cbBuildings.checked = gameRoute.buildings;
cbBuildings.setAttribute(
  "style",
  `
position: relative; 
top: 2px;
right: 27px;
`
);
cbBuildings.addEventListener("click", () => {
  storageSet("cbBuildings", cbBuildings.checked);
  gameRoute.buildings = cbBuildings.checked;
  storageSet("gameRoute", gameRoute);
});
cbBuildings.checked = gameRoute.buildings;

let labelGalaxySpy = document.createElement("label");
labelGalaxySpy.innerText = "Galaxy Spy";
labelGalaxySpy.setAttribute(
  "style",
  `
display: block;
position: relative; 
top: 18px;
`
);

let cbGalaxySpy = document.createElement("input");
cbGalaxySpy.setAttribute("id", "cbGalaxySpy");
cbGalaxySpy.setAttribute("type", "checkbox");
cbGalaxySpy.checked = gameRoute.galaxySpy;
cbGalaxySpy.setAttribute(
  "style",
  `
position: relative; 
top: 2px;
right: 27px;
`
);
cbGalaxySpy.addEventListener("click", () => {
  storageSet("cbGalaxySpy", cbGalaxySpy.checked);
  gameRoute.galaxySpy = cbGalaxySpy.checked;
  storageSet("gameRoute", gameRoute);
  pageRefresh();
});
cbGalaxySpy.checked = gameRoute.galaxySpy;

let labelDiscovery = document.createElement("label");
labelDiscovery.innerText = "Keşif Yap";
labelDiscovery.setAttribute(
  "style",
  `
display: block;
position: relative; 
top: 18px;
`
);

let cbDiscovery = document.createElement("input");
cbDiscovery.setAttribute("id", "cbDiscovery");
cbDiscovery.setAttribute("type", "checkbox");
cbDiscovery.checked = gameRoute.discovery;
cbDiscovery.setAttribute(
  "style",
  `
position: relative; 
top: 2px;
right: 27px;
`
);
cbDiscovery.addEventListener("click", () => {
  storageSet("cbDiscovery", cbDiscovery.checked);
  gameRoute.discovery = cbDiscovery.checked;
  storageSet("gameRoute", gameRoute);
  pageRefresh();
});
cbDiscovery.checked = gameRoute.discovery;

let btnTest = document.createElement("button");
btnTest.innerText = "Test";
btnTest.setAttribute(
  "style",
  `
  width: 80px;
position: relative; 
right: 20px;
top: 23px;
`
);
btnTest.addEventListener("click", () => {
  enemyAttack();
});

// let myDiv = document.createElement("div");
// myDiv.setAttribute('id', 'myDiv');

//document.getElementById("pageContent").append(myDiv);
document.getElementById("left-menu-1").append(labelGalaxySpyValue);
document.getElementById("left-menu-1").append(inputSpyGalaxyValue);
document.getElementById("left-menu-1").append(inputSpySystemValue);
// document.getElementById("left-menu-1").append(btngalaxyLeft);
document.getElementById("left-menu-1").append(btngalaxyRight);
document.getElementById("left-menu-1").append(btngalaxyStop);
document.getElementById("left-menu-1").append(btnMessageClear);
// document.getElementById("left-menu-1").append(btnspyReportsAttack);
// document.getElementById("left-menu-1").append(btnenemyLootAttack);
document.getElementById("left-menu-1").append(labelSpyReportDefence);
document.getElementById("left-menu-1").append(cbSpyReportDefence);

document.getElementById("left-menu-1").append(labelSpyReportFleet);
document.getElementById("left-menu-1").append(cbSpyReportFleet);
document.getElementById("left-menu-1").append(labelBuildings);
document.getElementById("left-menu-1").append(cbBuildings);
document.getElementById("left-menu-1").append(labelGalaxySpy);
document.getElementById("left-menu-1").append(cbGalaxySpy);
document.getElementById("left-menu-1").append(labelDiscovery);
document.getElementById("left-menu-1").append(cbDiscovery);
document.getElementById("left-menu-1").append(btnTest);

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
  _lastRefleshTime = "",
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

function mathStabileRound(number) {
  const roundedNumber = Math.round(number + 1);
  if (roundedNumber - 1 > number) return Math.round(number);
  else return roundedNumber;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getIdItem(itemId = "") {
  const domElement = document.getElementById(itemId);
  if (domElement !== null) return domElement;
  else return false;
}

function getDOMItem(itemName = ".", attribute, searchValue) {
  const domElement = document.querySelector(
    `${itemName}[${attribute}='${searchValue}']`
  );
  if (domElement !== null) return domElement;
  else return false;
}
function getDOMItems(itemName = ".", attribute, searchValue) {
  const domElement = document.querySelectorAll(
    `${itemName}[${attribute}='${searchValue}']`
  );
  if (domElement !== null) return domElement;
  else return false;
}
function getSearchInItem(
  htmlItem = document,
  itemName = ".",
  attribute,
  searchValue
) {
  const domElement = htmlItem.querySelector(
    `${itemName}[${attribute}='${searchValue}']`
  );
  if (domElement !== null) return domElement;
  else return false;
}
function getSearchInItems(
  htmlItem = document,
  itemName = ".",
  attribute,
  searchValue
) {
  const domElement = htmlItem.querySelectorAll(
    `${itemName}[${attribute}='${searchValue}']`
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

let _totalPlanetCount = 0,
  _currentPlanet = 0,
  _currentPlanetGalaxy = 0,
  _currentPlanetSysyem = 0;
function dataInitialize() {
  //Düşman Saldırıyor Mu
  const header = getIdItem("header");
  if (header) {
    if (header.children[3].getAttribute("class").search("hostile") > -1) {
      gameStatusBefore = gameStatus;
      gameStatus = "UNDERATTACK";

      storageSet("gameStatusBefore", gameStatusBefore);
      storageSet("gameStatus", gameStatus);
    } else {
      if (storageGet("gameStatusBefore") !== "NONE") {
        gameStatus = storageGet("gameStatusBefore");
        gameStatusBefore = "NONE";

        storageSet("gameStatus", gameStatus);
        storageSet("gameStatusBefore", gameStatusBefore);
      }
    }
  }
  //Madenleri Al
  const metal_amount = getIdItem("metal-amount");
  if (metal_amount) {
    _resources_metal = metal_amount.innerText.replaceAll(".", "");
    _resources_crystal = getIdItem("crystal-amount").innerText.replaceAll(
      ".",
      ""
    );
    _resources_deuterium = getIdItem("deuterium-amount").innerText.replaceAll(
      ".",
      ""
    );
    _resources_energy = getDOMItems(
      "span",
      "class",
      "resource-amount"
    )[3].innerText.replaceAll(".", "");

    // _resources_metal = _resources_metal.replaceAll('.','')
    // _resources_crystal = _resources_crystal.replaceAll('.','')
    // _resources_deuterium = _resources_deuterium.replaceAll('.','')
    // _resources_energy = _resources_energy.replaceAll('.','')
  }

  //Kaynaklar Bölümündeki Binaları Al
  const buildings_container = getIdItem("buildings-container");
  if (buildings_container) {
    const content = getDOMItem("div", "class", "content");
    if (content) {
      for (
        i = 0;
        i < buildings_container.children[1].children[1].children.length;
        i++
      ) {
        if (i === 0)
          _metalMine =
            buildings_container.children[1].children[1].children[i].children[0]
              .children[0].innerText;
        else if (i === 1)
          _crystalMine =
            buildings_container.children[1].children[1].children[i].children[0]
              .children[0].innerText;
        else if (i === 2)
          _deuteriumMine =
            buildings_container.children[1].children[1].children[i].children[0]
              .children[0].innerText;
        else if (i === 3)
          _solarPlant =
            buildings_container.children[1].children[1].children[i].children[0]
              .children[0].innerText;
      }
    }
  }

  //Araştırmaları Al
  const research_container = getIdItem("research-container");
  if (research_container) {
    for (
      i = 30;
      i < research_container.children[1].children[1].children.length;
      i++
    ) {}
  }

  //Galaxi Bilgilerini Al
  const galaxyInput = getIdItem("galaxyInput");
  const systemInput = getIdItem("systemInput");
  if (galaxyInput) {
    _currentGalaxy = parseInt(galaxyInput.value);
    _currentSystem = parseInt(systemInput.value);
  }

  //Gezegen Bilgilerini Al
  const other_planets = getIdItem("other-planets");
  if (other_planets) {
    _totalPlanetCount = parseInt(other_planets.children.length);

    for (let i = 0; i < other_planets.children.length; i++) {
      if (
        other_planets.children[i].getAttribute("class") ===
        "planet-item  selected"
      ) {
        _currentPlanet = i;
        break;
      }
    }
  }

  //Filo Bilgilerini Al
  const fleet_content = getIdItem("fleet-content");
  if (fleet_content) {
    let fleetTextArr =
      fleet_content.children[0].children[0].children[0].children[1].innerText
        .substring(9)
        .split("/");
    storageSet("currentFleet", fleetTextArr[0]);
    storageSet("totalFleet", fleetTextArr[1]);

    let discoveryTextArr =
      fleet_content.children[0].children[0].children[0].children[2].innerText
        .substring(10)
        .split("/");
    storageSet("currentDiscovery", discoveryTextArr[0]);
    storageSet("totalDiscovery", discoveryTextArr[1]);
  }
}
dataInitialize();

let arrPlanetBuildings = [];

function buildingsStart() {
  const buildings_container = getIdItem("buildings-container");
  if (buildings_container) {
    const buildings = buildings_container.children[1].children[1].children;
    let buildingsSerie = new PlanetBuildingsSerie();
    for (let i = 0; i < 4; i++) {
      const buildingVal = buildings[i].children[0].children[0].innerText;
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
    arrPlanetBuildings = storageGet("arrPlanetBuildings");
    if (!arrPlanetBuildings) arrPlanetBuildings = [];
    arrPlanetBuildings[_currentPlanet] = buildingsSerie;
    console.log("arrPlanetBuildings", arrPlanetBuildings);
    storageSet("arrPlanetBuildings", arrPlanetBuildings);
    console.log(storageGet("arrPlanetBuildings"));
  } else {
    const left_menu = getIdItem("left-menu-1");
    if (left_menu) left_menu.children[1].children[0].click();
  }
}

let clickEvent = new MouseEvent("click", {
  view: window,
  bubbles: true,
  cancelable: false,
});

function galaxyStart(direction) {
  if (!direction.start) return;
  console.log("direction", direction);
  const galaxyContainer = getIdItem("galaxy-container");
  if (galaxyContainer) {
    const galaxyInput =
      galaxyContainer.children[0].children[0].children[0].children[2];
    const systemInput =
      galaxyContainer.children[0].children[0].children[1].children[2];

    if (
      _currentGalaxy !== direction.galaxy ||
      _currentSystem !== direction.system
    ) {
      console.log("eşit değil");
      galaxyInput.value = direction.galaxy;
      systemInput.value = direction.system;
      galaxyContainer.children[0].children[0].children[2].children[0].dispatchEvent(
        clickEvent
      );
      return;
    }

    const maxFleetErr = getDOMItem(
      "button",
      "class",
      "swal2-confirm swal2-styled"
    );
    if (maxFleetErr) {
      maxFleetErr.click();
      const decreaseSpySkip = parseInt(storageGet("intSpySkip")) - 1;
      storageSet("intSpySkip", decreaseSpySkip);
      return;
    }

    let isSpySend = false;
    let intSpySkip = StorageGetInitialize("intSpySkip", 0);
    let spySkip = 0;
    const galaxyRows =
      galaxyContainer.children[0].children[1].children[0].children;
    for (let i = 1; i < galaxyRows.length - 1; i++) {
      const currentRowClass = galaxyRows[i].getAttribute("class");
      if (
        currentRowClass.search("filterInactive") > -1 &&
        currentRowClass.search("filterVacation") < 0
      ) {
        console.log("intSpySkip", intSpySkip);
        if (intSpySkip <= spySkip) {
          galaxyRows[i].children[6].children[0].dispatchEvent(clickEvent);
          isSpySend = true;

          storageSet("intSpySkip", (intSpySkip += 1));
          break;
        } else spySkip += 1;
      }
    }

    if (isSpySend) return;
    storageSet("intSpySkip", 0);
    if (direction.direction === 1) {
      direction.system = direction.system - 1;
      const stopSystemVal = getRndInteger(1, 60);
      console.log("stopSystemVal", typeof stopSystemVal);
      console.log("direction.system", typeof direction.system);
      if (stopSystemVal > direction.system) {
        direction.galaxy = direction.galaxy - 1;

        if (direction.galaxy < 1) {
          direction.start = false;
          clearInterval(galaxySpyInterval);
          gameStatus = "MESSAGE";
          storageSet("gameStatus", gameStatus);
        } else
          galaxyContainer.children[0].children[0].children[2].children[0].dispatchEvent(
            clickEvent
          );
      }
    } else if (direction.direction === 0) {
      console.log("direction.system", direction.system);
      direction.system = direction.system + 1;
      console.log("direction.system", direction.system);
      const stopSystemVal = getRndInteger(440, 499);
      if (stopSystemVal < direction.system) {
        direction.galaxy = direction.galaxy + 1;

        if (direction.galaxy > 4) {
          direction.start = false;
          clearInterval(galaxySpyInterval);
          gameStatus = "MESSAGE";
          storageSet("gameStatus", gameStatus);
        } else
          galaxyContainer.children[0].children[0].children[2].children[0].dispatchEvent(
            clickEvent
          );
      }
    }

    storageSet("galaxySpy", {
      galaxy: direction.galaxy,
      system: direction.system,
      direction: direction.direction,
      start: direction.start,
    });
    console.log("galaxySpy", storageGet("galaxySpy"));
  } else {
    const left_Menu = getIdItem("left-menu-1");
    if (left_Menu) left_Menu.children[8].children[0].click();
  }
}

function cargoCapacity() {
  let returnVal = false;
  if (lightCargoCapacity < 1 || heavyCargoCapacity < 1) {
    const hangar_container = getIdItem("hangar-container");
    if (hangar_container) {
      if (lightCargoCapacity < 1) {
        const ship_info_modal = getIdItem("ship-info-modal");
        const detail_LIGHT_CARGO = getIdItem("detail-LIGHT_CARGO");
        if (ship_info_modal) {
          const lightCargoCap =
            ship_info_modal.children[1].children[2].children[0].children[1].children[5].children[2].innerText.replaceAll(
              ".",
              ""
            );
          storageSet("lightCargoCapacity", lightCargoCap);
        } else if (detail_LIGHT_CARGO) {
          detail_LIGHT_CARGO.children[1].children[1].click();
        } else {
          hangar_container.children[2].children[1].children[3].children[0].click();
        }
      } else if (heavyCargoCapacity < 1) {
        const ship_info_modal = getIdItem("ship-info-modal");
        const detail_HEAVY_CARGO = getIdItem("detail-HEAVY_CARGO");
        if (ship_info_modal) {
          const heavyCargoCap =
            ship_info_modal.children[1].children[2].children[0].children[1].children[5].children[2].innerText.replaceAll(
              ".",
              ""
            );
          storageSet("heavyCargoCapacity", heavyCargoCap);
        } else if (detail_HEAVY_CARGO) {
          detail_HEAVY_CARGO.children[1].children[1].click();
        } else {
          hangar_container.children[2].children[1].children[4].children[0].click();
        }
      }
    } else {
      const left_menu = getIdItem("left-menu-1");
      if (left_menu) left_menu.children[5].children[0].click();
    }
  } else returnVal = true;
  return returnVal;
}

class Helper extends String {
  static resourceTextClear(val) {
    return val.replaceAll(" ", "").replaceAll(":", "").replaceAll(".", "");
  }
}

function messageClear() {
  const knownCargoCapacity = cargoCapacity();
  if (!knownCargoCapacity) return;
  const messages_container = getIdItem("messages-container");
  if (messages_container) {
    if (
      messages_container.children[1].children[0].children[0]
        .getAttribute("class")
        .search("active") > -1
    ) {
      const subnav_espionage = getIdItem("subnav-espionage");
      if (subnav_espionage.getAttribute("class").search("active") > -1) {
        const fleet_messages_tab = getIdItem("fleet-messages-tab");
        const messageRow = fleet_messages_tab.children[1].children;

        //Message Yoksa
        // if (messageRow.length < 3 && gameStatus === "MESSAGE") {
        if (messageRow.length < 3) {
          console.log("Message Not Found");
          gameStatus = "NONE";
          storageSet("gameStatus", gameStatus);
          const left_menu = getIdItem("left-menu-1");
          if (left_menu) left_menu.children[0].children[0].click();
          return;
        }

        for (let i = 1; i < messageRow.length - 2; i++) {
          if (messageRow[i].children[3].children.length > 1) {
            const messageContentTable =
              messageRow[i].children[2].children[0].children[0].children[0];
            //Filo veya Savunma Rapor Detayında Varmı

            if (
              messageContentTable.children[1].children[1].children[0]
                .childElementCount > 0 &&
              messageContentTable.children[2].children[1].children[0]
                .childElementCount > 0
            ) {
              const fleetPoint = parseInt(
                messageContentTable.children[1].children[1].children[0].children[0].innerText
                  .substring(6)
                  .replaceAll(".", "")
              );
              const defencePoint = parseInt(
                messageContentTable.children[2].children[1].children[0].children[0].innerText
                  .substring(16)
                  .replaceAll(".", "")
              );
              if (fleetPoint < 1 && defencePoint < 1) {
                totalResource = parseInt(
                  Helper.resourceTextClear(
                    messageContentTable.children[1].children[0].children[0]
                      .innerText
                  )
                );
                totalResource += parseInt(
                  Helper.resourceTextClear(
                    messageContentTable.children[2].children[0].children[0]
                      .innerText
                  )
                );
                totalResource += parseInt(
                  Helper.resourceTextClear(
                    messageContentTable.children[3].children[0].children[0]
                      .innerText
                  )
                );
                if (totalResource > 500000000) {
                  const coordinateArr = messageRow[
                    i
                  ].children[1].children[0].children[0].children[0].innerText
                    .substring(8)
                    .replaceAll("]", "")
                    .split(":");
                  console.log("coordinateArr", coordinateArr);
                  console.log("totalResource", totalResource);
                  storageSet("attackCoordinate", coordinateArr);

                  gameStatus = "ATTACK";
                  storageSet("gameStatus", gameStatus);
                  storageSet("totalResource", totalResource);

                  messageRow[i].children[3].children[5].click();
                  break;
                } else {
                  messageRow[i].children[1].children[1].children[1].click();
                  break;
                }
              } else {
                messageRow[i].children[1].children[1].children[1].click();
                break;
              }
            } else {
              messageRow[i].children[1].children[1].children[1].click();
              break;
            }
          } else {
            messageRow[i].children[1].children[1].children[1].click();
            break;
          }
        }
      } else {
        subnav_espionage.click();
      }
    } else {
      messages_container.children[1].children[0].children[0].children[0].click();
    }
  } else {
    const header = getIdItem("header");
    if (header) {
      console.log("go messages");
      header.children[2].children[0].click();
    }
  }
}

function enemyAttack() {
  const fleet_content = getIdItem("fleet-content");
  if (fleet_content) {
    if (totalFleet > currentFleet + 1) {
    } else {
    }
    //kaldik
  } else {
    const left_menu = getIdItem("left-menu-1");
    if (left_menu) left_menu.children[7].children[0].click();
  }
}

let totalDiscovery = StorageGetInitialize("totalDiscovery", 0);
let currentDiscovery = StorageGetInitialize("currentDiscovery", 0);

let totalFleet = StorageGetInitialize("totalFleet", 0);
let currentFleet = StorageGetInitialize("currentFleet", 0);

function discoveryStart() {
  const fleetContainer = getIdItem("fleet1_content_container");
  if (fleetContainer) {
    //Keşif Kotasında Yer Var
    if (currentDiscovery < totalDiscovery) {
      for (let i = 0; i < fleetContainer.children.length; i++) {
        if (
          fleetContainer.children[i].children[0].getAttribute(
            "data-ship-type"
          ) === "LIGHT_CARGO"
        ) {
          storageSet(
            "LIGHT_CARGO",
            fleetContainer.children[
              i
            ].children[0].children[0].innerText.replaceAll(".", "")
          );
          console.log("küçük nakliye sayısı:", storageGet("LIGHT_CARGO"));
          const lightCargo = parseInt(storageGet("LIGHT_CARGO"));
        } else if (
          fleetContainer.children[i].children[0].getAttribute(
            "data-ship-type"
          ) === "HEAVY_CARGO"
        ) {
          storageSet(
            "HEAVY_CARGO",
            fleetContainer.children[
              i
            ].children[0].children[0].innerText.replaceAll(".", "")
          );
          console.log("büyük nakliye sayısı:", storageGet("HEAVY_CARGO"));
          const heavyCargo = parseInt(storageGet("HEAVY_CARGO"));
          if (heavyCargo > 30000)
            fleetContainer.children[i].children[1].children[0].value = "10000";
          else
            fleetContainer.children[i].children[1].children[0].value =
              mathStabileRound(heavyCargo / 3);

          break;
        }
      }

      const expeditionHoldTime = getIdItem("expeditionHoldTime");
      const btn_submit_fleet = getIdItem("btn-submit-fleet");
      if (btn_submit_fleet) {
        expeditionHoldTime.value = "360";
        const fleet2_target_z = getIdItem("fleet2_target_z");
        fleet2_target_z.value = 16;
        btn_submit_fleet.click();
      }

      const btn_next_fleet3 = getIdItem("btn-next-fleet3");
      if (btn_next_fleet3) {
        btn_next_fleet3.click();
      }

      const btn_next_fleet2 = getIdItem("btn-next-fleet2");
      if (btn_next_fleet2) {
        btn_next_fleet2.click();
      }
    } else {
      //Keşif Kotası Dolu
      console.log("Keşif Kotası Dolu");

      const fleet_movement_detail_btn = getIdItem("fleet-movement-detail-btn");
      const fleet_movement_table = getIdItem("fleet-movement-table");
      if (fleet_movement_table) {
        let lastDiscoveryRemainingTime = null;
        for (
          let i = 0;
          i < fleet_movement_table.children[0].children.length;
          i++
        ) {
          const fleetRow = fleet_movement_table.children[0].children[i];

          if (
            fleetRow.children[4].children[0].children[0].getAttribute("src") ===
              "/assets/images/fleet-movement-icon-reverse.gif?v=2" &&
            fleetRow.children[1].children[0].getAttribute("src") ===
              "/assets/images/V2/mission/EXPEDITION.png?v=2"
          ) {
            lastDiscoveryRemainingTime = fleetRow.children[0].getAttribute(
              "data-remaining-seconds"
            );
            gameTimer.discovery =
              parseInt(lastDiscoveryRemainingTime) +
              mathStabileRound(Date.now() / 1000) +
              5;
            storageSet("gameTimer", gameTimer);
            break;
          }
        }
      } else if (fleet_movement_detail_btn) {
        fleet_movement_detail_btn.click();
      }
    }
  } else {
    const leftMenu = getIdItem("left-menu-1");
    if (leftMenu) leftMenu.children[7].children[0].click();
  }
}

let intervalDiscovery, intervalNone, galaxySpyInterval, messageInterval;

(() => {
  const currentTimeSpan = mathStabileRound(Date.now() / 1000);

  console.log("gameTimer", gameTimer);
  console.log("gameRoute", gameRoute);
  console.log("gameStatus", gameStatus);
  // console.log("currentTimeSpan", currentTimeSpan);

  if (
    gameStatus === gameEnum.NONE &&
    gameRoute.discovery &&
    (gameTimer.discovery === 0 || gameTimer.discovery < currentTimeSpan)
  ) {
    console.log("discovery start");
    gameStatus = gameEnum.DISCOVERY;
    storageSet("gameStatus", gameStatus);
  } else if (
    gameStatus === gameEnum.NONE &&
    gameRoute.galaxySpy &&
    (gameTimer.galaxySpy === 0 || gameTimer.galaxySpy < currentTimeSpan)
  ) {
    gameStatus = gameEnum.GALAXYSPY;
    storageSet("gameStatus", gameStatus);
  }

  switch (gameStatus) {
    case gameEnum.DISCOVERY:
      if (_currentPlanet !== 0) {
        const other_planets = getIdItem("other-planets");
        if (other_planets) other_planets.children[0].children[0];
      } else
        intervalDiscovery = setInterval(() => {
          discoveryStart();
        }, 2000);
    case gameEnum.GALAXYSPY:
      galaxySpyInterval = setInterval(() => {
        const direction = storageGet("galaxySpy");
        if (direction.start) {
          dataInitialize();
          const swal2_actions = getDOMItem("div", "class", "swal2-actions");
          if (swal2_actions) swal2_actions.children[0].click();
          else galaxyStart(direction);
        }
      }, 1500);
    case gameEnum.MESSAGE:
      messageInterval = setInterval(() => {
        //  messageClear();
      }, 1500);
    case gameEnum.ATTACK:

    case gameEnum.NONE:
      intervalNone = setTimeout(() => {
        const left_menu = getIdItem("left-menu-1");
        if (left_menu) {
          left_menu.children[0].children[0].click();
        }
      }, getRndInteger(600000, 1200000));
  }
})();

() => {
  const direction = storageGet("galaxySpy");
  if (direction.start) {
    galaxySpyInterval = setInterval(() => {
      dataInitialize();
      const swal2_actions = getDOMItem("div", "class", "swal2-actions");
      if (swal2_actions) swal2_actions.children[0].click();
      else galaxyStart(direction);
    }, 3000);
  }
};
