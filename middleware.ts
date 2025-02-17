import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)", // Protect /dashboard and subroutes
]);

export default clerkMiddleware(async (auth, req) => {
  const authResult = await auth(); // Await the auth function
  if (isProtectedRoute(req) && !authResult.userId) {
    return authResult.redirectToSignIn(); // Redirect to sign-in page
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // Apply to all routes except static files
    "/(api|trpc)(.*)", // Always apply to API routes
  ],
};
