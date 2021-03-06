import { AiFillHome } from "react-icons/ai";
import { directToPage } from "./components/helpers";
import { motion } from "framer-motion";
import { Props } from "framer-motion/types/types";
import { HashRouter, Route, Switch } from 'react-router-dom'
import { MainPage } from "./components/MainPage";
import { Resume } from "./components/Resume";

const defaultHomeButtonProp = {
  onClick: () => directToPage('startpage'),
  position: 'bottom-7 right-5',
  positionType: 'absolute'
}

export const HomeButton = (props: Props) => {
  return (
    <motion.button
      animate={{ opacity: props['trigger'] ? 1 : 0 }}
      transition={{ duration: 1 }}
      onClick={props.onClick} className={`${props.positionType} text-off-white w-8 h-8 z-40 ${props.position} hover:text-off-white-hover transform active:scale-90`}>
      <AiFillHome className="w-full h-full" />
    </motion.button>
  ) 
}
HomeButton.defaultProps = defaultHomeButtonProp

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/resume">
          <Resume />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
