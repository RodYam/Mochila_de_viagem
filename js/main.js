
// Operador lógico que retorna com dados salvos, ou string vazia, utilizando localStorage.getItem, modificando o valor de `string` com JSON.parse()
const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

// Uso do forEach para que todos os itens já escritos na lista sejam mantidos ao atualizar a página
itens.forEach( (elemento) => {
    criaElemento(elemento);
} )

// Refatoração do addEventListener para receber as funções extras da função criaElemento
form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    //Para saber se o elemento já existe:
    const existe = itens.find(elemento => elemento.nome === nome.value);

    const itemAtual = {
        "nome" : nome.value,
        "quantidade" : quantidade.value
    }

    if(existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual);

        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));
    

    nome.value = "";
    quantidade.value = "";
})

//Criar um Elemento
// Refatoração da função `criaElemento` para que possua apenas a função que faça sentido ao nome. 
function criaElemento(item) {

    const novoItem = document.createElement("li");
    novoItem.classList.add("item");

    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    novoItem.appendChild(numeroItem);
    
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);    
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

//Para deletar um item
//this.parentNode irá remover todo o conteudo da li, não apenas o botao.
function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innetText = "X";

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao;
}

function deletaElemento(tag, id) {
    tag.remove();

    //remover um item do array
    //itens.splice("o que queremos remover - id" , 1)
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    console.log(itens);

    localStorage.setItem("itens", JSON.stringify(itens));
}