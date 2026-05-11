# AWS Certificate Validator

Aplicação web para validação de certificados AWS Cloud Practitioner.

## Funcionalidades

- **Página de Validação**: Formulário simples para inserir o número de validação do certificado
- **Página de Verificação**: Exibe o certificado após validação bem-sucedida
- **Responsiva**: Design adaptado para desktop e mobile
- **Segurança**: Validação de número de certificado no cliente (JavaScript puro)

## Estrutura de Arquivos

```
.
├── index.html                          # Página principal de validação
├── verify.html                         # Página de sucesso com certificado
├── style.css                           # Estilos CSS
├── script.js                           # Lógica JavaScript
├── certificate.png                     # Imagem do certificado
├── staticwebapp.config.json            # Configuração do Azure Static Web App
└── README.md                           # Este arquivo
```

## Deploy no Azure

### Opção 1: Usando Azure CLI

```bash
# 1. Fazer login no Azure
az login

# 2. Criar um resource group (se não existir)
az group create --name certificate-validator --location brazilsouth

# 3. Criar um Static Web App
az staticwebapp create \
  --name consultacertificadoaws \
  --resource-group certificate-validator \
  --location brazilsouth \
  --source . \
  --branch main \
  --build-folder . \
  --login-with-github

# 4. Publicar
az staticwebapp publish --name consultacertificadoaws --source .
```

### Opção 2: Usando Azure Portal

1. Acesse o [Azure Portal](https://portal.azure.com)
2. Procure por "Static Web Apps"
3. Clique em "Create"
4. Preencha os detalhes:
   - **Name**: consultacertificadoaws
   - **Region**: Brazil South
   - **Build presets**: Custom
   - **Build folder**: . (raiz)
5. Publique os arquivos

## Validação de Números

Números válidos cadastrados no `script.js`:
- `XRBKS0BC9MFQQC26`

Para adicionar novos números válidos, edite o array `VALID_VALIDATION_NUMBERS` em `script.js`.

## Customização

### Alterar Números Válidos

Edite `script.js`:

```javascript
const VALID_VALIDATION_NUMBERS = [
    'XRBKS0BC9MFQQC26',
    'NOVO_NUMERO_AQUI'
];
```

### Alterar Imagem do Certificado

Substitua o arquivo `certificate.png` por um novo certificado.

### Alterar Estilos

Edite `style.css` para customizar cores, fontes e layout.

## Localização do Projeto

- **Local**: `/Users/michelferraz/Documents/Meus projetos/aprendizado/aws-certificate-validator/`
- **Deploy**: Azure Static Web App

## Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla)
- Azure Static Web App

## Segurança

- ⚠️ **Aviso**: Esta é uma demonstração. Para produção, implemente:
  - Validação no backend
  - Autenticação adequada
  - HTTPS obrigatório
  - Rate limiting
  - Logging seguro

## Suporte

Para questões sobre o certificado, acesse: https://consultacertificadoaws.com.br/verificacao

---

Desenvolvido em maio de 2026
