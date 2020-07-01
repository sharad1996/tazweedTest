import * as React from 'react';
import { View, Text , TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SellerList from "./screens/list"
import DetailsScreen from "./screens/detail"
import SearchResult from "./screens/searchResult"
import AddAppointement from "./screens/bookAppointement"

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sellers List" >
        <Stack.Screen name="Sellers List" 
                      component={SellerList} 
                      options={{
                        title: 'Sellers List',
                        headerStyle: {
                          backgroundColor: '#f4511e',
                        },  
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                          fontWeight: 'bold',
                          alignItems: "center",
                          justifyContent: "center"
                        },
                      }}
                      />
        <Stack.Screen name="Add Appointement" 
                      component={AddAppointement} 
                      options={{
                        title: 'Add Appointement ',
                        headerStyle: {
                          backgroundColor: '#f4511e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                          fontWeight: 'bold',
                        },
                      }}
                      />
        <Stack.Screen name="Details" 
                      component={DetailsScreen} 
                      options={{
                        title: 'Detail ',
                        headerStyle: {
                          backgroundColor: '#f4511e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                          fontWeight: 'bold',
                        },
                      }}
                      />              
        <Stack.Screen name="SearchResult" 
                      component={SearchResult} 
                      options={{
                        title: 'Result ',
                        headerStyle: {
                          backgroundColor: '#f4511e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                          fontWeight: 'bold',
                        },
                      }}
                      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;