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

        nombre_Prof: {
            type: 'string',
            required: true,
            size: 50
        },

        apellido_Prof: {
            type: 'string',
            required: true,
            size: 50
        },

        correo_Prof: {
            type: 'email',
            required: true,
            size: 60
        },

        num_Intentos: {
            type: 'number',
            size: 4
        },

        MateriasGruposDeProfesor: {
            collection: 'Materia_Grupo',
            via: 'profesor_gru'
        }
    }
};

