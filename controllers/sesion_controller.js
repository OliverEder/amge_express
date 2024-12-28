import { Sesion } from '../models/sesion.js';
import { User } from "../models/user.js";

export const get_paginated_sessions = async (req, res) => {
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
