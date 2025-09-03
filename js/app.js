let nameField = document.getElementById("nameField");
let priceField = document.getElementById("priceField");
let countField = document.getElementById("countField");
let addBtn = document.getElementById("addBtn");
let itemsList = document.getElementById("itemsList");
let sumLbl = document.getElementById("sumLbl");

let items = [];
let products = [];
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

    let letezik = false;
    if (products.length > 0) {
        products.forEach((element) => {
            if (element.name == nameField.value && element.price == priceField.value) {
                letezik = true;
            }
        })
    }

    if (!letezik) {
        products.push({
            name: nameField.value,
            price: priceField.value
        })
    }

    RefreshSelect();
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
        let td6 = document.createElement("td");
        let btn = document.createElement("button");
        btn.innerHTML = "X";

        td3.classList.add("text-end");
        td4.classList.add("text-end");
        td5.classList.add("text-end");
        td6.classList.add("text-center")
        btn.classList.add("btn", "btn-danger");
    
        btn.addEventListener("click", () => {
            deleteItem(i);
        });
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
        tr.appendChild(td6)
        td6.appendChild(btn);

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

let deleteItem = (idx) => {
    if (confirm("Biztos törölni akarod?")) {
        items.splice(idx, 1);
    }
    RefreshTable();
    Save();
}

// TODO: input+datalist, selectionchange eventlistener

let RefreshSelect = () => {
    let termekSelect = document.getElementById("termekSelect");
    let options = termekSelect.children;

    /* for (let j = 0; j < options.length; j++) {
        options[j];
        
    } */

    /* options.forEach((element) => {
        if (element.value != "default") {
            element.remove();
        }
    }) */

    console.log(options)

    for (let i = 0; i < products.length; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = products[i].name;
        termekSelect.appendChild(option)


    }
}


// App indulás
Load();
RefreshTable();
ClearForm();