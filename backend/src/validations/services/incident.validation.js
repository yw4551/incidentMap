import mongoose from "mongoose";
import { z } from "zod";

const locationSchema = z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
});

export const createIncidentSchema = z.object({
    title: z.string().trim().min(1).max(100),
    description: z.string().trim().min(1).max(1000),
    category: z.enum(["fire", "flood", "accident", "medical", "other"]),
    location: locationSchema,
});

export const updateIncidentSchema = z.object({
    title: z.string().trim().min(1).max(100).optional(),
    description: z.string().trim().min(1).max(1000).optional(),
    category: z
        .enum(["fire", "flood", "accident", "medical", "other"])
        .optional(),
    status: z.enum(["open", "in_progress", "closed"]).optional(),
    location: locationSchema.optional(),
});

export const incidentParamsSchema = z.object({
    id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id)),
});

export const incidentQuerySchema = z.object({
    category: z
        .enum(["fire", "flood", "accident", "medical", "other"])
        .optional(),
});
