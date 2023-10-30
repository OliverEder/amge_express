import Sequelize from "sequelize";
import db from "../config/db.js"
import { Prev_association_directive } from "./prev_association_directive.js"

export const Prev_association_directive_member = db.define("prev_association_directive_member",{
    prev_association_directive_member_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    prev_association_directive_member_position: {
        type: Sequelize.STRING
    },
    prev_association_directive_member_name: {
        type: Sequelize.STRING
    },
    prev_association_directive_member_created_at: {
        type: Sequelize.DATE
    },
    prev_association_directive_member_modified_at: {
        type: Sequelize.DATE
    },   
    prev_association_directive_id: {
        type: Sequelize.INTEGER,
        references: {
            model: "prev_association_directive",
            key: "prev_association_directive_id"
        }
    },
    prev_association_directive_member_status: {
        type: Sequelize.CHAR
    }
},{
    freezeTableName: true
});

// Relaciones
Prev_association_directive_member.belongsTo(Prev_association_directive, { foreignKey: "prev_association_directive_id" });