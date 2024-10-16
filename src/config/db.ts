import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('toursgru_intranet', 'toursgru_intranet', 'u*HLvRK^U%Fx', {
  host: '158.69.3.111',
  dialect: 'mysql',
  logging:false
});

export const connectDB = async ()=>{
 try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


export default sequelize
