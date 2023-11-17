import { useEffect, useRef, useState } from "react";

/* eslint-disable react/prop-types */
let CHATBOTUSER =[
    {
        id: 1,
        name: 'GyreDevClub',
        avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg',
        message: 'Hola, ¿en que puedo ayudarte?',
        type: 'bot'
    }
]
const EXAMPLES = [{"text": "¿Cuáles son los métodos de pago aceptados?\n", "label": "pagos"}, {"text": "¿Ofrecen servicio de entrega?\n", "label": "servicio"}, {"text": "¿Cuál es la política de devolución?\n", "label": "garantias"}, {"text": "¿Tienen muebles personalizables?\n", "label": "productos"}, {"text": "¿Cuáles son las garantías de sus productos?", "label": "garantias"}, {"text": "¿Ofrecen servicios de ensamblaje?\n", "label": "servicio"}, {"text": "¿Tienen muebles ecológicos?\n", "label": "productos"}, {"text": "¿Puedo hacer seguimiento de mi pedido en línea?", "label": "servicio"}, {"text": "¿Ofrecen descuentos para compras al por mayor?\n", "label": "pagos"}, {"text": "¿Aceptan tarjetas de crédito y débito?", "label": "pagos"}, {"text": "Por donde te puedo contactar?", "label": "contacto"}, {"text": "Donde estan ubicados?", "label": "contacto"}, {"text": "Tienen tienda fisica?", "label": "contacto"}, {"text": "Cuales son los precios?", "label": "contacto"}, {"text": "Que materiales usan para los muebles?", "label": "productos"}, {"text": "Cual es el tiempo de garantia de un mueble?", "label": "garantias"}]
const ANSWERS = {
    
    garantias: (
        <p>
            ¡Estamos contigo! Ofrecemos garantías para que compres con confianza. Consulta detalles en nuestra página de garantías.
            ¿No quedaste satisfecho? 😟 Revisa nuestra política en el sitio para saber cómo proceder. ¡Queremos que ames tu compra!
        </p>
    ),
    servicio: (
        <p>
            ¿No eres fan de las instrucciones? 🛠 Ofrecemos servicios de ensamblaje para hacerte la vida más fácil.
            ¡Sí, llevamos tus compras directo a tu puerta! 🚚 Costos y tiempos de entrega varían, pero te lo contamos al hacer tu pedido.
            ¡Síguenos el rastro! 🕵‍♀ Te damos un número de seguimiento para que veas dónde anda tu pedido.
        </p>
    ),
    productos: (
        <p>
            🌿 ¡Sí! Nos encanta la naturaleza. Nuestros muebles son ecológicos, hechos con materiales sostenibles.
            ¡Hazlo único! 🎨 Ofrecemos opciones personalizables. Contáctanos para detalles y sugerencias de diseño.
            ¿Compras en cantidad? 🛍 Habla con nuestro equipo de ventas para obtener descuentos especiales.
        </p>
    ),
    pagos: (
        <p>
            Aceptamos tarjetas de crédito 💳, débito 💳, transferencias bancarias 🏦, y pagos seguros en línea como PayPal 💻.
            ¡Claro que sí! 💳 Aceptamos tarjetas para hacer tus compras más sencillas.
        </p>
    ),
    contacto: (
        <p>
            Nos encontramos en San Rafael Arriba de Desamparados.
            Puedes contactarnos por medio de nuestro correo electronico:correo@correo.com
            O por medio de nuestro numero de telefono: 8888-8888
        </p>
    ),

}
const Chat = ({setShowChat}) => {

    const [messages, setMessages] = useState(CHATBOTUSER);

    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);

    const container = useRef(null);

    async function handleSubmit(e){
        e.preventDefault();

        if(loading) return;

        setLoading(true);
        setQuestion('');

        setMessages(messages =>
            messages.concat({
                id: String(Date.now()),
                name: 'user',
                avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg',
                message: question,
                type: 'user'
            })
        )

        try {
            const resp = await fetch(import.meta.env.VITE_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `BEARER ${import.meta.env.VITE_API_KEY}`
                },
                body: JSON.stringify({
                    model:'large',
                    inputs:[question],
                    examples: EXAMPLES,
                })
            })
            const data = await resp.json();
            
            console.log(data.classifications[0].prediction);

            
            setMessages(messages =>
                messages.concat({
                    id: String(Date.now()),
                    name: 'GyreDevClub',
                    avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg',
                    message: ANSWERS[data.classifications[0].prediction],
                    type: 'bot'
                })
            )

            setLoading(false);
        } catch (error) {
            console.log(error)
        }
        

    }

    useEffect(()=>{

        container.current?.scrollTo(0,container.current.scrollHeight)
    
    },[messages])

  return (
    <div>
        <div
            className='fixed w-1/2 bottom-10 right-10 border bg-white border-purple-cus p-4 rounded-md '
        >
            <p 
                className='font-bold text-right cursor-pointer'
                onClick={() => setShowChat(false)}
            >X</p>
            <div
                ref={container}
                className='flex flex-col gap-4 h-[300px] overflow-y-auto'
            >
                {
                    messages.map(chat => (
                        <div
                            key={chat.id}
                            className={`p-4 max-w-[80%] text-white rounded-xl  ${
                                chat.type === 'bot' 
                                ?'bg-slate-400 text-black text-left self-start rounded-bl-none'
                                :'bg-purple-cus text-right self-end rounded-br-none'
                            }`}
                        >
                            <div className='flex gap-2 items-center'>
                                <p className='font-bold'>
                                    {chat.name}
                                </p>
                                <figure className='w-10 rounded-full overflow-hidden'>
                                    <img src={chat.avatar} alt="avatar" />
                                </figure>
                            </div>
                            <p>
                                {chat.message}
                            </p>
                        </div>
                    )) 
                }
            </div>
            <form className='w-full flex  pt-2'
                onSubmit={handleSubmit}
            >
                <input 
                    type="text" 
                    className='w-full p-2 bg-slate-50 border-b border-b-slate-300 focus:border-purple-cus focus:outline-none'
                    placeholder='Que deseas saber?'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button 
                    type='submit'
                    className={` text-white px-4 py-2 rounded-md font-bold uppercase tracking-widest ${loading ? 'bg-slate-500' : 'bg-purple-cus'}`}
                    disabled={loading}
                >Enviar</button>
            </form>
        </div>
    </div>
  )
}

export default Chat