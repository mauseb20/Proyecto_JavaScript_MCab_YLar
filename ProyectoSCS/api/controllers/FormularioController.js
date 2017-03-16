/**
 * FormularioController
 *
 * @description :: Server-side logic for managing Formularios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var nodemailer = require('nodemailer');

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
            var smtpConfig = {
              host: 'smtp.epn.edu.ec',
              port: 25,
              secure: false, // upgrade later with STARTTLS
              auth: {  }
            };
            var transporter = nodemailer.createTransport(smtpConfig);
            var correo = {
              from: 'mauricio.cabrera@epn.edu.ec', // sender address
              to: profesorEncontrado.correoProf, // list of receivers
              subject: 'Formulario para solicitud de software', // Subject line
              text: 'http://localhost:1337/formProfesor?idProfesor='+profesorEncontrado.idProfesor // plain text body
            };
            transporter.sendMail(correo, function(error,correoEnviado){
              if (error) return res.serverError();
              console.log(correoEnviado);
            });
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
