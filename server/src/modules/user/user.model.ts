import { z } from 'zod'

export const createUserValidation = z.object({ avatar: z.string(), name: z.string() })
