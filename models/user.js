import Sequelize from "sequelize";
import db from "../config/db.js"

export const User = db.define("user",{
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_email: {
        type: Sequelize.STRING
    },
    user_password: {
        type: Sequelize.STRING
    },
    user_names: {
        type: Sequelize.STRING
    },
    user_last_names: {
        type: Sequelize.STRING
    },
    user_birth: {
        type: Sequelize.DATE
    },
    user_created_at: {
        type: Sequelize.DATE
    },
    user_modified_at: {
        type: Sequelize.DATE
    },
    user_group_id: {
        type: Sequelize.INTEGER,
        references: {
            model: "user_group",
            key: "user_group_id"
        }
    },
    user_email_updates: {
        type: Sequelize.INTEGER,
    },   
    delegation_id: {
        type: Sequelize.INTEGER,
    }, 
    user_status: {
        type: Sequelize.CHAR
    }
},{
    freezeTableName: true
});