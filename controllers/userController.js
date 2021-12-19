require('dotenv').config()
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Cabinet} = require('../models/models')

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res){
        const {name, email, password} = req.body
        if (!name && !email && !password){
            return next(ApiError.badRequest('Не все поля заполнены'))
        }
        const candidate = await User.findOne({where:{email}})
        if (candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name, email, password: hashPassword})
        const cabinet = await Cabinet.create({userId: user.id})
        
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }
    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where:{email}})
        if (!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        } 
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }
    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({token})
    }

    async getAll(req, res){
        let users;
        users = await User.findAll()
        return res.json(users)
    }
    async getOne(req, res){
        const {id} = req.params
        const user = await User.findOne(
            {where:{id}}
        )
        return res.json(user)
    }
    async update(req, res, next){
        let {name, email, password} = req.body
        const id = req.user.id;
        const cur_user = await User.findOne({where:{id}})

        if(email === undefined){
            email = cur_user.email;
        }else{
            const candidate1 = await User.findOne({where: {email}})
            if(candidate1){
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
        }
        if(!name){
            name = cur_user.name;
        }
        if(!password){
            password = cur_user.password;
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await ( await (User.findOne(
            {where: {id}},
        ))).update({name:name, email: email, password:hashPassword},)
        const token = generateJwt(id, name, email)
        return res.json({token})
    }
    async delete(req, res){
        const {id} = req.params
        const user = await User.destroy(
            {where: {id}},
        )
        return res.json(user)
    }
}

module.exports = new UserController()