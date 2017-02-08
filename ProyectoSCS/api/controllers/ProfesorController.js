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
            if(parametros.nombre_Prof && parametros.apellido_Prof && parametros.correo_Prof){
                //crear usuario

                Profesor.create({
                    nombre_Prof: parametros.nombre_Prof,
                    apellido_Prof: parametros.apellido_Prof,
                    correo_Prof: parametros.correo_Prof

                }).exec(function (error, profesorCreado){


                    if (error) { return res.serverError(); }

                    sails.log.info(profesorCreado);

                    Profesor.find().exec(function(error,profesoresEncontrados){
                        if (error) return res.serverError()
                        sails.log.info(profesoresEncontrados);
                        return res.view('FormularioProfesores/EnvioFormulario', {
                            title: 'envioFormulario',
                            profesores: profesoresEncontrados
                        })
                    });

                    //return res.redirect('back');
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

