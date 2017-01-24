/**
 * Labo_MateriaController
 *
 * @description :: Server-side logic for managing Labo_materias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    //Para acceder a este método se lo debería hacer así : /Usuario/crearUsuario
    asignarLaboratorioMateria: function (req, res) {

        var parametros = req.allParams();

        console.log(parametros);

        if(req.method == 'POST'){
            if(parametros.idMateria && parametros.idLaboratorio && parametros.grupo){
                //crear usuario

                Labo_Materia.create({

                    idMateria:parametros.idMateria,
                    idLaboratorio: parametros.idLaboratorio,
                    grupo: parametros.grupo

                }).exec(function (error, materiaAsignadaLaboratorio){


                    if (error) { return res.serverError(); }

                    sails.log.info(materiaAsignadaLaboratorio);

                    return res.ok(materiaAsignadaLaboratorio);
                });

            } else {

                //bad request
                return res.badRequest('No envia todos los parametros');
            }
        } else {

            return res.badRequest('Metodo invalido');

        }
    }
};

