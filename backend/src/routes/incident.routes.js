import { Router } from "express";
import authenticate from "../utils/authMiddleware.js";
import {
    getIncidents,
    getIncident,
    createIncident,
    updateIncident,
    deleteIncident,
} from "../ctrls/incident.ctrl.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import {
    validateBody,
    validateParams,
    validateQuery,
} from "../utils/validate.js";
import {
    createIncidentSchema,
    incidentParamsSchema,
    incidentQuerySchema,
    updateIncidentSchema,
} from "../validations/services/incident.validation.js";

const router = Router();

router.get(
    "/",
    authenticate,
    validateQuery(incidentQuerySchema),
    asyncWrapper(getIncidents),
);
router.get(
    "/:id",
    authenticate,
    validateParams(incidentParamsSchema),
    asyncWrapper(getIncident),
);
router.post(
    "/",
    authenticate,
    validateBody(createIncidentSchema),
    asyncWrapper(createIncident),
);
router.patch(
    "/:id",
    authenticate,
    validateParams(incidentParamsSchema),
    validateBody(updateIncidentSchema),
    asyncWrapper(updateIncident),
);
router.delete(
    "/:id",
    authenticate,
    validateParams(incidentParamsSchema),
    asyncWrapper(deleteIncident),
);

export default router;
