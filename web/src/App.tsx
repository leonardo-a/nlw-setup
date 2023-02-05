import { Header } from './components/Header';
import { SummaryTable } from './components/SummaryTable';
import { api } from './lib/axios';

import './lib/dayjs'
import './styles/global.css'

// window.Notification.requestPermission( permission => {
//   if(permission === 'granted') {
//     new window.Notification('Habits', {
//       body: "Hello World! Notificações permitidas"
//     })
//   }
// } )

navigator.serviceWorker.register('service-worker.js')
  .then( async serviceWorker => {
    let subscription = await serviceWorker.pushManager.getSubscription();

    if(!subscription) {
      const publicKeyResponse = await api.get('/push/public_key');


      subscription = await serviceWorker.pushManager.subscribe({
        applicationServerKey: publicKeyResponse.data.publicKey,
        userVisibleOnly: true
      });
    }

    api.post('/push/register', {
      subscription
    })

    api.post('/push/send', {
      subscription
    })

    console.log("Subscription: ", subscription);

  } )



export function App() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}
