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
                return res.badRequest('No envia todos los parametros');
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

                Programa.find().exec(function(error,swEncontrado){
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
            if(parametros.nombreLaboratorio&&parametros.numAula&&parametros.capacidad&&parametros.numOrdenadores){
                console.log(parametros);
                if (parametros.proyectorEmpotrado==null) parametros.proyectorEmpotrado='NO'
                Laboratorio.findOne({
                    nombreLaboratorio: parametros.nombreLaboratorio,
                    numAula: parametros.numAula,
                    capacidad: parametros.capacidad,
                    descripcionUbicacion: parametros.descripcionUbicacion,
                    numOrdenadores: parametros.numOrdenadores,
                    proyectorEmpotrado: parametros.proyectorEmpotrado
                }).exec(function(error,laboratorioEncontrado){
                    if (error) return res.serverError();
                    if (laboratorioEncontrado!=undefined){
                        return res.view('error',{
                            title: 'laboratorios',
                            tituloError: 'error',
                            error: 'El Laboratorio '+parametros.nombreLaboratorio+' ya existe',
                            url: '/laboratorios'
                        })
                    }else{ 

                        Laboratorio.update({
                            idLaboratorio: parametros.idLaboratorio
                        },{
                            nombreLaboratorio: parametros.nombreLaboratorio,
                            numAula: parametros.numAula,
                            capacidad: parametros.capacidad,
                            descripcionUbicacion: parametros.descripcionUbicacion,
                            numOrdenadores: parametros.numOrdenadores,
                            proyectorEmpotrado: parametros.proyectorEmpotrado
                        }).exec(function(error,laboratorioCreado){
                            if (error) return res.serverError();
                            console.log(laboratorioCreado);
                            Laboratorio.find().exec(function(error,laboratoriosEncontrados){
                                if(error) return res.serverError()
                                //sails.log.info(laboratoriosEncontrados);
                                return res.view('Laboratorios/Laboratorios',{
                                    title: 'laboratorios',
                                    tituloError: '',
                                    laboratorio: laboratoriosEncontrados
                                })
                            })
                        })
                    }
                })
            }else{
                return res.view('error',{
                    title: 'laboratorios',
                    tituloError: 'error',
                    error: 'Algunos campos se encuentran vacios',
                    url: '/laboratorios'
                })
            }
        }else{
            return res.badRequest('Metodo invalido');
        }

    }


};