
import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'

export class Clinical extends Model {
    declare id: number
    declare id_pet: number
    declare description: string
    declare date: Date
}

Clinical.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_pet: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Pets',  // Referencia el nombre de la tabla
            key: 'id'
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Clinical',
    tableName: 'Clinicals'  // Especificamos el nombre de la tabla
})

export default Clinical
