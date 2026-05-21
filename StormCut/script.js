const ADMIN_NOME = "NATHAN";
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