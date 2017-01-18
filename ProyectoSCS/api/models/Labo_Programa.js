/**
 * Labo_Programa.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      
      idLaboratorio: {
          model: 'Laboratorio',
          required: true,
      },
      
      idMateria: {
          model: 'Laboratorio',
          required: true,
      },
      
      grupo:{
          type: 'string',
          enum: ['GR1', 'GR2', 'GR3'] 
      }

  }
};

