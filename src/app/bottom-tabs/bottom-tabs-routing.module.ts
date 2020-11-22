import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BottomTabsPage } from "./bottom-tabs.page";

const routes: Routes = [
  {
    path: "",
    component: BottomTabsPage,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("./home/home.module").then((m) => m.HomePageModule),
      },
      {
        path: "stats",
        loadChildren: () =>
          import("./stats/stats.module").then((m) => m.StatsPageModule),
      },
      {
        path: "",
        redirectTo: "/home",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BottomTabsPageRoutingModule {}
