import { SignUp } from "@clerk/nextjs";

export default function Register() {
  return (
    <div className="flex items-center justify-center h-full my-60">
      <SignUp />;
    </div>
  );
}
