// TODO: Remove this file

// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { login } from "@/services";
// import { Link } from "@/utils/navigation";
// import { PATH } from "@/utils/navigation/config";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// const loginSchema = z.object({
//   username: z.string().min(3, "Username must be at least 3 characters"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
// });

// export type LoginForm = z.infer<typeof loginSchema>;

// export function LoginForm() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [signUpSuccess, setSignUpSuccess] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginForm>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginForm) => {
//     setIsLoading(true);
//     await login(data);
//     setIsLoading(false);
//     setSignUpSuccess(true);
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>Login</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="username">Username</Label>
//               <Input id="username" {...register("username")} />
//               {errors.username && (
//                 <p className="text-sm text-red-500">
//                   {errors.username.message}
//                 </p>
//               )}
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input id="password" type="password" {...register("password")} />
//               {errors.password && (
//                 <p className="text-sm text-red-500">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>
//             <Button type="submit" className="w-full" disabled={isLoading}>
//               {isLoading ? "Logging in..." : "Login"}
//             </Button>
//           </form>
//         </CardContent>
//         <CardFooter>
//           <p className="text-sm text-gray-500">
//             Don't have an account?
//             <Link
//               className="pl-2 underline"
//               href={{
//                 pathname: PATH.SIGN_IN,
//               }}
//             >
//               Create an account here
//             </Link>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
