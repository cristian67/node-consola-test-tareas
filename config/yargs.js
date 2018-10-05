const argv = require('yargs')
    .command('crear', 'crear elemento por hacer', {
        descripcion: {
            demand: true,
            alias: 'd',
            desc: 'crear alguna wea'
        }

    })
    .command('actualizar', 'actualizar elemento', {
        descripcion: {
            demand: true,
            alias: 'd',
            desc: 'actualizar alguna wea'
        },
        estado: {
            default: true,
            alias: 'c',
            desc: 'describe estado completo o pendiente'
        }
    })
    .command('borrar', 'elimina un elemento', {
        descripcion: {
            demand: true,
            alias: 'd',
            desc: 'elimina alguna wea'
        }

    })
    .help()
    .argv;

module.exports = {
    argv
}