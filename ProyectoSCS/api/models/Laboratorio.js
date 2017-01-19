/**
 * Laboratorio.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

//    connection: 'conexionBaseSwControl',
//    tableName: 'laboratorio',

    attributes: {

        idLaboratorio: {
            type: 'number',
            primaryKey: true,
            unique: true,
            required: true,
            autoIncrement: true,
            size: 6
        },

        nombreLaboratorio: {
            type: 'string',
            required: true,
            size: 10
        },

        numAula: {
            type: 'number',
            required: true,
            size: 6
        },

        capacidad: {
            type: 'number',
            required: true,
            size: 6
        },

        descripcionUbicacion: {
            type: 'string',
            defaultsTo: 'NULL',
            size: 100
        },

        numOrdenadores: {
            type: 'number',
            required: true,
            size: 6
        },

        proyectorEmpotrado: {
            type: 'string',
            required: true,
            defaultsTo: 'NO',
            enum: ['SI', 'NO'],
            size: 2
        },

        LaboratoriosMateriasDeLaboratorio: {
            collection: 'Labo_Materia',
            via: 'idLaboratorio'
        },

        LaboratoriosProgramasDeLaboratorio: {
            collection: 'Labo_Programa',
            via: 'idLaboratorio'
        }

    }
};

