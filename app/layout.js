import "./globals.css";



export const metadata = {
  title: "AI-Notes App",
  description: "Your Personal AI Note Taker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className='font-myfont'
      >
        {children}
      </body>
    </html>
  );
}
