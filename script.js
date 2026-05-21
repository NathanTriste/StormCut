// Credenciais do administrador
const ADMIN_NOME = "NATHAN";
const ADMIN_SENHA = "PtsBf8uy";

// Criar conta: salva nome e senha em localStorage
function criarConta(){
    const nome = document.getElementById("cadastroNome").value;
    const senha = document.getElementById("cadastroSenha").value;
    if(nome === "" || senha === ""){
        alert("Preencha nome e senha");
        return;
    }
    localStorage.setItem("usuario", nome);
    localStorage.setItem("senha", senha);
    alert("Conta criada com sucesso!");
    window.location.href = "index.html"; // volta ao login
}

// Login: verifica contra localStorage ou admin estático
function login(){
    const nome = document.getElementById("loginNome").value;
    const senha = document.getElementById("loginSenha").value;
    const usuarioSalvo = localStorage.getItem("usuario");
    const senhaSalva = localStorage.getItem("senha");

    if(nome === ADMIN_NOME && senha === ADMIN_SENHA){
        // Logado como admin
        localStorage.setItem("adminLogado", "true");
        window.location.href = "home.html";
        return;
    }
    if(nome === usuarioSalvo && senha === senhaSalva){
        // Usuário comum logado
        localStorage.setItem("usuarioLogado", "true");
        window.location.href = "home.html";
    } else {
        alert("Nome ou senha incorretos");
    }
}

// Logout: limpa flags e volta ao login
function logout(){
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("adminLogado");
    window.location.href = "index.html";
}

// Abrir perfil/admin: admin vai para admin.html, outros fazem logout
function abrirAdmin(){
    if(localStorage.getItem("adminLogado") === "true"){
        window.location.href = "admin.html";
    } else {
        logout();
    }
}

// Array global de produtos (carregado do localStorage ou vazio)
let produtos = JSON.parse(localStorage.getItem("produtos") || "[]");

// Gera código 4 dígitos, ex: "0001", "0002", ... usando padStart
function gerarCodigo(){
    return String(produtos.length + 1).padStart(4, '0'); 
    // Exemplo do MDN: leftFillNum = num => num.toString().padStart(5,"0")【28†L283-L290】
}

// Adiciona produto: coleta dados do formulário admin e salva
function adicionarProduto(){
    const nome = document.getElementById("nomeProduto").value;
    const descricao = document.getElementById("descricaoProduto").value;
    const preco = document.getElementById("precoProduto").value;
    const imagem = document.getElementById("imagemProduto").value;
    if(nome === "" || preco === "" || imagem === ""){
        alert("Preencha nome, preço e URL da imagem");
        return;
    }
    const novoProduto = {
        codigo: gerarCodigo(),
        nome: nome,
        descricao: descricao,
        preco: preco,
        imagem: imagem
    };
    produtos.push(novoProduto);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    alert("Produto adicionado!");
    window.location.href = "home.html";
}

// Carrega produtos na página principal: cria cards HTML
function carregarProdutos(){
    const area = document.getElementById("produtos");
    if(!area) return;
    area.innerHTML = "";
    produtos.forEach(prod => {
        area.innerHTML += `
        <div class="card">
          <img src="${prod.imagem}" alt="${prod.nome}">
          <div class="card-content">
            <h2>${prod.nome}</h2>
            <p>${prod.descricao || ''}</p>
            <div class="preco">R$ ${prod.preco}</div>
            <button onclick="comprarProduto('${prod.codigo}')">Comprar</button>
          </div>
        </div>`;
    });
}

// Função de compra: abre WhatsApp com mensagem pré-preenchida
function comprarProduto(codigo){
    // Número no formato internacional (Brasil +55, DDD 41)
    const numero = "5541987054006";
    const mensagem = `Quero comprar o pedido ${codigo}`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}
