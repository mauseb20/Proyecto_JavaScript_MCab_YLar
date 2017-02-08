/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    home: function (req, res) {

        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Home/Home', {
            locals: {
                layout: 'Home/HomeLayout'
            },
        })
    }
};

