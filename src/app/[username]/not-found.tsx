import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
      <p className="text-gray-600 mb-4">This user doesn't exist or the username is invalid.</p>
      <Link 
        href="/home"
        className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
      >
        Go Back Home
      </Link>
    </div>
  );
}
