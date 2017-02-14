/**
 * LaboratorioController
 *
 * @description :: Server-side logic for managing Laboratorios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    //Para acceder a este método se lo debería hacer así : /Laboratorio/crearLaboratorio
    crearLaboratorio:function(req,res){
        var parametros =req.allParams();
        if (req.method=='POST'){
            if(parametros.nombreLaboratorio&&parametros.numAula&&parametros.capacidad&&parametros.numOrdenadores){
                console.log(parametros);
                Laboratorio.find({
                    nombreLaboratorio:parametros.nombreLaboratorio,
                    numAula:parametros.numAula
                }).exec(function(error,laboratorioEncontrado){
                    if (error) return res.serverError();
                    if (laboratorioEncontrado!=undefined){
                        return res.view('error',{
                            title: 'laboratorios',
                            tituloError: 'error',
                            error: 'El Laboratorio o el aula ya estan registrados',
                            url: '/agregarLaboratorio'
                        })
                    }else{
                        Laboratorio.create({
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
                return res.badRequest('No envia todos los parametros');
            }
        }else{
            return res.badRequest('Metodo invalido');
        }
    },
    editarLaboratorio:function(req,res){
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
                return res.badRequest('No envia todos los parametros');
            }
        }else{
            return res.badRequest('Metodo invalido');
        }
    },

    borrarLaboratorio:function(req,res){
        var parametros = req.allParams();
        console.log(parametros);
        if(parametros.idLaboratorio){
            Laboratorio.destroy({
                idLaboratorio:parametros.idLaboratorio
            }).exec(function(error,laboratorioEliminado){
                if (error) return res.serverError()
                Laboratorio.find().exec(function(error,laboratoriosEncontrados){
                    if(error) return res.serverError()
                    //sails.log.info(laboratoriosEncontrados);
                    return res.view('Laboratorios/Laboratorios',{
                        title: 'laboratorios',
                        tituloError: '',
                        laboratorio: laboratoriosEncontrados
                    })
                })
            });
        }else{
            return res.badRequest('No envia todos los parametros');
        }
    }


};

