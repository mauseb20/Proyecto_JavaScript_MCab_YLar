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
            if(parametros.nombreLaboratorio&&parametros.numAula&&parametros.capacidad&&parametros.numOrdenadores&&parametros.proyectorEmpotrado){
                Laboratorio.findOne({
                    nombreLaboratorio:parametros.nombreLaboratorio
                }).exec(function(error,laboratorioEncontrado){
                    if (error) return res.serverError();
                    if (laboratorioEncontrado!=undefined){
                        return res.badRequest('El Laboratorio '+parametros.nombreLaboratorio+' ya existe');
                    }else{
                        Laboratorio.create({
                            nombreLaboratorio: parametros.nombreLaboratorio,
                            numAula: parametros.numAula,
                            capacidad: parametros.capacidad,
                            descripcionUbicacion: parametros.descripcionUbicacion,
                            numOrdenadores: parametros.numOrdenadores,
                            proyectorEmpotrado: parametros.proyectorEmpotrado
                        })
                    }
                })
            }else{
                return res.badRequest('No envia todos los parametros');
            }
        }else{
            return res.badRequest('Metodo invalido');
        }
    }

};

