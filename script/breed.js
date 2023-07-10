"use strict";

const navEle = document.getElementById("sidebar");
const tableBodyEle = document.getElementById("tbody");
const btnSubmit = document.getElementById("submit-btn");
const inputBreed = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");
const breedArr = getFromStorage("breedArr") ?? [];

console.log(breedArr);
renderTableData(breedArr);

function renderTableData(arr) {
  let text = "";
  for (let i = 0; i < arr.length; i++) {
    // Sau mỗi vòng lặp sẽ thêm đoạn code HTML này vào biến text
    // để có thể render ra tất cả dữ liệu có trong mảng.
    text += `<tr>
      <td>${i + 1}</td>
      <td>${arr[i].breed}</td>
      <td>${arr[i].type}</td>
      <td><button type="button" class="btn btn-danger" onclick="deleteBreed(${i})">Delete</button>
      </td></tr>`;
  }
  tableBodyEle.innerHTML = text;
}

// Xóa dòng dữ liệu khi người dùng xác nhận cần xóa.
const deleteBreed = function (breedId) {
  // Phương thức confirm() sẽ trả về true nếu user nhấn Ok
  if (confirm("Are you sure!")) {
    let index = 0;
    // Tìm vị trí của breed có id trùng với id mà user cần xóa
    for (let i = 0; i < breedArr.length; i++) {
      if (i === breedId) {
        index = i;
      }
    }

    // Xóa dữ liệu của breed tại vị trí vừa tìm được.
    // syntax: splice(vị trí bắt đầu, số lượng items muốn xóa)
    breedArr.splice(index, 1);
    saveToStorage("breedArr", breedArr);
    renderTableData(breedArr);
  }
};

function clearInput() {
  inputBreed.value = "";
  inputType.value = "Select Type";
}

function validateData(breedData) {
  if (breedData.breed === "" || breedData.type === "Select Type") {
    alert("Please enter your information");
    return false;
  }

  // Kiểm tra nếu breed mới do người dùng nhập vào đã có sẵn trong list hay chưa
  for (let i = 0; i < breedArr.length; i++) {
    if (
      breedArr[i].breed === breedData.breed &&
      breedArr[i].type === breedData.type
    ) {
      alert("This breed is already in the list");
      return false;
    }
  }

  return true;
}

// Submit breed mới
btnSubmit.addEventListener("click", function () {
  const data = {
    breed: inputBreed.value,
    type: inputType.value,
  };
  // console.log(data);
  const validate = validateData(data);
  console.log("validate", validate);
  if (validate) {
    breedArr.push(data);
    saveToStorage("breedArr", breedArr);
    renderTableData(breedArr);
    clearInput();
  }
});

navEle.addEventListener("click", function () {
  navEle.classList.toggle("active");
});
