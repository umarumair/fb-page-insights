import { Button } from "@/components/ui/button";
import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

export function LoginPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gradient-to-br from-white to-sky-200 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl whitespace-nowrap">
          Facebook Page Insights
        </h1>
        <p className="mt-4 text-muted-foreground">
          Sign in to your account to continue.
        </p>
        <div className="mt-6">
          <Button
            variant="outline"
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[#1877F2] px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-[#1877F2]/90 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-offset-2"
            onClick={() => console.log("Button Clicked")}
          >
            <FacebookIcon className="h-5 w-5" />
            Login with Facebook
          </Button>
        </div>
      </div>
    </div>
  );
}

function FacebookIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
