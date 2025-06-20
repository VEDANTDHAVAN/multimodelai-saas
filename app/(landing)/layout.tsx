const LandingLayout = ({
   children 
}: {
   children: React.ReactNode;
}) => {
  return (
    <main className="h-full bg-[#112733] overflow-auto">
     {children}
    </main>
  )
}

export default LandingLayout;