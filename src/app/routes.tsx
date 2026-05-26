import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { CoursesPage } from "./pages/CoursesPage";
import { CourseDetailsPage } from "./pages/CourseDetailsPage";
import { MediaPage } from "./pages/MediaPage";
import { PlacementTestPage } from "./pages/PlacementTestPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SchoolPartnershipPage } from "./pages/SchoolPartnershipPage";

const basename =
  typeof window !== "undefined" && window.location.pathname.startsWith("/dist")
    ? "/dist"
    : undefined;

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, Component: HomePage },
        { path: "courses", Component: CoursesPage },
        { path: "courses/:courseId", Component: CourseDetailsPage },
        { path: "media", Component: MediaPage },
        { path: "placement-test", Component: PlacementTestPage },
        { path: "login", Component: LoginPage },
        { path: "register", Component: RegisterPage },
        { path: "contact", Component: ContactPage },
        { path: "school-partnership-wwlc", Component: SchoolPartnershipPage },
        { path: "*", Component: NotFoundPage },
      ],
    },
  ],
  { basename }
);
