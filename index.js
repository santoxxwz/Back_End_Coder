const fs = require("fs");

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    async save (objetoAGuardar) {
        try {
            const respuesta = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            if(respuesta == "") {
                objetoAGuardar.id = 1;
                const arrObj = [objetoAGuardar];
                await fs.promises.appendFile(this.nombreArchivo, JSON.stringify(arrObj));
                return console.log(objetoAGuardar.id);
            } else{
                const datosObj = JSON.parse(respuesta);
                objetoAGuardar.id = datosObj.length + 1;
                datosObj.push(objetoAGuardar);
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(datosObj));
                return console.log(objetoAGuardar.id);
            }
        } catch (error) {
            console.log(`El error es: ${error}`)
        }
    }

    async getById(id) {
        try {
            const respuesta = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            const datos = JSON.parse(respuesta);
            const resultado = datos.findIndex((elemento) => elemento.id === id);
            if (resultado > 0) {
                return console.log(datos[resultado]);
            } else {
                return console.log(null);
            }
        } catch (error) {
            console.log(`El error es: ${error}`);
        }
    }

    async getAll() {
        try {
            const respuesta = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            const datos = await JSON.parse(respuesta);
            return console.log(datos);
        } catch (error) {
            console.log(`El error es: ${error}`);
        }
    }

    async deleteById(id) {
        try {
            const respuesta = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            const datos = await JSON.parse(respuesta);
            const objEliminado = datos.splice((id - 1), 1);
            if (objEliminado.length > 0) {
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(JSON.stringify(datos)));
                return console.log("Objeto eliminado:\n", objEliminado);
            } else {
                console.log("El objeto no existe");
            }
        } catch (error) {
            console.log(`El error es: ${error}`);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.nombreArchivo, "");
            return console.log(`Se eliminaron todos los datos del archivo ${this.nombreArchivo}`);
        } catch (error) {
            console.log(`El error es: ${error}`);
        }
    }

}

const contenedor1 = new Contenedor("producto.txt");

const producto1 = {
    nombre: "TV",
    precio: 50000,
    imagen: ""
}
const producto2 = {
    nombre: "PC",
    precio: 70000,
    imagen: ""
}
const producto3 = {
    nombre: "Silla",
    precio: 1200,
    imagen: ""
}

setTimeout(() => {
    contenedor1.save(producto1)
}, 500);
setTimeout(() => {
    contenedor1.save(producto2)
}, 1000);
setTimeout(() => {
    contenedor1.save(producto3)
}, 1500);
setTimeout(() => {
    contenedor1.getById(3)
}, 2000);
setTimeout(() => {
    contenedor1.getAll()
}, 2500);
setTimeout(() => {
    contenedor1.deleteById(3)
}, 3000);
setTimeout(() => {
    contenedor1.deleteAll()
}, 4000);
