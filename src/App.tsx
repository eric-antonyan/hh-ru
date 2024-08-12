import React from 'react'
import TodosScreen from './pages/TodoGroupsScreen'
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
    return (
        <Provider store={store}>
            <TodosScreen />
        </Provider>
    )
}

export default App