// Configurações iniciais
const WHATSAPP_NUMBER = "+5541987054006";
const MSG_COMPRA = text => `Desejo comprar o produto: ${text} !`;
const MSG_IDEIA = "Solicito compartilhar minha ideia de produto!";
const CRED_USER = "StormCutadm1nat";
const CRED_PASS = "PtsBf8uy";

// Utilitários de storage
function getProducts() {
  return JSON.parse(localStorage.getItem('produtos') || '[]');
}
function saveProducts(list) {
  localStorage.setItem('produtos', JSON.stringify(list));
}

// Renderização de catálogo
function renderCatalog() {
  const container = document.getElementById('produtos-container');
  container.innerHTML = '';
  getProducts().forEach(prod => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${prod.img}" alt="${prod.nome}" />
      <h3>${prod.nome}</h3>
      <p>${prod.desc}</p>
      <button onclick="location.href='detalhes.html?num=${prod.num}'" class="btn-primary">
        Ver detalhes
      </button>
    `;
    container.appendChild(card);
  });
  document.getElementById('btn-criar-ideia')
    .onclick = () => window.open(
      `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(MSG_IDEIA)}`,
      '_blank'
    );
}

// Página de detalhes
function renderDetails() {
  const params = new URLSearchParams(location.search);
  const num = params.get('num');
  const prod = getProducts().find(p => p.num == num);
  if (!prod) return;
  const div = document.getElementById('detalhes');
  div.innerHTML = `
    <div class="card detalhes-card">
      <img src="${prod.img}" alt="${prod.nome}" />
      <h2>${prod.nome}</h2>
      <p>${prod.desc}</p>
      <button onclick="window.open(
        'https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text='+encodeURIComponent(MSG_COMPRA('${prod.num}')),
        '_blank'
      )" class="btn-primary">
        Solicitar pelo WhatsApp
      </button>
    </div>
  `;
}

// Admin
function handleAdmin() {
  const loginForm = document.getElementById('login-form');
  const loginContainer = document.getElementById('login-container');
  const panel = document.getElementById('admin-panel');

  loginForm?.addEventListener('submit', e => {
    e.preventDefault();
    const user = e.target.username.value;
    const pass = e.target.password.value;
    if (user === CRED_USER && pass === CRED_PASS) {
      loginContainer.classList.add('hidden');
      panel.classList.remove('hidden');
      renderAdminPanel();
    } else alert('Credenciais inválidas!');
  });

  document.getElementById('btn-logout')?.addEventListener('click', () => {
    panel.classList.add('hidden');
    loginContainer.classList.remove('hidden');
  });
}

function renderAdminPanel() {
  const form = document.getElementById('produto-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const prod = {
      nome: e.target['prod-nome'].value,
      desc: e.target['prod-desc'].value,
      num: e.target['prod-num'].value,
      img: e.target['prod-img'].value
    };
    const list = getProducts();
    list.push(prod);
    saveProducts(list);
    alert('Produto adicionado com sucesso!');
    e.target.reset();
    renderCatalog();
  });
}

// Inicialização
window.onload = () => {
  if (document.getElementById('produtos-container')) renderCatalog();
  if (document.getElementById('detalhes')) renderDetails();
  if (document.getElementById('login-container')) handleAdmin();
};