import type { Response,Request } from 'express'
import Pet from '../models/Pets'



export class PetController {

    static getPets= async (req: Request, res: Response)=> {

        await Pet.sync();

        try {
            const pets = await Pet.findAll();   
            res.json(pets)

        } catch (error) {
            throw new Error(`Error al traer los pets, error: ${error}`)
        }
        
    }

    static getPetById = async (req: Request, res: Response) => {
        
        await Pet.sync();

        const id = req.params.id;

        try {
            const pet = await Pet.findOne({
                where: {
                    id
                }
            })
            res.json(pet)

        } catch (error) {
            throw new Error(`Error al traer los pets, error: ${error}`)
        }

    }
    
    static createPet = async (req: Request, res: Response) => {

        await Pet.sync();

        const { name, breed, age, weight } = req.body;

        try {
            const pet = await Pet.create({
                name,
                breed,
                age,
                weight
            })

            res.json(pet)

        } catch (error) {   
            throw new Error(`Error al crear el pet, error: ${error}`)
        }
        
    }  

    static updatePet = async (req: Request, res: Response) => {

        await Pet.sync();

        const id = req.params.id;

        try {
            const pet = await Pet.findOne({
                where: {
                    id
                }
            })

            if (!pet) {
                res.status(404).json({ message: 'Pet not found' });
                return;
            }

            const { name, breed, age, weight } = req.body;

            pet.name = name;
            pet.breed = breed;
            pet.age = age;
            pet.weight = weight;

            await pet.save();

            res.json(pet);

        } catch (error) {
            throw new Error(`Error al actualizar el pet, error: ${error}`)
        }
        
    }

    static deletePet = async (req: Request, res: Response) => {

        await Pet.sync();

        const id = req.params.id;

        try {
            const pet = await Pet.findOne({
                where: {
                    id
                }
            })

            if (!pet) {
                res.status(404).json({ message: 'Pet not found' });
                return;
            }

            await pet.destroy();

            res.json({ message: 'Pet deleted successfully' });

        } catch (error) {
            throw new Error(`Error al borrar el pet, error: ${error}`)
        }
        
    }

}