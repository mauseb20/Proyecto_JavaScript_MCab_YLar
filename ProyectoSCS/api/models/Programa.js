/**
 * Programa.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'conexionBaseSwControl',
  tableName: 'programa',
    
  attributes: {
      
      idPrograma: {
          type: 'number',
          primaryKey: true,
          unique: true,
          required: true,
          autoIncrement: true,
          size: 6
      },
        
      nombrePrograma: {
          type: 'string',
          required: true,
          size: 30
      },
      
      tipoProg: {
          type: 'string',
          required: true,
          size: 20
      },
      
      servicio: {
          type: 'string',
          defaultsTo: 'NULL',
          size: 15
      },
        
      categoria: {
          type: 'string',
          required: true,
          size: 10
      },
      
     versionProg: {
          type: 'string',
          required: true,
          size: 10
      },
      
      anioProg: {
          type: 'string',
          defaultsTo: 'NULL',
          size: 10
      }

  }
};

