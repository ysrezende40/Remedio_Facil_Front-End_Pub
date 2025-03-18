import { realizarPesquisa } from './botaoPesquisa.js';
import {EnviarPDF} from './uploadpdf.js';
  
// Função para carregar todos os medicamentos e salvar no localStorage
  async function carregarMedicamentos() {
    try {
        const response = await fetch("https://localhost:7087/api/medicamentos/listar");
        if (!response.ok) {
            throw new Error(`Erro ao carregar medicamentos: ${response.statusText}`);
        }
        const medicamentos = await response.json();
        const nomes = medicamentos.map(medicamento => medicamento.nome);
        localStorage.setItem("medicamentosNomes", JSON.stringify(nomes)); // Armazena os nomes no localStorage
    } catch (error) {
        console.error("Erro ao carregar medicamentos:", error);
    }
}

// Função para buscar e exibir os medicamentos como uma lista
async function buscarDetalhesMedicamento(termo) {
    try {
        const response = await fetch("https://localhost:7087/api/medicamentos/listar");
        if (!response.ok) {
            throw new Error(`Erro ao buscar medicamentos: ${response.statusText}`);
        }

        const medicamentos = await response.json();
        const resultadosFiltrados = medicamentos.filter(med =>
            med.nome.toLowerCase().includes(termo.toLowerCase())
        );

        // Atualizar a lista de resultados
        const resultsDiv = document.getElementById("search-results");

        // Se houver resultados, exibi-los; caso contrário, esconder a lista
        if (resultadosFiltrados.length > 0) {
            resultsDiv.style.display = "block"; // Torna a lista visível
            resultsDiv.innerHTML = `
                <ul>
                    ${resultadosFiltrados.map(med => `<li class="list-item">${med.nome}</li>`).join("")}
                </ul>
            `;
            adicionarEventosLista(); // Adiciona eventos de clique nos itens da lista
        } else {
            resultsDiv.style.display = "none"; // Esconde a lista se não houver resultados
        }
    } catch (error) {
        console.error("Erro ao buscar medicamentos:", error);
        alert(`Erro ao buscar medicamentos: ${error.message}`);
    }
}

// Função para adicionar eventos de clique aos itens da lista
function adicionarEventosLista() {
    const listItems = document.querySelectorAll('.list-item');
    const inputField = document.getElementById("pesquisa");

    listItems.forEach(item => {
        item.addEventListener('click', () => {
            inputField.value = item.textContent; // Copia o texto do item para o campo de entrada
            inputField.focus(); // Coloca o foco no campo de entrada
            document.getElementById("search-results").style.display = "none"; // Esconde a lista
        });
    });
}

// Evento para buscar medicamentos ao digitar
document.getElementById("pesquisa").addEventListener("input", (event) => {
    const termo = event.target.value.trim(); // Remove espaços desnecessários
    if (termo.length > 2) {
        buscarDetalhesMedicamento(termo); // Faz a busca se o termo for maior que 2 caracteres
    } else {
        document.getElementById("search-results").style.display = "none"; // Esconde a lista se o termo for curto
    }
});

 // Função para mostrar o rodapé quando o usuário rolar
 window.addEventListener("scroll", function() {
    const rodape = document.querySelector(".rodape");
    const scrollPosition = window.scrollY; // Posição do scroll na página
    const windowHeight = window.innerHeight; // Altura da janela
    const documentHeight = document.documentElement.scrollHeight; // Altura total do documento

    // Mostrar rodapé se o usuário estiver próximo ao final da página
    if (scrollPosition + windowHeight >= documentHeight - 100) {
        rodape.classList.add("mostrar");
    } else {
        rodape.classList.remove("mostrar");
    }
});

// Carregar medicamentos ao inicializar a página
document.addEventListener("DOMContentLoaded", carregarMedicamentos);
// Associar a função ao clique no botão para enviar a pesquisa para o arquivo botaoPesquisa.js
document.getElementById('searchBtn').addEventListener('click', realizarPesquisa);
//Função importada que realiza o envio do PDF via API para o banco de dados
EnviarPDF();
