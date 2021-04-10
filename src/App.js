import { HashRouter, Switch, Route } from "react-router-dom"
import Header from "./parts/Header/Header";
import Footer from "./parts/Footer/Footer";
import AdminRoute from "./routes/Admin.Route";
import KhachHangRoute from "./routes/KhachHang.Route";

function App(props) {
    return (
        <div>
            <HashRouter>
                <Switch>
                    <Route path="/" exact comp={App}>
                        <Header></Header>
                        <Footer></Footer>
                    </Route>
                    <KhachHangRoute></KhachHangRoute>
                </Switch>
            </HashRouter>
            <HashRouter>
                <Switch>
                    <AdminRoute></AdminRoute>
                </Switch>
            </HashRouter>
        </div>
    );
}

export default App;
