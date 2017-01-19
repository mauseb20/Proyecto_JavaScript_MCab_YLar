/**
 * Labo_Materia.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

//    connection: 'conexionBaseSwControl',
//    tableName: 'laboratorio_materia',

    attributes: {

        idLaboratorio: {
            model: 'Laboratorio',
            required: true,
        },

        idMateria: {
            model: 'Materia',
            required: true,
        },

        grupo:{
            type: 'string',
            enum: ['GR1', 'GR2', 'GR3']
        }

    }
};

