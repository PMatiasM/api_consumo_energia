const ConsumoController = require('../controllers/ConsumoController.js')

module.exports = app => {
    app.route('/consumo')
        .get(ConsumoController.readAll)
        .post(ConsumoController.create)

    app.route('/consumo/id/:id')
        .get(ConsumoController.readOne)
    
    app.route('/consumo/MAC/:MAC')
        .get(ConsumoController.readByMAC)
        
    app.route('/consumo/:firstDate/:lastDate/:MAC')
        .get(ConsumoController.readBetweenDates)
}