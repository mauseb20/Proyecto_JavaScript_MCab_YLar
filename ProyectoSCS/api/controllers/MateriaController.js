/**
 * MateriaController
 *
 * @description :: Server-side logic for managing Materias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


    crearMateria: function (req, res) {

        var parametros = req.allParams();

        //console.log(parametros);

        if(req.method == 'POST'){
            if(parametros.codigoMateria&&parametros.nombreMateria){
                Materia.findOne({
                    codigoMateria:parametros.codigoMateria
                }).exec(function(error,materiaEncontrada){
                    if (error) { return res.serverError(); }
                    //console.log(materiaEncontrada);
                    if(materiaEncontrada!=undefined){
                        Grupo.findOne({
                            materiaGru:materiaEncontrada.idMateria,
                            grupoMateria:parametros.grupoMateria,
                        }).exec(function(error,grupoEncontrado){
                            if(grupoEncontrado!=undefined){
                                return res.view('error',{
                                    title: 'materias',
                                    tituloError: 'error',
                                    error: 'La materia "'+parametros.nombreMateria+' - '+parametros.grupoMateria+'" ya se encuentra registrada',
                                    url: '/crearMateria'
                                })
                            }else{
                                Grupo.create({
                                    grupoMateria:parametros.grupoMateria,
                                    materiaGru:materiaEncontrada.idMateria,
                                }).exec(function(error,grupoCreado){
                                    if (error) { return res.serverError(); }
                                    sails.log.info(grupoCreado);
                                    Materia.find().populate('MateriasGruposDeMateria').exec(function(error,materiasEncontradas){
                                        if (error) return res.serverError()
                                        sails.log.info(materiasEncontradas);
                                        return res.view('Materias/Materias',{
                                            title: 'materias',
                                            tituloError: '',
                                            materias: materiasEncontradas
                                        })
                                    });
                                })
                            }
                        })
                    }else{
                        Materia.create({
                            //idMateria: 1,
                            codigoMateria: parametros.codigoMateria,
                            nombreMateria: parametros.nombreMateria,

                        }).exec(function (error, materiaCreada){


                            if (error) { return res.serverError(); }
                            sails.log.info(materiaCreada);
                            Grupo.create({
                                grupoMateria:parametros.grupoMateria,
                                materiaGru:materiaCreada.idMateria,
                            }).exec(function(error,grupoCreado){
                                if (error) { return res.serverError(); }
                                sails.log.info(grupoCreado);
                                Materia.find().populate('MateriasGruposDeMateria').exec(function(error,materiasEncontradas){
                                    if (error) return res.serverError()
                                    sails.log.info(materiasEncontradas);
                                    return res.view('Materias/Materias',{
                                        title: 'materias',
                                        tituloError: '',
                                        materias: materiasEncontradas
                                    })
                                });
                            })
                            //return res.ok(materiaCreada);
                        });
                    }
                })


            } else {

                //bad request
                return res.view('error',{
                    title: 'materias',
                    tituloError: 'error',
                    error: 'Algunos campos se encuentran vacios',
                    url: '/crearMateria'
                })
                //return res.badRequest('No envia todos los parametros');
            }
        } else {

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
                Grupo.destroy({
                    materiaGru:parametros.idMateria,
                }).exec(function(error,grupoEliminado){
                    Materia.find().populate('MateriasGruposDeMateria').exec(function(error,materiasEncontradas){
                        if (error) return res.serverError()
                        //sails.log.info(materiasEncontradas);
                        return res.view('Materias/Materias',{
                            title: 'materias',
                            tituloError: '',
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
                Materia.findOne({
                    codigoMateria:parametros.codigoMateria,
                    nombreMateria:parametros.nombreMateria
                }).exec(function(error,materiaEncontrada){
                    if (error) { return res.serverError(); }
                    //console.log(materiaEncontrada);
                    if(materiaEncontrada!=undefined){
                        Grupo.findOne({
                            materiaGru:materiaEncontrada.idMateria,
                            grupoMateria:parametros.grupoMateria,
                        }).exec(function(error,grupoEncontrado){
                            if(grupoEncontrado!=undefined){
                                return res.view('error',{
                                    title: 'materias',
                                    tituloError: 'error',
                                    error: 'La materia "'+parametros.nombreMateria+' - '+parametros.grupoMateria+'" ya se encuentra registrada',
                                    url: '/materias'
                                })
                            }else{
                                Materia.update({
                                    idMateria:parametros.idMateria
                                },{
                                    nombreMateria:parametros.nombreMateria,
                                    codigoMateria:parametros.codigoMateria
                                }).exec(function(error, materiaEditada){
                                    if (error) return res.serverError()
                                    Grupo.findOne({
                                        materiaGru:parametros.idMateria,
                                        grupoMateria:parametros.grupoMateriaModificar
                                    }).exec(function(error,grupoEncontrado){
                                        if (error) { return res.serverError(); }
                                        sails.log.info(grupoEncontrado);
                                        Grupo.update({
                                            idGrupo:grupoEncontrado.idGrupo
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
                                                    tituloError: '',
                                                    materias: materiasEncontradas
                                                })
                                            })
                                        })
                                    })
                                });
                            }
                        })
                    }else{
                        Materia.update({
                            idMateria:parametros.idMateria
                        },{
                            nombreMateria:parametros.nombreMateria,
                            codigoMateria:parametros.codigoMateria
                        }).exec(function(error, materiaEditada){
                            if (error) return res.serverError()
                            Grupo.find({
                                materiaGru:parametros.idMateria,
                                grupoMateria:parametros.grupoMateriaModificar
                            }).exec(function(error,grupoEncontrado){
                                if (error) { return res.serverError(); }
                                sails.log.info(grupoEncontrado);
                                Grupo.update({
                                    idGrupo:grupoEncontrado.idGrupo
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
                                            tituloError: '',
                                            materias: materiasEncontradas
                                        })
                                    })
                                })
                            })
                        });
                    }
                })

            }else{
                return res.view('error',{
                    title: 'materias',
                    tituloError: 'error',
                    error: 'Algunos campos se encuentran vacios',
                    url: '/materias'
                })
            }
        }else{
            return res.badRequest('Metodo invalido');
        }
    }
};

