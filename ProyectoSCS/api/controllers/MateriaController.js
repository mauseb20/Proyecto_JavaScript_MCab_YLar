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
                    //idMateria: 1,
                    codigoMateria: parametros.codigoMateria,
                    nombreMateria: parametros.nombreMateria,

                }).exec(function (error, materiaCreada){


                    if (error) { return res.serverError(); }

                    sails.log.info(materiaCreada);
                    Materia.find().exec(function(error,materiasEncontradas){
                        if (error) return res.serverError()
                        sails.log.info(materiasEncontradas);
                        return res.view('Materias/Materias',{
                            title: 'materias',
                            materias: materiasEncontradas
                        })
                    });
                    //return res.ok(materiaCreada);
                });

            } else {

                //bad request
                return res.badRequest('No envia todos los parametros');
            }
        } else {

            return res.badRequest('Metodo invalido');

        }
    },
    buscarMateria: function(req,res){
        var parametros = req.allParams();
        console.log(parametros);
        if(req.method=='GET'){
            if (parametros.materiaBuscada){
                Materia.find({
                    nombreMateria: {contains: parametros.materiaBuscada}
                }).exec(function(error, materiasEncontradas){
                    if (error) return res.serverError()
                    sails.log.info(materiasEncontradas);
                    return res.view('Materias/Materias',{
                        title: 'materias',
                        materias: materiasEncontradas
                    })
                })
            }else{
                return res.badRequest('No envia todos los parametros');
            }
        }else{
            return res.badRequest('Metodo invalido');
        }
    },
    borrarMateria: function(req,res){
        var parametros = req.allParams();
        console.log(parametros);
        if(parametros.idMateria){
            Materia.destroy({
                idMateria:parametros.idMateria
            }).exec(function(error,usuarioRemovido){
                if (error) return res.serverError()
                Materia.find().exec(function(error,materiasEncontradas){
                    if (error) return res.serverError()
                    sails.log.info(materiasEncontradas);
                    return res.view('Materias/Materias',{
                        title: 'materias',
                        materias: materiasEncontradas
                    })
                })
            });
        }else{
            return res.badRequest('No envia todos los parametros');
        }
    }
};

