import { NativeBaseProvider} from "native-base"


import LoginScreen from "./src/Screens/LoginScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import SingleProductScreen from "./src/Screens/SingleProduct";
import RegisterScreen from "./src/Screens/RegisterScreen";

export default function App() {
  return (
    <NativeBaseProvider>
      {/* <RegisterScreen /> */}
      <LoginScreen/>
      {/* <HomeScreen /> */}
      {/* <SingleProductScreen /> */}
    </NativeBaseProvider>
  
  );
}


