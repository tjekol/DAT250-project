"use client";

import { Locale, PATH } from "@/utils/navigation/config";
import { SignIn as SignInClerk } from "@clerk/nextjs";

export default function SignIn({ locale }: { locale: Locale }) {
  // Temp solution to force manual user creation for now
  return <SignInClerk />;
  return (
    <SignInClerk
      fallbackRedirectUrl="/"
      forceRedirectUrl={`${locale}/${PATH.DASHBOARD}`}
    />
  );
}
