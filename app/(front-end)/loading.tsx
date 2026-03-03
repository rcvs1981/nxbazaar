import { Loader2 } from "lucide-react"

export default function FrontendLoading() {
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}
