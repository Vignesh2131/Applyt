import { type Response, type Request } from "express";
import { prisma } from "../lib/prisma.js";
const createJobApplication = async (req: Request, res: Response) => {
  try {
    const {
      jobTitle,
      salary,
      companyName,
      source,
      notes,
      appliedDate,
      applicationStatus,
      tags,
    } = req.body;
    const userId = req.userId;
    const newApplication = await prisma.application.create({
      data: {
        jobTitle: jobTitle,
        salary: salary ?? null,
        companyName: companyName,
        source: source ?? null,
        notes: notes ?? null,
        appliedDate: appliedDate,
        statusHistory: {
          create: {
            name: "Application created",
            status: applicationStatus ?? "WISHLIST",
          },
        },
        tags: {
          create: tags.map((tagName: string) => ({
            tag: {
              connectOrCreate: {
                where: {
                  name: tagName,
                },
                create: {
                  name: tagName,
                },
              },
            },
          })),
        },
        userId: userId,
      },
      include: {
        statusHistory: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
    return res
      .status(201)
      .json({ message: "Applcation created successfully", newApplication });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create application",
    });
  }
};

const getAllApplications = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const userApplications = await prisma.application.findMany({
      where: {
        userId,
      },
      include: {
        statusHistory: {
          orderBy: {
            changedAt: "desc",
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        },
        orderBy: {
            createdAt:"desc"
        }
    });
    if (!userApplications)
      return res.json({ message: "There are no applications." });
    return res.status(201).json(userApplications);
  } catch (error) {
    return res.status(401).json({ error: "Error occured" });
  }
};

const getSingleApplication = async (req: Request<{id:string}>, res: Response) => {
    try {
        const userId = req.userId;
        const {id }= req.params;
        const applicationDetails = await prisma.application.findFirst({
            where: {
                id: id,
                userId:userId,
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
        return res.status(201).json(applicationDetails)
    } catch (error) {
    return res.status(401).json(error)
  }
};
const updateApplication = async (req: Request<{id:string}>, res: Response) => { 
  try {
    const userId = req.userId;
    const { id } = req.params;
    const {
      jobTitle,
      companyName,
      salary,
      source,
      notes,
      appliedDate,
      applicationStatus,
      statusNote,
    } = req.body;
    const existingApplication =
      await prisma.application.findFirst({
        where: {
          id,
          userId,
        },
      });

    if (!existingApplication) {
      return res.status(404).json({
        message: "Application not found",
      });
    }
    const statusChanged =
      applicationStatus &&
      applicationStatus !==
      existingApplication.applicationStatus;

    const application = await prisma.$transaction(
      async (tx) => {
        const updatedApplication = await tx.application.update({
          where: {
            id
          },
          data: {
            jobTitle,
            companyName,
            salary,
            source,
            notes,
            appliedDate: appliedDate
              ? new Date(appliedDate)
              : undefined,
            applicationStatus

          }
        })
        if (statusChanged) {
          await tx.statusHistory.create({
            data: {
              name: `Status changed to ${applicationStatus}`,
              applicationId: id,
              status: applicationStatus,
              note: statusNote ?? null,
            }
          })
        }
        return updatedApplication;
      }
    )
    return res.status(200).json({
      message: "Application updated successfully",
      application,
    });
  } catch (error) { 
    return res.status(401).json({ error: (error as Error).message });
  }
}

const deleteApplication = async (req: Request<{id:string}>, res: Response) => { 
  try {
    const userId = req.userId;
    const { id } = req.params;
    const application = await prisma.application.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }
    const deletedApplication = await prisma.application.delete({
      where: {
        id
      }
    })
    return res.status(400).json({message:"Application deleted",deletedApplication})
  } catch (error) {
    return res.status(401).json({ error: (error as Error).message });
  }
}
export { createJobApplication, getAllApplications ,getSingleApplication,updateApplication, deleteApplication};
