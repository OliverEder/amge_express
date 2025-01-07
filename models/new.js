import Sequelize from "sequelize";
import db from "../config/db.js";

export const New = db.define("new", {
    new_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    new_title: {
        type: Sequelize.STRING
    },
    new_content: {
        type: Sequelize.TEXT
    },
    new_thumbnail: {
        type: Sequelize.TEXT
    },
    new_views: {
        type: Sequelize.INTEGER
    },
    new_created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    new_modified_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    new_status: {
        type: Sequelize.CHAR
    }
}, {
    freezeTableName: true
});
