/**
 * ProgramaGrupo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    connection: 'conexionBaseSwControl',
    tableName: 'programa_grupo',

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
            size: 10,
            enum: ['Solicitado', 'Instalado']
        }

    }
};

