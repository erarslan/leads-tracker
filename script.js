const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete");
const deleteLastBtn = document.getElementById("delete-last");
const tabBtn = document.getElementById("tab-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
let myLeads = [];
let myLeadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (myLeadsFromLocalStorage) {
  myLeads = myLeadsFromLocalStorage;
  render(myLeadsFromLocalStorage);
}

inputBtn.addEventListener("click", function () {
  let value = inputEl.value;
  inputEl.value = "";

  if (value !== "") {
    myLeads.push(value);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    addLead(value);
  }
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    addLead(tabs[0].url);
  });
});

deleteLastBtn.addEventListener("click", function () {
  if (myLeads.length) {
    ulEl.removeChild(ulEl.lastElementChild);
    myLeads.pop();
    if (!myLeads.length) {
      localStorage.clear();
    } else {
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
    }
  }
});

deleteBtn.addEventListener("dblclick", function () {
  ulEl.innerHTML = "";
  localStorage.clear();
  myLeads = myLeadsFromLocalStorage = [];
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
        <a href ="${leads[i]}" target = '_blank'>
            ${leads[i]}
        </a>
    </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

function addLead(lead) {
  ulEl.innerHTML += `
  <li>
      <a href ="${lead}" target = '_blank'>
          ${lead}
      </a>
  </li>
      `;
}
