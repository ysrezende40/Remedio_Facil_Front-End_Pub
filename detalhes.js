import { changeIframe } from './iframes.js'; //pega os ifram de mapas

// Função para obter os parâmetros da URL
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        pesquisa: params.get('pesquisa'),
        key: params.get('key'),
        nome: params.get('nome')
    };
}

// Função para buscar os detalhes do medicamento via API com base no nome
async function buscarDetalhesMedicamento(nome) {
    try {
        const response = await fetch(`https://localhost:7087/api/medicamentos/pesquisar/${nome}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar medicamento: ${response.statusText}`);
        }
        const medicamentos = await response.json();

        if (medicamentos.length > 0) {
            // Pega o primeiro medicamento do array
            exibirInformacoesMedicamento(medicamentos[0]);
        } else {
            exibirMensagemErro("Nenhum medicamento encontrado.");
        }
    } catch (error) {
        console.error("Erro ao carregar detalhes do medicamento:", error);
        exibirMensagemErro(`Erro ao carregar detalhes do medicamento: ${error.message}`);
    }
}

// Função para exibir as informações detalhadas do medicamento
function exibirInformacoesMedicamento(medicamento) {
    const imageBox = document.querySelector(".image-box");
    const descriptionBox = document.querySelector(".description-box");

    // Verifica se a imagem existe; se não, cria a tag <img>
    let imageElement = imageBox.querySelector("img");
    if (!imageElement) {
        imageElement = document.createElement("img");
        imageBox.appendChild(imageElement);
    }

    if (medicamento) {
        // Atualizar a imagem do medicamento
        imageElement.src = `data:image/png;base64,${medicamento.imagem || ""}`;
        imageElement.alt = `Imagem do medicamento ${medicamento.nome || "desconhecido"}`;

        // Atualizar os detalhes do medicamento
        descriptionBox.innerHTML = `
            <h2>${medicamento.nome || "Nome não disponível"}</h2>
            <p><strong>Fabricante:</strong> ${medicamento.fabricante || "fabricante não disponível."}</p>
            <p><strong>Tipo:</strong> ${medicamento.tipo || "Tipo não disponível."}</p>
            <p><strong>Quantidade:</strong> ${medicamento.quantidade || "quantidade não disponível."}</p>
            <p><strong>Dosagem:</strong> ${medicamento.dosagem || "Dosagem não disponível."}</p>
            <p><strong>Data de validade:</strong> ${formatarData(medicamento.dataValidade) || "Data de validade não disponível."}</p>
            <p><strong>Preço:</strong> R$ ${medicamento.preco || "Preço não disponível."}</p>
            <p><strong>Descrição:</strong> ${medicamento.descricao || "Descrição não disponível."}</p>
            <p>
            <strong>Precisa de prescrição?:</strong> 
            <span style="color: ${medicamento.prescricao === true ? 'red' : 'green'};">
                ${medicamento.prescricao === true ? 'Sim' : 'Não'}
            </span>
        </p>
        `;
    } else {
        exibirMensagemErro("Nenhum medicamento encontrado.");
    }
}

// Função para exibir mensagens de erro
function exibirMensagemErro(mensagem) {
    const imageBox = document.querySelector(".image-box");
    const descriptionBox = document.querySelector(".description-box");

    // Atualiza imagem para padrão
    let imageElement = imageBox.querySelector("img");
    if (!imageElement) {
        imageElement = document.createElement("img");
        imageBox.appendChild(imageElement);
    }
    imageElement.src = "image/sacolaimg.png";
    imageElement.alt = "Nenhum medicamento encontrado";

    // Exibe mensagem de erro
    descriptionBox.innerHTML = `<p>${mensagem}</p>`;
}

// Exibir os detalhes na página
function exibirDetalhes() {
    const detalhes = getURLParams();
    const detalhesContainer = document.querySelector(".description-box");

    if (detalhes.pesquisa) {
        detalhesContainer.textContent = `Resultado da pesquisa: ${detalhes.pesquisa}`;
    } else if (detalhes.nome) {
        buscarDetalhesMedicamento(detalhes.nome);
    } else {
        exibirMensagemErro("Nenhum medicamento selecionado.");
    }
}

// Mostrar rodapé ao rolar até o final da página
window.addEventListener("scroll", function () {
    const rodape = document.querySelector(".rodape");
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Mostrar rodapé se o usuário estiver perto do final
    if (scrollPosition >= documentHeight - 100) {
        rodape.classList.add("mostrar");
    } else {
        rodape.classList.remove("mostrar");
    }
});

function formatarData(dataISO) {
    if (!dataISO) return null; // Verifica se a data está disponível
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0'); // Adiciona zero à esquerda, se necessário
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa em 0, então somamos 1
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}


// Carregar detalhes ao abrir a página
document.addEventListener("DOMContentLoaded", exibirDetalhes);
changeIframe();
