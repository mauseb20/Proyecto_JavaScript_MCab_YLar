/**
 * LaboratorioController
 *
 * @description :: Server-side logic for managing Laboratorios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    //Para acceder a este método se lo debería hacer así : /Laboratorio/crearLaboratorio
    crearLaboratorio: function (req, res) {

        var parametros = req.allParams();

        console.log(parametros);

        if(req.method == 'POST'){
            if(parametros.nombreLaboratorio && parametros.numAula && parametros.capacidad && parametros.numOrdenadores && parametros.proyectorEmpotrado){
                //crear programa

                Laboratorio.create({

                    nombreLaboratorio: parametros.nombreLaboratorio,
                    numAula: parametros.numAula,
                    capacidad: parametros.capacidad,
                    numOrdenadores: parametros.numOrdenadores,
                    proyectorEmpotrado: parametros.proyectorEmpotrado

                }).exec(function (error, laboratorioCreado){


                    if (error) { return res.serverError(); }

                    sails.log.info(laboratorioCreado);

                    Laboratorio.find().exec(function(error,laboratoriosEncontrados){
                        if(error) return res.serverError()
                        sails.log.info(laboratoriosEncontrados);
                        return res.view('Laboratorios/Laboratorios',{
                            title: 'laboratorios',
                            laboratorio: laboratoriosEncontrados
                        })
                    })
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

