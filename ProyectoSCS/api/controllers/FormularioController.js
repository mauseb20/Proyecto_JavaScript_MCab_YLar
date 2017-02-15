/**
 * FormularioController
 *
 * @description :: Server-side logic for managing Formularios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	enviarFormulario: function(req,res){
        var parametros = req.allParams();
        
        if(req.method=='POST'){
            if(parametros.idProfesor&&parametros.numIntentos){
                
            }else{
                return res.badRequest('MNo envia todos los parametros');
            }
        }
        else{
            return res.badRequest('Metodo invalido');
        }
    }
};

