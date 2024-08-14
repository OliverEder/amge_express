import Sequelize from "sequelize";
import db from "../config/db.js";

export const Option = db.define("option", {
    option_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    option_content: {
        type: Sequelize.STRING(500),
        allowNull: true
    },
    option_created_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    option_modified_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    question_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    option_status: {
        type: Sequelize.CHAR(1),
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false  // Desactivar los timestamps automáticos de Sequelize
});
