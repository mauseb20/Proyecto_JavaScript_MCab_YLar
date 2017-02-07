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
         // required: true,
          autoIncrement: true,
          size: 6
      },
        
      nombreApellidoProfesor: {
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
         //required: true,
         size: 2
     }

  }
};

