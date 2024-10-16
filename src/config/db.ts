import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('contine2_petapp', 'contine2_petapp', 'K]{Q~Rq!L_&F', {
  host: '192.95.39.30',
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
