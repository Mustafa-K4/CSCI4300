import "./globals.css";
import Header from "./components/Header"
import Footer from "./components/Footer"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>  
            <Header></Header>
            <main className="App flex-grow p-4 pt-24">
              {children}
            </main>
            <Footer></Footer> 
        </body>
      </html>
  );
}
