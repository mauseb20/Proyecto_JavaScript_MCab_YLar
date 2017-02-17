/**
 * FormularioController
 *
 * @description :: Server-side logic for managing Formularios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    enviarFormulario: function(req,res){
        var parametros = req.allParams();
        if(req.method == 'POST'){

            if(parametros.idProfesor&&parametros.numIntentos){
                Profesor.findOne({
                    idProfesor: parametros.idProfesor
                }).exec(function(error,profesorEncontrado){
                    if (error) return res.serverError();
                    if(profesorEncontrado){
                        //envio correo
                        Profesor.update({
                            idProfesor: parametros.idProfesor
                        },{
                            numIntentos: parametros.numIntentos,
                            formEnviado: 'true'
                        }).exec(function(error,profesorActualizado){
                            if(error) return res.serverError();
                            Profesor.find().exec(function(error,profesoresEcontrados){
                                if (error) return res.serverError();
                                return res.view('FormularioProfesores/Profesores', {
                                    title: 'profesores',
                                    tituloError: '',
                                    profesores: profesoresEcontrados
                                });
                            })
                        })
                    }else{
                        return res.badRequest('El profesor no existe');
                    }
                })
            }else{
                return res.badRequest('No envia todos los parametros');
            }
        }else{
            return res.badRequest('Metodo invalido');
        }
    },
    
    

};