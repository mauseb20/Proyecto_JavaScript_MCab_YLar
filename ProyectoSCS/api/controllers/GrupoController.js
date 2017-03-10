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
  },
  asignarProfesor: function (req,res) {
    var parametros = req.allParams();
    if (parametros.idProfesor &&parametros.idMateria && parametros.grupoMateria){
      Grupo.findOne({
        materiaGru: parametros.idMateria,
        grupoMateria: parametros.grupoMateria
      }).exec(function(error,grupoEncontrado){
        if(grupoEncontrado){
          if(grupoEncontrado.profesorGru==parametros.idProfesor){
            Profesor.findOne({
              idProfesor: parametros.idProfesor
            }).exec(function(error,profesorEncontrado){
              if(profesorEncontrado){
                if(profesorEncontrado.llenoForm=='false'){
                  if(profesorEncontrado.numIntentos>0){
                    Materia.find().sort('nombreMateria ASC').exec(function(error,materiasOrdenadas){
                      if (error) return res.serverError();
                      Programa.find().populate('ProgramasGruposDePrograma').sort('nombrePrograma ASC').exec(function(error,swEncontradoMateria){
                        Programa.find({
                          tipoProg: {contains:'APP'}
                        }).exec(function(error,swDisponible){
                          return res.view('formulario',{
                            title: 'formulario',
                            tituloError: '',
                            profesor: profesorEncontrado,
                            materias: materiasOrdenadas,
                            grupo: grupoEncontrado,
                            asignado: 'Si',
                            softwareMateria: swEncontradoMateria,
                            softwareDisponible: swDisponible
                          })
                        });
                      });
                    })
                  }
                }
              }
            });
          }else{
            Grupo.update({
              idGrupo: grupoEncontrado.idGrupo
            },{
              profesorGru: parametros.idProfesor
            }).exec(function(error,grupoEditado){
              Profesor.findOne({
                idProfesor: parametros.idProfesor
              }).exec(function(error,profesorEncontrado){
                if(profesorEncontrado){
                  if(profesorEncontrado.llenoForm=='false'){
                    if(profesorEncontrado.numIntentos>0){
                      Materia.find().sort('nombreMateria ASC').exec(function(error,materiasOrdenadas){
                        if (error) return res.serverError();
                        Programa.find().populate('ProgramasGruposDePrograma').sort('nombrePrograma ASC').exec(function(error,swEncontradoMateria){
                          Programa.find({
                            tipoProg: {contains:'APP'}
                          }).exec(function(error,swDisponible){
                            return res.view('formulario',{
                              title: 'formulario',
                              tituloError: '',
                              profesor: profesorEncontrado,
                              materias: materiasOrdenadas,
                              grupo: grupoEncontrado,
                              asignado: 'Si',
                              softwareMateria: swEncontradoMateria,
                              softwareDisponible: swDisponible
                            })
                          });
                        });
                      })
                    }
                  }
                }
              });
            })
          }
        }else{
          Grupo.create({
            grupoMateria: parametros.grupoMateria,
            materiaGru: parametros.idMateria,
            profesorGru: parametros.idProfesor
          }).exec(function(erro,grupoCreado){
            Profesor.findOne({
              idProfesor: parametros.idProfesor
            }).exec(function(error,profesorEncontrado){
              if(profesorEncontrado){
                if(profesorEncontrado.llenoForm=='false'){
                  if(profesorEncontrado.numIntentos>0){
                    Materia.find().sort('nombreMateria ASC').exec(function(error,materiasOrdenadas){
                      if (error) return res.serverError();
                      Programa.find().populate('ProgramasGruposDePrograma').sort('nombrePrograma ASC').exec(function(error,swEncontradoMateria){
                        Programa.find({
                          tipoProg: {contains:'APP'}
                        }).exec(function(error,swDisponible){
                          return res.view('formulario',{
                            title: 'formulario',
                            tituloError: '',
                            profesor: profesorEncontrado,
                            materias: materiasOrdenadas,
                            grupo: grupoCreado,
                            asignado: 'Si',
                            softwareMateria: swEncontradoMateria,
                            softwareDisponible: swDisponible
                          })
                        });
                      });
                    })
                  }
                }
              }
            });
          })
        }
      })
    }else{
      return res.view('error',{
        title:'formulario',
        tituloError:'error',
        error:'Algunos campos obligatorios se encuentran vacios',
        url:'/formProfesor?idProfesor='+parametros.idProfesor
      })
    }
  },
  borrarAsignacionProfesor: function (req,res) {
    var parametros = req.allParams();
    if (parametros.idGrupo){
      Grupo.update({
        idGrupo: parametros.idGrupo
      },{
        profesorGru: ''
      }).exec(function(error,grupoActualizado){
        Profesor.findOne({
          idProfesor: parametros.idProfesor
        }).exec(function(error,profesorEncontrado){
          if(profesorEncontrado){
            if(profesorEncontrado.llenoForm=='false'){
              if(profesorEncontrado.numIntentos>0){
                Materia.find().sort('nombreMateria ASC').exec(function(error,materiasOrdenadas){
                  if (error) return res.serverError();
                  return res.view('formulario',{
                    title: 'formulario',
                    tituloError: '',
                    profesor: profesorEncontrado,
                    materias: materiasOrdenadas,
                    grupo: '',
                    asignado: 'No',
                    softwareMateria: '',
                    softwareDisponible:''
                  })
                })
              }
            }
          }
        })
      })
    }
  },

};

