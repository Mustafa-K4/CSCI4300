import "../../globals.css";
import Header from "../../components/Header"
import Calendar from "../../components/Calendar"


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body>
                <main className="AppProfile">
                    
                    {children}
                </main>
            </body>
        </html>
    );
}
