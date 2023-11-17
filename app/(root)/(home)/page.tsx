import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1 className="h1-bold ">hkjhkja djhakhui h</h1>
      {/* <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut> */}

      <UserButton afterSignOutUrl="/" />
      {/* <UserProfile /> */}
    </div>
  );
}
