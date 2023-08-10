// Readable streams / Writable streams

// process.stdin
//     .pipe(process.stdout)

import { Readable, Transform, Writable } from 'node:stream';

// Ex. de Streams de Leitura
class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if ( i > 100 ) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
    
                this.push(buf)
            }
        }, 1e3)
    }
}

// Ex. de Streams de Tranformação
class InverseNumberStream extends Transform {

    _transform(chunk, enconding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

// Ex. de Streams de Escrita
class MultiplyByTenStream extends Writable {

    _write(chunk, enconding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

// new OneToHundredStream()
//     .pipe(process.stdout)

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())