import { type Request,type Response} from "express"
import { prisma } from "../lib/prisma.js";
const getStatusHistory = async (req: Request<{id:string}>, res: Response) => { 
    try {
        const userId = req.userId;
        const { id } = req.params;
        const application = await prisma.application.findFirst({
            where: {
                id,
            userId:userId
            },
            include: {
                statusHistory: {
                    orderBy: {
                        changedAt:"desc"
                    }
                },
                tags: {
                    include: {
                        tag:true
                    }
                }
            }
        })
        if (!application) return res.status(401).json({ message: "Application not found" })
        const statusHistory = await prisma.statusHistory.findMany({
            where: {
                applicationId:id
            }
        })
        return res.status(200).json(statusHistory)
    } catch (error) {
        return res.status(401).json({ error: (error as Error).message });
    }
}

export {getStatusHistory}