import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Detail, List } from "../pages";

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen
          name="List"
          component={List}
          options={{ headerShown: false }}
        />
  
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };
  
  export default Router;