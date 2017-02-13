/**
 * Labo_ProgramaController
 *
 * @description :: Server-side logic for managing Labo_programas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
    //Para acceder a este método se lo debería hacer así : /Usuario/crearUsuario
    instalarProgramaLaboratorio: function (req, res) {

        var parametros = req.allParams();

        console.log(parametros);

        if(req.method == 'POST'){
            if(parametros.idPrograma && parametros.idLaboratorio){
                //crear usuario

                Labo_Programa.create({

                    idPrograma:parametros.idPrograma,
                    idLaboratorio: parametros.idLaboratorio

                }).exec(function (error, instaladoProgramaLaboratorio){


                    if (error) { return res.serverError(); }

                    sails.log.info(instaladoProgramaLaboratorio);

                    return res.ok(instaladoProgramaLaboratorio);
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

