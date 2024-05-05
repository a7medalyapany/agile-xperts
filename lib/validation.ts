import * as z from 'zod';

export const SignUpValidation = z.object({
  email: z.string().email({message: 'Please enter a valid email'}),
  password: z.string().min(8, {message: 'Password must be at least 8 characters'}).max(50),
  username: z.string().trim().min(2, {message: 'Userame must be at least 3 characters long'}),
});

export const SignInValidation = z.object({
  email: z.string().email({message: 'Please enter a valid email'}),
  password: z.string().min(8, {message: 'Password must be at least 8 characters'}).max(50),
});

const githubRepoNameRegex = /^[a-zA-Z0-9_.-]+$/;
export const CreateProjectValidation = z.object({
  name: z.string().trim()
  .min(1, {message: "Repository name can not be empty"})
  .max(100, {message: "Repository name must be less than or equal to 100 characters"})
  .regex(githubRepoNameRegex, { message: "Invalid repository name" }), 
  description: z.string().trim().max(255, {message: "Description must be less than or equal to 255 characters"}), 
  private: z.boolean().default(false).optional(),
  title: z.string().trim().min(3, {message: "Title must be at least 3 characters long"}).max(30, {message: "Title must be less than or equal to 30 characters"}),
  technologies: z.array(z.object({
    name: z.string().min(1, { message: "Technology can not be empty" }),
    role: z.string().trim().min(1, { message: "Role can not be empty" })
  }))
});

export const PostPulse = z.object({
	content: z.string().trim().min(1, {message: "Atleast one character"}).max(2200, {message: "Pulse must be less than 2200 characters"}),
	photo: z.string().optional(),
})

export const profileFormSchema = z.object({
  name: z.string().trim().min(1, {message: "Name must be at least 2 characters."}).max(30, {message: "Name must not be longer than 30 characters."}),
  username: z
    .string().trim()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  bio: z.string().trim().max(160).optional(),
  country: z.string({
    required_error: "Please select a country.",
  }).optional(),
});