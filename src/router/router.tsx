import { Route, Switch, Redirect } from "wouter";
import { lazy, Suspense } from "preact/compat";
import NotFound from "../pages/notFound/notFound.tsx";
import { useUser } from "../hooks/useUser.tsx";
import { ComponentType } from "preact/compat";

const Main = lazy(() => import("../pages/main/Main.tsx"));
const Auth = lazy(() => import("../pages/auth/auth.tsx"));
const Bookmarks = lazy(() => import("../pages/bookmarks/bookmarks.tsx"));
const Settings = lazy(() => import("../pages/settings/settings.tsx"));

interface PrivateRouteProps {
    path: string;
    component: ComponentType<any>;
}

const PrivateRoute = ({ path, component: Component }: PrivateRouteProps) => {
    const { user, loading } = useUser();

    if (loading) return null;

    return (
        <Route path={path}>
            {user ? <Component /> : <Redirect to="/auth" />}
        </Route>
    );
};

const Routes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path="/" component={Main} />
                <Route path="/auth" component={Auth} />
                <PrivateRoute path="/settings" component={Settings} />
                <PrivateRoute path="/bookmarks" component={Bookmarks} />
                <Route component={NotFound} />
            </Switch>
        </Suspense>
    );
};

export default Routes;