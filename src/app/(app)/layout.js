import { Onest } from "next/font/google";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@heroui/react";
import Link from "next/link";
import { auth } from "@/libs/auth";
import Avatar from "boring-avatars";
import { Sidebar } from "./_components/sidebar";

export async function logoutAction() {
  "use server";
  const cookieStore = cookies();
  cookieStore.delete("sessionId");
  redirect("/");
}

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
});

export default async function Page({ children }) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className={`${onest.variable} font-sans min-h-screen flex flex-col`}>
      <header className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 w-full">
            <div className="flex-shrink-0">
              <Link href="/dashboard" className="text-xl font-bold text-black">
                eventmakers.
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {session && (
                <div className="hidden sm:flex items-center gap-2 font-semibold">
                  <div>{session.user.name}</div>
                  <Avatar
                    size={40}
                    name={session.user.name}
                    colors={[
                      "#fb6900",
                      "#f63700",
                      "#004853",
                      "#007e80",
                      "#00b9bd",
                    ]}
                  />
                </div>
              )}
              <form action={logoutAction}>
                <Button
                  variant="ghost"
                  type="submit"
                  size="sm"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="text-current"
                  >
                    <g>
                      <g
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      >
                        <path d="M3 7a5 5 0 0 1 5-5h5a1 1 0 1 1 0 2H8a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h5a1 1 0 1 1 0 2H8a5 5 0 0 1-5-5z" />
                        <path d="M14.47 7.316a1 1 0 0 1 1.414-.046l4.8 4.5a1 1 0 0 1 0 1.46l-4.8 4.5a1 1 0 1 1-1.368-1.46l2.955-2.77H8a1 1 0 1 1 0-2h9.471l-2.955-2.77a1 1 0 0 1-.046-1.414" />
                      </g>
                    </g>
                  </svg>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        <aside className="w-64 flex-shrink-0">
          <Sidebar />
        </aside>

        <main className="flex-1 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="min-h-[calc(100vh-13rem)]">{children}</div>
          </div>
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <div className="w-full flex items-center justify-between">
            <p className="text-sm text-gray-500">
              © 2025 eventmakers. All rights reserved.
            </p>
            <div className="flex items-center">
              <a
                href="https://github.com/khmuhtadin/Devscale-Eventmaker"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
