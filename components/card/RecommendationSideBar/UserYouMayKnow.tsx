import { AvatarImage, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"



export function UserYouMayKnow() {
  return (
    <Card className="w-full max-w-md ">
    <CardHeader>
      <CardTitle className="text-xl">People You May Know</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {[1,2,3].map((value)=> {
        return(
        <div className="flex items-center justify-between gap-4" key={value}>
          <Avatar>
            <AvatarImage alt="Dummy1" src="/placeholder.svg" />
          </Avatar>
          <div className="flex-1">
            <span className="text-foreground font-medium">Dummy1</span>
            <span className="text-muted-foreground block">@dUMMY1</span>
          </div>
          <Button>Follow</Button>
        </div>
        );
       })}
        
    </CardContent>
    </Card>
    
  )
}
