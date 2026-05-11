// Validation number que será aceito (você pode adicionar múltiplos números válidos aqui)
// Deployment: 2026-05-11T15:15
const VALID_VALIDATION_NUMBERS = [
    'XRBKS0BC9MFQQC26',
    'WGJEI5BFFSERQQ34'
];

const certificateData = {
    'XRBKS0BC9MFQQC26': {
        name: 'Michel Ferraz',
        imagePath: 'certificate.png',
        title: 'AWS Certified Cloud Practitioner'
    },
    'WGJEI5BFFSERQQ34': {
        name: 'Michel Ferraz',
        imagePath: 'certificate_aiml.png',
        title: 'AWS Certified AI & ML Practitioner'
    }
};

// Função de validação - chamada ao submeter o formulário
function handleValidation(event) {
    event.preventDefault();
    
    const validationInput = document.getElementById('validationNumber');
    const validationNumber = validationInput.value.trim().toUpperCase();
    const errorMessage = document.getElementById('errorMessage');
    
    // Limpar mensagem de erro
    errorMessage.classList.remove('visible');
    errorMessage.textContent = '';
    
    // Validar se o número existe
    if (VALID_VALIDATION_NUMBERS.includes(validationNumber)) {
        // Armazenar na sessão para a próxima página
        sessionStorage.setItem('validationNumber', validationNumber);
        
        // Redirecionar para a página de verificação
        window.location.href = 'verify.html';
    } else {
        // Mostrar erro
        errorMessage.textContent = '❌ Número de validação inválido. Por favor, verifique e tente novamente.';
        errorMessage.classList.add('visible');
        
        // Limpar o input
        validationInput.value = '';
        validationInput.focus();
        
        // Log para debugging (remover em produção)
        console.log('Tentativa com número inválido:', validationNumber);
    }
}

// Função para exibir o certificado na página verify.html
function displayCertificate() {
    const validationNumber = sessionStorage.getItem('validationNumber');
    
    if (!validationNumber || !VALID_VALIDATION_NUMBERS.includes(validationNumber)) {
        // Se não houver validação válida na sessão, redirecionar para home
        window.location.href = 'index.html';
        return;
    }
    
    const certData = certificateData[validationNumber];
    
    // Atualizar informações
    const validationInfo = document.getElementById('validationInfo');
    validationInfo.textContent = `Certificado de ${certData.name} - ${certData.title}`;
    
    // Carregar imagem
    const certificateImage = document.getElementById('certificateImage');
    certificateImage.src = certData.imagePath;
    certificateImage.alt = `Certificado de ${certData.name}`;
    
    // Adicionar listener para download
    certificateImage.addEventListener('click', downloadCertificate);
}

// Função para voltar à página anterior
function goBack() {
    sessionStorage.removeItem('validationNumber');
    window.location.href = 'index.html';
}

// Função para baixar o certificado
function downloadCertificate() {
    const validationNumber = sessionStorage.getItem('validationNumber');
    const certData = certificateData[validationNumber];
    
    // Criar um elemento <a> temporário para download
    const link = document.createElement('a');
    link.href = certData.imagePath;
    link.download = `certificado_${certData.name.replace(/\s+/g, '_')}_AWS.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Executar ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    // Se estamos na página verify.html, exibir o certificado
    if (window.location.pathname.includes('verify.html')) {
        displayCertificate();
    }
    
    // Se estamos na página index.html, limpar a sessão
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        sessionStorage.removeItem('validationNumber');
    }
});

// Adicionar suporte para Enter no input
document.addEventListener('DOMContentLoaded', function() {
    const validationInput = document.getElementById('validationNumber');
    if (validationInput) {
        validationInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const form = document.getElementById('validationForm');
                if (form) {
                    form.dispatchEvent(new Event('submit'));
                }
            }
        });
    }
});
