"use strict";

const navEle = document.getElementById("sidebar");
const importBtn = document.getElementById("import-btn");
const petArr = getFromStorage("petArr") ?? [];
const importData = [];
const filterArr = [];

// How to save (export) files to user computer
function saveDynamicDataToFile() {
  const petInfo = JSON.stringify(petArr);

  const blob = new Blob([petInfo], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "petinfo.txt");
}

// How to read an uploaded file and import
function onFileLoad(elementId, event) {
  // Read file and print out to screen
  // document.getElementById(elementId).innerText = event.target.result;
  console.log(event);
  const data = JSON.parse(event.target.result);
  importData.push(...data);
  filterArr.push(...data);
}

function onChooseFile(event, onLoadFileHandler) {
  if (typeof window.FileReader !== "function")
    throw "The file API isn't supported on this browser.";
  let input = event.target;
  if (!input) throw "The browser does not properly implement the event object";
  if (!input.files)
    throw "This browser does not support the `files` property of the file input.";
  if (!input.files[0]) return undefined;
  let file = input.files[0];
  let fr = new FileReader();
  fr.onload = onLoadFileHandler;
  fr.readAsText(file);
}

// Kiểm tra xem ID của thú cưng trong file mới import vô có trùng với ID của thú cưng hiện tại không
// Nếu có thì ghi đè thú cưng trong file import lên thú cưng hiện tại
function overrideData(currentPetArr, importPetArr) {
  for (let i = 0; i < currentPetArr.length; i++) {
    for (let j = 0; j < importPetArr.length; j++) {
      if (currentPetArr[i].id === importPetArr[j].id) {
        currentPetArr[i] = importPetArr[j];
      }
    }
  }
}

// Kiểm tra nếu có pet mới từ import data thì sẽ thêm những pet đó vào danh sách pet hiện tại
function filterPet(currentPetArr, filterArr) {
  currentPetArr.forEach(function (pet) {
    filterArr.forEach(function (item, j) {
      if (pet.id === item.id) {
        filterArr.splice(j, 1);
      }
    });
  });
  // console.log(filterArr);
  petArr.push(...filterArr);
}

importBtn.addEventListener("click", function () {
  console.log(importData);
  overrideData(petArr, importData);
  filterPet(petArr, filterArr);

  // Lưu danh sách thú cưng vào localStorage sau khi đã thực hiện việc kiểm tra ID có trùng hay không.
  saveToStorage("petArr", petArr);
});

navEle.addEventListener("click", function () {
  navEle.classList.toggle("active");
});
