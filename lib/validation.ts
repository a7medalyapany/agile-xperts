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
	photo: z.instanceof(File).optional(),
  name: z.string().trim()
  .min(1, {message: "Repository name can not be empty"})
  .max(100, {message: "Repository name must be less than or equal to 100 characters"})
  .regex(githubRepoNameRegex, { message: "Invalid repository name" }),
  teamName: z.string().trim()
  .min(1, {message: "Team name can not be empty"})
  .max(100, {message: "Team name must be less than or equal to 100 characters"}),
  description: z.string().trim().max(255, {message: "Description must be less than or equal to 255 characters"}), 
  private: z.boolean().default(false).optional(),
  title: z.string().trim().min(3, {message: "Title must be at least 3 characters long"}).max(30, {message: "Title must be less than or equal to 30 characters"}),
  technologies: z.array(z.object({
    name: z.string().min(1, { message: "Technology can not be empty" }),
    designation: z.string().trim().min(1, { message: "Designation can not be empty" })
  }))
});

export const PostPulse = z.object({
	content: z.string().trim().max(2200, {message: "Pulse must be less than 2200 characters"}),
	photo: z.instanceof(File).optional(),
})

export const profileFormSchema = z.object({
  photo: z.instanceof(File).optional(),
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
  country: z.object({
    id: z.number(),
    name: z.string(),
  }).optional(),
});

export const accountFormSchema = z.object({
  aboutMe: z.string()
  .trim()
  .max(2200, {
    message: "Your about me text should not exceed 2200 characters",
  }).optional(),
  skills: z.array(
    z
      .string()
      .trim()
      .min(1, { message: "Atleast one charachter" })
      .max(30, { message: "skill should not exceed 30 characters" })
  )
  .optional(),
  urls: z
    .array(
      z.object({
        platform: z.enum([
          "Other",
          "Google",
          "LinkedIn",
          "X",
          "Facebook",
          "Instagram",
          "GitHub",
        ]),
        value: z.string(),
      })
    )
    .optional(),
});

export const securityFormSchema = z.object({
    oldPassword: z.string().min(8, { message: "Old password must be at least 8 characters." }),
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirmed password must be at least 8 characters." }),
    twoFactorAuth: z.boolean().default(false).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.oldPassword && data.newPassword === data.oldPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New password must be different from the old password.",
        path: ["newPassword"],
      });
    }

    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New password and confirmed password do not match.",
        path: ["confirmPassword"],
      });
    }

      const oldPasswordIsCorrect = true;  // Replace with actual validation logic
      if (!oldPasswordIsCorrect) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Old password is incorrect.",
          path: ["oldPassword"],
        });
      }
  });

export const githubSecurityFormSchema = z.object({
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirmed password must be at least 8 characters." }),
    twoFactorAuth: z.boolean().default(false).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New password and confirmed password do not match.",
        path: ["confirmPassword"],
      });
    }
  });




export const userProjectsTable = z.object({
    title: z.string(),
    project_id: z.number(),
    technology_name: z.string(),
    github_repo_url: z.string(),
})
  
export type Task = z.infer<typeof userProjectsTable>
  