import Sequelize from "sequelize";
import db from "../config/db.js";

export const Answer = db.define("answer", {
    answer_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    option_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    vote_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    answer_created_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    answer_modified_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    answer_status: {
        type: Sequelize.CHAR(1),
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false  // Desactivar los timestamps automáticos de Sequelize
});
