export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-4 flex min-h-screen w-full flex-col sm:mt-12">
      <div className="sm:min-w-lg mx-auto flex w-full max-w-7xl items-center p-4">
        <div className="flex w-full flex-col gap-10">{children}</div>
      </div>
    </div>
  );
};
