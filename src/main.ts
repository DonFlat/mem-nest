async function fetchHello() {
  const response = await fetch('/api/hello');
  const data = await response.json();
  const element = document.getElementById('message');
  if (element) {
    element.textContent = data.message;
  }
}

document.addEventListener('DOMContentLoaded', fetchHello);
