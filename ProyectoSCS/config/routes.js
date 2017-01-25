/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

    /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

    '/': {
        view: 'Login/Login',
        locals: {
            layout: 'Login/LoginLayout'
        }
    },
    '/home': {
        view: 'Home/Home',
        locals: {
            layout: 'Home/HomeLayout'
        }

    },
    '/materias': {
        view: 'Materias/Materias',
        locals: {
            layout: 'Materias/MateriasLayout'
        }
    },
    '/laboratorios': {
        view: 'Laboratorios/Laboratorios',
        locals: {
            layout: 'Laboratorios/LaboratoriosLayout'
        }
    },
    '/software': {
        view: 'Software/Software',
        locals: {
            layout: 'Software/SoftwareLayout'
        }
    },
    '/sistemasO': {
        view: 'SistemasOperativos/SistemasO',
        locals: {
            layout: 'SistemasOperativos/SistemasOLayout'
        }
    },
    '/formulario': {
        view: 'FormularioProfesores/EnvioFormulario',
        locals: {
            layout: 'FormularioProfesores/FormularioLayout'
        }
    },
    '/asignarSW': {
        view: 'Materias/MateriaSoftware',
        locals: {
            layout: 'Materias/MateriasLayout'
        }
    },
    '/asignacion': {
        view: 'Home/HomeRelacion',
        locals: {
            layout: 'Home/HomeLayout'
        }
    },
    '/crearMateria': {
        view: 'Materias/CrearMateria',
        locals: {
            layout: 'Materias/MateriasLayout'
        }
    },
    '/editarMateria': {
        view: 'Materias/EditarMateria',
        locals: {
            layout: 'Materias/MateriasLayout'
        }
    },
    '/crearLaboratorio': {
        view: 'Laboratorios/CrearLaboratorio',
        locals: {
            layout: 'Laboratorios/LaboratoriosLayout'
        }
    },
    '/editarLaboratorio': {
        view: 'Laboratorios/EditarLaboratorio',
        locals: {
            layout: 'Laboratorios/LaboratoriosLayout'
        }
    },
    '/asignarSO': {
        view: 'Laboratorios/AsignarSO',
        locals: {
            layout: 'Laboratorios/LaboratoriosLayout'
        }
    },
    '/asignarMateria': {
        view: 'Laboratorios/AsignarMateria',
        locals: {
            layout: 'Laboratorios/LaboratoriosLayout'
        }
    },
    '/crearSoftware': {
        view: 'Software/CrearSoftware',
        locals: {
            layout: 'Software/SoftwareLayout'
        }
    },
    '/editarSoftware': {
        view: 'Software/EditarSoftware',
        locals: {
            layout: 'Software/SoftwareLayout'
        }
    },
    '/crearSO': {
        view: 'SistemasOperativos/CrearSO',
        locals: {
            layout: 'SistemasOperativos/SistemasOLayout'
        }
    },
    '/editarSO': {
        view: 'SistemasOperativos/EditarSO',
        locals: {
            layout: 'SistemasOperativos/SistemasOLayout'
        }
    },
    '/crearProf': {
        view: 'FormularioProfesores/AgregarProfesor',
        locals: {
            layout: 'FormularioProfesores/FormularioLayout'
        }
    },
    '/editarProf': {
        view: 'FormularioProfesores/EditarProfesor',
        locals: {
            layout: 'FormularioProfesores/FormularioLayout'
        }
    },
    '/formProfesor': {
        view: 'formulario'
    },
    '/gracias': {
        view: 'gracias'
    }

    /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
