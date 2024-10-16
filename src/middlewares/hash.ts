import bcrypt from 'bcrypt'

export const encrypt = async (password:string)=>{
    const hash = await bcrypt.hash(password,10)
    return hash
}

export const decrypt = async (password:string,hashPassw:string)=>{
    const validate = bcrypt.compare(password,hashPassw)
    return validate
}