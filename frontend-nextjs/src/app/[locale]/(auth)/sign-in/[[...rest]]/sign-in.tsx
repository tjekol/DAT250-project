"use client";

import { Locale, PATH } from "@/utils/navigation/config";
import { SignIn as SignInClerk } from "@clerk/nextjs";

export default function SignIn({ locale }: { locale: Locale }) {
  return <SignInClerk forceRedirectUrl={`${locale}/${PATH.DASHBOARD}`} />;
}
