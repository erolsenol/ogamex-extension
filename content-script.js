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
wight: 80px;
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
btngalaxyRight.innerText = "Galaxy Right";
btngalaxyRight.setAttribute(
  "style",
  `
wight: 80px;
position: relative; 
top: 15px;
`
);
btngalaxyRight.addEventListener("click", () => {
  galaxyStart(
    JSON.stringify({
      galaxy: "right",
      direction: true,
      stop: getRndInteger(300, 350),
    })
  );
});

let btngalaxyStop = document.createElement("button");
btngalaxyStop.innerText = "Galaxy Stop";
btngalaxyStop.setAttribute(
  "style",
  `
wight: 80px;
position: relative; 
top: 18px;
`
);
btngalaxyStop.addEventListener("click", () => {
  galaxyStart(JSON.stringify({ galaxy: "none", direction: false }));
});

let intervalSpyReportAttack;
// let btnspyReportsAttack = document.createElement("button");
// btnspyReportsAttack.innerText = "Spy Reports Clear";
// btnspyReportsAttack.setAttribute(
//   "style",
//   `
// wight: 100px;
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
// wight: 100px;
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

// let myDiv = document.createElement("div");
// myDiv.setAttribute('id', 'myDiv');

//document.getElementById("pageContent").append(myDiv);
document.getElementById("left-menu-1").append(labelGalaxySpyValue);
document.getElementById("left-menu-1").append(inputSpyGalaxyValue);
document.getElementById("left-menu-1").append(inputSpySystemValue);
document.getElementById("left-menu-1").append(btngalaxyLeft);
document.getElementById("left-menu-1").append(btngalaxyRight);
document.getElementById("left-menu-1").append(btngalaxyStop);
// document.getElementById("left-menu-1").append(btnspyReportsAttack);
// document.getElementById("left-menu-1").append(btnenemyLootAttack);
document.getElementById("left-menu-1").append(labelSpyReportDefence);
document.getElementById("left-menu-1").append(cbSpyReportDefence);

document.getElementById("left-menu-1").append(labelSpyReportFleet);
document.getElementById("left-menu-1").append(cbSpyReportFleet);

function storageSet(fieldName, value) {
  localStorage.setItem(fieldName, value);
}
function storageGet(fieldName) {
  return localStorage.getItem(fieldName);
}

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

let _totelPlanetCount = 0, _currentPlanetGalaxy = 0, _currentPlanetSysyem = 0;
function dataInitialize(){
  //Madenleri Al
  const header = getIdItem('header')
  if(header) {
    _resources_metal = getIdItem('metal-amount').replaceAll('.','')
    _resources_crystal = getIdItem('crystal-amount').replaceAll('.','')
    _resources_deuterium = getIdItem('deuterium-amount').replaceAll('.','')
    _resources_energy = getIdItem('resource-amount').replaceAll('.','')
  }

  //Kaynaklar Bölümündeki Binaları Al
  const buildings_container = getIdItem('buildings-container');
  if(buildings_container) {
    const content = getDOMItem('div','class','content')
    if(content) {
      for(i = 0; i < buildings_container.children[1].children[1].children.length; i++) {
        if(i === 0)
        _metalMine = buildings_container.children[1].children[1].children[i].children[0].children[0].innerText
        else if (i === 1)
        _crystalMine = buildings_container.children[1].children[1].children[i].children[0].children[0].innerText
        else if (i === 2)
        _deuteriumMine = buildings_container.children[1].children[1].children[i].children[0].children[0].innerText
        else if (i === 3)
        _solarPlant = buildings_container.children[1].children[1].children[i].children[0].children[0].innerText
      }
    }
  }

  //Araştırmaları Al
  const research_container = getIdItem('research-container');
  if(research_container){
    for (i = 30; i < research_container.children[1].children[1].children.length; i++) {
      
      
    }
  }

  //Galaxi Bilgilerini Al
  const galaxyInput = getIdItem('galaxyInput');
  const systemInput = getIdItem('systemInput');
  if(galaxyInput) {
    _currentPlanetGalaxy = parseInt(galaxyInput.getAttribute('value'))
    _currentPlanetSysyem = parseInt(systemInput.getAttribute('value'))

    _currentGalaxy = parseInt(galaxyInput.value)
    _currentSystem = parseInt(systemInput.value)
  }

  //Gezegen Bilgilerini Al
  const other_planets = getIdItem('other-planets');
  if(other_planets) {
    _totelPlanetCount = parseInt(other_planets.children.length)
  }
}
dataInitialize()

function galaxyStart(direction){
  localStorage.setItem('galaxyDirection',direction)
}

function galaxySpy(direction){
  const galaxy_container = getIdItem('galaxy-container');
  if(galaxy_container) {
    const galaxyRow = galaxy_container.children[0].children[1].children[0].children
    for(i = 1; i < galaxyRow.length; i++) {
      if(galaxyRow[i].getAttribute('class') === 'galaxy-item ') {
        if(galaxyRow[i].children[6].children.length > 1) {
          galaxyRow[i].children[6].children[0].click()
          const prob = parseInt(localStorage.getItem('sendProb'))
          localStorage.setItem('sendProb', prob++)
        }
        
      }
    }
  } else {
    const left_menu = getIdItem('left-menu-1')
    if(left_menu)
    left_menu.children[7].click()
  }

}

(() => {
  const galaxyDirection = JSON.parse(localStorage.getItem('galaxyDirection'))
  galaxySpy(galaxyDirection)
})()