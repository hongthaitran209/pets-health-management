"use strict";

const navEle = document.getElementById("sidebar");
const tableBodyEle = document.getElementById("tbody");
const submitBtn = document.getElementById("submit-btn");
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
const healthyBtn = document.getElementById("healthy-btn");
const bmiBtn = document.getElementById("bmi-btn");
const petArr = getFromStorage("petArr") ?? [];
const breedArr = getFromStorage("breedArr") ?? [];

let healthyCheck = true;

// Xóa dữ liệu mẫu của table nhưng vẫn giữ dữ liệu tham khảo bên HTML
// tableBodyEle.innerHTML = "";
renderTableData(petArr);

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

  // Kiểm tra xem ID mà user nhập có trùng với ID nào trước đó chưa
  if (petArr) {
    for (let i = 0; i < petArr.length; i++) {
      if (petData.id === petArr[i].id) {
        alert("ID must be unique");
        return false;
      }
    }
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
      <td><button type="button" class="btn btn-danger" onclick="deletePet('${
        arr[i].id
      }')">Delete</button>
      </td></tr>`;
  }
  tableBodyEle.innerHTML = text;
}

// Hàm renderBreed() sẽ được gọi khi người dùng thay đổi type trên giao diện người dùng.
// Tham số type được truyền vào từ phương thức onchange được định nghĩa ở file edit.html
function renderBreed(type) {
  // console.log(type);
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

  // if (type === "Dog") {
  //   const dogsArr = breedArr.filter(function (item) {
  //     return item.type === "Dog";
  //   });
  //   breedInput.innerHTML = "<option>Select Breed</option>";
  //   dogsArr.forEach(function (dog) {
  //     const optionEle = document.createElement("option");
  //     optionEle.innerHTML = `${dog.breed}`;
  //     breedInput.appendChild(optionEle);
  //     console.log(optionEle);
  //   });
  // } else if (type === "Cat") {
  //   const catsArr = breedArr.filter(function (item) {
  //     return item.type === "Cat";
  //   });
  //   breedInput.innerHTML = "<option>Select Breed</option>";
  //   catsArr.forEach(function (cat) {
  //     const optionEle = document.createElement("option");
  //     optionEle.innerHTML = `${cat.breed}`;
  //     breedInput.appendChild(optionEle);
  //   });
  // }
}

// Xóa dòng dữ liệu khi người dùng xác nhận cần xóa.
const deletePet = function (petId) {
  // Phương thức confirm() sẽ trả về true nếu user nhấn Ok
  if (confirm("Are you sure!")) {
    let index = "";
    // Tìm vị trí của thú cưng có id trùng với id mà user cần xóa
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === petId) {
        index = i;
      }
    }

    // Xóa dữ liệu của thú cưng tại vị trí vừa tìm được.
    // syntax: splice(vị trí bắt đầu, số lượng items muốn xóa)
    petArr.splice(index, 1);
    saveToStorage("petArr", petArr);
    getFromStorage("petArr");
    renderTableData(petArr);
  }
};

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
  const petData = {
    id: idInput.value,
    name: nameInput.value,
    age: Number(ageInput.value),
    type: typeInput.value,
    weight: Number(weightInput.value),
    petLength: Number(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };
  // console.log(petData);

  const validate = validateData(petData);

  if (validate) {
    petArr.push(petData);
    clearInput();
    saveToStorage("petArr", petArr);
    renderTableData(petArr);
    console.log(petArr);
  }
});

healthyBtn.addEventListener("click", function () {
  const healthyArr = [];
  if (healthyCheck) {
    for (let i = 0; i < petArr.length; i++) {
      // Nếu tất cả các ô vaccinated, dewormed và sterilized đều được checked
      // thì sẽ thêm dữ liệu của thú cưng đó vào mảng mới healthyArr
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyArr.push(petArr[i]);
      }
    }
    renderTableData(healthyArr);
    healthyBtn.innerHTML = "Show all pet";
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthyBtn.innerHTML = "Show Healthy Pet";
    healthyCheck = true;
  }
});

navEle.addEventListener("click", function () {
  navEle.classList.toggle("active");
});
