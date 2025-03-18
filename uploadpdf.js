export function EnviarPDF(){
    document.getElementById("fileUpload").addEventListener("change", async (event) => {
        const file = event.target.files[0];
    
        if (!file) {
            alert("Nenhum arquivo selecionado.");
            return;
        }
    
        // Verifica se é um arquivo PDF
        if (file.type !== "application/pdf") {
            alert("Apenas arquivos PDF são permitidos.");
            return;
        }
    
        // Cria um FormData para enviar o arquivo
        const formData = new FormData();
        formData.append("arquivo", file);
    
        try {
            // Faz a requisição POST para a rota da API
            const response = await fetch("https://localhost:7087/api/Uploadspdf", {
                method: "POST",
                body: formData,
            });
    
            if (response.ok) {
                const data = await response.json();
                alert(`Arquivo enviado com sucesso!`);
                window.location.href = `recomendacao.html?tipo=${2}`;
            } else {
                const errorText = await response.text();
                alert(`Erro ao enviar o arquivo: ${errorText}`);
            }
        } catch (error) {
            console.error("Erro ao enviar o arquivo:", error);
            alert("Erro ao enviar o arquivo. Verifique o console para mais detalhes.");
        }
    });   
    
}
