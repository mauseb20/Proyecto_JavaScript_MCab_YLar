/**
 * Materia_Grupo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

       
        idMateria_grupo: {
            type: 'number',
            primaryKey: true,
            unique: true,
            //  required: true,
            autoIncrement: true,
            size: 6
        },

        grupoMateria:{
            type: 'string',
            required: true,
            enum: ['Sin Grupo', 'GR1', 'GR2', 'GR3', 'GR4']
        },

        materia_gru: {
            model: 'Materia',
            //required: true,
        },

        profesor_gru: {
            model: 'Profesor',
            //required: true,
        }

    }
};

