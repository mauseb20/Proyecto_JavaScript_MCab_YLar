/**
 * Materia_Programa.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    connection: 'conexionBaseSwControl',
    tableName: 'materia_prog',

    attributes: {

        idPrograma: {
            model: 'Programa',
            required: true,
        },

        idMateria: {
            model: 'Materia',
            required: true,
        },

        estado:{
            type: 'string',
            size: 6,
            required: true,
            enum: ['Solicitado', 'Instalado']
        },
    }
};

