"use strict";

const navEle = document.getElementById("sidebar");
const tableBodyEle = document.getElementById("tbody");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const submitBtn = document.getElementById("submit-btn");
const containerFormEle = document.getElementById("container-form");
const petArr = getFromStorage("petArr") ?? [];
const breedArr = getFromStorage("breedArr") ?? [];

renderTableData(petArr);

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
      <td><button type="button" class="btn btn-warning" onclick="editPetBtn('${
        arr[i].id
      }')">Edit</button>
      </td></tr>`;
  }
  tableBodyEle.innerHTML = text;
}

function editPetBtn(petId) {
  petArr.forEach(function (item) {
    if (item.id === petId) {
      idInput.placeholder = petId;
      nameInput.value = item.name;
      ageInput.value = item.age;
      typeInput.value = item.type;
      weightInput.value = item.weight;
      lengthInput.value = item.petLength;
      colorInput.value = item.color;
      vaccinatedInput.checked = item.vaccinated;
      dewormedInput.checked = item.dewormed;
      sterilizedInput.checked = item.sterilized;
      renderBreed(item.type);
      breedInput.value = item.breed;
      containerFormEle.classList.remove("hide");
    }
  });
}

// Hàm renderBreed() sẽ được gọi khi người dùng thay đổi type trên giao diện người dùng.
// Tham số type được truyền vào từ phương thức onchange được định nghĩa ở file edit.html
function renderBreed(type) {
  console.log(type);
  breedInput.innerHTML = "<option>Select Breed</option>";
  breedArr
    .filter(function (item) {
      return item.type === type;
    })
    .forEach(function (value) {
      const optionEle = document.createElement("option");
      optionEle.innerHTML = `${value.breed}`;
      breedInput.appendChild(optionEle);
    });
}

function validateData(petData) {
  // Kiểm tra trường id và name xem user đã nhập thông tin chưa
  // Chỉ kiểm tra 2 trường này do những trường còn lại đã được kiểm tra ở những đoạn code sau
  if (petData.id === "" || petData.name === "") {
    alert("Please enter your pet information");
    return false;
  }

  if (petData.age < 1 || petData.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  }

  if (petData.weight < 1 || petData.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  }
  if (petData.petLength < 1 || petData.petLength > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  }
  if (petData.type === "Select Type") {
    alert("Please select Type!");
    return false;
  }
  if (petData.breed === "Select Breed") {
    alert("Please select Breed");
    return false;
  }

  // Khi tất cả các kiểm tra ở trên đều pass thì phải trả giá trị true về cho hàm này
  // để sau đó có thể sử dụng khi muốn thêm data vào mảng dữ liệu hay không.
  return true;
}

function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

submitBtn.addEventListener("click", function (e) {
  petArr.forEach(function (item) {
    if (item.id === idInput.placeholder) {
      item.name = nameInput.value;
      item.age = ageInput.value;
      item.type = typeInput.value;
      item.weight = weightInput.value;
      item.petLength = lengthInput.value;
      item.color = colorInput.value;
      item.vaccinated = vaccinatedInput.checked;
      item.dewormed = dewormedInput.checked;
      item.sterilized = sterilizedInput.checked;
      item.breed = breedInput.value;
      const validate = validateData(item);
      if (validate) {
        clearInput();
        containerFormEle.classList.add("hide");
        saveToStorage("petArr", petArr);
        renderTableData(petArr);
        // console.log(petArr);
      }
    }
  });
});

navEle.addEventListener("click", function () {
  navEle.classList.toggle("active");
});
