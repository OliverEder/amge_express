import Sequelize from "sequelize";
import db from "../config/db.js";

export const Delegation = db.define("delegation", {
    delegation_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    delegation_name: {
        type: Sequelize.STRING
    },
    delegation_created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    delegation_modified_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    delegation_status: {
        type: Sequelize.STRING,
        defaultValue: 'A'
    }
}, {
    freezeTableName: true,
    timestamps: false // Disable automatic timestamps (createdAt, updatedAt)
});

// To handle the auto-updating of 'delegation_modified_at' field on every update:
Delegation.beforeUpdate((delegation, options) => {
    delegation.delegation_modified_at = Sequelize.fn('NOW');
});
