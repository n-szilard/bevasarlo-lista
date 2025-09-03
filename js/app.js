let nameField = document.getElementById("nameField");
let priceField = document.getElementById("priceField");
let countField = document.getElementById("countField");
let addBtn = document.getElementById("addBtn");
let itemsList = document.getElementById("itemsList");
let sumLbl = document.getElementById("sumLbl");

let items = [];
let sum = 0;

addBtn.addEventListener("click", () => {
    if (nameField.value == "" || priceField.value == 0 || countField.value == 0) {
        alert("Nem adtál meg minden adatot!");
        return;
    }

    items.push({
        name: nameField.value,
        price: Number(priceField.value),
        count: Number(countField.value),
        sum: priceField.value * countField.value
    });

    RefreshTable();
    ClearForm();
    Save();
});

let RefreshTable = () => {
    itemsList.innerHTML = "";
    for (let i = 0; i < items.length; i++) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");

        td3.classList.add("text-end");
        td4.classList.add("text-end");
        td5.classList.add("text-end");

    
        sum += items[i].sum;

        td1.innerHTML = i+1 + ".";
        td2.innerHTML = items[i].name;
        td3.innerHTML = items[i].price + " Ft";
        td4.innerHTML = items[i].count;
        td5.innerHTML = items[i].sum + " Ft";

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)

        itemsList.appendChild(tr);
    }

    sumLbl.innerHTML = sum;
}

let ClearForm = () => {
    nameField.value = "";
    priceField.value = 0;
    countField.value = 0;
}

let Save = () => {
    localStorage.setItem("bevLista", JSON.stringify(items))
}

let Load = () => {
    if (localStorage.getItem("bevLista")) {
        items = JSON.parse(localStorage.getItem("bevLista"));
    }
}


// App indulás
Load();
RefreshTable();
ClearForm();