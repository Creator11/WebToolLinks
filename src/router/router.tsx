import { Route, Switch } from "wouter";
import NotFound from "../pages/notFound/notFound.tsx";
import Main from "../pages/main/Main.tsx";
import Auth from "../pages/auth/auth.tsx";
import Bookmarks from "../pages/bookmarks/bookmarks.tsx";
import Settings from "../pages/settings/settings.tsx";

const Routes = () => {
    return (
        <Switch>
            <Route path="/" component={Main} />
            <Route path="/auth" component={Auth} />
            <Route path="/settings" component={Settings} />
            <Route path="/bookmarks" component={Bookmarks} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default Routes;