const md5 = require('md5');
const {check, validationResult} = require('express-validator');
const {rbac} = require('../rbac.js');
const User = require("../entity/User.js");

exports.getUsers = async (req, res) => {
    const limit = 20
    const page = req.query.page ? +req.query.page : 1;
    const users = await User.findAndCountAll({limit: limit, offset: (page - 1) * limit});
    const pagination = {
        page: page,
        pageCount: Math.ceil(users.count / limit),
    }
    res.render('admin/users/index', {users: users.rows, pagination, title: 'Список пользователей'})
}

exports.getUser = async (req, res) => {
    const {id} = req.params;
    if (id) {
        const user = await User.findByPk(id);
        res.render('admin/users/view', {user, title: `Пользователь: ${user.name}`});

    } else {
        res.status(404).send();
    }
}

exports.getCreateUser = async (req, res) => {
    const permission = rbac.can(req.session.user.role)['create'](rbac.resources.user)
    if (!permission.granted){
        return res.status(401).send('You don\'t have enough permission to perform this action')
    }
    const roles = Object.entries(User.roles);
    res.render('admin/users/create', {roles, title: 'Добавить нового пользователя'})
}

exports.postCreateUser = async (req, res) => {
    const permission = rbac.can(req.session.user.role)['create'](rbac.resources.user)
    if (!permission.granted){
        return res.status(401).send('You don\'t have enough permission to perform this action')
    }
    await check('firstName', 'Имя обязательно').notEmpty().run(req);
    await check('lastName', 'Фамилия обязательна').notEmpty().run(req);
    await check('password',  'Пароль обязателен').notEmpty().run(req);
    await check('email',  'Email обязателен').notEmpty().run(req);
    await check('firstName', 'Длина должна быть больше 3 символов').isLength({min: 3}).run(req);
    await check('lastName', 'Длина должна быть больше 3 символов').isLength({min: 3}).run(req);
    await check('password', 'Длина должна быть больше 3 символов').isLength({min: 3}).run(req);
    await check('email', 'Неправильный email').isEmail().run(req);
    const user = await User.findOne({where: {email: req.body.email}})
    await check('email', 'Пользователь с таким email уже существует').custom((value) => {
        return !user
    }).run(req);
    await check('repeatPassword', 'Пароли не совпадают').custom((value) => {
        if (value !== req.body.password) {
            throw new Error('Пароли не совпадают');
        }
        return true;
    }).run(req);

    const validationResults = validationResult(req);

    if (validationResults.errors.length) {
        const roles = Object.entries(User.roles);
        const selectedRoleIndex = roles.findIndex(role => role[0] === req.body.role);
        return res.render('admin/users/create', {
            user: req.body,
            roles,
            selectedRoleIndex,
            errors: validationResults.errors,
            title: 'Добавить нового пользователя'
        })
    }
    const newUser = await User.create({
        name: `${req.body.firstName} ${req.body.lastName}`,
        email: req.body.email,
        password: md5(req.body.password),
        role: User.roles[req.body.role]
    })
    if(newUser) {
        return res.redirect(`/admin/users/${newUser.id}`)
    } else {
        res.status(404).send();
    }
}

exports.updateUser = async (req, res) => {

}

exports.deleteUser = async (req, res) => {
    const permission = rbac.can(req.session.user.role)['delete'](rbac.resources.user)
    if (!permission.granted){
        return res.status(401).send('You don\'t have enough permission to perform this action')
    }
    const user = await User.findByPk(Number.parseInt(req.body.id))
    if(user){
        await user.destroy()
        return res.redirect('/admin/users');
    } else {
        res.status(404).send()
    }
}
