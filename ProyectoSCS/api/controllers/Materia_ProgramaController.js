/**
 * Materia_ProgramaController
 *
 * @description :: Server-side logic for managing Materia_programas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    //Para acceder a este método se lo debería hacer así : /Usuario/crearUsuario
    asignarLaboratorioMateria: function (req, res) {

        var parametros = req.allParams();

        console.log(parametros);

        if(req.method == 'POST'){
            if(parametros.idPrograma && parametros.idMateria && parametros.estado){
                //crear usuario

                Materia_Programa.create({

                    idPrograma:parametros.idPrograma,
                    idMateria: parametros.idMateria,
                    estado: parametros.estado
                }).exec(function (error, asignadoLaboratorioMateria){


                    if (error) { return res.serverError(); }

                    sails.log.info(asignadoLaboratorioMateria);

                    return res.ok(asignadoLaboratorioMateria);
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

