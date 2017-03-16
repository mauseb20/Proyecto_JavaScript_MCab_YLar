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
              Profesor.find().populate('MateriasGruposDeProfesor').exec(function (error, profesoresEncontrados){
                Materia.find().exec(function(error,materiasEncontradas){
                  if (error) return res.serverError();
                  return res.view('FormularioProfesores/Profesores', {
                    title: 'profesores',
                    tituloError: '',
                    profesores: profesoresEncontrados,
                    materia: materiasEncontradas
                  });
                });
              });
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
              llenoForm: 'true',
              numIntentos: numIntentos
            }).exec(function(error,profesorActualizado){
              Profesor.findOne({
                idProfesor: parametros.idProfesor
              }).exec(function(error,profesorActual){
                return res.view('gracias',{
                  title: 'gracias',
                  tituloError: '',
                  profesor: profesorActual
                })
              });
            });
          }else{
            Profesor.update({
              idProfesor: parametros.idProfesor
            },{
              numIntentos: numIntentos
            }).exec(function(error,profesorActualizado){
              Profesor.findOne({
                idProfesor:parametros.idProfesor
              }).exec(function(error,profesorActual){
                return res.view('gracias',{
                  title: 'gracias',
                  tituloError: '',
                  profesor: profesorActual
                });
              });
            })
          }
        }
      })
    }
  }
};
