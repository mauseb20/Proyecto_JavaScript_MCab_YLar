/**
 * FormularioController
 *
 * @description :: Server-side logic for managing Formularios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  enviarFormulario: function(req,res){
    var parametros = req.allParams();
    if(req.method == 'POST'){

      if(parametros.idProfesor&&parametros.numIntentos){
        Profesor.findOne({
          idProfesor: parametros.idProfesor
        }).exec(function(error,profesorEncontrado){
          if (error) return res.serverError();
          if(profesorEncontrado){
            //envio correo
            Profesor.update({
              idProfesor: parametros.idProfesor
            },{
              numIntentos: parametros.numIntentos,
              formEnviado: 'true'
            }).exec(function(error,profesorActualizado){
              if(error) return res.serverError();
              Profesor.find().exec(function(error,profesoresEcontrados){
                if (error) return res.serverError();
                return res.view('FormularioProfesores/Profesores', {
                  title: 'profesores',
                  tituloError: '',
                  profesores: profesoresEcontrados
                });
              })
            })
          }else{
            return res.badRequest('El profesor no existe');
          }
        })
      }else{
        return res.badRequest('No envia todos los parametros');
      }
    }else{
      return res.badRequest('Metodo invalido');
    }
  },
  guardar: function(req,res){
    var parametros=req.allParams();
    var numIntentos;
    if (parametros.idProfesor){
      Profesor.findOne({
        idProfesor:parametros.idProfesor
      }).exec(function(error,profesorEncontrado){
        if(profesorEncontrado){
          numIntentos=profesorEncontrado.numIntentos-1;
          if(numIntentos==0){
            Profesor.update({
              idProfesor:parametros.idProfesor
            },{
              llenoForm: 'true'
            }).exec(function(error,profesorActualizado){
              return res.view('gracias',{
                title: 'gracias',
                tituloError: ''
              })
            });
          }else{
            Profesor.update({
              idProfesor: parametros.idProfesor
            },{
              numIntentos: numIntentos
            }).exec(function(error,profesorActualizado){
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
                          softwareDisponible: ''
                        })
                      })
                    }else{
                      return res.view('error',{
                        title:'formulario',
                        tituloError:'error',
                        error:'Usted ya no tiene mas materias para registrar. En caso de necesitar un nuevo registro contactar al equipo L-FIS',
                        url:'/gracias'
                      })
                    }
                  }else{
                    return res.view('error',{
                      title:'formulario',
                      tituloError:'error',
                      error:'Usted ya a llenado el formulario',
                      url:'/gracias'
                    })
                  }
                }else{
                  return res.view('error',{
                    title:'formulario',
                    tituloError:'error',
                    error:'No se encuetra registrado',
                    url:'/gracias'
                  })
                }
              })
            })
          }
        }
      })
    }
  }
};
