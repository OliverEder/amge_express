import { Sesion } from '../models/sesion.js';
import { User } from "../models/user.js";
import { Sequelize } from 'sequelize';

export const get_paginated_sessions = async (req, res, next) => {
  try {
    // Parámetros de paginación desde la query string
    const { page = 1, limit = 10 } = req.query;

    // Validación básica de parámetros
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      return res.status(400).json({
        error: 'Invalid page or limit parameter',
      });
    }

    // Calcular desplazamiento
    const offset = (pageNumber - 1) * limitNumber;

    // Consultar sesiones con paginación
    const { count, rows: sessions } = await Sesion.findAndCountAll({
      offset,
      limit: limitNumber,
      include: [
        {
          model: User, // Si tienes el modelo User relacionado
          as: 'user',
          attributes: ['user_id', 'user_names', 'user_last_names', 'user_email'], // Ajusta según las columnas relevantes
        },
      ],
      order: [['sesion_in', 'DESC']], // Ordenar por fecha de inicio de sesión
    });

    // Calcular total de páginas
    const totalPages = Math.ceil(count / limitNumber);

    // Responder con los datos
    res.json({
      data: sessions,
      pagination: {
        totalItems: count,
        totalPages,
        currentPage: pageNumber,
        pageSize: limitNumber,
      },
    });
  } catch (error) {
    console.error('Error fetching paginated sessions:', error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};


export const get_session_stats_last30_days = async (req, res, next) => {
  try {
    // Fecha actual y hace 30 días
    const now = new Date();
    const startDate = new Date();
    startDate.setDate(now.getDate() - 30);

    // Consulta para obtener el número de sesiones agrupadas por día
    const sessionStats = await Sesion.findAll({
      attributes: [
        [
          Sequelize.fn("DATE", Sequelize.col("sesion_in")),
          "session_date", // Alias para la fecha
        ],
        [
          Sequelize.fn("COUNT", Sequelize.col("sesion_id")),
          "session_count", // Alias para la cuenta de sesiones
        ],
      ],
      where: {
        sesion_in: {
          [Sequelize.Op.between]: [startDate, now],
        },
      },
      group: [Sequelize.fn("DATE", Sequelize.col("sesion_in"))],
      order: [[Sequelize.fn("DATE", Sequelize.col("sesion_in")), "ASC"]],
    });

    // Estructura de respuesta
    const formattedStats = sessionStats.map((stat) => ({
      date: stat.dataValues.session_date,
      count: stat.dataValues.session_count,
    }));

    // Respuesta en JSON
    res.status(200).json(formattedStats);
  } catch (error) {
    console.error("Error fetching session stats:", error);
    res.status(500).json({ message: "Error fetching session stats." });
  }
};