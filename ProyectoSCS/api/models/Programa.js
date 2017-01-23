/**
 * Programa.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

//  connection: 'conexionBaseSwControl',
//  tableName: 'programa',
    
  attributes: {
      
      idPrograma: {
          type: 'number',
          primaryKey: true,
          unique: true,
         // required: true,
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
          enum: ['SO', 'APP'],
          size: 5
      },
      
      servicio: {
          type: 'string',
          defaultsTo: 'NULL',
          enum: ['Ofimatica', 'IDE', 'BDD', 'Case'],
          size: 10
      },
        
      categoria: {
          type: 'string',
          required: true,
          enum: ['Pago', 'Libre']
      },
      
     versionProg: {
          type: 'string',
          required: true,
         defaultsTo: 'NULL',
          size: 10
      },
      
      anioProg: {
          type: 'string',
          defaultsTo: 'NULL',
          size: 10
      },
      
      LaboratoriosProgramasDePrograma: {
            collection: 'Labo_Programa',
            via: 'idPrograma'
        },
      
      MateriasProgramasDePrograma: {
            collection: 'Materia_Programa',
            via: 'idPrograma'
        }

  }
};

