const ADMIN_NOME = "NATHAN";
const ADMIN_SENHA = "PtsBf8uy";

function criarConta(){

    const nome = document.getElementById("cadastroNome").value;
    const senha = document.getElementById("cadastroSenha").value;

    if(nome === "" || senha === ""){
        alert("Preencha tudo");
        return;
    }

    localStorage.setItem("usuario", nome);
    localStorage.setItem("senha", senha);

    alert("Conta criada com sucesso!");

    window.location.href = "index.html";
}

function login(){

    const nome = document.getElementById("loginNome").value;
    const senha = document.getElementById("loginSenha").value;

    const usuarioSalvo = localStorage.getItem("usuario");
    const senhaSalva = localStorage.getItem("senha");

    if(nome === ADMIN_NOME && senha === ADMIN_SENHA){

        localStorage.setItem("adminLogado", "true");

        window.location.href = "home.html";

        return;
    }

    if(nome === usuarioSalvo && senha === senhaSalva){

        localStorage.setItem("usuarioLogado", "true");

        window.location.href = "home.html";

    }else{

        alert("Nome ou senha incorretos");
    }
}

function logout(){

    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("adminLogado");

    window.location.href = "index.html";
}

function abrirAdmin(){

    const admin = localStorage.getItem("adminLogado");

    if(admin === "true"){

        window.location.href = "admin.html";

    }else{

        alert("Apenas o admin pode acessar.");
    }
}

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function gerarCodigo(){

    return String(produtos.length + 1).padStart(4,'0');
}

function adicionarProduto(){

    const nome = document.getElementById("nomeProduto").value;
    const descricao = document.getElementById("descricaoProduto").value;
    const preco = document.getElementById("precoProduto").value;
    const imagem = document.getElementById("imagemProduto").value;

    const novoProduto = {
        codigo: gerarCodigo(),
        nome,
        descricao,
        preco,
        imagem
    };

    produtos.push(novoProduto);

    localStorage.setItem("produtos", JSON.stringify(produtos));

    alert("Produto adicionado!");

    location.reload();
}

function carregarProdutos(){

    const area = document.getElementById("produtos");

    if(!area) return;

    area.innerHTML = "";

    produtos.forEach(produto => {

        area.innerHTML += `

        <div class="card">

            <img src="${produto.imagem}">

            <div class="card-content">
                <h2>${produto.nome}</h2>

                <p>${produto.descricao}</p>

                <div class="preco">R$ ${produto.preco}</div>

                <button onclick="comprarProduto('${produto.codigo}')">
                    Comprar
                </button>
            </div>

        </div>
        `;
    });
}

function comprarProduto(codigo){

    const numero = "5541987054006";

    const mensagem = `Quero comprar o pedido ${codigo}`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');
}

carregarProdutos();