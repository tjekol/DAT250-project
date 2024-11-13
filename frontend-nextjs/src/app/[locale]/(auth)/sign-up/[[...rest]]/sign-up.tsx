"use client";

import { Locale, PATH } from "@/utils/navigation/config";
import { SignUp as SignUpClerk } from "@clerk/nextjs";

export default function SignUp({ locale }: { locale: Locale }) {
  return (
    <SignUpClerk
      fallbackRedirectUrl="/"
      forceRedirectUrl={`${locale}/${PATH.DASHBOARD}`}
    />
  );
}
