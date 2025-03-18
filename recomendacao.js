import { changeIframe } from './iframes.js'; // Importa os iframes de mapas

// URLs da API
const API_URL_RECEITA = 'https://localhost:7087/api/medicamentos/recomendacao-formulario?tipoEnvio=receitamedica';
const API_URL_FORMULARIO = 'https://localhost:7087/api/medicamentos/recomendacao-formulario?tipoEnvio=formulario';

// Elementos HTML
const medicamentosContainer = document.querySelector('.image-description-box');
const pacienteContainer = document.getElementById('paciente-nome');
const pesquisaInput = document.getElementById('pesquisa');
const sugestoesContainer = document.getElementById('sugestoes');

// Função para buscar medicamentos para Receita Médica
export async function buscarMedicamentosReceitaMedica() {
    try {
        // Limpa o container antes de renderizar novos dados
        medicamentosContainer.innerHTML = ''; 

        const response = await fetch(API_URL_RECEITA);
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        const dados = await response.json();
        console.log(dados); // Verifica a estrutura da resposta da API

        // Extrair apenas nomes de pacientes e remover duplicados
        const nomesPacientes = [...new Set(dados.map(med => med.nomePaciente))];

        if (nomesPacientes.length > 0) {
            pacienteContainer.innerHTML = nomesPacientes.map(nome => {
                return `
                 <div id="paciente-nome">
                    Olá ${nome}, achamos os remédios certos para você!
                 </div>
                `;
            }).join('');

            exibirMedicamentos(dados);
        } else {
            medicamentosContainer.innerHTML = '<p>Nenhum medicamento encontrado.</p>';
        }

    } catch (error) {
        console.error('Erro ao buscar medicamentos para receita médica:', error);
    }
}


// Função para buscar medicamentos para Formulário
export async function buscarMedicamentosFormulario() {
    try {
        // Limpa o container antes de renderizar novos dados
        medicamentosContainer.innerHTML = ''; 

        const response = await fetch(API_URL_FORMULARIO);
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        const dados = await response.json();
        console.log(dados); // Verifica a estrutura da resposta da API

        // Extrair apenas nomes de pacientes e remover duplicados
        const nomesPacientes = [...new Set(dados.map(med => med.nomePaciente))];

        if (nomesPacientes.length > 0) {
            pacienteContainer.innerHTML = nomesPacientes.map(nome => {
                return `
                 <div id="paciente-nome">
                    Olá ${nome}, achamos os remédios certos para você!
                 </div>
                `;
            }).join('');

            exibirMedicamentos(dados);
        } else {
            medicamentosContainer.innerHTML = '<p>Nenhum medicamento encontrado.</p>';
        }

    } catch (error) {
        console.error('Erro ao buscar medicamentos para receita médica:', error);
    }
}

// Função para exibir medicamentos na página
function exibirMedicamentos(medicamentos) {
    if (!medicamentos || medicamentos.length === 0) {
        medicamentosContainer.innerHTML = '<p>Nenhum medicamento encontrado.</p>';
        return;
    }

    medicamentosContainer.innerHTML = medicamentos.map(med => {
        return `
            <div class="image-description-box">
                <div class="image-box">
                    <img src="data:image/png;base64,${med.imagem || ''}" alt="${med.nomePaciente}" class="image">
                </div>
                <div class="description-box">
                    <h2>${med.nome}</h2>
                    <p>
                        Fabricante: ${med.fabricante || 'Não informado'}<br>
                        Tipo: ${med.tipo}<br>
                        Quantidade: ${med.quantidade}<br>
                        Dosagem: ${med.dosagem}<br>
                        Data de Validade: ${new Date(med.dataValidade).toLocaleDateString()}<br>
                        Preço: R$ ${med.preco}<br>
                        Categoria: ${med.categoria || 'Sem categoria'}<br>
                        Tipo de Envio: ${med.tipoEnvio}<br>
                        <strong>Precisa de prescrição?:</strong> 
                        <span style="color: ${med.prescricao === true ? 'red' : 'green'};">
                            ${med.prescricao === true ? 'Sim' : 'Não'}
                        </span><br><br>
                        <strong>Descrição?:</strong> ${med.descricao}
                    </p>
                </div>
            </div>
        `;
    }).join('');
}

// Função de busca ao digitar no campo de pesquisa
// pesquisaInput.addEventListener('input', () => {
//     const termo = pesquisaInput.value.toLowerCase();
//     const sugestoes = termo ? medicamentos.filter(med => med.Nome.toLowerCase().includes(termo)) : [];
//     exibirSugestoes(sugestoes);
// });

// // Função para exibir sugestões com base na pesquisa
// function exibirSugestoes(sugestoes) {
//     if (sugestoes.length === 0) {
//         sugestoesContainer.innerHTML = '';
//         return;
//     }

//     sugestoesContainer.innerHTML = sugestoes.map(sugestao => `
//         <div class="sugestao-item" onclick="selecionarMedicamento('${sugestao.Nome}')">
//             ${sugestao.Nome}
//         </div>
//     `).join('');
// }

// // Função para selecionar um medicamento da lista de sugestões
// function selecionarMedicamento(nome) {
//     pesquisaInput.value = nome;
//     const medicamentoSelecionado = medicamentos.find(med => med.Nome === nome);
//     exibirMedicamentos([medicamentoSelecionado]);
//     sugestoesContainer.innerHTML = '';
// }

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

//Chama a função de acordo com o tipo de envio
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tipoBusca = urlParams.get('tipo');

    // Executa a função correspondente com base no valor do parâmetro tipo
    if (tipoBusca === '1') {
        buscarMedicamentosFormulario();
    } else if (tipoBusca === '2') {
        buscarMedicamentosReceitaMedica();
    } else {
        console.warn('Nenhum tipo de busca definido.');
    }
    if (tipoBusca) {
        localStorage.removeItem('tipoBusca'); // Limpa o valor após o uso
    }
});

changeIframe();
