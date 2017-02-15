/**
 * Programa.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    //  connection: 'conexionBaseSwControl',
    //  tableName: 'programa',

    attributes: {

        idPrograma: {
            type: 'number',
            primaryKey: true,
            unique: true,
            // required: true,
            autoIncrement: true,
            size: 6
        },

        nombrePrograma: {
            type: 'string',
            required: true,
            size: 30,
        },

        tipoProg: {
            type: 'string',
            required: true,
            enum: ['SO', 'APP'],
            defaultsTo: 'APP',
        },

        servicio: {
            type: 'string',
            enum: ['Ofimatica', 'IDE', 'BDD', 'Case', 'Otro'],
            defaultsTo: 'Otro',
        },

        categoria: {
            type: 'string',
            required: true,
            enum: ['Pago', 'Libre'],
        },

        versionProg: {
            type: 'string',
            defaultsTo: 'Sin Versión',
            size: 10
        },

        anioProg: {
            type: 'string',
            defaultsTo: 'Desconocido',
            size: 10
        },

        LaboratoriosProgramasDePrograma: {
            collection: 'LaboPrograma',
            via: 'idPrograma'
        },

        ProgramasGruposDePrograma: {
            collection: 'Grupo',
            via: 'materiaProg'
        }

    }
};

