/**
 * ProgramaController
 *
 * @description :: Server-side logic for managing Programas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    //Para acceder a este método se lo debería hacer así : /Programa/crearPrograma
    crearPrograma: function (req, res) {

        var parametros = req.allParams();

        console.log(parametros);

        if(req.method == 'POST'){
            if(parametros.nombrePrograma && parametros.tipoProg && parametros.servicio && parametros.categoria && parametros.versionProg ){
                //crear programa

                Programa.create({

                    nombrePrograma: parametros.nombrePrograma,
                    tipoProg: parametros.tipoProg,
                    servicio: parametros.servicio,
                    categoria: parametros.categoria,
                    versionProg: parametros.versionProg,
                    

                }).exec(function (error, programaCreado){


                    if (error) { return res.serverError(); }

                    sails.log.info(programaCreado);

                    return res.ok(programaCreado);
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

