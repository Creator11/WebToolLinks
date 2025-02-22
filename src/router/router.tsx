import { Route, Switch, Redirect } from "wouter";
import NotFound from "../pages/notFound/notFound.tsx";
import Main from "../pages/main/Main.tsx";
import Auth from "../pages/auth/auth.tsx";
import Bookmarks from "../pages/bookmarks/bookmarks.tsx";
import Settings from "../pages/settings/settings.tsx";
import {useUser} from "../hooks/useUser.tsx";
import { ComponentType } from "preact";


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
        <Switch>
            <Route path="/" component={Main} />
            <Route path="/auth" component={Auth} />
            <PrivateRoute path="/settings" component={Settings} />
            <PrivateRoute path="/bookmarks" component={Bookmarks} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default Routes;