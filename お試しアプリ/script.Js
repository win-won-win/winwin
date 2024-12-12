const API_KEY = 'AIzaSyA9R810PQ0xUg7VPFopt4tCPmJY6ekuXWE';
const SHEET_ID = '1vz5C0ykH3hDhuYOCn8v9o-BuJi8Y-RxpgPyQuWDMVPQ';
const SHEET_NAME = 'データベース';
const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}`;

document.addEventListener("DOMContentLoaded", () => {
    // タブ切り替え
    document.getElementById("home-tab").addEventListener("click", () => switchSection("home"));
    document.getElementById("list-tab").addEventListener("click", () => switchSection("list"));
    document.getElementById("card-tab").addEventListener("click", () => switchSection("card"));
    document.getElementById("calendar-tab").addEventListener("click", () => switchSection("calendar"));

    // ボタンイベント
    document.getElementById("go-to-list").addEventListener("click", () => switchSection("list"));
    document.getElementById("cancel-button").addEventListener("click", toggleForm);

    fetchData();
});

function switchSection(section) {
    document.querySelectorAll("main section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(`${section}-section`).classList.remove("hidden");
}

async function fetchData() {
    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}`);
        const data = await response.json();
        const rows = data.values || [];
        renderList(rows);
        renderCards(rows);
    } catch (error) {
        console.error("データの取得に失敗しました:", error);
    }
}

function renderList(rows) {
    const tableBody = document.querySelector("#data-table tbody");
    tableBody.innerHTML = "";

    rows.slice(1).forEach((row, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${row[0]}</td>
            <td>${row[1]}</td>
            <td>${row[2]}</td>
            <td>${row[3]}</td>
            <td>${row[4]}</td>
            <td>${row[5]}</td>
            <td>${row[6]}</td>
            <td>
                <button onclick="openForm('edit', ${index})">編集</button>
                <button onclick="deleteData(${index})">削除</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function renderCards(rows) {
    const container = document.getElementById("card-container");
    container.innerHTML = "";

    rows.slice(1).forEach(row => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${row[2]}</h3>
            <p>記録者: ${row[3]}</p>
            <p>時間: ${row[4]}</p>
            <p>備考: ${row[5]}</p>
        `;
        container.appendChild(card);
    });
}

function toggleForm() {
    document.getElementById("form-container").classList.toggle("hidden");
}

function openForm(mode, index) {
    toggleForm();
    document.getElementById("form-title").innerText = mode === "edit" ? "編集" : "追加";
}
