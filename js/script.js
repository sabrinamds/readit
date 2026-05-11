var itens = [];
var totalCompra = 0;

function adicionarAoCarrinho(nome, preco) {
    itens.push({nome: nome, preco: preco});
    totalCompra = totalCompra + preco;
    document.getElementById('carrinho-contador').innerText = itens.length;
    renderizarCarrinho();
    document.getElementById('carrinho-painel').classList.add('active');
}

function remover(index) {
    totalCompra = totalCompra - itens[index].preco;
    itens.splice(index, 1);
    document.getElementById('carrinho-contador').innerText = itens.length;
    renderizarCarrinho();
}

function renderizarCarrinho() {
    var lista = document.getElementById('carrinho-itens-lista');
    var displayTotal = document.getElementById('carrinho-subtotal');
    lista.innerHTML = "";
    itens.forEach(function(item, i) {
        lista.innerHTML += `
            <div style="display:flex; justify-content:space-between; padding:15px; border-bottom:1px solid #eee;">
                <span style="font-size:12px;">${item.nome}</span>
                <span>R$ ${item.preco.toFixed(2)} <button class="btn-remover" onclick="remover(${i})">🗑️</button></span>
            </div>`;
    });
    displayTotal.innerText = "R$ " + totalCompra.toFixed(2);
}

function toggleCarrinho() {
    document.getElementById('carrinho-painel').classList.toggle('active');
}
function mostrarPagamento() {
    var opcao = document.querySelector('input[name="pgto"]:checked').value;
    var area = document.getElementById('area-resultado');
    
    if (opcao === 'pix') {
        // API nova e mais estável para não dar erro na foto
        var urlQR = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020126580014br.gov.bcb.pix0136readit@loja.com.br";
        
        area.innerHTML = `
            <br>
            <h3 style="color: #5E725C;">Escaneie o QR Code:</h3>
            <img src="${urlQR}" alt="QR Code PIX">
        `;
        
    } else if (opcao === 'boleto') {
        var n1 = Math.floor(Math.random() * 90000) + 10000;
        var n2 = Math.floor(Math.random() * 90000) + 10000;
        var n3 = Math.floor(Math.random() * 90000) + 10000;
        var n4 = Math.floor(Math.random() * 9000) + 1000;
        var codigo = `34191.${n1} 02345.${n2} 98765.${n3} 1 ${n4}00000000`;
        
        area.innerHTML = `
            <br>
            <h3 style="color: #5E725C;">Boleto Gerado:</h3>
            <p style="font-size: 1.2rem; font-weight: bold; background: #eee; padding: 10px;">${codigo}</p>
        `;
    }
}
