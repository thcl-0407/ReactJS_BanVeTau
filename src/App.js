import {HashRouter as Router, Switch, Route} from "react-router-dom"
import Header from "./parts/Header/Header";
import Footer from "./parts/Footer/Footer";

function App(props) {
    return (
        <>
           <Router>
               <Header></Header>
               <Switch>
                   <Route path="/" exact={true} component={App}>
                       <strong>This is Content</strong>
                   </Route>
               </Switch>
               <Footer></Footer>
           </Router>
        </>
    );
}

export default App;
