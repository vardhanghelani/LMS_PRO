export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nova-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-nova-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-nova-secondary/20 rounded-full mix-blend-multiply filter blur-3xl animate-nova-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-nova-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-nova-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Clean auth content - no navbar, no footer */}
      <main className="relative z-10 min-h-screen">
        {children}
      </main>
    </div>
  );
}
