import Sequelize from "sequelize";
import db from "../config/db.js";

export const Sesion = db.define(
  "sesion",
  {
    sesion_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "users", // Ajusta según el nombre exacto de la tabla relacionada
        key: "user_id",
      },
    },
    sesion_in: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    sesion_out: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    sesion_last_check: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    sesion_status: {
      type: Sequelize.CHAR(1),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
