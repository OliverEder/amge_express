import Sequelize from "sequelize";
import db from "../config/db.js";

export const Question = db.define("question", {
    question_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question_content: {
        type: Sequelize.STRING(500),
        allowNull: true
    },
    question_created_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    question_modified_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    vote_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'vote',
            key: 'vote_id'
        }
    },
    question_status: {
        type: Sequelize.CHAR(1),
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false  // Desactivar los timestamps automáticos de Sequelize
});
