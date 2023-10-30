import Sequelize from "sequelize";
import db from "../config/db.js"

export const Prev_association_directive = db.define("prev_association_directive",{
    prev_association_directive_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    prev_association_directive_tittle: {
        type: Sequelize.STRING
    },
    prev_association_directive_created_at: {
        type: Sequelize.DATE
    },
    prev_association_directive_modified_at: {
        type: Sequelize.DATE
    },   
    prev_association_directive_status: {
        type: Sequelize.CHAR
    }
},{
    freezeTableName: true
});