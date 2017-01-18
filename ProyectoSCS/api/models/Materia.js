/**
 * Materia.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'conexionBaseSwControl',
  tableName: 'materia',
    
    attributes: {
      
      idMateria: {
          type: 'number',
          primaryKey: true,
          unique: true,
          required: true,
          autoIncrement: true,
          size: 6
      },
        
      codigoMateria: {
          type: 'string',
          required: true,
          size: 6
      },
        
      nombreMateria: {
          type: 'string',
          required: true,
          size: 100
      },
        
      LaboratoriosMateriasDeMateria: {
          collection: 'Labo_Materia',
          via: 'idMateria'
      }
  }
};

