import Sequelize from "sequelize";
import db from "../config/db.js"


export const Cat_membership_type = db.define("cat_membership_type",{
    cat_membership_type_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cat_membership_type_name: {
        type: Sequelize.STRING
    },
    cat_membership_type_status: {
        type: Sequelize.CHAR
    }
},{
    freezeTableName: true
});

