const asyncConnection = require('../infrastructure/asyncConnection.js');
const moment = require('moment');

class ConsumoController {
    static async create(req, res) {
        const body = req.body;
        const createdAt = moment().format("YYYY-MM-DD");
        const consumo = { ...body, createdAt };
        
        const query = 'INSERT INTO consumo SET ?';

        try {
            const db = await asyncConnection();

            const result = await db.query(query, consumo)
            const nameId = result[0].insertId;
            await db.end();
            return res.status(201).json({
                "Status": "Created",
                "id": nameId
            })
        } catch(error) {
            res.status(500).json({ "Error message": error.message });
        }
    }

    static async readAll(req, res) {
        
        const query = "SELECT * FROM consumo";

        try {
            
            const db = await asyncConnection();

            const results = await db.query(query);
            await db.end();
            return res.json(results[0]);

        } catch(error) {
            return res.status(500).json({ "Error message": error.message });
        }
    }

    static async readOne(req, res) {
        
        const query = "SELECT * FROM consumo WHERE id=?";

        try {

            const id = req.params.id;
            const db = await asyncConnection();

            const name = await db.query(query, id);
            await db.end();
            return res.json(name[0][0]);

        } catch(error) {
            return res.status(500).json({ "Error message": error.message });
        }
    }

    static async readBetweenDates(req, res) {
        
        const firstDate = moment(req.params.firstDate, "DD-MM-YYYY").format("YYYY-MM-DD");
        const lastDate = moment(req.params.lastDate, "DD-MM-YYYY").format("YYYY-MM-DD");

        const query = `SELECT * FROM consumo WHERE (createdAt BETWEEN '${firstDate}' AND '${lastDate}') AND MAC=?`;

        try {

            const MAC = req.params.MAC;
            const db = await asyncConnection();

            const name = await db.query(query, MAC);
            await db.end();
            return res.json(name[0]);

        } catch(error) {
            return res.status(500).json({ "Error message": error.message });
        }
    }

    static async readByMAC(req, res) {
        const query = "SELECT * FROM consumo WHERE MAC=?";

        try {

            const MAC = req.params.MAC;
            const db = await asyncConnection();

            const name = await db.query(query, MAC);
            await db.end();
            return res.json(name[0]);

        } catch(error) {
            return res.status(500).json({ "Error message": error.message });
        }
    }
}

module.exports = ConsumoController;