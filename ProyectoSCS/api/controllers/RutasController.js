/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
     home: function(req, res){
        
        return res.view('vistas/home/Home.ejs',{
            titulo: 'Inicio',
            numero: 1,
            mauricio:{
                nombre: 'Mauricio',
                cedula: 1722741061
            }
        })
    },
    
    Materias: function(req, res){
        
        return res.view('vistas/Materias/Materias.ejs',{
            titulo: 'Crear',
            numero: 1,
            mauricio:{
                nombre: 'Mauricio',
                cedula: 1722741061
            }
        })
        
    }
};

