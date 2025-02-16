import { Route, Switch } from "wouter";
import NotFound from "../pages/notFound/notFound.tsx";
import Main from "../pages/main/Main.tsx";
import Auth from "../pages/auth/auth.tsx";

const Routes = () => {
    return (
        <Switch>
            <Route path="/" component={Main} />
            <Route path="/auth" component={Auth} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default Routes;