import  { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'
import Clinical from './Clinical'


class Pet extends Model {
    declare name: string
    declare breed: string
    declare age: number
    declare weight: number
}


Pet.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Pet'
})

Pet.hasMany(Clinical, { foreignKey: 'id_pet' })



export default Pet
