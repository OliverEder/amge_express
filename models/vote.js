import Sequelize from "sequelize";
import db from "../config/db.js";

export const Vote = db.define("vote", {
    vote_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vote_title: {
        type: Sequelize.STRING(250),
        allowNull: true
    },
    vote_description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    vote_created_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    vote_expiration_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    vote_release_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    vote_modified_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    vote_status: {
        type: Sequelize.CHAR(1),
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false  // Desactivar los timestamps automáticos de Sequelize
});
