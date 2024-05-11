import * as z from 'zod'

export const CreateTaskBoardSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string(),
})