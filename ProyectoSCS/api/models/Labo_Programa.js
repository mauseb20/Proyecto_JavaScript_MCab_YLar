/**
 * Labo_Programa.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

//    connection: 'conexionBaseSwControl',
//    tableName: 'laboratorio_programa',

    attributes: {

        idLaboratorio: {
            model: 'Laboratorio',
            required: true,
        },

        idPrograma: {
            model: 'Programa',
            required: true,
        }

    }
};

