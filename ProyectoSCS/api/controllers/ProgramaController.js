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


};