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
                    <Route path="/" exact children={App}>
                        <Header></Header>
                        <div className="min-h-screen">

                        </div>
                        <Footer></Footer>
                    </Route>
                    <AdminRoute></AdminRoute>
                    <KhachHangRoute></KhachHangRoute>
                </Switch>
            </HashRouter>
        </div>
    );
}

export default App;
