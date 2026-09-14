import { SignIn } from "@clerk/nextjs";

export default function LogIn() {
  return (
    <div className="flex items-center justify-center h-full my-76">
      <SignIn />
    </div>
  );
}
