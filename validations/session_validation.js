

export const session_validation = async(req, res, next) => {
    try {
        const { session } = req;
        if(!session.logged){
            res.redirect("/");
            return;
        }

        /* const offset_fecha = Math.abs(moment().utcOffset());
        const fecha_actual = moment().subtract(offset_fecha ,'m').format('YYYY-MM-DD HH:mm:ss');
        const limite_sesion = moment(fecha_actual).subtract((60*24) ,'m').format('YYYY-MM-DD HH:mm:ss');
        
        const sesiones_expiradas = await Session.update({
                session_end: fecha_actual,
                session_last_seen: fecha_actual,
                session_status: 'I'
            },
            {
                where: {
                    session_last_seen: {
                        [Sequelize.Op.lt]: limite_sesion
                    },
                    user_id: req.session.user_id,
                    session_status: 'A'
                }
        });

        const user = await User.findByPk(session.user_id);
        const sesiones_activas = await Session.count({
            where: {
                user_id: session.user_id,
                session_status: 'A'
            }
        });

        const sesion_activas_usuario = await User.update({ user_active_sessions: sesiones_activas }, {
            where: { user_id: session.user_id }
        });

        const sesion_actual = await Session.findOne({
            where: {
                session_id: session.session_id,   //?
                session_status: 'A'
            }
        });
        
        if(sesion_actual) {
            const sesion_renovar = await Session.update({
                    session_last_seen: fecha_actual,
                },
                {
                    where: { session_id: session.session_id }
            });
            req.session.sesiones_activas = sesiones_activas;
            req.session.sesiones_permitidas = user.user_allowed_sessions;
        } else {
            session.destroy();
            res.redirect("/login");
            return;
        } */
        
        /* const user_group = await User_group.findByPk(user.user_group_id);
        if(user_group.user_group_name == "File updater") {
            res.redirect("/file_upload");
            return;
        }*/

        next();
    } catch (error) {
        res.status(400).send(error);
        next();
    }
} 

export const session_validation_admin = async(req, res, next) => {
    try {
        const { session } = req;
        if(session.user_group_id !=  1){
            res.redirect("/");
            return;
        }

        /* const offset_fecha = Math.abs(moment().utcOffset());
        const fecha_actual = moment().subtract(offset_fecha ,'m').format('YYYY-MM-DD HH:mm:ss');
        const limite_sesion = moment(fecha_actual).subtract((60*24) ,'m').format('YYYY-MM-DD HH:mm:ss');
        
        const sesiones_expiradas = await Session.update({
                session_end: fecha_actual,
                session_last_seen: fecha_actual,
                session_status: 'I'
            },
            {
                where: {
                    session_last_seen: {
                        [Sequelize.Op.lt]: limite_sesion
                    },
                    user_id: req.session.user_id,
                    session_status: 'A'
                }
        });

        const user = await User.findByPk(session.user_id);
        const sesiones_activas = await Session.count({
            where: {
                user_id: session.user_id,
                session_status: 'A'
            }
        });

        const sesion_activas_usuario = await User.update({ user_active_sessions: sesiones_activas }, {
            where: { user_id: session.user_id }
        });

        const sesion_actual = await Session.findOne({
            where: {
                session_id: session.session_id,   //?
                session_status: 'A'
            }
        });
        
        if(sesion_actual) {
            const sesion_renovar = await Session.update({
                    session_last_seen: fecha_actual,
                },
                {
                    where: { session_id: session.session_id }
            });
            req.session.sesiones_activas = sesiones_activas;
            req.session.sesiones_permitidas = user.user_allowed_sessions;
        } else {
            session.destroy();
            res.redirect("/login");
            return;
        } */
        
        /* const user_group = await User_group.findByPk(user.user_group_id);
        if(user_group.user_group_name == "File updater") {
            res.redirect("/file_upload");
            return;
        }*/

        next();
    } catch (error) {
        res.status(400).send(error);
        next();
    }
} 