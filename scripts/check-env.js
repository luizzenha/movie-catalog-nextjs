const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');

if (!fs.existsSync(envPath)) {
  console.error('❌ Arquivo .env.local não encontrado!');
  console.log('📋 Siga estes passos:');
  console.log('1. Copie o arquivo .env.example para .env.local');
  console.log('2. Obtenha uma API key em: https://www.themoviedb.org/settings/api');
  console.log('3. Substitua "your_api_key_here" pela sua API key');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');

if (envContent.includes('your_api_key_here')) {
  console.error('❌ API key não configurada!');
  console.log('📋 Siga estes passos:');
  console.log('1. Obtenha uma API key em: https://www.themoviedb.org/settings/api');
  console.log('2. Substitua "your_api_key_here" no arquivo .env.local pela sua API key');
  process.exit(1);
}

console.log('✅ Configuração de ambiente OK!');