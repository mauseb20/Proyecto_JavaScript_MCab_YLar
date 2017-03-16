/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  home: function (req, res) {

    // res.view(String: Nombre vista, Datos JSON)
    return res.view('Home/Home',{
      title: 'home',
      tituloError: ''
    })

  },
  asignacion: function (req, res) {

    // res.view(String: Nombre vista, Datos JSON)
    return res.view('Home/HomeRelacion',{
      title: 'asignacion',
      tituloError: ''
    })

  },
  materias: function (req, res) {
    Materia.find().populate('MateriasGruposDeMateria').sort('nombreMateria ASC').exec(function(error,materiasEncontradas){
      if (error) return res.serverError();
      //sails.log.info(materiasEncontradas);
      return res.view('Materias/Materias',{
        title: 'materias',
        tituloError: '',
        materias: materiasEncontradas
      })
    });

  },
  crearMaterias: function (req, res) {
    // res.view(String: Nombre vista, Datos JSON)
    return res.view('Materias/CrearMateria',{
      title: 'crearMaterias',
      tituloError: ''
    })

  },
  editarMaterias: function (req, res) {
    // res.view(String: Nombre vista, Datos JSON)
    var parametros = req.allParams();
    //console.log(parametros);
    if(parametros.idMateria){
      Materia.findOne({
        idMateria: parametros.idMateria
      }).populate('MateriasGruposDeMateria').exec(function(error,materiaEncontrada){
        if (error) return res.serverError();
        sails.log.info(materiaEncontrada);
        Grupo.findOne({
          grupoMateria:parametros.grupoMateria
        }).exec(function(error,grupoEncontrado){
          return res.view('Materias/EditarMateria',{
            title: 'editarMaterias',
            tituloError: '',
            materia: materiaEncontrada,
            grupo: grupoEncontrado
          })
        })


      })
    }
  },
  buscarMateria: function(req,res){
    var parametros = req.allParams();
    console.log(parametros);
    if(req.method=='GET'){
      if (parametros.materiaBuscada){
        Materia.find({
          nombreMateria: {contains: parametros.materiaBuscada}
        }).populate('MateriasGruposDeMateria').exec(function(error, materiasEncontradas){
          if (error) return res.serverError();
          sails.log.info(materiasEncontradas);
          if (materiasEncontradas!=undefined){
            return res.view('Materias/Materias',{
              title: 'materias',
              tituloError: '',
              materias: materiasEncontradas
            })
          }
        })
      }else{
        Materia.find().populate('MateriasGruposDeMateria').exec(function(error,materiasEncontradas){
          if (error) return res.serverError()
          //sails.log.info(materiasEncontradas);
          return res.view('Materias/Materias',{
            title: 'materias',
            tituloError: '',
            materias: materiasEncontradas
          })
        });
      }
    }else{
      return res.badRequest('Metodo invalido');
    }
  },
  asignarSW: function (req, res) {
    var parametros = req.allParams();
    if(parametros.idMateria&&parametros.grupoMateria){

    }
    return res.view('Materias/MateriaSoftware',{
      title: 'asignarSW',
      tituloError: ''
    })

  },
  laboratorios: function (req, res) {

    // res.view(String: Nombre vista, Datos JSON)
    Laboratorio.find().exec(function(error,laboratoriosEncontrados){
      if(error) return res.serverError()
      //sails.log.info(laboratoriosEncontrados);
      return res.view('Laboratorios/Laboratorios',{
        title: 'laboratorios',
        tituloError: '',
        laboratorio: laboratoriosEncontrados
      })
    })

  },
  agregarLaboratorio: function (req, res) {

    // res.view(String: Nombre vista, Datos JSON)
    return res.view('Laboratorios/AgregarLaboratorio',{
      title: 'crearLaboratorios',
      tituloError: ''
    })

  },
  editarLaboratorios: function (req, res) {

    // res.view(String: Nombre vista, Datos JSON)
    var parametros = req.allParams();
    if(parametros.idLaboratorio){
      Laboratorio.findOne({
        idLaboratorio: parametros.idLaboratorio
      }).exec(function(error,laboratorioEncontrado){
        if (error) return res.serverError()
        sails.log.info(laboratorioEncontrado);
        return res.view('Laboratorios/EditarLaboratorio',{
          title: 'editarLaboratorios',
          tituloError: '',
          laboratorio: laboratorioEncontrado
        })
      })
    }
  },
  asignarSO: function (req, res) {
    // res.view(String: Nombre vista, Datos JSON)
    return res.view('Laboratorios/AsignarSO',{
      title: 'asignarSO',
      tituloError: ''
    })

  },
  asignarMateria: function (req, res) {
    // res.view(String: Nombre vista, Datos JSON)
    return res.view('Laboratorios/AsignarMateria',{
      title: 'asignarMateria',
      tituloError: ''
    })

  },
  software: function (req, res) {
    // res.view(String: Nombre vista, Datos JSON)
    Programa.find({
      tipoProg: {contains:'APP'}
    }).exec(function(error,swEncontrado){
      if(error) return res.serverError();
      return res.view('Software/Software',{
        title:'software',
        tituloError:'',
        software:swEncontrado
      })
    })
  },
  crearSoftware: function (req, res) {
    // res.view(String: Nombre vista, Datos JSON)
    return res.view('Software/CrearSoftware',{
      title: 'crearSoftware',
      tituloError: ''
    })

  },
  editarSoftware: function (req, res) {
    var parametros = req.allParams();
    if(parametros.idPrograma){
      Programa.findOne({
        idPrograma: parametros.idPrograma
      }).exec (function(error,programaEncontrado){
        if(error) return res.serverError();

        return res.view('Software/EditarSoftware',{
          title: 'software',
          tituloError: '',
          software: programaEncontrado
        })
      })
    }
  },
  sistemasOperativos: function (req, res) {
    Programa.find({
      tipoProg: {contains:'SO'}
    }).exec(function(error,swEncontrado){
      if(error) return res.serverError();
      return res.view('SistemasOperativos/SistemasO',{
        title:'sistemasOperativos',
        tituloError:'',
        software:swEncontrado
      })
    })

  },
  crearSO: function (req, res) {
    // res.view(String: Nombre vista, Datos JSON)
    return res.view('SistemasOperativos/CrearSO',{
      title: 'crearSO',
      tituloError: ''
    })

  },
  editarSO: function (req, res) {
    var parametros = req.allParams();
    if(parametros.idPrograma){
      Programa.findOne({
        idPrograma: parametros.idPrograma
      }).exec (function(error,programaEncontrado){
        if(error) return res.serverError();
        return res.view('SistemasOperativos/EditarSO',{
          title: 'editarSO',
          tituloError: '',
          software: programaEncontrado
        })
      })
    }
  },
  profesores: function (req, res) {
    // res.view(String: Nombre vista, Datos JSON)
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

  },

  crearProfesor: function (req, res) {
    // res.view(String: Nombre vista, Datos JSON)
    return res.view('FormularioProfesores/AgregarProfesor',{
      title: 'crearProfesor',
      tituloError: ''
    })

  },
  editarProfesor: function (req, res) {
    var parametros = req.allParams();
    if(parametros.idProfesor){
      Profesor.findOne({
        idProfesor: parametros.idProfesor
      }).exec(function(error,profesorEncontrado){
        if (error) return res.serverError()
        sails.log.info(profesorEncontrado);
        return res.view('FormularioProfesores/EditarProfesor',{
          title: 'editarProfesor',
          tituloError: '',
          profesor: profesorEncontrado
        })
      })
    }
  },
  envioFormulario: function (req, res) {
    // res.view(String: Nombre vista, Datos JSON)
    var parametros = req.allParams();
    if(parametros.idProfesor){
      Profesor.findOne({
        idProfesor: parametros.idProfesor
      }).exec(function(error,profesorEncontrado){
        if (error) return res.serverError()
        sails.log.info(profesorEncontrado);
        return res.view('FormularioProfesores/EnvioFormulario',{
          title: 'profesores',
          tituloError: '',
          profesor: profesorEncontrado
        })
      })
    }
  },
  error: function (req, res) {
    // res.view(String: Nombre vista, Datos JSON)
    return res.view('error',{
      title: 'error',
      tituloError: ''
    })

  },

  formulario: function (req,res){
    var parametros = req.allParams();
    if (parametros.idProfesor){
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
    }
  },
  gracias: function (req,res){
    return res.view('gracias',{
      title: 'gracias',
      tituloError: ''
    })
  },

  reiniciarTodosProfesores: function (req,res) {
    Profesor.find().exec(function(error,profesoresEncontrados){
      if(profesoresEncontrados){
        for (var i=0; i<profesoresEncontrados.length; i++){
          Profesor.update({
            idProfesor: profesoresEncontrados[i].idProfesor
          },{
            formEnviado: 'false',
            llenoForm: 'false',
            numIntentos: 0
          }).exec(function(error,profesorActualizado){})
        }
      }else{
        return res.view('error',{
          title: 'profesores',
          tituloError: 'error',
          error: 'No existen profesores registrados',
          url: '/profesores'
        })
      }
      Materia.find().exec(function(error,materiasEncontradas){
        Profesor.find().populate('MateriasGruposDeProfesor').exec(function (error, profesoresActualizados){
          if (error) return res.serverError();
          return res.view('FormularioProfesores/Profesores', {
            title: 'profesores',
            tituloError: '',
            profesores: profesoresActualizados,
            materia: materiasEncontradas
          });
        });
      });
    })
  }

};

