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

        // res.view(String: Nombre vista, Datos JSON)
        Materia.find().populate('MateriasGruposDeMateria').exec(function(error,materiasEncontradas){
            if (error) return res.serverError()
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
                if (error) return res.serverError()
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

        // res.view(String: Nombre vista, Datos JSON)
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
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Software/EditarSoftware',{
            title: 'editarSoftware',
            tituloError: ''
        })

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
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('SistemasOperativos/EditarSO',{
            title: 'editarSO',
            tituloError: ''
        })

    },
    profesores: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        Profesor.find({
            numIntentos: {contains:0}
        }).exec(function (error, profesoresEncontrados){
            if (error) return res.serverError()
            return res.view('FormularioProfesores/Profesores', {
                title: 'profesores',
                tituloError: '',
                profesores: profesoresEncontrados
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
        if(parametros.idProfesorSeleccionado){
            Profesor.findOne({
                idProfesor: parametros.idProfesorSeleccionado
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
    enviarFormulario: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('FormularioProfesores/EnvioFormulario',{
            title: 'envioFormulario',
            tituloError: ''
        })

    },
    error: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('error',{
            title: 'error',
            tituloError: ''
        })

    }
};

