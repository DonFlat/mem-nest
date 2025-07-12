async function fetchHello() {
  const response = await fetch('/api/hello');
  const data = await response.json();
  const element = document.getElementById('message');
  if (element) {
    element.textContent = data.message;
  }
}

document.addEventListener('DOMContentLoaded', fetchHello);

async function uploadFile(event: Event) {
  event.preventDefault();
  const input = document.getElementById('fileInput') as HTMLInputElement | null;
  if (!input || !input.files || input.files.length === 0) {
    return;
  }
  const formData = new FormData();
  formData.append('file', input.files[0]);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  const data: string[][] = await response.json();
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
}

document.getElementById('uploadForm')?.addEventListener('submit', uploadFile);
