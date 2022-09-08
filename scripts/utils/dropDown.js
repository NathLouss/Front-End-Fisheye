const filterBtn = document.querySelector("#filter");
const filterList = document.querySelector("#filter_list");
const filterListOption = document.querySelectorAll(".list_option");
const filterCloseArrow = document.querySelectorAll(".list_option:first-child");

console.log("btn", filterBtn);
console.log("close", filterCloseArrow);
console.log("list", filterList);
console.log("option", filterListOption);


function openDropDown() {
    filterBtn.style.display = "none";
    filterList.style.display = "block";
    filterListOption.forEach((option) => { option.style.display = "block";
    });
};

function closeDropDown() {
    filterBtn.style.display = "block";
    filterList.style.display = "none";
    filterListOption.forEach((option) => { option.style.display = "none";
    });
};

filterBtn.addEventListener("click", () => {
    openDropDown()
});

filterList.addEventListener("click", () => {
    closeDropDown()
});