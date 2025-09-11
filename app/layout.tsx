import './globals.css';

export const metadata = {
    title: 'Library Management System',
    description: 'Manage your library digitally and efficiently.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="overflow-x-hidden">{children}</body>
        </html>
    );
}
