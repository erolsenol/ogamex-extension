function storageSet(fieldName, value) {
  localStorage.setItem(fieldName, JSON.stringify(value));
}
function storageGet(fieldName) {
  return JSON.parse(localStorage.getItem(fieldName));
}

let _route = storageGet("gameRoute");
if (!_route) {
  _route = {
    planetBuildings: false,
  };
  storageSet("gameRoute", _route);
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

let labelPlanetBuildings = document.createElement("label");
labelPlanetBuildings.innerText = "Kaynakları Yükselt";
labelPlanetBuildings.setAttribute(
  "style",
  `
display: block;
position: relative; 
top: 18px;
`
);

let cbPlanetBuildings = document.createElement("input");
cbPlanetBuildings.setAttribute("id", "cbPlanetBuildings");
cbPlanetBuildings.setAttribute("type", "checkbox");
cbPlanetBuildings.checked = _route.planetBuildings;
cbPlanetBuildings.setAttribute(
  "style",
  `
position: relative; 
top: 2px;
right: 27px;
`
);
cbPlanetBuildings.addEventListener("click", () => {
  storageSet("cbPlanetBuildings", cbPlanetBuildings.checked);
  _route.planetBuildings = cbPlanetBuildings.checked;
  storageSet("gameRoute", _route);
});
_route.planetBuildings = storageGet("cbPlanetBuildings");
cbPlanetBuildings.checked = _route.planetBuildings;

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
  // Test
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
// document.getElementById("left-menu-1").append(btnspyReportsAttack);
// document.getElementById("left-menu-1").append(btnenemyLootAttack);
document.getElementById("left-menu-1").append(labelSpyReportDefence);
document.getElementById("left-menu-1").append(cbSpyReportDefence);

document.getElementById("left-menu-1").append(labelSpyReportFleet);
document.getElementById("left-menu-1").append(cbSpyReportFleet);
document.getElementById("left-menu-1").append(labelPlanetBuildings);
document.getElementById("left-menu-1").append(cbPlanetBuildings);
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

(function gameRoute() {
  switch (_route) {
    case _route.planetBuildings === true:
      break;

    default:
      break;
  }
})();

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
      console.log("eşit değil")
      galaxyInput.value = direction.galaxy;
      systemInput.value = direction.system;
      galaxyContainer.children[0].children[0].children[2].children[0].dispatchEvent(
        clickEvent
      );
      return;
    }

    let isSpySend = false;
    let intSpySkip = storageGet("intSpySkip");
    console.log("intSpySkip",intSpySkip)
    console.log("typeof intSpySkip",typeof intSpySkip)
    if (!intSpySkip) {
      intSpySkip = parseInt(0);
      storageSet("intSpySkip", intSpySkip);
    } else intSpySkip = parseInt(intSpySkip);
    const galaxyRows =
      galaxyContainer.children[0].children[1].children[0].children;
    for (let i = 1; i < galaxyRows.length - 1; i++) {
      const currentRowClass = galaxyRows[i].getAttribute("class");
      if (
        currentRowClass.search("filterInactive") > -1 &&
        currentRowClass.search("filterVacation") < 0
      ) {
        console.log("intSpySkip", intSpySkip);
        if (intSpySkip < 1) {
          galaxyRows[i].children[6].children[0].dispatchEvent(clickEvent);
          isSpySend = true;
          intSpySkip = intSpySkip += 1
          storageSet("intSpySkip", intSpySkip);
          break;
        } else intSpySkip = intSpySkip - 1;
      }
    }

    if (isSpySend) return;
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
        } else galaxyContainer.children[0].children[0].children[2].children[0].dispatchEvent(clickEvent);
      }
    } else if (direction.direction === 0) {
      console.log("direction.system", direction.system)
      direction.system = direction.system + 1;
      console.log("direction.system", direction.system)
      const stopSystemVal = getRndInteger(440, 499);
      if (stopSystemVal < direction.system) {
        direction.galaxy = direction.galaxy + 1;

        if (direction.galaxy > 4) {
          direction.start = false;
          clearInterval(galaxySpyInterval);
        } else galaxyContainer.children[0].children[0].children[2].children[0].dispatchEvent(clickEvent);
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
    if (left_Menu) left_Menu.children[7].children[0].click();
  }
}

// function galaxySpy(direction){
//   const galaxy_container = getIdItem('galaxy-container');
//   if(galaxy_container) {
//     const galaxyRow = galaxy_container.children[0].children[1].children[0].children
//     for(i = 1; i < galaxyRow.length; i++) {
//       if(galaxyRow[i].getAttribute('class') === 'galaxy-item ') {
//         if(galaxyRow[i].children[6].children.length > 1) {
//           galaxyRow[i].children[6].children[0].click()
//           const prob = parseInt(localStorage.getItem('sendProb'))
//           localStorage.setItem('sendProb', prob++)
//         }

//       }
//     }
//   } else {
//     const left_menu = getIdItem('left-menu-1')
//     if(left_menu)
//     left_menu.children[7].click()
//   }

// }

(() => {
  const direction = storageGet("galaxySpy");
  if (direction.start) {
    const galaxySpyInterval = setInterval(() => {
      dataInitialize();
      const swal2_actions = getDOMItem('div','class', 'swal2-actions')
      if (swal2_actions) swal2_actions.children[0].click()
      else
      galaxyStart(direction);
    }, 3000);
  }
})();
