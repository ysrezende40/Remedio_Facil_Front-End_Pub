let currentPage = 0;
const pages = document.querySelectorAll('.form-page');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');

function showPage(pageIndex) {
    pages.forEach((page, index) => {
        page.classList.toggle('hidden', index !== pageIndex);
    });
    prevBtn.classList.toggle('hidden', pageIndex === 0);
    nextBtn.classList.toggle('hidden', pageIndex === pages.length - 1);
    submitBtn.classList.toggle('hidden', pageIndex !== pages.length - 1);
}

function changePage(step) {
    if (validatePage(currentPage)) {
        currentPage += step;
        showPage(currentPage);
    }
}

function validatePage(pageIndex) {
    const currentPageInputs = pages[pageIndex].querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    currentPageInputs.forEach(input => {
        if (!input.value && (input.type !== "checkbox" || !input.checked)) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });

    if (!isValid) {
        alert("Por favor, preencha todos os campos obrigatórios.");
    }

    return isValid;
}

function toggleOtherSymptom() {
    var otherSymptomElement = document.getElementById("other_symptom");
    var symptomCheckbox = document.getElementById("symptoms_other");

    if (!symptomCheckbox.checked) {
        // Se o checkbox não estiver marcado, atribui "nulo" ao valor
        otherSymptomElement.value = "nulo";
    }

    // Alterna a visibilidade do campo
    otherSymptomElement.classList.toggle("hidden", !symptomCheckbox.checked);
}

function toggleOtherCondition() {
    var otherConditionElement = document.getElementById("other_condition");
    var conditionCheckbox = document.getElementById("conditions_other");

    if (!conditionCheckbox.checked) {
        // Se o checkbox não estiver marcado, atribui "nulo" ao valor
        otherConditionElement.value = "nulo";
    }

    // Alterna a visibilidade do campo
    otherConditionElement.classList.toggle("hidden", !conditionCheckbox.checked);
}

function verificaTextArea() {
    const textarea1 = document.getElementById("allergies").value.trim();
    const textarea2 = document.getElementById("medications").value.trim();

    if (textarea1 === "" || textarea2 === "") {
        alert("Por favor, preencha ambos os campos de texto antes de enviar.");
        return false;
    }
    return true;
}

function submitForm(event) {
    event.preventDefault();

    // Verifica as textareas antes de prosseguir
    if (!verificaTextArea()) {
        return; // Se `verificaTextArea` retornar false, não continua
    }

    // Obter o FormData do formulário
    const formData = new FormData(document.getElementById("healthForm"));

    // Exibir os dados que estão sendo enviados
    let formDataString = '';
    formData.forEach((value, key) => {
        formDataString += `${key}: ${value}\n`;
    });

    // Mostrar os dados no alert antes de enviar
    //alert("Dados a serem enviados:\n" + formDataString);

    // Enviar os dados via fetch
    fetch('https://localhost:7087/api/medicamentos/upload-formulariosaude', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            alert('Dados enviados com sucesso!');
            window.location.href = "redirect.html"; // Redirecionamento opcional
        })
        .catch(error => {
            alert('Ocorreu um erro ao enviar os dados');
            console.error(error);
        });
}


// Inicializar a exibição da primeira página
showPage(currentPage);
toggleOtherCondition();
toggleOtherSymptom();
