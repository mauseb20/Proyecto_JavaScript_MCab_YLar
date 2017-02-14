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
           // required: true,
            autoIncrement: true,
            size: 6
        },

        nombreLaboratorio: {
            type: 'string',
            required: true,
            size: 10
        },

        numAula: {
            type: 'string',
            required: true,
            size: 6
        },

        capacidad: {
            type: 'string',
            required: true,
            size: 6
        },

        descripcionUbicacion: {
            type: 'string',
            defaultsTo: 'NULL',
            size: 100
        },

        numOrdenadores: {
            type: 'string',
            required: true,
            size: 6
        },

        proyectorEmpotrado: {
            type: 'string',
            //required: true,
            enum: ['SI', 'NO'],
            defaultsTo: 'NO',
            size: 2
        },

        LaboratoriosMateriasDeLaboratorio: {
            collection: 'LaboMateria',
            via: 'idLaboratorio'
        },

        LaboratoriosProgramasDeLaboratorio: {
            collection: 'LaboPrograma',
            via: 'idLaboratorio'
        },
        
        LaboratoriosGruposDeLaboratorio: {
            collection: 'Grupo',
            via: 'idLaboratorio'
        }

    }
};

