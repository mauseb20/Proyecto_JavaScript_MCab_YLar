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
                    Materia_Grupo.create({
                        grupoMateria:parametros.grupoMateria,
                        materia_gru:materiaCreada.idMateria,
                    }).exec(function(error,grupoCreado){
                        if (error) { return res.serverError(); }
                        sails.log.info(grupoCreado);
                        Materia.find().populate('MateriasGruposDeMateria').exec(function(error,materiasEncontradas){
                            if (error) return res.serverError()
                            sails.log.info(materiasEncontradas);
                            return res.view('Materias/Materias',{
                                title: 'materias',
                                materias: materiasEncontradas
                            })
                        });
                    })
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
                }).populate('MateriasGruposDeMateria').exec(function(error, materiasEncontradas){
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
            }).exec(function(error,materiaEliminada){
                if (error) return res.serverError()
                Materia_Grupo.destroy({
                    materia_gru:materiaEliminada.idMateria,
                }).exec(function(error,grupoEliminado){
                    Materia.find().populate('MateriasGruposDeMateria').exec(function(error,materiasEncontradas){
                        if (error) return res.serverError()
                        sails.log.info(materiasEncontradas);
                        return res.view('Materias/Materias',{
                            title: 'materias',
                            materias: materiasEncontradas
                        })
                    })
                })
            });
        }else{
            return res.badRequest('No envia todos los parametros');
        }
    },
    editarMateria: function(req,res){
        var parametros = req.allParams();
        console.log(parametros);
        if(req.method == 'POST'){
            if(parametros.idMateria&&parametros.codigoMateria&&parametros.nombreMateria){
                Materia.update({
                    idMateria:parametros.idMateria
                },{
                    nombreMateria:parametros.nombreMateria,
                    codigoMateria:parametros.codigoMateria
                }).exec(function(error, materiaEditada){
                    if (error) return res.serverError()
                    Materia_Grupo.update({
                        materia_gru:materiaEditada.idMateria
                    },{
                        grupoMateria:parametros.grupoMateria
                    }).exec(function(error,grupoEditado){
                        if (error) { return res.serverError(); }
                        sails.log.info(grupoEditado);
                        Materia.find().populate('MateriasGruposDeMateria').exec(function(error,materiasEncontradas){
                            if (error) return res.serverError()
                            sails.log.info(materiasEncontradas);
                            return res.view('Materias/Materias',{
                                title: 'materias',
                                materias: materiasEncontradas
                            })
                        })
                    })
                });
            }else{
                return res.badRequest('No envia todos los parametros');
            }
        }else{
            return res.badRequest('Metodo invalido');
        }
    }
};

