// Buffers são uma representação de um espaço na memoria do 
// computador, usados especificamente para transitar dados 
// de uma maneira muito rapida

const buf = Buffer.from("Hello World")

console.log(buf.toJSON());