/**
 * ProfesorController
 *
 * @description :: Server-side logic for managing Profesors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    crearProfesor: function (req, res) {

        var parametros = req.allParams();

        console.log(parametros);

        if(req.method == 'POST'){
            if(parametros.nombreProf && parametros.apellidoProf && parametros.correoProf){

                Profesor.create({
                    nombreProf: parametros.nombreProf,
                    apellidoProf: parametros.apellidoProf,
                    correoProf: parametros.correoProf
                }).exec(function (error, profesorCreado){


                    if (error) { return res.serverError(); }

                    sails.log.info(profesorCreado);
                    Profesor.find({
                        numIntentos: {contains:0}
                    }).exec(function(error,profesoresEncontrados){
                        if(error) return res.serverError();
                        return res.view('FormularioProfesores/EnvioFormulario', {
                            title: 'envioFormulario',
                            tituloError: '',
                            profesores: profesoresEncontrados
                        });
                    })
                });

            } else {

                //bad request
                return res.badRequest('No envia todos los parametros');
            }
        } else {

            return res.badRequest('Metodo invalido');

        }
    },

    editarProfesor: function(req,res){

    }

};

