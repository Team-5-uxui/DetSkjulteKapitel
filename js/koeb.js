"use strict";
let selected = null;

function selectPayment(val) {
  document.querySelectorAll(".radio-circle").forEach((el) => {
    el.classList.remove("filled");
  });
  document.querySelectorAll(".radio-option").forEach((el) => {
    el.style.border = "1px solid var(--primary-btn)";
  });

  if (selected === val) {
    selected = null;
  } else {
    document.getElementById("circle-" + val).classList.add("filled");
    document.getElementById("circle-" + val).closest(".radio-option").style.border = "2px solid #7c3db8";
    selected = val;
  }
}
