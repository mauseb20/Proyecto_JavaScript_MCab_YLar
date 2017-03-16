/**
 * ProgramaGrupoController
 *
 * @description :: Server-side logic for managing Programagrupoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  asignarProgramaSelect:function(req,res){
    var parametros = req.allParams();
    if(parametros.idPrograma&&parametros.idGrupo){
      ProgramaGrupo.create({
        idPrograma:parametros.idPrograma,
        idGrupo:parametros.idGrupo,
        estado: 'Solicitado'
      }).exec(function(error,asignacionCreada){
        Profesor.findOne({
          idProfesor: parametros.idProfesor
        }).exec(function(error,profesorEncontrado){
          if(profesorEncontrado){
            if(profesorEncontrado.llenoForm=='false'){
              if(profesorEncontrado.numIntentos>0){
                Materia.find().sort('nombreMateria ASC').exec(function(error,materiasOrdenadas){
                  if (error) return res.serverError();
                  Programa.query('SELECT * FROM programa INNER JOIN programa_grupo ON programa.idPrograma=programa_grupo.idPrograma INNER JOIN grupo on programa_grupo.idGrupo=grupo.idGrupo INNER JOIN materia on grupo.materiaGru=materia.idMateria WHERE tipoProg="APP" and programa_grupo.idGrupo=?',[parametros.idGrupo],function(error,programasEncontrados){
                    Programa.find({
                      tipoProg: {contains:'APP'}
                    }).exec(function(error,swDisponible){
                      Grupo.findOne({
                        idGrupo: parametros.idGrupo
                      }).exec(function(error,grupoEncontrado){
                        return res.view('formulario',{
                          title: 'formulario',
                          tituloError: '',
                          profesor: profesorEncontrado,
                          materias: materiasOrdenadas,
                          grupo: grupoEncontrado,
                          asignado: 'Si',
                          softwareMateria: programasEncontrados,
                          softwareDisponible: swDisponible
                        })
                      });
                    });
                  });
                })
              }
            }
          }
        });
      })
    }else{
      return res.view('error',{
        title:'formulario',
        tituloError:'error',
        error:'No ha seleccionado ningun software',
        url:'/formProfesor?idProfesor='+parametros.idProfesor
      })
    }
  },
  asignarProgramaForm: function (req,res) {
    var parametros = req.allParams();
    if(parametros.nombrePrograma&&parametros.categoria){
      Programa.create({
        nombrePrograma:parametros.nombrePrograma,
        categoria:parametros.categoria,
      }).exec(function(error,programaCreado){
        console.log(programaCreado);
        ProgramaGrupo.create({
          idPrograma:programaCreado.idPrograma,
          idGrupo:parametros.idGrupo,
          estado: 'Solicitado'
        }).exec(function(error,asignacionCreada){
          Profesor.findOne({
            idProfesor: parametros.idProfesor
          }).exec(function(error,profesorEncontrado){
            if(profesorEncontrado){
              if(profesorEncontrado.llenoForm=='false'){
                if(profesorEncontrado.numIntentos>0){
                  Materia.find().sort('nombreMateria ASC').exec(function(error,materiasOrdenadas){
                    if (error) return res.serverError();
                    Programa.query('SELECT * FROM programa INNER JOIN programa_grupo ON programa.idPrograma=programa_grupo.idPrograma INNER JOIN grupo on programa_grupo.idGrupo=grupo.idGrupo INNER JOIN materia on grupo.materiaGru=materia.idMateria WHERE tipoProg="APP" and programa_grupo.idGrupo=?',[parametros.idGrupo],function(error,programasEncontrados){
                      Programa.find({
                        tipoProg: {contains:'APP'}
                      }).exec(function(error,swDisponible){
                        Grupo.findOne({
                          idGrupo: parametros.idGrupo
                        }).exec(function(error,grupoEncontrado){
                          return res.view('formulario',{
                            title: 'formulario',
                            tituloError: '',
                            profesor: profesorEncontrado,
                            materias: materiasOrdenadas,
                            grupo: grupoEncontrado,
                            asignado: 'Si',
                            softwareMateria: programasEncontrados,
                            softwareDisponible: swDisponible
                          })
                        });
                      });
                    });
                  })
                }
              }
            }
          });
        });
      })
    }
  },
  borrarAsignacionPrograma: function (req,res){
    var parametros=req.allParams();
    if(parametros.idPrograma && parametros.idGrupo){
      ProgramaGrupo.destroy({
        idPrograma:parametros.idPrograma,
        idGrupo:parametros.idGrupo
      }).exec(function(error,asignacionEliminada){
        Profesor.findOne({
          idProfesor: parametros.idProfesor
        }).exec(function(error,profesorEncontrado){
          if(profesorEncontrado){
            if(profesorEncontrado.llenoForm=='false'){
              if(profesorEncontrado.numIntentos>0){
                Materia.find().sort('nombreMateria ASC').exec(function(error,materiasOrdenadas){
                  if (error) return res.serverError();
                  Programa.query('SELECT * FROM programa INNER JOIN programa_grupo ON programa.idPrograma=programa_grupo.idPrograma INNER JOIN grupo on programa_grupo.idGrupo=grupo.idGrupo INNER JOIN materia on grupo.materiaGru=materia.idMateria WHERE tipoProg="APP" and programa_grupo.idGrupo=?',[parametros.idGrupo],function(error,programasEncontrados){
                    Programa.find({
                      tipoProg: {contains:'APP'}
                    }).exec(function(error,swDisponible){
                      Grupo.findOne({
                        idGrupo: parametros.idGrupo
                      }).exec(function(error,grupoEncontrado){
                        return res.view('formulario',{
                          title: 'formulario',
                          tituloError: '',
                          profesor: profesorEncontrado,
                          materias: materiasOrdenadas,
                          grupo: grupoEncontrado,
                          asignado: 'Si',
                          softwareMateria: programasEncontrados,
                          softwareDisponible: swDisponible
                        })
                      });
                    });
                  });
                })
              }
            }
          }
        });
      })
    }
  }
};

