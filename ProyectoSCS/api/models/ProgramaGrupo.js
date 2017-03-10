/**
 * ProgramaGrupo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        idPrograma: {
            model: 'Programa',
            required: true
        },

        idGrupo: {
            model: 'Grupo',
            required: true
        },

        estado:{
            type: 'string',
            size: 6,
            enum: ['Solicitado', 'Instalado']
        }

    }
};

