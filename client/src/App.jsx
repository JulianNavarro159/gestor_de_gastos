import { Collaboration, Form, Home, Landing } from './views'
import { Route, Routes } from 'react-router-dom'

function App() {
    return (
        <div>
            <Routes>
                <Route path='/collaboration' element={<Collaboration />}/>
                <Route path='/loggin' element={<Form />}/>
                <Route path='/home' element={<Home />}/>
                <Route path='/' element={<Landing />}/>
            </Routes>
        </div>
    )
};

export default App;