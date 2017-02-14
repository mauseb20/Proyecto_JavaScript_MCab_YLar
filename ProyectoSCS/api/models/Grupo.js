/**
 * Materia_Grupo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

       
        idGrupo: {
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

        materiaGru: {
            model: 'Materia',
            //required: true,
        },

        profesorGru: {
            model: 'Profesor',
            //required: true,
        },
        
        materiaProg: {
            model: 'Programa',
            //required: true,
        },
        
        laboratorioGru: {
            model: 'Laboratorio'
        }

    }
};

