//Função que ao clicar em buscar em index.js chama essa função que envia o nome do medicamento pesquisado
//a URL que vai ser coletado para mostrar as informações na pagina
export function realizarPesquisa() {
    const pesquisa = document.getElementById('pesquisa').value.trim();
    if (pesquisa) {
        //alert(`Iniciando busca por: ${pesquisa}`);
          // Redirecionar para outra página com o termo de pesquisa na URL
        window.location.href = `info_medic.html?nome=${encodeURIComponent(pesquisa)}`;
    } else {
        console.log("Campo de pesquisa está vazio.");
    }
}
