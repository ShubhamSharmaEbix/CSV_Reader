import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form } from 'react-bootstrap';
import CSVReader from './components/CSVReader';



function App() {

  return (
    <Container className='App'>
      <CSVReader/>
    </Container>
  )
}

export default App
