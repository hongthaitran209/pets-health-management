"use strict";

const navEle = document.getElementById("sidebar");
const tableBodyEle = document.getElementById("tbody");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");
const petArr = getFromStorage("petArr");
const breedArr = getFromStorage("breedArr");

renderTableData(petArr);
renderBreed();
function renderTableData(arr) {
  let text = "";
  for (let i = 0; i < arr.length; i++) {
    // Sau mỗi vòng lặp sẽ thêm đoạn code HTML này vào biến text
    // để có thể render ra tất cả dữ liệu có trong mảng.
    text += `<tr><th scope="row">${arr[i].id}</th>
      <td>${arr[i].name}</td>
      <td>${arr[i].age}</td>
      <td>${arr[i].type}</td>
      <td>${arr[i].weight}</td>
      <td>${arr[i].petLength}</td>
      <td>${arr[i].breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${arr[i].color}"></i>
      </td>
      <td><i class="bi ${
        arr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        arr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        arr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td>${arr[i].date}</td>
      </td></tr>`;
  }
  tableBodyEle.innerHTML = text;
}

function renderBreed() {
  breedArr.forEach(function (value) {
    const optionEle = document.createElement("option");
    optionEle.innerHTML = `${value.breed}`;
    breedInput.appendChild(optionEle);
  });
}

findBtn.addEventListener("click", function searchPet() {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  let searchArr = petArr.filter(function (item) {
    return (
      // Kiểm tra xem ký tự người dùng nhập vào có nằm trong dữ liệu đã có hay không.
      item.name.includes(data.name) &&
      item.id.includes(data.id) &&
      item.type === data.type &&
      item.breed === data.breed &&
      item.vaccinated === data.vaccinated &&
      item.dewormed === data.dewormed &&
      item.sterilized === data.sterilized
    );
  });
  // console.log(searchArr);
  renderTableData(searchArr);
});

navEle.addEventListener("click", function () {
  navEle.classList.toggle("active");
});
