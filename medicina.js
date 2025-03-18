// Array de objetos para armazenar os medicamentos obtidos da API
let medicamentos = [];

// Selecionar o container onde os boxes serão adicionados
const listaMedic = document.getElementById("listaMedic");
const inputPesquisa = document.getElementById("pesquisa");

// Função para buscar os medicamentos da API e atualizar o array
async function carregarMedicamentos() {
    try {
        const response = await fetch("https://localhost:7087/api/medicamentos/Consolidados"); // Substitua pela URL correta
        if (!response.ok) {
            throw new Error(`Erro ao buscar medicamentos: ${response.statusText}`);
        }

        const medicamentosAPI = await response.json();

        // Atualizar o array de medicamentos com nome, imagem e key
        medicamentos = medicamentosAPI.map((med, index) => ({
            key: index, // Adiciona uma key única para cada medicamento
            nome: med.nome,
            imagem: `data:image/png;base64,${med.imagem}`, // Decodificar a imagem base64
        }));

        // Criar os boxes dinamicamente
        criarBoxes(medicamentos);
    } catch (error) {
        console.error("Erro ao carregar medicamentos:", error);
    }
}

// Função para criar os boxes dinamicamente
function criarBoxes(lista) {
    // Limpar o container antes de adicionar novos elementos
    listaMedic.innerHTML = "";

    lista.forEach(medicamento => {
        // Criar o elemento do box
        const box = document.createElement("div");
        box.className = "box";

        // Adicionar a key como atributo data-key
        box.setAttribute("data-key", medicamento.key);

        // Adicionar a imagem
        const img = document.createElement("img");
        img.src = medicamento.imagem;
        img.alt = `Medicamento ${medicamento.nome}`;
        img.className = "med-img";
        box.appendChild(img);

        // Adicionar o nome
        const nome = document.createElement("p");
        nome.className = "med-name";
        nome.textContent = medicamento.nome;
        box.appendChild(nome);

        // Adicionar evento de clique no box
        box.addEventListener("click", () => {
            // Redirecionar para outra página com parâmetros na URL
            window.location.href = `info_medic.html?key=${medicamento.key}&nome=${encodeURIComponent(medicamento.nome)}`;
        });

        // Adicionar o box ao container
        listaMedic.appendChild(box);
    });
}

// Função para filtrar os medicamentos com base no termo de pesquisa
function filtrarMedicamentos() {
    const termoPesquisa = inputPesquisa.value.toLowerCase().trim();
    const medicamentosFiltrados = medicamentos.filter(med =>
        med.nome.toLowerCase().includes(termoPesquisa)
    );
    criarBoxes(medicamentosFiltrados);
}

// Adicionar evento para filtrar enquanto o usuário digita
inputPesquisa.addEventListener("input", filtrarMedicamentos);

// Chamar a função para carregar os medicamentos ao carregar a página
document.addEventListener("DOMContentLoaded", carregarMedicamentos);
