import type { Response,Request } from 'express'
import Clinical from '../models/Clinical'


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
        res.json(clinicals)
    }

    static updateClinical = async (req: Request, res: Response) => {
        await Clinical.sync();
        const { id, id_pet, description, date } = req.body;
        const clinical = await Clinical.update({
            id_pet,
            description,
            date
        }, {
            where: {
                id
            }
        })
        res.json(clinical)
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