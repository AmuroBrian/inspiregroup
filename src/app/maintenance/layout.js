export const metadata = {
  title: "Maintenance | Inspire Group",
  robots: { index: false, follow: false },
};

export default function MaintenanceLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}


