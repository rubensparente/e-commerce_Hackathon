const bcrypt = require('bcryptjs');

// Gerar hash para cliente (senha 123456)
const senhaCliente = '123456';
const hashCliente = bcrypt.hashSync(senhaCliente, 10);

// Gerar hash para admin (senha admin123)
const senhaAdmin = 'admin123';
const hashAdmin = bcrypt.hashSync(senhaAdmin, 10);

console.log('=================================');
console.log('HASHES CORRETOS PARA USAR NO BANCO:');
console.log('=================================');
console.log('\nCLIENTE:');
console.log('Senha:', senhaCliente);
console.log('Hash:', hashCliente);
console.log('\nADMIN:');
console.log('Senha:', senhaAdmin);
console.log('Hash:', hashAdmin);
console.log('=================================');