import Image from "next/image"

const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 justify-center items-center">
     <div className="w-10 h-10 relative animate-spin">
      <Image alt="logo" fill src="/omnigenlogo.png" />
     </div>
     <p className="text-sm text-muted-foreground">Omnigen is Thinking...</p>
    </div>
  )
}

export default Loader