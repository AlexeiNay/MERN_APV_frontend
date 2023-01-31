import { useState, useEffect } from "react"
import Alerta from '../components/Alerta'
import usePacientes from "../hooks/usePacientes"
const Formulario = () => {

    const[nombre, setNombre] = useState('')
    const[propietario, setPropietario] = useState('')
    const[email, setEmail] = useState('')
    const[fecha, setFecha] = useState('')
    const[sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const[alerta, setAlerta] = useState({})

    const { guardarPaciente, paciente } = usePacientes()

    useEffect(() => {
        if (paciente.paciente?.nombre) {
            setNombre(paciente.paciente.nombre)
            setPropietario(paciente.paciente.propietario)
            setEmail(paciente.paciente.email)
            setFecha(paciente.paciente.fecha)
            setSintomas(paciente.paciente.sintomas)
            setId(paciente.paciente._id)
        }
    }, [paciente])
    

    const handleSubmit = e => {
        e.preventDefault()
        //Validar el formulario 
        if ([nombre,propietario,email,fecha,sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        setAlerta({})
        guardarPaciente({
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
            id
        })
        setAlerta({
            msg: 'Guardaro Correctamente'
        })
        setNombre('')
        setPropietario('')
        setEmail('')
        setSintomas('')
        setFecha('')
        setId('')
    }

    const { msg } = alerta;

  return (
    <>
              <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Añade tus pacientes y {""}
            <span className="text-indigo-600 font-bold">Administralos</span>
          </p>
  
    <form
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
        onSubmit={handleSubmit}
    >
        <div className="mb-5">
            <label 
                htmlFor="nombre"
                className="text-gray-700 uppercase font-bold"
            >Nombre Mascota</label>
            <input 
                id="nombre"
                type="text"
                placeholder="Nombre de la Mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
            <label
                htmlFor="propietario"
                className="text-gray-700 uppercase font-bold"
            >Nombre Propietario</label>
            <input 
                id="propietario"
                type="text"
                placeholder="Nombre del Propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                value={propietario}
                onChange={e => setPropietario(e.target.value)}
            />
            <label
                htmlFor="email"
                className="text-gray-700 uppercase font-bold"
            >Email Propietario</label>
            <input 
                id="email"
                type="email"
                placeholder="Email del Propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <label
                htmlFor="fecha"
                className="text-gray-700 uppercase font-bold"
            >Fecha Alta</label>
            <input 
                id="fecha"
                type="date"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                value={fecha}
                onChange={e => setFecha(e.target.value)}
            />
            <label
                htmlFor="sintomas"
                className="text-gray-700 uppercase font-bold"
            >Sintomas</label>
            <textarea 
                id="sintomas"
                placeholder="Describe los Sintomas"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                value={sintomas}
                onChange={e => setSintomas(e.target.value)}
            />
        </div>
        
        <input 
            type="submit" 
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
            value={ id ? 'Guardar Cambios' : 'Agregar Paciente'}
        />
    </form>
    {msg && <Alerta alerta={alerta}/>}
    </>
  )
}

export default Formulario