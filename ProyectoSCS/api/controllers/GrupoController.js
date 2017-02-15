/**
 * Materia_GrupoController
 *
 * @description :: Server-side logic for managing Materia_grupoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    borrarGrupo: function(req,res){
        var parametros = req.allParams();
        console.log(parametros);
        if(parametros.idMateria){
            Grupo.destroy({
                materiaGru:parametros.idMateria,
                grupoMateria:parametros.grupoMateria                
            }).exec(function(error,grupoEliminado){
                if (error) return res.serverError()
                Materia.find().populate('MateriasGruposDeMateria').exec(function(error,materiasEncontradas){
                    if (error) return res.serverError()
                    sails.log.info(materiasEncontradas);
                    return res.view('Materias/Materias',{
                        title: 'materias',
                        tituloError:'',
                        materias: materiasEncontradas
                    })
                })
            });
        }else{
            return res.badRequest('No envia todos los parametros');
        }
    }
};

