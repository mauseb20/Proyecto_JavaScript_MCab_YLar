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
                Profesor.findOne({
                    correoProf: parametros.correoProf
                }).exec(function(error,profesorEncontrado){
                    if(profesorEncontrado){
                        return res.view('error',{
                            title: 'profesores',
                            tituloError: 'error',
                            error: 'El profesor ya esta registrado',
                            url: '/crearProf'
                        })
                    }else{
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
                                return res.view('FormularioProfesores/Profesores', {
                                    title: 'profesores',
                                    tituloError: '',
                                    profesores: profesoresEncontrados
                                });
                            })
                        });

                    }
                })


            } else {

                //bad request
                return res.view('error',{
                    title: 'profesores',
                    tituloError: 'error',
                    error: 'Algunos campos se encuentran vacios',
                    url: '/crearProf'
                })
            }
        } else {

            return res.badRequest('Metodo invalido');

        }
    },

    editarProfesor: function (req, res) {

        var parametros = req.allParams();

        console.log(parametros);

        if(req.method == 'POST'){
            if(parametros.nombreProf && parametros.apellidoProf && parametros.correoProf){
                Profesor.findOne({
                    idProfesor: parametros.idProfesor
                }).exec(function(error,profesorEncontrado){
                    if(profesorEncontrado.nombreProf==parametros.nombreProf){
                        if(profesorEncontrado.apellidoProf==parametros.apellidoProf){
                            if(profesorEncontrado.correoProf==parametros.correoProf){
                                return res.view('error',{
                                    title: 'profesores',
                                    tituloError: 'error',
                                    error: 'EL profesor no ha sido editado',
                                    url: '/profesores'
                                })
                            }else{
                                Profesor.findOne({
                                    correoProf: parametros.correoProf
                                }).exec(function(error,profesorEncontrado){
                                    if(profesorEncontrado){
                                        return res.view('error',{
                                            title: 'profesores',
                                            tituloError: 'error',
                                            error: 'EL profesor ya existe',
                                            url: '/profesores'
                                        })
                                    }else{
                                        Profesor.update({
                                            idProfesor:parametros.idProfesor
                                        },{
                                            correoProf: parametros.correoProf
                                        }).exec(function(error,profesorEditado){
                                            if (error) { return res.serverError(); }
                                            Profesor.find({
                                                numIntentos: {contains:0}
                                            }).exec(function(error,profesoresEncontrados){
                                                if(error) return res.serverError();
                                                return res.view('FormularioProfesores/Profesores', {
                                                    title: 'profesores',
                                                    tituloError: '',
                                                    profesores: profesoresEncontrados
                                                });
                                            })
                                        })
                                    }
                                })
                            }
                        }else{
                            if(profesorEncontrado.correoProf==parametros.correoProf){
                                Profesor.update({
                                    idProfesor:parametros.idProfesor
                                },{
                                    apellidoProf: parametros.apellidoProf
                                }).exec(function(error,profesorEditado){
                                    if (error) { return res.serverError(); }
                                    Profesor.find({
                                        numIntentos: {contains:0}
                                    }).exec(function(error,profesoresEncontrados){
                                        if(error) return res.serverError();
                                        return res.view('FormularioProfesores/Profesores', {
                                            title: 'profesores',
                                            tituloError: '',
                                            profesores: profesoresEncontrados
                                        });
                                    })
                                })
                            }else{
                                Profesor.findOne({
                                    correoProf: parametros.correoProf
                                }).exec(function(error,profesorEncontrado){
                                    if(profesorEncontrado){
                                        return res.view('error',{
                                            title: 'profesores',
                                            tituloError: 'error',
                                            error: 'EL profesor ya existe',
                                            url: '/profesores'
                                        })
                                    }else{
                                        Profesor.update({
                                            idProfesor:parametros.idProfesor
                                        },{
                                            apellidoProf: parametros.apellidoProf,
                                            correoProf: parametros.correoProf
                                        }).exec(function(error,profesorEditado){
                                            if (error) { return res.serverError(); }
                                            Profesor.find({
                                                numIntentos: {contains:0}
                                            }).exec(function(error,profesoresEncontrados){
                                                if(error) return res.serverError();
                                                return res.view('FormularioProfesores/Profesores', {
                                                    title: 'profesores',
                                                    tituloError: '',
                                                    profesores: profesoresEncontrados
                                                });
                                            })
                                        })
                                    }
                                })
                            }
                        }
                    }else{
                        if(profesorEncontrado.apellidoProf==parametros.apellidoProf){
                            if(profesorEncontrado.correoProf==parametros.correoProf){
                                Profesor.update({
                                    idProfesor:parametros.idProfesor
                                },{
                                    nombreProf: parametros.nombreProf
                                }).exec(function(error,prodesorEditado){
                                    if (error) { return res.serverError(); }
                                    Profesor.find({
                                        numIntentos: {contains:0}
                                    }).exec(function(error,profesoresEncontrados){
                                        if(error) return res.serverError();
                                        return res.view('FormularioProfesores/Profesores', {
                                            title: 'profesores',
                                            tituloError: '',
                                            profesores: profesoresEncontrados
                                        });
                                    })
                                })
                            }else{
                                Profesor.findOne({
                                    correoProf: parametros.correoProf
                                }).exec(function(error,profesorEncontrado){
                                    if(profesorEncontrado){
                                        return res.view('error',{
                                            title: 'profesores',
                                            tituloError: 'error',
                                            error: 'EL profesor ya existe',
                                            url: '/profesores'
                                        })
                                    }else{
                                        Profesor.update({
                                            idProfesor:parametros.idProfesor
                                        },{
                                            nombreProf: parametros.nombreProf,
                                            correoProf: parametros.correoProf
                                        }).exec(function(error,prodesorEditado){
                                            if (error) { return res.serverError(); }
                                            Profesor.find({
                                                numIntentos: {contains:0}
                                            }).exec(function(error,profesoresEncontrados){
                                                if(error) return res.serverError();
                                                return res.view('FormularioProfesores/Profesores', {
                                                    title: 'profesores',
                                                    tituloError: '',
                                                    profesores: profesoresEncontrados
                                                });
                                            })
                                        })
                                    }
                                })
                            }
                        }else{
                            if(profesorEncontrado.correoProf==parametros.correoProf){
                                Profesor.update({
                                    idProfesor:parametros.idProfesor
                                },{
                                    nombreProf: parametros.nombreProf,
                                    apellidoProf: parametros.apellidoProf
                                }).exec(function(error,prodesorEditado){
                                    if (error) { return res.serverError(); }
                                    Profesor.find({
                                        numIntentos: {contains:0}
                                    }).exec(function(error,profesoresEncontrados){
                                        if(error) return res.serverError();
                                        return res.view('FormularioProfesores/Profesores', {
                                            title: 'profesores',
                                            tituloError: '',
                                            profesores: profesoresEncontrados
                                        });
                                    })
                                })
                            }else{
                                Profesor.findOne({
                                    correoProf: parametros.correoProf
                                }).exec(function(error,profesorEncontrado){
                                    if(profesorEncontrado){
                                        return res.view('error',{
                                            title: 'profesores',
                                            tituloError: 'error',
                                            error: 'EL profesor ya existe',
                                            url: '/profesores'
                                        })
                                    }else{
                                        Profesor.update({
                                            idProfesor:parametros.idProfesor
                                        },{
                                            nombreProf: parametros.nombreProf,
                                            apellidoProf: parametros.apellidoProf,
                                            correoProf: parametros.correoProf
                                        }).exec(function(error,prodesorEditado){
                                            if (error) { return res.serverError(); }
                                            Profesor.find({
                                                numIntentos: {contains:0}
                                            }).exec(function(error,profesoresEncontrados){
                                                if(error) return res.serverError();
                                                return res.view('FormularioProfesores/Profesores', {
                                                    title: 'profesores',
                                                    tituloError: '',
                                                    profesores: profesoresEncontrados
                                                });
                                            })
                                        })
                                    }
                                })
                            }
                        }
                    }
                })


            } else {

                //bad request
                return res.view('error',{
                    title: 'profesores',
                    tituloError: 'error',
                    error: 'Algunos campos se encuentran vacios',
                    url: '/profesores'
                })
            }
        } else {

            return res.badRequest('Metodo invalido');

        }
    },

    borrarProfesor: function(req,res){
        var parametros = req.allParams();
        console.log(parametros);
        if(parametros.idProfesor){
            Profesor.destroy({
                idProfesor:parametros.idProfesor
            }).exec(function(error,profesorEliminado){
                if (error) return res.serverError()
                Profesor.find({
                    numIntentos: {contains:0}
                }).exec(function(error,profesoresEncontrados){
                    if(error) return res.serverError();
                    return res.view('FormularioProfesores/Profesores', {
                        title: 'profesores',
                        tituloError: '',
                        profesores: profesoresEncontrados
                    });
                })
            });
        }else{
            return res.badRequest('No envia todos los parametros');
        }
    }

};

