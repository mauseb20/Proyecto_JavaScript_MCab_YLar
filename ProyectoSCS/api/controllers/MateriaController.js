/**
 * MateriaController
 *
 * @description :: Server-side logic for managing Materias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    
     crearMateria: function (req, res) {
        
         var parametros = req.allParams();
         
         console.log(parametros);
         
         if(req.method == 'POST'){
         if(parametros.codigoMateria&&parametros.nombreMateria){
             //crear usuario
             
              Materia.create({
           //       idMateria: 1,
             codigoMateria: parametros.codigoMateria,
             nombreMateria: parametros.nombreMateria,
                  
         }).exec(function (error, materiaCreada){
             
             
               if (error) { return res.serverError(); }
             
             sails.log.info(materiaCreada);
               
             return res.ok(materiaCreada);
         });
             
         } else {
             
             //bad request
             return res.badRequest('No envia todos los parametros');
         }
         } else {
             
             return res.badRequest('Metodo invalido');
             
         }
     }
};

