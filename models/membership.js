import Sequelize from "sequelize";
import db from "../config/db.js"

import { Cat_membership_type } from "./cat_membership_type.js";

export const Membership = db.define("membership",{
    membership_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    membership_created_at: {
        type: Sequelize.DATE
    },
    membership_modified_at: {
        type: Sequelize.DATE
    },
    cat_membership_type_id: {
        type: Sequelize.INTEGER,

    },  
    user_id : {
        type: Sequelize.INTEGER,
    }, 
    membership_status: {
        type: Sequelize.CHAR
    }
},{
    freezeTableName: true
});

Membership.belongsTo(Cat_membership_type, {
    foreignKey: {
      name: 'cat_membership_type_id'
    }
});