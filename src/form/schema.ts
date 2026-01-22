import {
  z
} from "zod"
const formSchema = z.object({
  patient_name: z.string().trim().min(2, "Patient name is required"),
  date: z.iso.date(),
  status: z.enum(["Draft", "Reviewed", "Submitted"]),
  summary: z.string().trim().min(10, "Summary must have minumum 10 chars"),
});

export default formSchema