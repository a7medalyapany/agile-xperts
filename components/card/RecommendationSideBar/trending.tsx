
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import Link from "next/link"

export function Trending() {
  return (
    <Card className="w-full max-w-md ">
      <CardHeader>
        <CardTitle>Trending Now</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
        {[1, 2, 3].map((value) => {
  return (
    <div className="flex items-center justify-between flex-1 p-2" key={value}>
      <div className="mr-4">
        <Link className="font-medium text-foreground hover:underline" href="#">
          NextJS
        </Link>
        <p className="text-sm text-muted-foreground mt-2">
          The latest trends in Next.js projects are taking over.
        </p>
      </div>
      <div className="shrink-0 text-muted-foreground ml-4">23.4K</div>
    </div>
  );
})}
</div>
            
      </CardContent>
    </Card>
  )
}
