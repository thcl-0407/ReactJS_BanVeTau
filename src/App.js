import { HashRouter, Switch, Route } from "react-router-dom"
import Header from "./parts/Header/Header";
import Footer from "./parts/Footer/Footer";
import AdminRoute from "./routes/Admin.Route";

function App(props) {
    return (
        <div>
            <HashRouter>
                <Switch>
                    <Route path="/" exact children={App}>
                        <Header></Header>
                        <Footer></Footer>
                    </Route>
                    <AdminRoute></AdminRoute>
                </Switch>
            </HashRouter>
        </div>
    );
}

export default App;
