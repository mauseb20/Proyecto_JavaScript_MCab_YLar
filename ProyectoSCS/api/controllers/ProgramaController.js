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
        var tipoPrograma;
        console.log(parametros);
        if(req.method == 'POST'){
            if(parametros.nombrePrograma && parametros.categoria ){
                if (!parametros.servicio) {
                    tipoPrograma = 'SO';
                }
                else {
                    tipoPrograma = 'APP';
                }
                Programa.findOne({
                    nombrePrograma: parametros.nombrePrograma
                }).exec(function(error, programaEncontrado){
                    if (error)
                        return res.serverError();
                    if (programaEncontrado){
                        if (programaEncontrado.versionProg == parametros.versionProg){
                            return res.view('error',{
                                title: 'software',
                                tituloError: 'error',
                                error: 'El programa ' +parametros.nombrePrograma+' '+ parametros.versionProg + ' ya se encuentra registrado',
                                url: '/crearSoftware'
                            })
                        }
                        else{
                            Programa.create({

                                nombrePrograma: parametros.nombrePrograma,
                                tipoProg: tipoPrograma,
                                servicio: parametros.servicio,
                                categoria: parametros.categoria,
                                versionProg: parametros.versionProg,
                                anioProg: parametros.anioProg


                            }).exec(function (error, programaCreado){

                                if (error) { return res.serverError(); }

                                sails.log.info(programaCreado);

                                Programa.find({
                                    tipoProg: {
                                        contains: 'APP'
                                    }
                                }).exec(function(error, softwareEncontrado){
                                    if (error) return res.serverError();
                                    return res.view('Software/Software', {
                                        title: 'software',
                                        tituloError: '',
                                        software: softwareEncontrado
                                    })
                                })
                            })
                        }

                    } else {
                        Programa.create({

                            nombrePrograma: parametros.nombrePrograma,
                            tipoProg: tipoPrograma,
                            servicio: parametros.servicio,
                            categoria: parametros.categoria,
                            versionProg: parametros.versionProg,
                            anioProg: parametros.anioProg


                        }).exec(function (error, programaCreado){

                            if (error) { return res.serverError(); }

                            sails.log.info(programaCreado);

                            Programa.find({
                                tipoProg: {
                                    contains: 'APP'
                                }
                            }).exec(function(error, softwareEncontrado){
                                if (error) return res.serverError();
                                return res.view('Software/Software', {
                                    title: 'software',
                                    tituloError: '',
                                    software: softwareEncontrado
                                })
                            })
                        })
                    }
                })
            }else{
                return res.view('error',{
                    title: 'software',
                    tituloError: 'error',
                    error: 'Algunos campos obligatorio se encuentran vacios',
                    url: '/crearSoftware'
                })
            }
        }else{
            return res.badRequest('Metodo invalido');
        }
    },

    borrarPrograma: function (req, res) {

        var parametros = req.allParams();
        console.log(parametros);

        if(parametros.idPrograma){
            Programa.destroy({
                idPrograma:parametros.idPrograma
            }).exec(function(error,programaEliminado){
                if (error) return res.serverError()

                Programa.find({
                    tipoProg: {
                        contains: 'APP'
                    }
                }).exec(function(error,swEncontrado){
                    if(error) return res.serverError()

                    return res.view('Software/Software',{
                        title: 'software',
                        tituloError: '',
                        software: swEncontrado
                    })

                })
            })
        }
    },

    editarPrograma: function (req, res) {

        var parametros =req.allParams();
        if (req.method=='POST'){
            if(parametros.nombrePrograma && parametros.categoria && parametros.versionProg){
                var swAEditar = {
                    nombrePrograma: parametros.nombrePrograma,
                    servicio: parametros.servicio,
                    categoria: parametros.categoria,
                    versionProg: parametros.versionProg,
                    anioProg: parametros.anioProg
                }
                Programa.findOne({
                    idPrograma: parametros.idPrograma
                }).exec(function(error,programaEncontrado){
                    if(parametros.nombrePrograma == programaEncontrado.nombrePrograma){
                        delete swAEditar.nombrePrograma
                    }
                    if(parametros.versionProg == programaEncontrado.versionProg){
                        delete swAEditar.versionProg
                    }
                    if(parametros.categoria == programaEncontrado.categoria){
                        delete swAEditar.categoria
                    }
                    if(parametros.anioProg == programaEncontrado.anioProg){
                        delete swAEditar.anioProg
                    }
                    if(parametros.servicio == programaEncontrado.servicio){
                        delete swAEditar.servicio
                    }
                    if(swAEditar.nombrePrograma||swAEditar.servicio||swAEditar.versionProg||swAEditar.anioProg||swAEditar.categoria){
                        Programa.findOne({
                            nombrePrograma: swAEditar.nombrePrograma
                        }).exec(function(error,softwareEncontrado){
                            if(softwareEncontrado){
                                if(softwareEncontrado.versionProg==swAEditar.versionProg){
                                    return res.view('error',{
                                        title: 'software',
                                        tituloError: 'error',
                                        error: 'El software '+parametros.nombrePrograma+' ya existe',
                                        url: '/software'
                                    })
                                }else{
                                    Programa.update({
                                        idPrograma: parametros.idPrograma
                                    },swAEditar).exec(function(error,programaEditado){
                                        Programa.find({
                                            tipoProg: {
                                                contains: 'APP'
                                            }
                                        }).exec(function(error, softwareEncontrado){
                                            if (error) return res.serverError();
                                            return res.view('Software/Software', {
                                                title: 'software',
                                                tituloError: '',
                                                software: softwareEncontrado
                                            })
                                        })
                                    })
                                }
                            }else{
                                Programa.update({
                                    idPrograma: parametros.idPrograma
                                },swAEditar).exec(function(error,programaEditado){
                                    Programa.find({
                                        tipoProg: {
                                            contains: 'APP'
                                        }
                                    }).exec(function(error, softwareEncontrado){
                                        if (error) return res.serverError();
                                        return res.view('Software/Software', {
                                            title: 'software',
                                            tituloError: '',
                                            software: softwareEncontrado
                                        })
                                    })
                                })
                            }
                        })
                    }else{
                        return res.view('error',{
                            title: 'software',
                            tituloError: 'error',
                            error: 'El software '+parametros.nombrePrograma+' no ha sido editado',
                            url: '/software'
                        })
                    }
                })
            }else{
                return res.view('error',{
                    title: 'software',
                    tituloError: 'error',
                    error: 'Algunos campos obligatorio se encuentran vacios',
                    url: '/software'
                })
            }
        }else{
            return res.badRequest('Metodo invalido');
        }

    }


};