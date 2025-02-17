import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'


export const metadata = {
  title: "AI-Notes App",
  description: "Your Personal AI Note Taker",
  icons:'/logo3.svg'
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className='font-myfont'
        >
          {children}

        </body>
      </html>
    </ClerkProvider>
  );
}
