// Array de iframes
const iframes = [
    '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.3997018094838!2d-47.0657341!3d-22.972325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8cb7884382a43%3A0x5511261b13ffdb1b!2sDrogasil!5e0!3m2!1spt-BR!2sbr!4v1732833450883!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29389.066017338304!2d-47.084339240142285!3d-22.963730048796336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c937044d1cd3%3A0x25d66b78e72d1863!2sDrogasil!5e0!3m2!1spt-BR!2sbr!4v1732833542010!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29393.170083212222!2d-47.08429548437498!3d-22.94483999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8cf3a85f1f01d%3A0xb37dc1d5ff1d324b!2sDrogasil!5e0!3m2!1spt-BR!2sbr!4v1732833555728!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29387.35085144521!2d-47.16135708437494!3d-22.9716202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c9e799b10bbf%3A0x7ed2a29beb26957e!2sDROGASIL!5e0!3m2!1spt-BR!2sbr!4v1732833583720!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29387.35085144521!2d-47.16135708437494!3d-22.9716202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8b710c30139bd%3A0xbc1d0532f4416e62!2sDrogasil!5e0!3m2!1spt-BR!2sbr!4v1732833597431!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
];

// Seleciona o contêiner do iframe
const iframeContainer = document.getElementById('iframe-container');

// Função para trocar o iframe
export function changeIframe() {
    // Escolhe um iframe aleatoriamente
    const randomIndex = Math.floor(Math.random() * iframes.length);
    // Atualiza o HTML do contêiner com o iframe escolhido
    iframeContainer.innerHTML = iframes[randomIndex];
}
