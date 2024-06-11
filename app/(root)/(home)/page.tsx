import { FC } from "react";
import { ListFilter } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Streaks from "@/components/card/Streaks";
import CreateProject from "@/components/card/CreateProject";
import ProjectDetails from "@/components/card/ProjectDetails";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/actions/user.action";

interface pageProps {}

const Page: FC<pageProps> = async () => {
  const supabase = createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return redirect("/login");
  }

  const user = await getCurrentUser();
  if (!user) {
    return redirect("/login");
  }

  return (
    <main className="grid flex-1 items-start gap-4 lg:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <CreateProject userRole={user.user_role!} />
          <Streaks
            userRole={user.user_role!}
            strakPoints={user.streak_points!}
          />
        </div>

        <section className="space-y-2">
          <div className="flex">
            <DropdownMenu>
              <DropdownMenuTrigger className="ml-auto" asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="size-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Fulfilled
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Card>
            <CardHeader className="px-7">
              <CardTitle>Projects</CardTitle>
              <CardDescription>Recent projects you worked on.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Type
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="bg-accent">
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Olivia Smith</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              olivia@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Refund
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-24
                          </TableCell>
                          <TableCell className="text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Noah Williams</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              noah@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Subscription
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-25
                          </TableCell>
                          <TableCell className="text-right">$350.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Emma Brown</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              emma@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-26
                          </TableCell>
                          <TableCell className="text-right">$450.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Olivia Smith</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              olivia@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Refund
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-24
                          </TableCell>
                          <TableCell className="text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Emma Brown</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              emma@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-26
                          </TableCell>
                          <TableCell className="text-right">$450.00</TableCell>
                        </TableRow>
                      </TableBody>
              </Table> */}
            </CardContent>
          </Card>
        </section>
      </div>
      <ProjectDetails projectId="1" openProject={true} />
    </main>
  );
};
export default Page;
