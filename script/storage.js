"use strict";

// Lưu object vào local storage
function saveToStorage(key, value) {
  // Phải dùng phương thức JSON.stringify để biến  object thành string thì mới lưu được
  // do local storage chỉ lưu được string, number và boolean
  localStorage.setItem(key, JSON.stringify(value));
}

// Lấy dữ liệu từ local storage
function getFromStorage(key, df) {
  // Dùng method JSON.parse để biến dữ liệu đang ở dạng string thành object
  const data = JSON.parse(localStorage.getItem(key));
  return data ?? df;
}
