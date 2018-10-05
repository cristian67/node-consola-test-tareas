const fs = require('fs');

let listadoPorHacer = [];

//Funcion flecha para crear data en json
const guardarDB = () => {
    //trasformar a json
    let dato = JSON.stringify(listadoPorHacer);
    //crear archivo con writeFile
    const data = new Uint8Array(Buffer.from(dato));
    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('No se puede guardar', err);
    });
}

//cargar datos a bd sin borrar
const cargarDB = () => {
    //si no hay error, guarda en el array los datos de data.json
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        //si existe error, se guarda un arreglo vacio.
        listadoPorHacer = [];
    }
}

//funcion flecha crear registro
const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };
    //crear registro
    listadoPorHacer.push(porHacer);
    //guardarlo en json
    guardarDB();
    return porHacer;
}

//Mostrar
const getListado = () => {

    cargarDB();
    //recueda retornar :(
    return listadoPorHacer;

}

//Actualizar
const actualizar = (descripcion, completado = true) => {

    cargarDB();
    //si coincide el index de la tarea, con la descripcion q se mando "DEBE SER TEXTUAL, YA Q SE ESTA OCUPANDO COMO ID", si no regresa un -1
    let index = listadoPorHacer.findIndex(task => task.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        //una vez actualiza se debe guardar en la bdd
        guardarDB();
        return true;
    } else { return false; }
}

//Eliminar
const borrar = (descripcion) => {
    cargarDB();
    //MOD con Filter
    let nuevoListado = listadoPorHacer.filter(task => task.descripcion !== descripcion);
    if (nuevoListado === listadoPorHacer) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

    //MODO AWEONADO
    // let index = listadoPorHacer.findIndex(task => task.descripcion === descripcion);
    // if (index >= 0) {
    //     let borrar = [];
    //     listadoPorHacer[index] = borrar;
    //     //guardar cambio
    //     guardarDB();
    //     return true;
    // } else { return false; }
}

//funcion para exportar las funciones a utilizar en app.js
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}