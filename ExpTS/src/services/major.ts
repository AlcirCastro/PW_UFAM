import { PrismaClient, Major } from "@prisma/client";

import { createMajorDto,UpdateMajorDto } from "../types/major";

const prisma = new PrismaClient();

export const createMajor = async (major: createMajorDto): Promise <Major> =>{ 
    return prisma.major.create({data:major});
};

export const getMajors = async (): Promise <Major[]> => {
    return prisma.major.findMany();
}

export const getMajor = async (id:string ) : Promise <Major |  null> => {
    return prisma.major.findUnique({where:{id}});
}

export const removeMajor = async (id: string): Promise<Major | null> => {
    return prisma.major.delete({
        where: { id }
    });
};

export const updateMajor = async (id: string, major: UpdateMajorDto): Promise<Major | null> => {
    return prisma.major.update({
        where: { id },
        data: major
    });
}