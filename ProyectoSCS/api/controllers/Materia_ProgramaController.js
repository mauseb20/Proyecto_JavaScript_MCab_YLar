/**
 * Materia_ProgramaController
 *
 * @description :: Server-side logic for managing Materia_programas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    //Para acceder a este método se lo debería hacer así : /Usuario/crearUsuario
    asignarLaboratorioMateria: function (req, res) {

        var parametros = req.allParams();

        console.log(parametros);

        if(req.method == 'POST'){
            if(parametros.idPrograma && parametros.idMateria && parametros.estado){
                //crear usuario

                Materia_Programa.create({

                    idPrograma:parametros.idPrograma,
                    idMateria: parametros.idMateria,
                    estado: parametros.estado
                }).exec(function (error, asignadoLaboratorioMateria){


                    if (error) { return res.serverError(); }

                    sails.log.info(asignadoLaboratorioMateria);

                    return res.ok(asignadoLaboratorioMateria);
                });

            } else {

                //bad request
                return res.badRequest('No envia todos los parametros');
            }
        } else {

            return res.badRequest('Metodo invalido');

        }
    },
    //    listarPorId:function(req,res){
    //        var parametros = req.allParams()
    //        
    //        Materia_Programa.find({
    //            idMateria:parametros.idMateria
    //        })
    //        .populate('idMateria')
    //        .populate('idPrograma')
    //        .exec(function(err,MateriasProgramas){
    //            if(err) return res.serverError(err);
    //            
    //            return res.ok(MateriasProgramas);{
    //                
    //                MateriasProgramas[i].idPrograma.idPrograma
    //                MateriasProgramas[i].idPrograma.nombrePrograma
    //                MateriasProgramas[i].idMateria.idMateria
    //                MateriasProgramas[i].idMateria.nombreMateria
    //                
    //                materiasProgramas [
    //  {
    //    "idPrograma": {
    //      "nombrePrograma": "Programa1",
    //      "tipoProg": "NULL",
    //      "servicio": "NULL",
    //      "categoria": "NULL",
    //      "versionProg": "NULL",
    //      "anioProg": "NULL",
    //      "createdAt": "2017-02-09T21:14:15.450Z",
    //      "updatedAt": "2017-02-09T21:14:15.450Z",
    //      "idPrograma": 1
    //    },
    //    "idMateria": {
    //      "codigoMateria": "SIC101",
    //      "nombreMateria": "Progra I",
    //      "createdAt": "2017-02-08T18:44:01.685Z",
    //      "updatedAt": "2017-02-09T21:07:24.759Z",
    //      "idMateria": 1
    //    },
    //    "estado": "Instalado",
    //    "createdAt": "2017-02-09T21:16:04.859Z",
    //    "updatedAt": "2017-02-09T21:16:04.859Z",
    //    "id": 1
    //  },
    //  {
    //    "idPrograma": {
    //      "nombrePrograma": "Programa2",
    //      "tipoProg": "NULL",
    //      "servicio": "NULL",
    //      "categoria": "NULL",
    //      "versionProg": "NULL",
    //      "anioProg": "NULL",
    //      "createdAt": "2017-02-09T21:14:19.822Z",
    //      "updatedAt": "2017-02-09T21:14:19.822Z",
    //      "idPrograma": 2
    //    },
    //    "idMateria": {
    //      "codigoMateria": "SIC101",
    //      "nombreMateria": "Progra I",
    //      "createdAt": "2017-02-08T18:44:01.685Z",
    //      "updatedAt": "2017-02-09T21:07:24.759Z",
    //      "idMateria": 1
    //    },
    //    "estado": "Instalado",
    //    "createdAt": "2017-02-09T21:16:10.819Z",
    //    "updatedAt": "2017-02-09T21:16:10.819Z",
    //    "id": 2
    //  }
    //]
    //            }
    //            
    //        })
    //        
    //    }

};

