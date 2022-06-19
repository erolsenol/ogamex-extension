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

let btngalaxyLeft = document.createElement('button');
btngalaxyLeft.innerText = 'Start';
btngalaxyLeft.setAttribute(
  'style',
  `
position: relative;
top: 0px;
width: 100px;
height: 40px;
`,
);
btngalaxyLeft.addEventListener('click', () => {
  storageSet('isStart', true);
});

const headerImage = document.querySelector('.text-img');
if (headerImage) {
  headerImage.appendChild(btngalaxyLeft);
}

setInterval(() => {
  const startStatus = StorageGetInitialize('isStart', false);
  if (!startStatus) return;

  const currentUrl = window.location.href;
  console.log('window', window);

  let arrOldProductsHref = StorageGetInitialize('productHrefs', []);
  if (arrOldProductsHref.length < 1) {
    const products = document.querySelectorAll('a[rel=nofollow]');

    if (products.length > 0) {
      let arrProductsHref = [];

      for (let index = 0; index < products.length; index++) {
        if (products[index].href.includes('urun'))
          arrProductsHref.push(products[index].href);
      }
      arrOldProductsHref = arrProductsHref;
      storageSet('productHrefs', arrProductsHref);
    } else {
      console.log('no products', products);
    }
  } else {
    let isProduct =
      document.querySelector('.title-holder')?.length > 0;
    if (isProduct) {
      const ad = document.querySelector('.fancybox-close');
      if (ad) ad.click();
      const randomNumber = Math.floor(Math.random() * 10);

      let new_comment_button = document.querySelector(
        '#new-comment-button',
      );
      new_comment_button.click();
      console.log('new_comment_button', new_comment_button);
    } else {
      const productGo = StorageGetInitialize('productGo', false);
      if (productGo) {
      } else {
        storageSet('productGo', true);
        const navigateProductUrl = arrOldProductsHref[0];
        storageSet('productHrefs', arrOldProductsHref.splice(0, 1));
        window.location.replace(navigateProductUrl);
      }
    }
  }
}, 3000);
