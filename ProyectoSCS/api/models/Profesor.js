/**
 * Profesor.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        idProfesor: {
            type: 'number',
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            size: 6
        },

        nombreProf: {
            type: 'string',
            required: true,
            size: 50
        },

        apellidoProf: {
            type: 'string',
            required: true,
            size: 50
        },

        correoProf: {
            type: 'email',
            required: true,
            size: 60
        },

        numIntentos: {
            type: 'number',
            size: 4
        },

        MateriasGruposDeProfesor: {
            collection: 'Grupo',
            via: 'profesorGru'
        }
    }
};

