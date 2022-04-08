import logo from './logo.svg';
import FirstComponent from './components/FirstComponent';
import SecondComponent from './components/SecondComponent';
import './App.css';
import {
  BrowserRouter ,
  Switch,
  Route,
  Routes,
  Link,

} from "react-router-dom";


function App() {
  return (
<>
 <BrowserRouter>
      

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        

<Routes>
          <Route  path="/" element={<FirstComponent/>} />


          <Route  path="/about" element={<SecondComponent/>} />
            
</Routes> 
  
          
        
      
    </BrowserRouter>

 
 </>
  );
}

export default App;
