import { HashRouter, Switch, Route } from "react-router-dom"
import Header from "./parts/Header/Header";
import Footer from "./parts/Footer/Footer";
import AdminRoute from "./routes/Admin.Route";

function App(props) {
    return (
        <div>
            <HashRouter>
                <Header></Header>
                <Switch>
                    <Route path="/" exact children={App}>
                        <strong>Hello</strong>
                    </Route>

                    <AdminRoute></AdminRoute>
                </Switch>
                <Footer></Footer>
            </HashRouter>
        </div>
    );
}

export default App;
