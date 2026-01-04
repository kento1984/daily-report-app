import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import ReportListScreen from './screens/ReportListScreen'
import CreateReportScreen from './screens/CreateReportScreen'

export type RootStackParamList = {
  ReportList: undefined
  CreateReport: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="ReportList">
        <Stack.Screen
          name="ReportList"
          component={ReportListScreen}
          options={{ title: '日報一覧' }}
        />
        <Stack.Screen
          name="CreateReport"
          component={CreateReportScreen}
          options={{ title: '新規作成' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
