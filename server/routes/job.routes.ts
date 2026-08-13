import express, { type Express } from "express";
import { verifyMiddleware } from "../middleware/auth.middleware.js"
import {getStatusHistory} from "../controllers/statushistory.controller.js"
import {createJobApplication,getAllApplications,getSingleApplication,updateApplication,deleteApplication} from "../controllers/job.controller.js"
const jobRouter: Express = express();

jobRouter.post("/api/createApp", verifyMiddleware, createJobApplication)
jobRouter.get("/api/getApp", verifyMiddleware, getAllApplications)
jobRouter.get("/api/getApp/:id", verifyMiddleware, getSingleApplication)
jobRouter.patch("/api/updateApp/:id", verifyMiddleware, updateApplication)
jobRouter.delete("/api/deleteApp/:id", verifyMiddleware, deleteApplication)
jobRouter.get("/api/getHistory/:id",verifyMiddleware,getStatusHistory)

export { jobRouter }