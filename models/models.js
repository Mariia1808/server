const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const { types } = require('pg')


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
})


const Favorites = sequelize.define('favorites',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


const Cook = sequelize.define('cook',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Type = sequelize.define('type',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const Recipe = sequelize.define('recipe', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    time: {type: DataTypes.INTEGER, allowNull: false},
    complex: {type: DataTypes.STRING, allowNull: false},
    profile_mini: {type: DataTypes.STRING, allowNull: false},
    profile: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    kcal: {type: DataTypes.INTEGER, allowNull: false},
    protein: {type: DataTypes.INTEGER, allowNull: false},
    fat: {type: DataTypes.INTEGER, allowNull: false},
    carb: {type: DataTypes.INTEGER, allowNull: false},
    rate: {type: DataTypes.REAL, allowNull: false},
})

const Proportion = sequelize.define('proportion', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    kolvo: {type: DataTypes.INTEGER, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    kcal: {type: DataTypes.INTEGER, allowNull: false},
    protein: {type: DataTypes.INTEGER, allowNull: false},
    fat: {type: DataTypes.INTEGER, allowNull: false},
    carb: {type: DataTypes.INTEGER, allowNull: false},
})




User.hasMany(Favorites)
Favorites.belongsTo(User)

Recipe.hasMany(Favorites)
Favorites.belongsTo(Recipe)

Recipe.hasMany(Cook)
Cook.belongsTo(Recipe)

User.hasMany(Cook)
Cook.belongsTo(User)

Recipe.hasMany(Proportion, {as: 'proportion'})
Proportion.belongsTo(Recipe)

Product.hasMany(Proportion)
Proportion.belongsTo(Product, {as: 'product'})

User.hasMany(Rating)
Rating.belongsTo(User)

Recipe.hasMany(Rating)
Rating.belongsTo(Recipe)

Type.hasMany(Recipe)
Recipe.belongsTo(Type)

User.hasMany(Recipe)
Recipe.belongsTo(User)

module.exports = {
    User,
    Product,
    Recipe,
    Favorites,
    Cook,
    Proportion,
    Type,
    Rating
}