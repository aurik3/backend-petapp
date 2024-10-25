import type { Response,Request } from 'express'
import Clinical from '../models/Clinical'
import Pet from '../models/Pets';


export class ClinicalController {

    static createClinical = async (req: Request, res: Response) => {
        await Clinical.sync();
        const { id_pet, description, date } = req.body;
        const clinical = await Clinical.create({
            id_pet,
            description,
            date
        })
        res.json(clinical)
    }

    static getClinicalById = async (req: Request, res: Response) => {
        await Clinical.sync();
        const id = req.params.id;

        const clinical = await Clinical.findOne({
            where: {
                id
            }
        })  
        res.json(clinical)
    }

    static getClinicals = async (req: Request, res: Response) => {
        await Clinical.sync();
        const clinicals = await Clinical.findAll();
        async function getPetName(id: number) {
            const pet = await Pet.findOne({ where: { id } });
            return pet.name;
        }

        try {
            
            const payload = await Promise.all(clinicals.map(async clinical => ({
                pacient: await getPetName(clinical.id_pet),
                ...clinical        
            })));
          
        res.json(payload)
        } catch (error) {
            console.log(error)
        }

      
    }

    static updateClinical = async (req: Request, res: Response) => {
        await Clinical.sync();
        const id = req.params.id;
        const {id_pet, description } = req.body;
        console.log(id_pet, description);
        try {
            const cli = await Clinical.findOne({
                where: {
                    id
                }               
            })
            if(!cli){
                res.status(404).send('Clinical not found')
                return;
            }
            cli.id_pet = id_pet;
            cli.description = description;
            await cli.save();
            res.json(cli)
        } catch (error) {
            throw new Error(`Error al actualizar la clinica, error: ${error}`)
        }
     
       
    }

    static deleteClinical = async (req: Request, res: Response) => {
        await Clinical.sync();
        const id = req.params.id;
        const clinical = await Clinical.destroy({
            where: {
                id
            }
        })
        res.json(clinical)
    }
}