const express = require("express");
const app = express();
const sql = require('mssql')
const cors = require("cors");
require("dotenv").config();

app.use(cors);
app.use(express.json());

const CONNECTION_STRING =
    "Server= 132.247.189.3,3314 " + ";Database= expediente_pruebas" +
    ";User Id= gabriel" +
    ";Password= Dg@s.unam#" +
    ";Encrypt=false";

async function getExpedientes() {
    try {
        const pool = await sql.connect(CONNECTION_STRING);

        const result = await pool.query("select * from Expedientes;");
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function getExpedientesByIdPaciente(id) {
    try {
        const pool = await sql.connect(CONNECTION_STRING);

        const result = await pool
            .request()
            .input("id_paciente", sql.Numeric, id)
            .query("select * from Expedientes where IdPaciente = @id_paciente;");

        return result;
    } catch (error) {
        console.error(error);
    }
}

async function altaExpedientesByIdPaciente() {
    try {
        const pool = await sql.connect(CONNECTION_STRING);
        const nombre = req.body.nombre;
        const edad = req.body.edad;
        const pais = req.body.pais;
        const cargo = req.cargo;
        const anios = req.anios;

        const result = await pool
            .request()
            .input(nombre, edad, pais, cargo, anios)
            .query("INSERT INTO empleadocrud(nombre,edad,pais,cargo,anios");

        return result;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getExpedientes,
    getExpedientesByIdPaciente,
    altaExpedientesByIdPaciente,
};
