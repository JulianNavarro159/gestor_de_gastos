import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Collaboration, Log, Home, Landing } from './views';
import { login } from './redux/actions';

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [access, setAccess] = useState(false);

    const loggin = (/*obj, arr*/credentials) => {
        // const element = arr.find((user) => user.email === obj.email && user.phone === obj.password);
        // if(element) {
        //     setAccess(true);
        // }
        dispatch(login(credentials));
        const user = useSelector(state => state.login); 
        if(user) {
            setAccess(true);
        }
    };

    useEffect(() => {                                                                           // useEffect maneja el efecto secundario, la fn(1er argumento del hook) se ejecuta después de que el componente se haya renderizado por primera vez y después de cada actualización del estado access
        if (access) {                                                                           // Me dirige a /home con el 1er click en el botón Loggin
            navigate('/home');
        }
    }, [access, navigate]);

    return (
        <div>
            <Routes>
                <Route path='/collaboration' element={<Collaboration />}/>
                <Route path='/log' element={<Log />}/>
                <Route path='/home' element={access ? <Home />: <Landing loggin={loggin}/>}/>     {/*Si tengo acceso renderizo /home, de lo contrario muestro Landing*/}
                <Route path='/' element={<Landing loggin={loggin}/>}/>
            </Routes>
        </div>
    )
};

export default App;