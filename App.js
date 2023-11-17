import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import { Provider } from "react-redux";
import { Store } from './src/features/store';
import SignUp from './src/screens/SignUp';
import Teste from './src/screens/Teste'
import Home from './src/screens/Home';

export default function App() {
  return (
    <Provider store={Store}>
      <Home/>
    </Provider>
    
  );
}
