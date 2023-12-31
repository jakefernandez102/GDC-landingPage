import { useState } from "react";
import Chat from "./components/Chat";
import ChatButton from "./components/ChatButton";




function App() {

  const [showChat, setShowChat] = useState(false);



  return (
    <>
      <div className='bg-purple-cus text-center'>
        <h2 className=' text-white uppercase tracking-wider'>Transformando ideas en Código</h2>
      </div>

      <main className='flex flex-col gap-10 justify-center items-center'>
        <div className='w-full flex justify-center py-5'>
          <img className='' src="img/logo.webp" alt="GDC Logo" />
        </div>
        
        <section className='md:grid md:grid-cols-5 md:items-center md:w-4/6 m-auto '>
          <div className='col-span-3'>
            <img src="/img/1.jpg" alt="code image" />
          </div>
          <div className='p-4 col-span-2 flex flex-col gap-3 justify-center items-center bg-purple-cus h-full'>
            <h3 className='text-center text-white text-xl uppercase tracking-wider font-boldAZX'>Bienvenido</h3>
            <p className='w-2/3 text-center text-white font-extrabold text-sm lg:text-xl'>Nuestro lanzamiento es inminente y tomará lugar muy pronto.</p>
          </div>
        </section>

          <div className='w-3/4 flex flex-col justify-center items-center '>
            <h3 className='font-bold text-3xl mt-14 mb-10'>Subscribete</h3>
            <p>Inscríbase para ser el primero en enterarse de nuestros eventos de lanzamiento.</p>
            <form className='flex flex-col w-full gap-3 md:flex-row'>
              <div className='w-full flex flex-col '>
                <label htmlFor="">Email</label>
                <input type="text" className='border-b-2 border-b-slate-300' />
              </div>
              <input type="submit" className='bg-purple-cus text-white text-xl font-bold tracking-widest px-4 py-2' value='Registrarme' />
            </form>
          </div>
      </main>
      {
        showChat ? 
        <Chat 
          setShowChat={setShowChat}
        /> :
        <ChatButton 
          setShowChat={setShowChat}
          showChat={showChat}
        />
      }
      
      <footer className='p-10 flex justify-center'>
        <p className='text-slate-400'>
          COPYRIGHT © {new Date().getFullYear()} GYREDEVCLUB.COM - TODOS LOS DERECHOS RESERVADOS
        </p>
      </footer>
    </>
  )
}

export default App
