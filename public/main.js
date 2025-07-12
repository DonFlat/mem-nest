"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
function fetchHello() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('/api/hello');
        const data = yield response.json();
        const element = document.getElementById('message');
        if (element) {
            element.textContent = data.message;
        }
    });
}
document.addEventListener('DOMContentLoaded', fetchHello);
function uploadFile(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const input = document.getElementById('fileInput');
        if (!input || !input.files || input.files.length === 0) {
            return;
        }
        const formData = new FormData();
        formData.append('file', input.files[0]);
        const response = yield fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });
        const data = yield response.json();
        const container = document.getElementById('tableContainer');
        if (container) {
            const table = document.createElement('table');
            data.forEach(row => {
                const tr = document.createElement('tr');
                row.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            });
            container.innerHTML = '';
            container.appendChild(table);
        }
    });
}
(_a = document.getElementById('uploadForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', uploadFile);
