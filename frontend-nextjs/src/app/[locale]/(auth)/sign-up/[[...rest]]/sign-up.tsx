"use client";

import { Locale, PATH } from "@/utils/navigation/config";
import { SignUp as SignUpClerk } from "@clerk/nextjs";

export default function SignUp({ locale }: { locale: Locale }) {
  // Temp solution to force manual user creation for now
  return (
    <SignUpClerk
      fallbackRedirectUrl="/"
      forceRedirectUrl={`${locale}/${PATH.CREATE_ACCOUNT}`}
    />
  );
  return (
    <SignUpClerk
      fallbackRedirectUrl="/"
      forceRedirectUrl={`${locale}/${PATH.DASHBOARD}`}
    />
  );
}
