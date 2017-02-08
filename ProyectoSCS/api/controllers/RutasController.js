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
            title: 'home'
        })

    },
    asignacion: function (req, res) {

        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Home/HomeRelacion',{
            title: 'asignacion'
        })

    },
    materias: function (req, res) {

        // res.view(String: Nombre vista, Datos JSON)
        Materia.find().exec(function(error,materiasEncontradas){
            if (error) return res.serverError()
            sails.log.info(materiasEncontradas);
            return res.view('Materias/Materias',{
                title: 'materias',
                materias: materiasEncontradas
            })
        });

    },
    crearMaterias: function (req, res) {

        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Materias/CrearMateria',{
            title: 'crearMaterias'
        })

    },
    editarMaterias: function (req, res) {

        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Materias/EditarMateria',{
            title: 'editarMaterias'
        })

    },
    asignarSW: function (req, res) {

        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Materias/MateriaSoftware',{
            title: 'asignarSW'
        })

    },
    laboratorios: function (req, res) {

        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Laboratorios/Laboratorios',{
            title: 'laboratorios'
        })

    },
    crearLaboratorios: function (req, res) {

        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Laboratorios/CrearLaboratorio',{
            title: 'crearLaboratorios'
        })

    },
    editarLaboratorios: function (req, res) {

        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Laboratorios/EditarLaboratorio',{
            title: 'editarLaboratorios'
        })

    },
    asignarSO: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Laboratorios/AsignarSO',{
            title: 'asignarSO'
        })

    },
    asignarMateria: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Laboratorios/AsignarMateria',{
            title: 'asignarMateria'
        })

    },
    software: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Software/Software',{
            title: 'software'
        })

    },
    crearSoftware: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Software/CrearSoftware',{
            title: 'crearSoftware'
        })

    },
    editarSoftware: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Software/EditarSoftware',{
            title: 'editarSoftware'
        })

    },
    sistemasOperativos: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('SistemasOperativos/SistemasO',{
            title: 'sistemasOperativos'
        })

    },
    crearSO: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('SistemasOperativos/CrearSO',{
            title: 'crearSO'
        })

    },
    editarSO: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('SistemasOperativos/EditarSO',{
            title: 'editarSO'
        })

    },
    envioFormulario: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        Profesor.find().exec(function (error, profesoresEncontrados){
            if (error) return res.serverError()
            return res.view('FormularioProfesores/EnvioFormulario', {
                title: 'envioFormulario',
                profesores: profesoresEncontrados
            });
        });

    },
    crearProfesor: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('FormularioProfesores/AgregarProfesor',{
            title: 'crearProfesor'
        })

    },
    editarProfesor: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('FormularioProfesores/EditarProfesor',{
            title: 'editarProfesor'
        })

    },
};

